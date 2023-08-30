import { useState, useEffect } from 'react'
import Layout from '../../components/Admin/Layout'
import axios from 'axios'
import Profile from "../../../public/user.png"
import { Link } from 'react-router-dom'
import toast, { Toaster } from "react-hot-toast"

const AdminReports = () => {

    const [reports, setReports] = useState([])

    useEffect(() => {

        const retreiveReports = async () => {

            try {
                
                const { data } = await axios.get(import.meta.env.VITE_API+"/api/v1/admin/reports")
                setReports(data.reports)

            } catch (error) {
                console.log(error.message)
            }

        }

        retreiveReports()

    }, [])

    const deleteSingleReport = async (e) => {

        let id = e.target.id

        try {
            
            await axios.delete(import.meta.env.VITE_API+"/api/v1/admin/reports",{
                headers: {
                    reportId: id
                }
            })

            toast.success("report has been deleted")

        } catch (err) {
            console.log(err.message)
        }

    }

  return (
    <Layout>

        <div className="files flex gap-12 flex-wrap">
        {
            reports.map(({report_name, report_file, user, id}, key) => (
                <div key={key} className="stat-card p-2 shadow-xl h-72 w-64 rounded-lg bg-white">
                    <div className="card-border border border-gray-200 h-full w-full flex flex-col items-center justify-between">
                        <div className="img-card-container p-8 px-16 bg-gray-300 w-full flex justify-center">
                            <img src="/logo.png" alt="" className='w-16 bg-contain' />
                        </div>
                        <div className="user-details flex items-center gap-4">
                            <img src={Profile} className='w-10' alt="" />
                            <p>{user.username}</p>
                        </div>
                        <p className='capitalize text-center'>{report_name}</p>
                        <div className="buttons-container flex items-center gap-4">
                            <Link to={import.meta.env.VITE_API + `${report_file}`} target='_blank' className='bg-[#5DC291] text-white p-5 py-2 rounded-md mb-5'>open</Link>
                            <button id={id} onClick={deleteSingleReport} type="submit" className='bg-red-500 text-white p-5 py-2 rounded-md mb-5'>Delete</button>
                        </div>
                    </div>
                </div>
            ))
        }

        </div>

        <Toaster
            position="bottom-right"
            reverseOrder={false}
        />

    </Layout>
  )
}

export default AdminReports