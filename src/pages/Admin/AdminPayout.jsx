import React, { useEffect, useState } from 'react'
import Layout from '../../components/Admin/Layout'
import { Link } from 'react-router-dom'
import Modal from '../../components/Modal'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Swal from 'sweetalert2'


const AdminPayout = () => {

  const [open, setOpen] = useState(false)
  const [payoutAmount, setPayoutAmount] = useState("")
  const [payoutDetail, setPayoutDetails] = useState("")
  const [clientId, setClientId] = useState("")
  const [clients, setClients] = useState([])
  const [payouts, setPayouts] = useState([])
  const [payoutDate, setPayoutDate] = useState("")

  useEffect(() => {

    const retreiveClients = async () => {

      try {
        
        const response = await axios.get(import.meta.env.VITE_API+"/api/v1/admin/users")
        const data = await response.data.users

        setClients(data)

      } catch (err) {
        console.log(err.message)
      }

    }


    const retreivePayouts = async () => {

      try {
        
        const response = await axios.get(import.meta.env.VITE_API+"/api/v1/client/payouts",{
          headers: {
            "limit": 5
          }
        })
        const data = await response.data.payoutData

        setPayouts(data)

      } catch (error) {
        console.log(error.message)
      }

    }

    retreiveClients()
    retreivePayouts()

  }, [])

  const updatePayoutStatus = async (id) => {

    try {

      await axios.post(import.meta.env.VITE_API+`/api/v1/admin/payouts/update/${id}`, {
        status: true
      })

    } catch (err) {
      console.log(err.message)
    }

  }

  const clickConfirm = async (id) => {

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirm it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Approved!',
          'The Payout has been approved successfully.',
          'success'
        )

        try {
          
          updatePayoutStatus(id)

        } catch (error) {
          console.log(error.message)
        }

      }
    })

  }

  const handleSubmitButton = (message, promise) => {
    toast.promise(promise,{
      success: message,
      error: "an erro has been occured",
      loading: "request processing"
    })
  }

  const addNewPayout = async () => {

    try {

      await axios.post(import.meta.env.VITE_API+"/api/v1/client/payouts", {
        payoutDetail: payoutDetail,
        payoutValue: payoutAmount,
        payoutDate: payoutDate,
        clientId: clientId
      })

      setPayoutAmount("")
      setPayoutDetails("")
      clientId("")

      setTimeout(() => {
        setOpen(false)
      }, 1000)

    } catch (err) {
      console.log(err.message)
    }

  }

  return (
    <Layout>
      
      <div className="payouts flex flex-col bg-white rounded-lg p-5 gap-4">

        <h1 className='capitalize font-bold text-2xl'>payouts</h1>

        <Toaster
          position="bottom-right"
          reverseOrder={false}
        />

        <table>
          <thead>
              <tr>
                  <th> Client</th>
                  <th> Details</th>
                  <th> VALUE </th>
                  <th> DATE </th>
                  <th>Status</th>
                  <th>Action</th>
              </tr>
          </thead>
          <tbody>

          {

            payouts.map(({payout_detail, payout_value, payout_date, payout_status, user, id}, key) => (
              <tr key={key}>
                <td>{user.username}</td>
                <td>{payout_detail}</td>
                <td>{payout_value}</td>
                <td>{payout_date.split(" ")[0]}</td>
                <td>{payout_status ? "approved" : "pending ..."}</td>
                <td><button onClick={(e) => clickConfirm(e.target.id)} id={id} className={payout_status == false ? `bg-green-500 rounded-lg p-2 text-white` : ``}>{ payout_status == false ? `confirm` : `` }</button></td>
              </tr>
            ))

          }

          </tbody>
        </table>

        <Link className='text-blue-500 underline' onClick={() => setOpen(true)}>Add More</Link>

        <Modal open={open} onClose={() => setOpen(false)}>

          <div className="add-payout flex flex-col gap-3">

            <h1 className='font-bold text-2xl text-center'>Add New Payout</h1>

            <div className="payout-client flex flex-col gap-2">
              <label htmlFor="client">Client</label>
              <select name="client" onChange={(e) => setClientId(e.target.value)} className='bg-gray-200 rounded-lg p-3' id="">
                <option value="choose a client">choose a client</option>
                {
                  clients.map(({username, id}, key) => (
                    <option key={key} value={id}>{username}</option>
                  ))
                }
              </select>
            </div>

            <div className="payout-details flex flex-col gap-2">
              <label htmlFor="detail">Details</label>
              <select onChange={(e) => setPayoutDetails(e.target.value)} name="detail" id="" className='p-3 rounded-lg'>
                <option value="choose a pack">choose a pack</option>
                <option value="Basic">Basic</option>
                <option value="full">Full</option>
              </select>
            </div>

            <div className="payout-date flex flex-col gap-2">
              <label htmlFor="date">Date</label>
              <input type="date" name="Date" onChange={(e) => setPayoutDate(e.target.value)} className='bg-gray-200 rounded-lg p-3 outline-none' />
            </div>

            <div className="payout-value flex flex-col gap-2">
              <label htmlFor="value">Value</label>
              <input value={payoutAmount} onChange={(e) => setPayoutAmount(e.target.value)} type="text" name="value" className='bg-gray-200 rounded-lg p-2 text-black outline-none' />
            </div>

            <button onClick={() => handleSubmitButton("payout added successfully", addNewPayout())} type='button' className='p-2 px-4 bg-violet-600 hover:bg-violet-500 duration-200 text-white rounded-lg'>submit</button>

          </div>

        </Modal>


      </div>


    </Layout>
  )
}

export default AdminPayout