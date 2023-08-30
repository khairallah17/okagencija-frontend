import React, { useState } from 'react'
import useFormContext from '../../Hooks/useFormContext'
import toast, { Toaster } from 'react-hot-toast'

const UserInfo = () => {
  
  const { handleChange,data } = useFormContext()

  return (
    <div className="userInput-info flex flex-col gap-5">

      <div className="name-email-container flex gap-5">

        <div className="username flex flex-col">
          <label htmlFor="userUserName" className='capitalize'>username <span className=' text-red-500'>*</span></label>
          <input type="text" name='username' className='bg-gray-300 outline-none p-1' onChange={handleChange} required/>
        </div>
        
        <div className="email-container flex flex-col">
          <label htmlFor="userEmail">Email <span className=' text-red-500'>*</span></label>
          <input type="email" name="userEmail" className='bg-gray-300 outline-none p-1' onChange={handleChange} required/>
        </div>

      </div>

      <div className="password-container flex gap-5">

        <div className="password flex flex-col">
          <label htmlFor="Password">password <span className=' text-red-500'>*</span></label>
          <input type="password" name="password" className='bg-gray-300 outline-none p-1' onChange={handleChange} required/>
        </div>

        <div className="confirm-password flex flex-col">
          <label htmlFor="confirm-password">Confirm password <span className=' text-red-500'>*</span></label>
          <input type="password" name='confPassword' className='bg-gray-300 outline-none p-1' onChange={handleChange} required/>
        </div>

      </div>

      <div className="phone-container flex flex-col flex-grow">
        <label htmlFor="phoneNumber">Phone Number <span className=' text-red-500'>*</span></label>
        <input type="tel" name="phoneNumber" className='bg-gray-300 outline-none p-1' onChange={handleChange} required/>
      </div>

    </div>
  )
}

export default UserInfo