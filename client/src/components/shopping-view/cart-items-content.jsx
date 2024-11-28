import { Minus, Plus, Trash } from 'lucide-react';
import React from 'react'
import { Button } from '../ui/button';
import { deleteCartItems, updateCartQuantity } from '@/store/shop/cart-slice';
import { useDispatch, useSelector } from 'react-redux';
import { data } from 'autoprefixer';
import { useToast } from '@/hooks/use-toast';

function UserCartItemsContent({ cartItem }) {

    const dispatch = useDispatch();
    const { toast } = useToast();
    const { user } = useSelector((state) => state.auth);
    const { cartItems } = useSelector(state => state.shopCart)
    const { productList, productDetails } = useSelector(state => state.shoppingProducts)

    const handleUpdateQuantity = (getCartItem, typeOfAction) => {
        console.log('outside');

        if (typeOfAction === 'plus') {

            let getCartItems = cartItems.items || [];

            if (getCartItems.length) {
                console.log('inside');

                const indexOfCurrentItem = getCartItems.findIndex(item => item?.productId === getCartItem?.productId)

                const getCurrentProductIndex = productList.findIndex((product) => product?._id === getCartItem?.productId)

                console.log(getCurrentProductIndex, 'gettotalstock');
                const getTotalStock = productList[getCurrentProductIndex]?.totalStock


                if (indexOfCurrentItem > -1) {
                    const getQuantity = getCartItems[indexOfCurrentItem].quantity
                    if (getQuantity >= getTotalStock) {
                        toast({
                            title: `You can add maximum ${getQuantity} quantity of this product`,
                            variant: 'destructive'
                        })
                        return;
                    }
                }
            }
        }



        dispatch(updateCartQuantity({
            userId: user?.id,
            productId: getCartItem?.productId,
            quantity: typeOfAction === 'plus' ? getCartItem?.quantity + 1 : getCartItem?.quantity - 1
        }))
    }

    const handleDeleteCartItem = (getCartItem) => {
        console.log(getCartItem, 'cartItem');
        dispatch(deleteCartItems({
            userId: user?.id,
            productId: getCartItem?.productId
        })).then((data) => {
            console.log(data, 'data');

            if (data?.payload?.success) {
                toast({
                    title: 'Item deleted',
                })
            }
        });
    }

    return (
        <div className='flex items-center space-x-4'>
            <img src={cartItem?.image} alt={cartItem?.title} className='w-20 h-20 rounded object-cover' />
            <div className='flex-1'>
                <h3 className='text-lg font-semibold'>{cartItem?.title}</h3>
                <p className='text-sm text-gray-700'>{cartItem?.salePrice > 0 ? cartItem?.salePrice : cartItem.price}</p>
                <div className='flex items-center mt-3 mb-2 gap-3'>
                    <Button variant='outline' size='icon' className='w-8 h-8 p-0 rounded-full'
                        onClick={() => handleUpdateQuantity(cartItem, 'minus')}
                        disabled={cartItem?.quantity === 1}
                    >
                        <Minus className='h-4 w-4' />
                        <span className='sr-only'>Decrease quantity</span>
                    </Button>
                    <span className='text-muted-foreground text-sm font-semibold'>{cartItem?.quantity}</span>
                    <Button variant='outline' size='icon' className='w-8 h-8 p-0 rounded-full'
                        onClick={() => handleUpdateQuantity(cartItem, 'plus')}
                    >
                        <Plus className='h-4 w-4' />
                        <span className='sr-only'>Increase quantity</span>
                    </Button>
                </div>
            </div>
            <div className='flex flex-col items-end'>
                <p className='font-semibold'>
                    {((cartItem.salePrice > 0 ? cartItem.salePrice : cartItem.price) * cartItem?.quantity).toFixed(2)}
                </p>
                <Button variant='outline' size='icon' className='w-8 h-8 p-0 mt-2 text-red-700 rounded-full'
                    onClick={() => {
                        handleDeleteCartItem(cartItem)
                        console.log(cartItem);

                    }}
                >
                    <Trash className='h-4 w-4' />
                    <span className='sr-only'>Delete item</span>
                </Button>
            </div>
        </div>
    )
}

export default UserCartItemsContent