import React from 'react'
import { PencilIcon } from "@heroicons/react/24/outline";
import Layout from '../components/Layout'

const MoreInfo = () => {
  return (
    <Layout>
        <div className="details flex w-full gap-3.5">

            <div className="personal-details bg-white w-1/3 p-5 rounded-lg">
                <div className="header flex justify-between items-center mb-4">
                    <h1>Personal Details</h1>
                    <div className="pencil-icon bg-violet-700 p-1 rounded-full cursor-pointer">
                        <PencilIcon className="h-4 w-4 text-white" />
                    </div>
                </div>

                <div className="personal-inputs flex flex-col gap-2">

                    <div className="first-name flex flex-col flex-grow gap-1">
                        <label htmlFor="First Name">First Name</label>
                        <input type="text" name="First Name" id=""  className='bg-gray-200 rounded-md p-2 outline-none'/>
                    </div>

                    <div className="last-name flex flex-col flex-grow gap-1">
                        <label htmlFor="Last Name">Last Name</label>
                        <input type="text" name="Last Name" id="" className='bg-gray-200 rounded-md p-2 outline-none' />
                    </div>

                    <div className="gender flex flex-col flex-grow gap-3">
                        <label htmlFor="Gender">Gender</label>
                        <select name="Gender" id="" className='p-3 rounded-md'>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                </div>

            </div>

            <div className="contact-details flex-grow bg-white p-5 py-10 rounded-lg">
                
                <div className="header flex items-center justify-between">
                    <h1>Personal Details</h1>
                    <div className="pencil-icon bg-violet-700 p-1 rounded-full">
                        <PencilIcon className="h-4 w-4 text-white" />
                    </div>
                </div>

                <div className="details-info flex w-full gap-5">

                    <div className="left-content flex flex-col gap-2 flex-grow">

                        <div className="address1 flex flex-col gap-1">
                            <label htmlFor="Address Line 1">Address Line 1</label>
                            <input type="text" name='address 1' className='bg-gray-200 p-2 rounded-md outline-none' />
                        </div>

                        <div className="country flex flex-col gap-1">
                            <label htmlFor="Coutry">Country</label>
                            <select name="Country" className='p-3 rounded-md' id="">
                                <option value="Country 1">country 1</option>
                                <option value="Country 1">country 1</option>
                                <option value="Country 1">country 1</option>
                                <option value="Country 1">country 1</option>
                            </select>
                        </div>

                        <div className="city flex flex-col gap-1">
                            <label htmlFor="City">City</label>
                            <input type="text" name="City" className='bg-gray-200 p-2 rounded-md outline-none' />
                        </div>

                        <div className="email flex flex-col gap-1">
                            <label htmlFor="Email">Email <span className='text-red-500'>*</span></label>
                            <input type="email" name='email' placeholder='test@gmail.com' className='p-2 bg-gray-200 rounded-md outline-none' />
                        </div>

                    </div>

                    <div className="left-content flex flex-col gap-2 flex-grow">

                        <div className="address2 flex flex-col gap-1">
                            <label htmlFor="Address Line 2">Address Line 2</label>
                            <input type="text" name='address2' className='bg-gray-200 p-2 rounded-md outline-none' />
                        </div>

                        <div className="state flex flex-col gap-1">
                            <label htmlFor="state">State</label>
                            <select name="state" className='p-3 rounded-md' id="">
                                <option value="state 1">state 1</option>
                                <option value="state 1">state 1</option>
                                <option value="state 1">state 1</option>
                                <option value="state 1">state 1</option>
                            </select>
                        </div>

                        <div className="Zip Code flex flex-col gap-1">
                            <label htmlFor="Zip Code">Zip Code</label>
                            <input type="text" name="Zip Code" className='bg-gray-200 p-2 rounded-md outline-none' />
                        </div>

                        <div className="Mobile No flex flex-col gap-1">
                            <label htmlFor="Mobile No">Mobile No <span className='text-red-500'>*</span></label>
                            <input type="tel" name='Mobile No' placeholder='+00 000 000 000' className='p-2 bg-gray-200 rounded-md outline-none' />
                        </div>

                    </div>

                </div>
            
            </div>

        </div>
    </Layout>
  )
}

export default MoreInfo