import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Button } from '../ui/button'


function AdminOrdersView() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    All Orders
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
                        <TableRow>
                            <TableCell>123456</TableCell>
                            <TableCell>19/09/2024</TableCell>
                            <TableCell>In Process</TableCell>
                            <TableCell>$1000</TableCell>
                            <TableCell>
                                <Button>
                                    View Details
                                </Button>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}

export default AdminOrdersView