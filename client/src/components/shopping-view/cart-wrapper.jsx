import React from 'react'
import { SheetContent, SheetHeader, SheetTitle } from '../ui/sheet'
import UserCartItemsContent from './cart-items-content'
import { Button } from '../ui/button'

function UserCartWrapper({ cartItems }) {

  const totalCartAmount = cartItems && cartItems?.length > 0 ? cartItems.reduce(
    (sum, currentItem) => sum + (currentItem?.salePrice > 0 ? currentItem?.salePrice : currentItem?.price) * currentItem?.quantity, 0)
    : 0;

  return (
    <SheetContent className='overflow-auto '>
      <SheetHeader>
        <SheetTitle>Your Cart</SheetTitle>
      </SheetHeader>
      <div className='mt-8 space-y-4'>
        {
          cartItems && cartItems?.length > 0 ?
            cartItems.map((item) => (
              <UserCartItemsContent key={item?.productId} cartItem={item} />
            ))
            :
            <div className='text-center text-sm text-gray-500'>
              No items in cart
            </div>
        }
      </div>
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
      <Button className='w-full mt-6'>
        Checkout
      </Button>
    </SheetContent>
  )
}

export default UserCartWrapper