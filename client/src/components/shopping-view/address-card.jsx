import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress }) {
    return (
        <Card className='hover:shadow-red-300 hover:transition-opacity duration-1000 shadow-lg'>
            <CardHeader className='font-semibold text-xl'>
                Address Details
            </CardHeader>
            <CardContent className='grid gap-4'>
                <Label>
                    Address: {addressInfo?.address}
                </Label>
                <Label>
                    City: {addressInfo?.city}
                </Label>
                <Label>
                    Pincode: {addressInfo?.pincode}
                </Label>
                <Label>
                    Phone: {addressInfo?.phone}
                </Label>
                <Label>
                    Notes: {addressInfo?.notes}
                </Label>
            </CardContent>
            <CardFooter className='flex justify-between p-4'>
                <Button
                    onClick={() => handleEditAddress(addressInfo)}
                >
                    Edit
                </Button>
                <Button
                    variant='destructive'
                    onClick={() => handleDeleteAddress(addressInfo)}
                >
                    Delete
                </Button>
            </CardFooter>
        </Card>
    )
}

export default AddressCard
