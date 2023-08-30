import { useState, useEffect } from 'react'
import Layout from '../../components/Admin/Layout'
import Modal from '../../components/Modal'
import toast, { Toaster } from "react-hot-toast"
import axios from 'axios'
import { Link } from 'react-router-dom'

const AdminUploadFiles = () => {

    const [openUploadFile, setOpenUploadFile] = useState(false)
    const [fileType, setFileType] = useState("legal")
    const [file, setFile] = useState("")
    const [uploadedFiles, setUploadedFiles] = useState([])

    useEffect(() => {

        const retreiveUploadedFiles = async () => {

            try {

                const { data } = await axios.get(import.meta.env.VITE_API+"/api/v1/admin/files/all")
                setUploadedFiles(data.files)

            } catch (err) {
                console.log(err.message)
            }

        }

        retreiveUploadedFiles()

    }, [])

    const uploadFile = async () => {

        try {

            const formData = new FormData()
            formData.set("toolsFile", file)
            formData.set("fileType", fileType)

            await axios.post(`${import.meta.env.VITE_API}/api/v1/admin/files`, formData)
            toast.success(`${fileType} file uploaded successfully`) 

        } catch (err) {
            console.log(err.message)
        }
    }

  return (
    <Layout>

        <div className="add-files flex w-full bg-white p-5 rounded-md justify-between items-center">
            <h1 className='font-bold text-lg' >File Upload</h1>
            <button onClick={() => setOpenUploadFile(true)} type='submit' className="bg-violet-600 duration-200 hover:bg-violet-500 text-white p-2 px-4 rounded-lg" >add File</button>
        </div>

        <div className="files flex gap-12 flex-wrap mt-5">
        {
            uploadedFiles.map(({file, type, id}, key) => (
                <div key={key} className="stat-card p-2 shadow-xl h-72 w-64 rounded-lg bg-white">
                    <div className="card-border border border-gray-200 h-full w-full flex flex-col items-center justify-between">
                        <div className="img-card-container p-8 px-16 bg-gray-300 w-full flex justify-center">
                            <img src="/logo.png" alt="" className='w-16 bg-contain' />
                        </div>
                        <p className='capitalize text-center'>{type}</p>
                        <Link to={import.meta.env.VITE_API + `${file}`} target='_blank' className='bg-[#5DC291] text-white p-5 py-2 rounded-md mb-5'>open</Link>
                    </div>
                </div>
            ))
        }

        </div>

        <Modal open={openUploadFile} onClose={() => setOpenUploadFile(false)} >
            <h1 className='text-center font-bold text-lg mb-3'>Upload File</h1>

            <div className="file-type flex flex-col gap-2 mb-2">
                <label htmlFor="file type">File type</label>
                <select onChange={(e) => setFileType(e.target.value)} name="file type" id="" className='outline-none bg-gray-200 p-2 rounded-lg'>
                    <option value="legal">Legal</option>
                    <option value="Faqs">Faqs</option>
                </select>
            </div>

            <div className="file flex flex-col gap-2">
                <label htmlFor="file">File</label>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} name="file" accept='application/pdf' className='outline-none bg-gray-200 p-2 rounded-lg' />
            </div>

            <button type="submit" onClick={uploadFile} className="bg-violet-600 w-full mt-4 duration-200 hover:bg-violet-500 text-white p-2 px-4 rounded-lg" >Submit</button>

        </Modal>

        <Toaster
            position="bottom-right"
            reverseOrder={false}
        />

    </Layout>
  )
}

export default AdminUploadFiles