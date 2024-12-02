import React, { useState } from 'react'
import { DialogContent, DialogDescription, DialogTitle } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import CommonForm from '../common/form'
import { Badge } from '../ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersForAdmin, getOrderDetailsForAdmin, updateOrderStatus } from '@/store/admin/order-slice'
import { useToast } from '@/hooks/use-toast'

const initialFormData = {
    status: ''
}

function AdminOrderDetailsView({ orderDetails }) {

    const [formData, setFormData] = useState(initialFormData)
    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { toast } = useToast()

    function handleUpdateStatus(event) {
        event.preventDefault();

        const { status } = formData
        dispatch(updateOrderStatus({ id: orderDetails?._id, orderStatus: status })).then((data) => {
            // console.log(data, '123');
            if (data?.payload?.success) {
                dispatch(getOrderDetailsForAdmin(orderDetails?._id))
                dispatch(getAllOrdersForAdmin())
                setFormData(initialFormData)
                toast({
                    title: "Order status updated successfully!"
                })
            }

        })

        // console.log(formData, 'formData');
    }



    return (
        <DialogContent className='sm:max-w-[600px] h-[80vh] overflow-auto'>
            <DialogTitle>
                Order Details
            </DialogTitle>
            <DialogDescription></DialogDescription>
            <div className='grid gap-4'>
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
                        <Label>${orderDetails?.totalAmount}</Label>

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
                                        <li key={item?.title} className='flex items-center justify-between'>
                                            <span>{item?.title} ({item?.quantity})</span>
                                            <div className='flex gap-8 '>

                                                <span>{item?.price} x {item?.quantity}</span>
                                                <span>${(item?.price * item?.quantity).toFixed(2)}</span>
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
                <div>
                    <CommonForm formControls={[
                        {

                            label: "Order Status",
                            name: "status",
                            componentType: "select",
                            options: [
                                { id: "pending", label: "Pending" },
                                { id: "inProcess", label: "In Process" },
                                { id: "inShipping", label: "In Shipping" },
                                { id: "delivered", label: "Delivered" },
                                { id: "rejected", label: "Rejected" },
                            ],

                        }
                    ]} formData={formData} setFormData={setFormData} buttonText={'Update Order Status'} onSubmit={handleUpdateStatus} />
                </div>
            </div>
        </DialogContent>
    )
}

export default AdminOrderDetailsView