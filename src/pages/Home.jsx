import { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import { Link } from 'react-router-dom'
import Modal from '../components/Modal'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

import {
  BanknotesIcon,
  CreditCardIcon,
  ClockIcon,
  WalletIcon,
  PencilIcon,
  TrashIcon
} from "@heroicons/react/24/outline"

const Home = () => {

  const [open, setOpen] = useState(false)
  const [depositSum, setDepositSum] = useState(0)
  const [payoutSum, setPayoutSum] = useState(0)
  const [news, setNews] = useState([])
  const [clientInfo, setClientInfo] = useState([])
  const [comissionEarned, setComissionEarned] = useState(0)
  const [revenueShare, setRevenueShare] = useState(0)

  const clientid = jwtDecode(localStorage.getItem("token")).clientId

  const cards = [{ icon: <BanknotesIcon className="h-6 w-6 text-black" />, text: "commission earned", class: "bg-[#58C2D8]", textColor: "text-[#58C2D8]", shadow:"shadow-[#58C2D8]", sum: comissionEarned },
                 { icon: <CreditCardIcon className="h-6 w-6 text-black" />, text: "deposit", class: "bg-[#69A4FB]", textColor: "text-[#69A4FB]", shadow:"shadow-[#69A4FB]", sum: depositSum },
                 { icon: <ClockIcon className="h-6 w-6 text-black" />, text: "payout", class: "bg-[#EC68FD]", textColor: "text-[#EC68FD]", shadow:"shadow-[#EC68FD]", sum: payoutSum },
                 { icon: <WalletIcon className="h-6 w-6 text-black" />, text: "Revenue Share", class: "bg-[#DA3134]", textColor: "text-[#DA3134]", shadow:"shadow-[#DA3134]", sum: revenueShare }]


  useEffect(() => {

    const getDepositSum = async () => {

      try {

        const depositsSum = await axios.get(import.meta.env.VITE_API+`/api/v1/client/deposits/sum?clientid=${clientid}`)
        const sum = await depositsSum.data.depositSum || 0

        setDepositSum(sum)  

      } catch (err) {
        console.log(err.message)
      }

    }

    const getPayoutSum = async () => {

      try{

        const payoutssum = await axios.get(import.meta.env.VITE_API+`/api/v1/client/payouts/sum?clientid=${clientid}`)
        const sum = payoutssum.data.payoutSum || 0

        setPayoutSum(sum)

      } catch (err) {
        console.log(err.message)
      }

    }

    const getNews = async () => {

      try {
        
        const response = await axios.get(import.meta.env.VITE_API+`/api/v1/admin/news`)
        const data = await response.data.news

        setNews(data)

      } catch (err) {
        console.log(err.message)
      }

    }

    const getUserById = async () => {

      try {

        const { data } = await axios.get(import.meta.env.VITE_API+`/api/v1/admin/users/${clientid}`)
        setClientInfo(data.userInfo[0])

        setRevenueShare(data.userInfo[0].revenue_share || 0)
        setComissionEarned(data.userInfo[0].comission_earned || "0%")


      } catch (err) {
        console.log(err.message)
      }

    }

    getDepositSum()
    getPayoutSum()
    getNews()
    getUserById()

  }, [])

  return (
    <Layout>

        <Modal open={open} onClose={() => setOpen(false)}>

          <div className="profile-img p-14 pt-3 relative">
 
            <img src="/user.png" alt="user profile image" className='w-32 h-32 relative' />

            <div className="edit-image cursor-pointer bg-[rgba(0,0,0,.7)] w-10 h-10 flex items-center rounded-full justify-center absolute bottom-1/4 right-1/4">
              <PencilIcon className="h-6 w-6 text-white" />
            </div>

            <div className="delete-image cursor-pointer bg-[rgba(0,0,0,.7)] w-10 h-10 flex items-center rounded-full justify-center absolute bottom-1/4 left-1/4">
              <TrashIcon className="h-6 w-6 text-red-500" />
            </div>
            
          </div>

          <div className="profile-text flex flex-col gap-3 items-center">

            <p className='uppercase'>{clientInfo?.username}</p>
            <p>{clientInfo?.email}</p>

            <Link to="/changePassword" className='w-full capitalize text-violet-500 text-center bg-gray-200 border border-gray-300 p-2'>
              change password
            </Link>

            <Link to="/changeTransactionPassword" className='w-full capitalize text-violet-500 text-center bg-gray-200 border border-gray-300 p-2'>
              change transaction password
            </Link>

            <div className="profile-kyc flex items-center w-full">
              <div className="profile-kyc border border-violet-400 flex p-3 rounded-l-lg">
                <p>KYC <span className='capitalize text-red-500'>not verified</span> </p>
              </div>
              <Link to="/moreInfo" className='bg-violet-500 hover:bg-violet-600 duration-300 text-white h-full p-2 py-3 border border-violet-400 rounded-r-lg'>
                more info
              </Link>
            </div>

          </div>

        </Modal>

        <div className="info bg-white flex p-5 rounded-lg flex-wrap">
          <div className="info-personal flex items-center gap-5 p-5 border-r-2 flex-grow">
            <img src="/user.png" alt="" className='w-32 h-32' />
            <div className="info-text flex flex-col items-start gap-2">
              <h3 className=' font-bold' >{clientInfo?.username}</h3>
              <p className=' text-gray-400 font-light' >INF00123</p>
              <Link to="/home" className='text-gray-400 border border-gray-400 py-1 px-3 rounded-3xl hover:bg-gray-400 hover:text-white duration-200' onClick={() => setOpen(true)}>view profile</Link>
            </div>
          </div>

          <div className="info-place flex-grow p-5">
            <p className=' text-gray-400 font-light' >Placement</p>
            <h3 className=' font-bold' >Klemen123</h3>
          </div>
        </div>

        <div className="cards-container flex flex-wrap gap-5 mt-10">
          {
            cards.map((element) => (
              <div key={element.text} className="card flex justify-between flex-col gap-4 bg-white rounded-xl p-5 w-60 h-52 relative overflow-hidden">
                <div className={`p-3 rounded-lg ${element.class} w-fit shadow-2xl ${element.shadow}`}>{element.icon}</div>
                <p className=' capitalize'>{ element.text }</p>
                <p className={element.textColor} >{element.sum}{element.text == "Revenue Share" ? "" : "$"}</p>
                <div className={`absolute content w-44 h-44 ${element.class} bottom-[-50%] right-[-30%] rounded-full opacity-20`}></div>
              </div>
            ))
          }
              <div className="card flex flex-col bg-white rounded-xl p-5 w-60 h-52 relative overflow-hidden">
                <p className="text-gray-300 capitalize">sales manager</p>
                <p className='text-[#6895B5] text-xl'>Klemen123</p>
              </div>
        </div>

          <div className="news flex flex-col gap-3 bg-white mt-10 h-[500px] max-w-full overflow-scroll rounded-lg p-5">
            <h1>News</h1>
            <div className="flex gap-4">
              {

                news.map(({title, content, image}, key) => (
                  <div key={key} className="cursor-pointer news-card overflow-y-scroll bg-white rounded-lg max-w-64 max-h-96 min-w-64 min-h-max-h-96 h-96 w-64 overflow-clip">
                    <img src={import.meta.env.VITE_API+image} className='w-64' alt="" />
                    <div className="content p-4">
                        <h1 className='font-bold text-xl'>{title}</h1>
                        <p>{content}</p>    
                    </div>
                  </div>
                ))

              }
            </div>
          </div>

    </Layout>
  )
}

export default Home