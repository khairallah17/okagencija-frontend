import { useState, useEffect } from 'react'
import Layout from '../../components/Admin/Layout'
import useAdminContext from '../../Hooks/useAdminContext'
import Profile from "../../../public/user.png"
import { AiOutlineEye } from "react-icons/ai"
import Modal from '../../components/Modal'
import toast, { Toaster } from 'react-hot-toast'
import axios from 'axios'

const AdminClients = () => {

    const [clients, setClients] = useState([])
    const [newClient, setNewClient] = useState(false)
    const [updateClient, setUpdateClient] = useState(false)

    const [clientUserName, setClientUserName] = useState("")
    const [clientEmail, setClientEmail] = useState("")
    const [clientPassword, setClientPassword] = useState("")
    const [clientId, setClientId] = useState("")
    const [revenueShare, setRevenueShare] = useState("")
    const [comission, setComission] = useState("")

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
      
          retreiveClients()

    }, [])

    const openUpdateClientModal = (e) => {
        let id = e.target.id
        setClientId(id)
        setUpdateClient(true)
        let clt = clients.find(obj => obj.id == id)
        setClientEmail(clt.email)
        setClientPassword(clt.clientPassword)
        setClientUserName(clt.username)
        setComission(clt.comission_earned)
        setRevenueShare(clt.revenue_share || 0)
    }

    const updateClientInfo = async () => {

        if (!clientId || !clientEmail || !clientPassword || !clientUserName)
            return toast.error('empty fields are required')

        try {
            
            await axios.patch(import.meta.env.VITE_API+"/api/v1/admin/users",{
                id: clientId,
                username: clientUserName,
                email: clientEmail,
                password: clientPassword
            })

            toast.success("user info updated successfully")

            setClientEmail("")
            setClientId("")
            setClientPassword("")
            setClientUserName("")

            return setTimeout(() => {
                setUpdateClient(false)
            }, 1000)

        } catch (error) {
            console.log(error.message)
        }

    }

    const addNewClient = async () => {

        if(!clientEmail||!clientPassword||!clientUserName)
            return toast.error("empty fields are required")

        try {

            await axios.post(import.meta.env.VITE_API+"/api/v1/admin/users", {
                email: clientEmail,
                username: clientUserName,
                password: clientPassword,
                comission: comission,
                revenueShare: revenueShare
            })

            toast.success("user added successfully")

            setClientEmail("")
            setClientPassword("")
            setClientUserName("")
            setComission("")
            setRevenueShare("")

            return setTimeout(() => {
                setNewClient(false)
            }, 1000)

        } catch (err) {
            console.log(err.message)
        }

    }

    const deleteSingleClient = async () => {

        console.log(clientId)

        try {

            await axios.delete(import.meta.env.VITE_API+"/api/v1/admin/users", {
                headers: {
                    clientId: clientId
                }
            })

            toast.success("user has been delted successfully")

            setClientEmail("")
            setClientPassword("")
            setClientUserName("")
            setComission("")
            setRevenueShare("")

            return setTimeout(() => {
                setNewClient(false)
            }, 1000)

        } catch (err) {
            console.log(err.message)
        }

    }

    return (
        <Layout>

            <div className="add-news-container flex items-center justify-between bg-white rounded-lg p-5 mb-5">

                <h1 className='font-bold text-xl'>Available Clients</h1>
                <button onClick={() => setNewClient(true)}  className="bg-violet-600 duration-200 hover:bg-violet-500 text-white p-2 px-4 rounded-lg" >Add Client</button>


            </div>

            <div className="clients-card-container flex flex-wrap gap-12 bg-white p-5 rounded-lg">

                {
                    clients.map(({id, username}) => 
                        <div onClick={(e) => openUpdateClientModal(e)} className="client-cardrounded-lg h-full flex items-center justify-between gap-4 cursor-pointer" id={id} key={id}>
                            <img id={id}  src={Profile} alt="" className='w-10' />
                            <p id={id} >{username}</p>
                            <AiOutlineEye id={id}  className='text-black text-2xl'/>    
                        </div>
                    )
                }

            </div>

            <Modal open={updateClient} onClose={() => setUpdateClient(false)} >
                
                <div className="flex flex-col gap-2">

                    <h1 className="font-bold text-xl mt-2">Edit Client Info</h1>

                    <div className="client-name-input flex flex-col gap-2">
                        <label htmlFor="username">Username</label>
                        <input value={clientUserName} onChange={(e) => setClientUserName(e.target.value)} type="text" name="username" id="" className='outline-none bg-gray-200 p-2 rounded-lg' />
                    </div>

                    <div className="client-email-input flex flex-col gap-2">
                        <label htmlFor="email">Email Address</label>
                        <input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} type="email" name="email" id="" className='outline-none bg-gray-200 p-2 rounded-lg' />
                    </div>

                    <div className="client-password-input flex flex-col gap-2">
                        <label htmlFor="password">password</label>
                        <input type="text" name="password" value={clientPassword} onChange={(e) => setClientPassword(e.target.value)} id="" className='outline-none bg-gray-200 p-2 rounded-lg' />
                    </div>

                    <div className="client-comission flex flex-col gap-2">
                        <label htmlFor="comission">Client comission</label>
                        <input value={comission} onChange={(e) => setComission(e.target.value)} type="text" name="comission" className='outline-none bg-gray-200 p-2 rounded-lg' />
                    </div>

                    <div className="client-revenue-share flex flex-col gap-2">
                        <label htmlFor="revenue share">Client Revenue Share</label>
                        <input value={revenueShare} onChange={(e) => setRevenueShare(e.target.value)} type="text" name="revenue share" className='outline-none bg-gray-200 p-2 rounded-lg' />
                    </div>

                    <button onClick={updateClientInfo} type='submit' className="bg-violet-600 duration-200 hover:bg-violet-500 text-white p-2 px-4 rounded-lg mt-2" >Submit</button>

                    <button onClick={deleteSingleClient} type='submit' className="bg-red-600 duration-200 hover:bg-red-500 text-white p-2 px-4 rounded-lg mt-2" >Delete Client</button>

                </div>

            </Modal>

            <Modal open={newClient} onClose={() => setNewClient(false)} >
                
                <div className="flex flex-col gap-2">

                    <h1 className="font-bold text-xl mt-2 text-center">Add New Client</h1>

                    <div className="client-name-input flex flex-col gap-2">
                        <label htmlFor="username">Username</label>
                        <input value={clientUserName} onChange={(e) => setClientUserName(e.target.value)} type="text" name="username" id="" className='outline-none bg-gray-200 p-2 rounded-lg' />
                    </div>

                    <div className="client-email-input flex flex-col gap-2">
                        <label htmlFor="email">Email Address</label>
                        <input value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} type="email" name="email" id="" className='outline-none bg-gray-200 p-2 rounded-lg' />
                    </div>

                    <div className="client-password-input flex flex-col gap-2">
                        <label htmlFor="password">password</label>
                        <input type="text" name="password" value={clientPassword} onChange={(e) => setClientPassword(e.target.value)} id="" className='outline-none bg-gray-200 p-2 rounded-lg' />
                    </div>

                    <div className="client-comission flex flex-col gap-2">
                        <label htmlFor="comission">Client comission</label>
                        <input value={comission} onChange={(e) => setComission(e.target.value)} type="text" name="comission" className='outline-none bg-gray-200 p-2 rounded-lg' />
                    </div>

                    <div className="client-revenue-share flex flex-col gap-2">
                        <label htmlFor="revenue share">Client Revenue Share</label>
                        <input value={revenueShare} onChange={(e) => setRevenueShare(e.target.value)} type="text" name="revenue share" className='outline-none bg-gray-200 p-2 rounded-lg' />
                    </div>

                    <button onClick={addNewClient} type='submit' className="bg-violet-600 duration-200 hover:bg-violet-500 text-white p-2 px-4 rounded-lg mt-2" >Submit</button>

                </div>

            </Modal>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />


        </Layout>
    )
}

export default AdminClients