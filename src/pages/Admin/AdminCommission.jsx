import React, { useState } from 'react'
import Layout from '../../components/Admin/Layout'
import Modal from '../../components/Modal'
import {
    BanknotesIcon,
    WalletIcon
  } from "@heroicons/react/24/outline"
  import toast, { Toaster } from 'react-hot-toast'

const AdminCommission = () => {

    const [show, setShow] = useState(false)
    const [title, setTitle] = useState("")
    const [commission, setCommission] = useState("")

    const cards = [{ icon: <BanknotesIcon className="h-6 w-6 text-black" />, text: "commission earned", class: "bg-[#58C2D8]", textColor: "text-[#58C2D8]", shadow:"shadow-[#58C2D8]" },
               { icon: <WalletIcon className="h-6 w-6 text-black" />, text: "sales manager", class: "bg-[#DA3134]", textColor: "text-[#DA3134]", shadow:"shadow-[#DA3134]" }]

    const handleModalClick = (e) => {

        setShow(true)

        setTitle(e.target.childNodes[1].innerText)

        setCommission(e.target.childNodes[2].innerText)

    }

    const handleSubmitButton = () => {
        toast.success("commission updated successfully !!")
    }

  return (
    <Layout>
        
        <Modal open={show} onClose={() => setShow(false)}>

            <div className="flex flex-col gap-5">

                <h1 className='text-center text-2xl font-regular'>{title}</h1>

                <div className="comission flex flex-col">
                    <label htmlFor="commision">Comission</label>
                    <input type="text" className='bg-gray-300 rounded-lg outline-none p-2' name="commision" id="" value={commission} onChange={(e) => setCommission(e.target.value)} />
                </div>

                <button onClick={handleSubmitButton} type='button' className='bg-violet-600 text-white p-2 rounded-lg'>Submit</button>
            
            </div>

        </Modal>

        <Toaster
            position="bottom-right"
            reverseOrder={false}
        />

        <div className="cards-container">
            <h1 className='capitalize font-bold text-2xl mb-3 text-white'>Title</h1>
            <div className="cards-container flex flex-wrap gap-5">
            {
            cards.map((element) => (
                <div key={element.text} onClick={handleModalClick} className="cursor-pointer card flex justify-between flex-col gap-4 bg-white rounded-xl p-5 w-60 h-52 relative overflow-hidden">
                <div className={`p-3 rounded-lg ${element.class} w-fit shadow-2xl ${element.shadow}`}>{element.icon}</div>
                <p className=' capitalize'>{ element.text }</p>
                <p className={element.textColor} >$100</p>
                <div className={`absolute content w-44 h-44 ${element.class} bottom-[-50%] right-[-30%] rounded-full opacity-20`}></div>
                </div>
            ))
            }
            </div>
        </div>
    </Layout>
  )
}

export default AdminCommission