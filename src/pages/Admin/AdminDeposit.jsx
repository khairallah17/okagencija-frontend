import { useEffect, useState } from 'react'
import Layout from '../../components/Admin/Layout'
import Modal from '../../components/Modal'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'
import Swal from 'sweetalert2'

const AdminDeposit = () => {
  
  const [open, setOpen] = useState(false)
  const [addNewPackage, setNewPackage] = useState(false)
  const [deposits, setDeposits] = useState([])
  const [depositPackages, setDepositPackages] = useState([])
  const [clients, setClient] = useState([])

  // UPDATE DEPOSIT PACKAGE
  const [updateName, setUpdateName] = useState("")
  const [updateValue, setUpdateValue] = useState(0)
  const [updatePackage, setUpdatePackage] = useState(false)
  const [packageId, setPackageId] = useState(0)

  // CREATE NEW DEPOSIT FIELDS
  const [newDepositName, setNewDepositName] = useState("")
  const [newDepositValue, setNewDepositValue] = useState("")

  // NEW CLIENT DEPOSIT
  const [depositClient, setDepositClient] = useState("")
  const [depositPack, setDepositPack] = useState("")
  const [depositAmount, setDepositAmount] = useState("")
  const [depositDate, setDepostDate] = useState("")


  const handleSubmitButton = (message, promise) => {
    toast.promise(promise,{
      success: message,
      error: "an erro has been occured",
      loading: "request processing"
    })
  }

  const updateDepositStatus = async (id) => {

    try {

      await axios.post(import.meta.env.VITE_API+`/api/v1/admin/deposits/update/${id}`)

    } catch (err) {
      console.log(err.message)
    }

  }

  const openPackageUpdate = (e) => {


    let depPack = depositPackages.find(obj => obj.id == e.target.id)

    setPackageId(e.target.id)

    setUpdateName(depPack.deposit_name)
    setUpdateValue(depPack.deposit_value)

    setUpdatePackage(true)


  }

  const addNewClientDeposit = async () => {

    try {
    
      await axios.post(import.meta.env.VITE_API+"/api/v1/client/deposits", {
        depositName: depositPack,
        depositAmount: depositAmount,
        clientId: depositClient,
        depositDate: depositDate
      })

      setDepositPack("")
      setDepositAmount("")
      setDepositClient("")

      setTimeout(() => {
        setOpen(false)
      }, 1000)

    } catch (err) {
      console.log(err.message)
    }

  }

  const handleUpdateClick = async (id) => {

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
          'The Deposit has been approved successfully.',
          'success'
        )

        try {
          
          updateDepositStatus(id)

        } catch (error) {
          console.log(error.message)
        }

      }
    })
  }

  const createNewDepositPackage = async () => {

    try {

      await axios.post(import.meta.env.VITE_API+"/api/v1/admin/deposits/packages", {
        name: newDepositName,
        value: newDepositValue
      })

      setNewDepositName("")
      setNewDepositValue("")

      setTimeout(() => {
        setNewPackage(false)
      }, 1000)

    } catch (err) {
      console.log(err.message)
    }

  }

  const deletePackage = async (e) => {
    
    const id = e.target.id
    
    try {

      await axios.delete(import.meta.env.VITE_API+"/api/v1/admin/deposits/packages",{
        headers: {
          id: id
        }
      })

    } catch (err) {
      console.log(err.message)
    }
    
  }

  const updateDepositPackage = async (e) => {

    try {

      await axios.post(`${import.meta.env.VITE_API}/api/v1/admin/deposits/packages/${packageId}`, {
        packageName: updateName,
        packageValue: updateValue
      })

      setUpdateName('')
      setUpdateValue("")

      setTimeout(() => {
        setUpdatePackage(false)
      }, 1000)

    } catch (err) {
      console.log(err.message)
    }

  }

  const deleteDepositById = async (e) => {

    let id = e.target.id

    try {
      
      await axios.delete(`${import.meta.env.VITE_API}/api/v1/admin/deposit/${id}`)

    } catch(err) {
      console.log(err.message)
    }

  }


  useEffect(() => {

    const retreiveDeposits = async () => {

      try {
        
        const response = await axios.get(import.meta.env.VITE_API+"/api/v1/admin/deposits")
        const data = await response.data.depositData

        setDeposits(data)

      } catch (error) {
        console.log(error.message)
      }

    }

    const retreiveDepositPackages = async () => {

      try {
        
        const response = await axios.get(import.meta.env.VITE_API+"/api/v1/admin/deposits/packages")
        const data = await response.data.packages

        setDepositPackages(data)

      } catch (err) {
        console.log(err.message)
      }

    }

    const retreiveClients = async () => {

      try {

        const { data } = await axios.get(import.meta.env.VITE_API+"/api/v1/admin/users")

        setClient(data.users)

      } catch (err) {
        console.log(err.message)
      }

    }

    retreiveDeposits()
    retreiveClients()
    retreiveDepositPackages()

  },[])

  return (
    <Layout>
      
      <div className="payouts flex flex-col p-5 gap-10">

        <div className="deposits-packages bg-white rounded-lg p-5 flex flex-col w-full gap-3">
        <h1 className='capitalize font-bold text-2xl'>Deposit packages</h1>

          <Toaster
            position="bottom-right"
            reverseOrder={false}
          />

          <table>
            <thead>
                <tr>
                    <th> Name</th>
                    <th> VALUE </th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>

            {
              depositPackages.map(({deposit_name, deposit_value, id}, key) => (
                  <tr key={key}>
                    <td>{deposit_name}</td>
                    <td>{deposit_value}</td>
                    <td>
                      <button id={id} onClick={(e) => deletePackage(e)} className='bg-red-500 text-white  p-2 rounded-lg mr-5'>delete</button>
                      <button id={id} onClick={(e) => openPackageUpdate(e)} className='bg-yellow-500 text-white p-2 rounded-lg'>update</button>
                    </td>
                  </tr>
                )
              )
            }

            </tbody>
          </table>

          <Link className='text-blue-500 underline' onClick={() => setNewPackage(true)}>Add More</Link>

          <Modal open={addNewPackage} onClose={() => setNewPackage(false)}>

            <div className="add-payout flex flex-col gap-3">

              <h1 className='font-bold text-2xl text-center'>Add New Deposit Package</h1>


              <div className="payout-details flex flex-col gap-2">
                <label htmlFor="detail">Name</label>
                <input type="text" name="deposit name" value={newDepositName} onChange={(e) => setNewDepositName(e.target.value)} className='bg-gray-200 rounded-lg p-2 text-black outline-none'/>
              </div>

              <div className="payout-value flex flex-col gap-2">
                <label htmlFor="value">Value</label>
                <input type="text" name="value" value={newDepositValue} onChange={(e) => setNewDepositValue(e.target.value)} className='bg-gray-200 rounded-lg p-2 text-black outline-none' />
              </div>

              <button type='button' onClick={createNewDepositPackage} className='p-2 px-4 bg-violet-600 hover:bg-violet-500 duration-200 text-white rounded-lg'>submit</button>

            </div>

          </Modal>

          <Modal open={updatePackage} onClose={() => setUpdatePackage(false)}>

            <div className="add-payout flex flex-col gap-3">

              <h1 className='font-bold text-2xl text-center'>Update Deposit Package</h1>


              <div className="payout-details flex flex-col gap-2">
                <label htmlFor="deposit package name">Name</label>
                <input type="text" name="deposit package name" value={updateName} onChange={(e) => setUpdateName(e.target.value)} className='bg-gray-200 rounded-lg p-2 text-black outline-none'/>
              </div>

              <div className="payout-value flex flex-col gap-2">
                <label htmlFor="value">Value</label>
                <input type="text" name="value" value={updateValue} onChange={(e) => setUpdateValue(e.target.value)} className='bg-gray-200 rounded-lg p-2 text-black outline-none' />
              </div>

              <button type='button' onClick={e => handleSubmitButton("package updated successfully", updateDepositPackage(e))} className='p-2 px-4 bg-violet-600 hover:bg-violet-500 duration-200 text-white rounded-lg'>submit</button>

            </div>

          </Modal>
        </div>

        <div className="clients-deposits flex flex-col w-full gap-3 bg-white rounded-lg p-5">
          <h1 className='capitalize font-bold text-2xl'>clients Deposits</h1>

          <table>
            <thead>
                <tr>
                    <th> Client</th>
                    <th> Details</th>
                    <th> VALUE </th>
                    <th> DATE </th>
                    <th> Status </th>
                    <th> Action </th>
                </tr>
            </thead>
            <tbody>

            {
              deposits.map(({deposit_amount, deposit_date, deposit_name, user, deposit_status, id}, key) => (
                  <tr key={key}>
                    <td>{user.username}</td>
                    <td>{deposit_name}</td>
                    <td>{deposit_amount}</td>
                    <td>{deposit_date.split(" ")[0]}</td>
                    <td>{ deposit_status ? "approved" : "pending" }</td>
                    <td className='w-full flex gap-2'> 
                      <button onClick={(e) => handleUpdateClick(e.target.id)} id={id} className={`${ deposit_status ? "" : "bg-green-500 p-2 rounded-lg hover:bg-green-600 duration-300 text-white" }`} > { deposit_status ? "" : "approve" } </button>
                      <button onClick={(e) => handleSubmitButton("deposit deleted successfully",deleteDepositById(e))} id={id} className={"bg-red-500 hover:bg-red-600 duration-300 p-2 rounded-lg text-white"} > Delete </button>
                    </td>
                  </tr>
                )
              )
            }

            </tbody>
          </table>

          <Link className='text-blue-500 underline' onClick={() => setOpen(true)}>Add More</Link>

          <Modal open={open} onClose={() => setOpen(false)}>

            <div className="add-payout flex flex-col gap-3">

              <h1 className='font-bold text-2xl text-center'>Add New Deposit</h1>


              <div className="deposit-details flex flex-col gap-2">
                <label htmlFor="user">User</label>
                <select name="user" id="" onChange={(e) => setDepositClient(e.target.value)} className='bg-gray-200 rounded-lg p-2 text-black outline-none'>
                  <option value="">no user selected</option>
                  {
                    clients.map(({username, id}, key) => (
                      <option key={key} value={id}>{username}</option>
                    ))
                  }
                </select>
              </div>

              <div className="deposit-value flex flex-col gap-2">
                <label htmlFor="Package">Package</label>
                <select name="package" id="" onChange={(e) => setDepositPack(e.target.value)} className='bg-gray-200 rounded-lg p-2 text-black outline-none'>
                  <option value="no package selected">no package selected</option>
                  {
                    depositPackages.map(({deposit_name}, key) => (
                      <option key={key} value={deposit_name}>{deposit_name}</option>
                    ))
                  }
                </select>
              </div>

              <div className="deposit-value flex flex-col gap-2">
                <label htmlFor="Value">Value</label>
                <input type="text" name="value" id="" value={depositAmount} onChange={(e) => setDepositAmount(e.target.value)} className='bg-gray-200 rounded-lg p-2 text-black outline-none' />
              </div>

              <div className="deposit-date flex flex-col gap-2">
                <label htmlFor="Date">date</label>
                <input type="date" name="Date" value={depositDate} onChange={(e) => setDepostDate(e.target.value)} className='bg-gray-200 rounded-lg p-2 text-black outline-none' />
              </div>

              <button type='button' onClick={() => handleSubmitButton("deposit added successfully", addNewClientDeposit())} className='p-2 px-4 bg-violet-600 hover:bg-violet-500 duration-200 text-white rounded-lg'>submit</button>

            </div>

          </Modal>
        </div>


      </div>


    </Layout>
  )
}

export default AdminDeposit