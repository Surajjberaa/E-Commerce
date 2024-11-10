import CommonForm from '@/components/common/form'
import { loginFormControls, registerFormControls } from '@/config'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const initialState = {
  email: '',
  password: '',
}


function AuthLogin() {

  const [formData, setFormData] = useState(initialState)

  function onSubmit(){

  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Log In to your account</h1>
        <p className='mt-2'>Don't have an account?
          <Link className='font-medium text-primary hover:underline ml-2' to={'/auth/register'}>Sign Up</Link>
        </p>
      </div>
      <CommonForm
      formControls={loginFormControls}
      buttonText={'Sign In'}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin