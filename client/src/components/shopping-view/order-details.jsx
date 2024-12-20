import React from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import { DialogTitle } from '@radix-ui/react-dialog'
import { Badge } from '../ui/badge'
import { useSelector } from 'react-redux'

function ShoppingOrderDetailsView({ orderDetails }) {

    const { user } = useSelector(state => state.auth)

    // console.log(orderDetails?.cartItems, 'cartItems')
    // console.log(user, 'user')


    return (
        <DialogContent classname='sm:max-w-[600px] '>
            <DialogTitle>Order Details</DialogTitle>
            <div className='grid gap-6'>
                <div className='grid gap-2'>
                    <div className='flex items-center mt-6 justify-between'>
                        <p className='font-medium '>Order Id</p>
                        <Label>{orderDetails?._id}</Label>

                    </div>
                    <div className='flex items-center mt-2 justify-between'>
                        <p className='font-medium '>Order Date</p>
                        <Label>{orderDetails?.orderDate?.split('T')[0]}</Label>

                    </div>

                    <div className='flex items-center mt-2 justify-between'>
                        <p className='font-medium '>Order Price</p>
                        <Label>{orderDetails?.totalAmount}</Label>

                    </div>
                    <div className='flex items-center mt-2 justify-between'>
                        <p className='font-medium '>Payment Method</p>
                        <Label>{orderDetails?.paymentMethod}</Label>
                    </div>
                    <div className='flex items-center mt-2 justify-between'>
                        <p className='font-medium '>Payment Status</p>
                        <Label>{orderDetails?.paymentStatus}</Label>

                    </div>
                    <div className='flex items-center mt-2 justify-between'>
                        <p className='font-medium '>Order Status</p>
                        <Label>
                            <Badge className={`px-3 py-1 items-center rounded-full 
                                ${orderDetails?.orderStatus === 'confirmed' ?
                                    'bg-green-600' :
                                    orderDetails?.orderStatus === 'rejected' ?
                                        'bg-red-600' :
                                        orderDetails?.orderStatus === 'inProcess' ?
                                            'bg-yellow-600' :
                                            orderDetails?.orderStatus === 'delivered' ?
                                                'bg-purple-600' :
                                                orderDetails?.orderStatus === 'inShipping' ?
                                                    'bg-gray-400' :
                                                    'bg-black'}`}>
                                {orderDetails?.orderStatus}
                            </Badge>
                        </Label>

                    </div>
                </div>
                <Separator />
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium'>Order Details</div>
                        <ul className='grid gap-3'>
                            {


                                orderDetails?.cartItems && orderDetails?.cartItems.length > 0 ?
                                    orderDetails?.cartItems.map(item => (
                                        <li className='flex items-center justify-between'>
                                            {
                                                // console.log(item.title)

                                            }
                                            <span>{item.title} ({item.quantity})</span>
                                            <div className='flex gap-8'>

                                                <span>{item.price} x {item.quantity}</span>
                                                <span>${item.price * item.quantity}</span>
                                            </div>
                                        </li>
                                    )) : null
                            }

                        </ul>
                    </div>
                </div>
                <div className='grid gap-4'>
                    <div className='grid gap-2'>
                        <div className='font-medium'>Shipping Info</div>
                        <div className='grid gap-0.5 text-muted-foreground'>
                            <span>{user?.username}</span>
                            <span>{orderDetails?.addressInfo?.address}</span>
                            <span>{orderDetails?.addressInfo?.city}</span>
                            <span>{orderDetails?.addressInfo?.pincode}</span>
                            <span>{orderDetails?.addressInfo?.phone}</span>
                            <span>{orderDetails?.addressInfo?.notes}</span>

                        </div>
                    </div>
                </div>
            </div>
        </DialogContent>
    )
}

export default ShoppingOrderDetailsView