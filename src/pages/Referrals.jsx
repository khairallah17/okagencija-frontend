import React, { useState } from 'react'
import Layout from '../components/Layout'

const Referrals = () => {

    const [filter, setFilter] = useState("")

    return (
        <Layout>
            <h4 className='font-bold text-white uppercase mb-5' >referrals</h4>
            
            <div className="referrals flex flex-col gap-5">

                <div className="referrals-total bg-white flex justify-between p-5 rounded-md">

                <div className="referrals-total-number bg-violet-300 text-violet-500 text-center p-2">
                    <p className='capitalize'>total referral download</p>
                    <p className='text-3xl'>0</p>
                </div>

                <div className="referrals-filter flex items-center gap-2">
                    <select name="referralFilter" className='p-2'>
                        <option value="All">All</option>
                        <option value="filter 1">filter 1</option>
                        <option value="filter 2">filter 2</option>
                    </select>
                    <button className=' bg-violet-400 hover:bg-violet-500 duration-300 capitalize p-2 rounded-md h-fit text-white'>search</button>
                    <button className=' bg-violet-400 hover:bg-violet-500 duration-300 capitalize p-2 rounded-md h-fit text-white'>search</button>
                </div>

                </div>

                <div className="referrals-text bg-white p-2">
                    <table className='w-full border-none'>
                        <thead className='w-full border-none'>
                            <td className='flex w-full justify-between border-b-[1px] border-gray-300'>
                                <th className='bg-white text-black border-none w-fit font-normal'>Member Name</th>
                                <th className='bg-white text-black border-none w-fit font-normal'>Sponsor</th>
                                <th className='bg-white text-black border-none w-fit font-normal'>Action</th>
                            </td>
                        </thead>
                    </table>
                </div>

            </div>

        </Layout>
    )
}

export default Referrals