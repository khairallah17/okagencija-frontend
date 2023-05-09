import React, { useState } from 'react'
import Layout from '../../components/Admin/Layout'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import toast, { Toaster } from 'react-hot-toast'


const AdminPayout = () => {

  const [open, setOpen] = useState(false)

  const handleSubmitButton = () => {
    toast.success("Payout Added !!")
  }

  return (
    <Layout>
      
      <div className="payouts flex flex-col bg-white rounded-lg p-5 gap-4">

        <h1 className='capitalize font-bold text-2xl'>payouts</h1>

        <Toaster
          position="top-center"
          reverseOrder={false}
        />

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

              <tr>
                  <td>withdrawal </td>
                  <td>2,500 $</td>
                  <td>2023-03-28</td>
              </tr>

              <tr>
                  <td>withdrawal </td>
                  <td>2,500 $</td>
                  <td>2023-03-28</td>
              </tr>

          </tbody>
        </table>

        <Link className='text-blue-500 underline' onClick={() => setOpen(true)}>Add More</Link>

        <Modal open={open} onClose={() => setOpen(false)}>

          <div className="add-payout flex flex-col gap-3">

            <h1 className='font-bold text-2xl text-center'>Add New Payout</h1>

            <div className="payout-client flex flex-col gap-2">
              <label htmlFor="client">Client</label>
              <select name="client" className='bg-gray-200 rounded-lg p-3' id="">
                <option value="client1">client1</option>
                <option value="client2">client2</option>
                <option value="client3">client3</option>
              </select>
            </div>

            <div className="payout-details flex flex-col gap-2">
              <label htmlFor="detail">Details</label>
              <select name="detail" id="" className='p-3 rounded-lg'>
                <option value="withdrawal1">withdrawal 1</option>
                <option value="withdrawal2">withdrawal 3</option>
                <option value="withdrawal3">withdrawal 2</option>
              </select>
            </div>

            <div className="payout-value flex flex-col gap-2">
              <label htmlFor="value">Value</label>
              <input type="text" name="value" placeholder='value' className='bg-gray-200 rounded-lg p-2 text-black outline-none' />
            </div>

            <div className="payout-date flex flex-col gap-2">
              <label htmlFor="date">Date</label>
              <input type="date" name="date" id="" className='bg-gray-200 rounded-lg p-2 outline-none' />
            </div>

            <button onClick={handleSubmitButton} type='button' className='p-2 px-4 bg-violet-600 hover:bg-violet-500 duration-200 text-white rounded-lg'>submit</button>

          </div>

        </Modal>


      </div>


    </Layout>
  )
}

export default AdminPayout