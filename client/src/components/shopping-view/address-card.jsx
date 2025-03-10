import React from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

function AddressCard({ addressInfo, handleDeleteAddress, handleEditAddress, setCurrentSelectedAddress }) {
    return (
        <Card className='hover:shadow-red-300 hover:transition-opacity duration-1000 shadow-lg cursor-pointer'
            onClick={
                setCurrentSelectedAddress
                    ? () => setCurrentSelectedAddress(addressInfo)
                    : null
            }
        >
            <CardHeader className='font-semibold text-xl flex flex-row justify-between'>
                <h1>
                    Address Details
                </h1>
                <Button className='bg-green-600 w-20 h-8'>
                    Select
                </Button>
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
