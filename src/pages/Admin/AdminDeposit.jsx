import React, { useState } from 'react'
import Layout from '../../components/Admin/Layout'
import Modal from '../../components/Modal'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'

const AdminDeposit = () => {
  const [open, setOpen] = useState(false)

  const handleSubmitButton = () => {
    toast.success("deposit added!!")
  }

  return (
    <Layout>
      
      <div className="payouts flex flex-col bg-white rounded-lg p-5 gap-4">

        <h1 className='capitalize font-bold text-2xl'>Deposits</h1>

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
                  <td>Basic </td>
                  <td>2,500 $</td>
                  <td>2023-03-28</td>
              </tr>

              <tr>
                  <td>Professional </td>
                  <td>20,500 $</td>
                  <td>2023-03-28</td>
              </tr>

              <tr>
                  <td>Basic </td>
                  <td>2,500 $</td>
                  <td>2023-03-28</td>
              </tr>

          </tbody>
        </table>

        <Link className='text-blue-500 underline' onClick={() => setOpen(true)}>Add More</Link>

        <Modal open={open} onClose={() => setOpen(false)}>

          <div className="add-payout flex flex-col gap-3">

            <h1 className='font-bold text-2xl text-center'>Add New Deposit</h1>

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
                <option value="Basic">Basic</option>
                <option value="Professional">Professional</option>
                <option value="Premium">Premium</option>
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

            <button type='button' onClick={handleSubmitButton} className='p-2 px-4 bg-violet-600 hover:bg-violet-500 duration-200 text-white rounded-lg'>submit</button>

          </div>

        </Modal>


      </div>


    </Layout>
  )
}

export default AdminDeposit