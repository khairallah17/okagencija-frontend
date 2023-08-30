import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import useUserContext from '../Hooks/useUserContext'
import jwtDecode from 'jwt-decode'
import toast, { Toaster } from "react-hot-toast"
import Modal from "../components/Modal"

const Referrals = () => {

    const [filter, setFilter] = useState("")
    const [refferals, setRefferals] = useState([])
    const [clientId, setClientId] = useState(jwtDecode(localStorage.getItem("token")).clientId)
    const [sponsorFullname, setSponsorFullname] = useState("")
    const [sponsorUsername, setSponsorUsername] = useState("")
    const [openUpdateModal, setOpenUpdateModal] = useState(false)
    const [refferalId, setRefferalId] = useState("")

    useEffect(() => {

        const retreiveRefferals = async () => {
            
            try {

                console.log(clientId)
                
                const response = await axios.get(import.meta.env.VITE_API+`/api/v1/client/refferals?clientid=${clientId}`)
                const data = await response.data.refferals
                
                setRefferals(data)

            } catch (error) {
                console.log(error.message)
            }

        }

        retreiveRefferals()

    }, [])

    const getRefferalIdThenOpenModal = (e) => {
        let id = e.target.id

        let refferal = refferals.find(obj => obj.id == id)
        let fullname = refferal.sponsor_fullname
        let username = refferal.sponsor_username

        setSponsorFullname(fullname)
        setSponsorUsername(username)

        setRefferalId(id)
        setOpenUpdateModal(true)
    }

    const deleteSingleRefferal = async (e) => {
        
        try {

            await axios.delete(import.meta.env.VITE_API+"/api/v1/client/refferals",{
                headers: {
                    refferalId: e.target.id
                }
            })

            return toast.success("reffereal deleted Successfully")

        } catch (err) {
            console.log(err.message)
        }

    }

    const updateSingleRefferal = async () => {

        try {

            await axios.patch(import.meta.env.VITE_API+"/api/v1/client/refferals",{
                refferalId: refferalId,
                sponsorFullname: sponsorFullname,
                sponsorUsername: sponsorUsername
            })

            toast.success("sponsor info updated successfully")

            setSponsorFullname("")
            setSponsorUsername("")

            setTimeout(() => {
                setOpenUpdateModal(false)
            }, 1000)

        } catch (err) {
            console.log(err.message)
        }

    }

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
                            <tr className='border-b-[1px] border-gray-300'>
                                <th className='bg-white text-black border-none w-fit font-normal'>Sponsor fullname</th>
                                <th className='bg-white text-black border-none w-fit font-normal'>Sponsor username</th>
                                <th className='bg-white text-black border-none w-fit font-normal'>Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                refferals.map(({sponsor_username, sponsor_fullname, id}, key) => (
                                    <tr key={key} className='border-b-[1px] border-gray-300'>
                                        <td>{sponsor_fullname}</td>
                                        <td>{sponsor_username}</td>
                                        <td>
                                            <button onClick={deleteSingleRefferal} id={id} className='mr-4 bg-red-600 text-white p-2 rounded-lg duration-200 hover:bg-red-700'>delete</button>
                                            <button onClick={getRefferalIdThenOpenModal} id={id} className=' bg-yellow-400 p-2 rounded-lg duration-200 hover:bg-yellow-500'>update</button>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>

            </div>

            <Toaster
                position="bottom-right"
                reverseOrder={false}
            />

            <Modal open={openUpdateModal} onClose={() => setOpenUpdateModal(false)} >
                
                <div className="update-refferal-info flex flex-col gap-2">
                    <h1 className="font-bold text-center text-lg">
                        Update Sponsor Info
                    </h1>

                    <div className="sponsor-username-input flex flex-col gap-2">
                        <label htmlFor="sponsor username">sponsor username</label>
                        <input value={sponsorFullname} onChange={(e) => setSponsorFullname(e.target.value)} type="text" name="sponsor username" id="" className='outline-none bg-gray-200 p-2 rounded-lg'/>
                    </div>

                    <div className="sponsor-username-input flex flex-col gap-2">
                        <label htmlFor="sponsor username">sponsor username</label>
                        <input value={sponsorUsername} onChange={(e) => setSponsorUsername(e.target.value)} type="text" name="sponsor username" id="" className='outline-none bg-gray-200 p-2 rounded-lg'/>
                    </div>


                    <button onClick={updateSingleRefferal} type="submit" className="bg-violet-600 duration-200 hover:bg-violet-500 text-white p-2 px-4 rounded-lg mt-2">Submit</button>

                </div>

            </Modal>

        </Layout>
    )
}

export default Referrals