import React, { useState } from 'react'
import Layout from '../../components/Admin/Layout'
import profile from "../../../public/user.png"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import Modal from '../../components/Modal';
import toast, { Toaster } from 'react-hot-toast';

const AdminPortfolio = () => {

  const clients = [ "client 1","client 2","client 3","client 4","client 5" ]

  const [open ,setOpen] = useState(false)

  const handleClickSubmit = () => {
    toast.success("porfolio edited successfully !!")
  }

  return (
    <Layout>

      <Toaster
        position="top-center"
        reverseOrder={false}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
      
        <div className="profit-details flex flex-col gap-4">

          <h1 className='font-bold text-2xl capitalize'>Edit Client Portfolio</h1>

          <div className="profit flex flex-col gap-2">
            <label htmlFor="Profit">Profit</label>
            <input type="text" name="profit" className='outline-none bg-gray-200 p-2 rounded-lg' id="" />
          </div>

          <div className="capital flex flex-col gap-2">
            <label htmlFor="Capital">Capital</label>
            <input type="text" name='Capital' className='outline-none bg-gray-200 p-2 rounded-lg' />
          </div>

          <button onClick={handleClickSubmit} className="bg-violet-600 duration-200 hover:bg-violet-500 text-white p-2 px-4 rounded-lg" >submit</button>

        </div>

      </Modal>

      <div className='clients-wrapper flex gap-5'>

        {

          clients.map(clt => (
            <div className="client-card bg-white p-5 rounded-lg h-full flex flex-col gap-4 w-64">
              <img src={profile} alt="" className='w-10' />
              <p>{clt}</p>

              <div className="portfolio-text-card h-full flex justify-center items-center ">
                  
                  <div className="card-border h-full w-full flex flex-col items-start justify-center">
                      <div className="text-card-upper px-2 flex flex-col gap-1 border-l-4 border-[#9A9A9A] mb-5">
                          <p>start balance</p>
                          <p className=' font-bold'>10,000 $</p>
                      </div>

                      <div className="text-card-lower px-2 flex flex-col gap-1 border-l-4 border-l-[#6EC89C]">
                          <p>current balance</p>
                          <p className=' font-bold'>15,000 $</p>
                          <div className="card-lower-stat flex items-center ">
                              <span className='bg-[#CDEBDC] text-[#67a788] rounded-2xl px-2'>+ 50 %</span>
                              <ArrowTrendingUpIcon className="h-6 w-6 text-[#6EC89C]" />
                          </div>
                      </div>
                  </div>

                </div>

                <button onClick={() => setOpen(true)} className='p-2 px-4 bg-green-600 duration-200 hover:bg-green-500 text-white rounded-lg' >Edit</button>

            </div>
          ))

        }

      </div>

    </Layout>
  )
}

export default AdminPortfolio