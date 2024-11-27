import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'
import { Dialog } from '../ui/dialog'
import ShoppingOrderDetailsView from './order-details'
import { useDispatch, useSelector } from 'react-redux'
import { getAllOrdersByUserId, getOrderDetails, resetOrderDetails } from '@/store/shop/order-slice'
import { Badge } from '../ui/badge'

function ShoppingOrders() {

    const [openDetailsDialog, setOpenDetailsDialog] = useState(false)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { orderList, orderDetails } = useSelector(state => state.shopOrder)

    function handleFetchOrderDetails(getId) {
        console.log(getId, 'getid');

        dispatch(getOrderDetails(getId))
        setOpenDetailsDialog(true)
    }

    useEffect(() => {
        dispatch(getAllOrdersByUserId(user?.id))
    }, [dispatch])

    console.log(orderDetails, "orderDetails");



    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Order History
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                Order Id
                            </TableHead>
                            <TableHead>
                                Order Date
                            </TableHead>
                            <TableHead>
                                Order Status
                            </TableHead>
                            <TableHead>
                                Order Price
                            </TableHead>
                            <TableHead>
                                <span className='sr-only'>
                                    Details
                                </span>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            orderList && orderList.length > 0 ?
                                orderList.map(orderItem => (
                                    <TableRow>
                                        <TableCell>{orderItem?._id}</TableCell>
                                        <TableCell>{orderItem?.orderDate?.split('T')[0]}</TableCell>
                                        <TableCell>
                                            <Badge className={`px-3 py-1 pb-2 items-center rounded-full 
                                                ${orderItem?.orderStatus === 'confirmed' ?
                                                    'bg-green-600' :
                                                    orderItem?.orderStatus === 'rejected' ?
                                                        'bg-red-600' :
                                                        orderItem?.orderStatus === 'inProcess' ?
                                                            'bg-yellow-600' :
                                                            orderItem?.orderStatus === 'delivered' ?
                                                                'bg-purple-600' :
                                                                orderItem?.orderStatus === 'inShipping' ?
                                                                    'bg-gray-400' :
                                                                    'bg-black'}
                                                 `}>
                                                {orderItem?.orderStatus}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>{orderItem?.totalAmount}</TableCell>
                                        <TableCell>
                                            <Dialog open={openDetailsDialog} onOpenChange={() => {
                                                setOpenDetailsDialog(false);
                                                dispatch(resetOrderDetails())
                                            }}>
                                                <Button onClick={() => handleFetchOrderDetails(orderItem?._id)}>
                                                    View Details
                                                </Button>
                                                <ShoppingOrderDetailsView orderDetails={orderDetails} />
                                            </Dialog>
                                        </TableCell>
                                    </TableRow>
                                )) : null
                        }
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default ShoppingOrders