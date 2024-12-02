import React, { useEffect, useState } from 'react'
import img from '../../assets/banners/account.jpg'
import Address from '@/components/shopping-view/address'
import { useDispatch, useSelector } from 'react-redux'
import UserCartItemsContent from '@/components/shopping-view/cart-items-content'
import { Button } from '@/components/ui/button'
import { createNewOrder } from '@/store/shop/order-slice'
import { useToast } from '@/hooks/use-toast'

function ShoppingCheckout() {

  const { cartItems } = useSelector(state => state.shopCart)
  const { user } = useSelector(state => state.auth)
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null)
  const [isPaymentStart, setIsPaymentStart] = useState(false)
  const { approvalUrl, orderId } = useSelector(state => state.shopOrder)
  const dispatch = useDispatch()
  const {toast} = useToast()

  // console.log(currentSelectedAddress, 'currentSelectedAddress');


  const totalCartAmount = cartItems && cartItems?.items && cartItems?.items.length > 0 ? cartItems.items.reduce(
    (sum, currentItem) => sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity, 0)
    : 0;

  function handleInititatePaypalPayment() {
    
    // console.log(cartItems, 'length');
    if(cartItems.items.length === 0 ){
      
      toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive"
      })
      return;
    }

    if(currentSelectedAddress === null){
      toast({
        title: "Please select one address to procees",
        variant: "destructive"
      })
      return;
    }

    const orderData = {
      userId: user?.id,
      cartId: cartItems?._id,
      cartItems: cartItems.items.map(singleCartItem => ({
        productId: singleCartItem?.productId,
        title: singleCartItem?.title,
        image: singleCartItem?.image,
        price: singleCartItem?.salePrice > 0 ? singleCartItem.salePrice : singleCartItem.price,
        quantity: singleCartItem?.quantity
      })),
      addressInfo: {
        addressId: currentSelectedAddress?._id,
        address: currentSelectedAddress?.address,
        city: currentSelectedAddress?.city,
        pincode: currentSelectedAddress?.pincode,
        phone: currentSelectedAddress?.phone,
        notes: currentSelectedAddress?.notes
      },
      orderStatus: 'pending',
      paymentMethod: 'paypal',
      paymentStatus: 'pending',
      totalAmount: totalCartAmount,
      orderDate: new Date,
      orderUpdateDate: new Date,
      paymentId: '',
      payerId: ''
    }

    // console.log(orderData);

    dispatch(createNewOrder(orderData)).then((data) => {
      // console.log(data, 'Suraj');
      if (data?.payload?.success) {
        setIsPaymentStart(true)
      } else {
        setIsPaymentStart(false)
      }
    });

  }
  // console.log(orderId, 'order');
  // console.log(approvalUrl, 'approval');

  if (approvalUrl) {
    window.location.href = approvalUrl;
  }

  return (
    <div className='flex flex-col'>
      <div className='relative h-[300px] w-full overflow-hidden'>
        <img src={img} alt="" className='h-full w-full object-cover object-center' />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 mt-5 p-5'>
        <Address setCurrentSelectedAddress={setCurrentSelectedAddress} />
        <div className='flex flex-col gap-4'>
          {
            cartItems && cartItems.items && cartItems.items.length > 0 ?
              cartItems.items.map((item) => <UserCartItemsContent cartItem={item} />)
              : null
          }
          <div className='mt-8 space-y-4'>
            <div className='flex justify-between'>
              <span className='text-lg font-semibold'>
                Total
              </span>
              <span className='text-lg font-semibold'>
                ${totalCartAmount.toFixed(2)}
              </span>
            </div>
          </div>
          <div className='mt-4 w-full'>
            <Button
              className='w-full'
              onClick={handleInititatePaypalPayment}
              taget='blank'
            >
              Checkout with Paypal
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShoppingCheckout