import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import CommonForm from '../common/form'
import { addressFormControls } from '@/config'
import { useDispatch, useSelector } from 'react-redux'
import { addNewAddress, deleteAddress, editAddress, fetchAllAddress } from '@/store/shop/address-slice'
import AddressCard from './address-card'
import { Toast } from '../ui/toast'
import { useToast } from '@/hooks/use-toast'

const initialAddressFormData = {
    address: '',
    city: '',
    pincode: '',
    notes: '',
    phone: ''
}

function Address({ setCurrentSelectedAddress }) {

    const [formData, setFormData] = useState(initialAddressFormData)
    const [currentEditedId, setCurrentEditedId] = useState(null)
    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)
    const { addressList } = useSelector((state) => state.shopAddress)
    const { toast } = useToast()


    function handleManageAddress(event) {
        event.preventDefault()

        if (addressList.length >= 3 && currentEditedId === null) {
            toast({
                title: 'You can add max 3 addresses',
                variant: 'destructive'
            })
            setFormData(initialAddressFormData)
            return;
        }

        currentEditedId !== null ? dispatch(editAddress({
            userId: user?.id,
            addressId: currentEditedId,
            formData
        })).then((data) => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id))
                setCurrentEditedId(null)
                setFormData(initialAddressFormData)
                toast({
                    title: 'Address updated'
                })
            }
        }) :

            dispatch(addNewAddress({
                ...formData,
                userId: user?.id
            })).then((data) => {

                if (data?.payload?.success) {
                    dispatch(fetchAllAddress(user?.id))
                    setFormData(initialAddressFormData)
                    toast({
                        title: 'Address added'
                    })

                }
            })
    }

    function isFormValid() {
        return Object.keys(formData)
            .map((key) => formData[key].trim() !== '')
            .every((item) => item)
    }

    function handleDeleteAddress(getCurrentAddress) {
        dispatch(deleteAddress({ userId: user?.id, addressId: getCurrentAddress._id })).then(data => {
            if (data?.payload?.success) {
                dispatch(fetchAllAddress(user?.id))
                toast({
                    title: 'Address deleted'
                })
            }
        })
    }

    function handleEditAddress(getCurrentAddress) {
        setCurrentEditedId(getCurrentAddress?._id)
        setFormData({
            ...formData,
            address: getCurrentAddress?.address,
            city: getCurrentAddress?.city,
            pincode: getCurrentAddress?.pincode,
            notes: getCurrentAddress?.notes,
            phone: getCurrentAddress?.phone
        })

    }

    useEffect(() => {
        dispatch(fetchAllAddress(user?.id))
    }, [dispatch])
    console.log(addressList, 'address list');



    return (
        <Card>
            <div className='mb-5 p-3 grid grid-cols-1 sm:grid-cols-2 gap-2'>
                {
                    addressList && addressList.length > 0 ?
                        addressList.map(singleAddressItem => <AddressCard handleEditAddress={handleEditAddress} handleDeleteAddress={handleDeleteAddress} id={singleAddressItem.id} addressInfo={singleAddressItem} setCurrentSelectedAddress={setCurrentSelectedAddress} />) : null
                }
            </div>
            <CardHeader>
                <CardTitle>
                    {currentEditedId !== null ? 'Edit Address' : 'Add New Address'}
                </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
                <CommonForm
                    formControls={addressFormControls}
                    formData={formData}
                    setFormData={setFormData}
                    buttonText={currentEditedId !== null ? 'Edit' : 'Add'}
                    onSubmit={handleManageAddress}
                    isBtnDisabled={!isFormValid()}
                />
            </CardContent>
        </Card>
    )
}

export default Address