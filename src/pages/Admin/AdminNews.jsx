import { useEffect, useState } from 'react'
import Layout from '../../components/Admin/Layout'
import axios from 'axios'
import Modal from '../../components/Modal'
import toast, { Toaster } from 'react-hot-toast'

const AdminNews = () => {

    const [news, setNews] = useState([])
    const [addNewsOpen, setAddNewsOpen] = useState(false)
    const [newsTitle, setNewsTitle] = useState("")
    const [newsContent, setNewsContent] = useState("")
    const [newsImage, setNewsImage] = useState("")

    useEffect(() => {

        const retreiveNews = async () => {
            try {

                const { data } = await axios.get(import.meta.env.VITE_API+"/api/v1/admin/news")

                setNews(data.news)

            } catch (err) {
                console.log(err.message)
            }
        }

        retreiveNews()

    }, [])

    const handleClickSubmit = (string, myPromise) => {
        toast.promise(myPromise, {
          loading: 'request processing',
          success: string,
          error: 'An error has been occured',
        });
    }
    
    const addNews = async () => {

        if (!newsTitle || !newsContent)
            return toast.error("empty fields are required")

        const formData = new FormData()
        formData.append('title', newsTitle)
        formData.append('content', newsContent)
        formData.append('newsImage', newsImage)

        try {
            await axios.post(import.meta.env.VITE_API+"/api/v1/admin/news", formData)
            setAddNewsOpen(false)

        } catch (error) {
            console.log(error.message)
        }

    }

    const deleteSingleNews = async (e) => {

        let id = e.target.id

        try { 

            await axios.delete(import.meta.env.VITE_API+"/api/v1/admin/news", {
                headers: {
                    newsId: id
                }
            })

        } catch (err) {
            console.log(err.message)
        }

    }

  return (
    <Layout>

        <div className="add-news-container flex items-center justify-between bg-white rounded-lg p-5 mb-5">

            <h1 className='font-bold text-xl'>Available News</h1>
            <button onClick={() => setAddNewsOpen(true)}  className="bg-violet-600 duration-200 hover:bg-violet-500 text-white p-2 px-4 rounded-lg" >add news</button>


        </div>

        <div className="news-cards-container flex flex-wrap gap-12">

            {
                news.map(({title, content, image, id}, key) => (
                    <div key={key} className="overflow-y-scroll news-card bg-white rounded-lg max-w-64 max-h-96 min-w-64 min-h-max-h-96 h-96 w-64 overflow-clip">
                        <img src={import.meta.env.VITE_API+image} className='w-64' alt="" />
                        <div className="content p-4">
                            <h1 className='font-bold text-xl'>{title}</h1>
                            <p>{content}</p>    
                            <button onClick={(e) => handleClickSubmit("news deleted successfully", deleteSingleNews(e))} id={id} type='submit' className='w-full bg-red-500 hover:bg-red-600 duration-200 text-white p-2 mt-2 rounded-lg'>delete</button>
                        </div>
                    </div>
                ))
            }

        </div>

        <Modal open={addNewsOpen} onClose={() => setAddNewsOpen(false)} >
            
            <div className="add-news-container flex flex-col gap-2">
                <h1 className='font-bold text-xl text-center mb-2'>Add News</h1>

                <div className="news-title-input flex flex-col gap-2">
                    <label htmlFor="news title">News Title</label>
                    <input onChange={(e) => setNewsTitle(e.target.value)} type="text" name="news title" id="" className='outline-none bg-gray-200 p-2 rounded-lg' />
                </div>

                <div className="news-content-input flex flex-col gap-2">
                    <label htmlFor="news content">News Content</label>
                    <textarea onChange={(e) => setNewsContent(e.target.value)} name="news content" id="" className='outline-none bg-gray-200 p-2 rounded-lg' />
                </div>

                <div className="news-image flex flex-col gap-2">
                    <label htmlFor="news image">News Image</label>
                    <input type="file" name="news image" onChange={(e) => setNewsImage(e.target.files[0])} accept="image/png, image/gif, image/jpeg" id="" className='outline-none bg-gray-200 p-2 rounded-lg' />
                </div>

                <button onClick={() => handleClickSubmit("news added successfully", addNews())} type="submit" className="bg-violet-600 duration-200 hover:bg-violet-500 text-white p-2 px-4 rounded-lg mt-2">Submit</button>

            </div>

        </Modal>

        <Toaster
            position="bottom-right"
            reverseOrder={false}
        />

    </Layout>
  )
}

export default AdminNews