import React,{ useState } from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const Payout = () => {

    const handleClickPayout = () => {
        toast.success("email was sent to the BackOffice!")
    }

  return (
    <Layout>
        <h4 className='font-bold text-gray uppercase mb-5 text-white' >payout</h4>
        <div className="deposits bg-white p-10 rounded-2xl mb-8 shadow-xl">
            
            <div className="deposit-cards-container flex flex-wrap gap-5">
                <div className="deposit-card w-60 flex flex-col justify-between shadow-xl bg-[#ECEFEE] rounded-2xl">
                    <div className="flex items-center flex-col gap-3 justify-between h-full p-5">
                        <img src="/logo-dark.png" alt="deposit image" className='border-[#8C4949] border-[13px] rounded-full h-40 w-40' />
                        <span className='deposit-card-text capitalize'>send us email request</span>
                    </div>
                    <Link className='font-bold uppercase bg-slate-600 w-full text-center text-white py-3 rounded-b-2xl' onClick={handleClickPayout} >payout</Link>
                </div>
            </div>

        </div>
        
        <Toaster
            position="bottom-right"
            reverseOrder={false}
        />

        <div className="deposits-table bg-white p-10 rounded-2xl mb-8">
            <div className="withdrawal-table">
                <table>
                    <thead>
                        <tr>
                            <th> Details</th>
                            <th> VALUE </th>
                            <th> DATE </th>
                        </tr>
                    </thead>
                    <tbody>

                        <tr>
                            <td>withdrawal </td>
                            <td>2,500 $</td>
                            <td>2023-03-28</td>
                        </tr>

                    </tbody>
                </table>
            </div>
        </div>
    </Layout>
  )
}

export default Payout