import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function PaymentSuccessPage() {

  const navigate = useNavigate()

  function handleNavigate(){
    navigate('/shop/home')
  }

  return (
    <div className='flex flex-col justify-center items-center mt-20 w-full'>
      <div className='border-black border p-4 rounded-full  '>
        <h1 className='text-3xl'>Payment Successfull</h1>
      </div>
      <Button className='mt-4' onClick={handleNavigate}>
        Go to Home Page
      </Button>
    </div>
  )
}

export default PaymentSuccessPage