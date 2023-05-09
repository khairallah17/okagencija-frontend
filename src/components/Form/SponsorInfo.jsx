import React from 'react'
import useFormContext from '../../Hooks/useFormContext'

const SponsorInfo = () => {

  const { handleChange } = useFormContext()

  return (
    <div className='flex flex-col w-96 bg-white gap-5'>

      <div className="input-container flex flex-col">
        <label htmlFor="sponsorUserName" className='capitalize'>sponsor username <span className=' text-red-500'>*</span> </label>
        <input type="text" name="sponsorUsername" onChange={handleChange} className="bg-gray-300 p-1 outline-none" />
      </div>

      <div className="input-container flex flex-col">
        <label htmlFor="sponsorFullName" className='capitalize'>sponsor full name <span className=' text-red-500'>*</span> </label>
        <input type="text" name="sponsorFullName" onChange={handleChange} className="bg-gray-300 p-1 outline-none" />
      </div>

    </div>
  )
}

export default SponsorInfo