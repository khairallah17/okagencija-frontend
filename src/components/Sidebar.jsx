import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { 
    RectangleGroupIcon, 
    SignalIcon, 
    CursorArrowRaysIcon,
    ChartPieIcon,
    FlagIcon,
    CurrencyDollarIcon,
    DocumentIcon,
    Cog6ToothIcon,
    ChevronDownIcon
} from "@heroicons/react/24/outline"
import axios from 'axios'

const Sidebar = () => {

    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)
    const [files, setFiles] = useState([])
    const [legal, setLegal] = useState("")
    const [faqs, setFaqs] = useState("")

    useEffect(() => {

        const retreiveFiles = async () => {

            try {

                const { data } = await axios.get(import.meta.env.VITE_API+"/api/v1/admin/files/all")

                let leg = data.files.find(obj => obj.type == 'legal')
                let faq = data.files.find(obj => obj.type == 'Faqs')

                leg = leg?.file
                faq = faq?.file

                console.log(leg)

                setFiles(data.files)
                setLegal(leg)
                setFaqs(faq)

            } catch (err) {
                console.log(err.message)
            }

        }

        retreiveFiles()

    }, [])

    const sideMenu = [
        { to: "/home", icon: <RectangleGroupIcon className="h-6 w-6 text-black" />, addIcon: "", text: "dashboard", active: true, list: [] },
        // { to: "/referrals", icon: <SignalIcon className="h-6 w-6 text-black" />, addIcon: "", text: "referrals", active: false, list: [] },
        { to: "/register", icon: <CursorArrowRaysIcon className="h-6 w-6 text-black" />, addIcon: "", text: "register", active: false, list: [] },
        { to: "/portfolio", icon: <ChartPieIcon className="h-6 w-6 text-black" />  , addIcon: "", text: "porfolio", active: false, list: [] },
        { to: "/deposit", icon: <FlagIcon className="h-6 w-6 text-black" />, addIcon: "", text: "deposit", active: false, list: [] },
        { to: "/payout", icon: <CurrencyDollarIcon className="h-6 w-6 text-black" />, addIcon: "", text: "payout", active: false, list: [] },
        { to: "https://sumsub.com/", icon: <DocumentIcon className="h-6 w-6 text-black" />, addIcon: "", text: "KYC", active: false, list: [] },
        { to: "", icon: <Cog6ToothIcon className="h-6 w-6 text-black" />, addIcon: <ChevronDownIcon className="h-6 w-6 text-gray-500" />
        , text: "tools", active: false, list: [{name: "Legals", link: `${import.meta.env.VITE_API}${legal}`}, {name: "FAQs", link: `${import.meta.env.VITE_API}${faqs}`}] }
    ]
    

  return (
    <div className='sidebar w-44 bg-slate-200 flex h-full'>
        <ul className='flex flex-col gap-12 p-5 items-center justify-start text-left'>
            {
                sideMenu.map((ele) => {
                    if (ele.addIcon)
                        return (
                            <li key={ele.text} className="w-full" >
                                <Link to={ele.to} className={`flex flex-col gap-3 hover:active`} >
                                    <div className="list-items flex gap-3 items-center">
                                        <span className='icon p-2'>{ ele.icon }</span>
                                        <span>{ ele.text }</span>
                                        <span className={open? `rotate-0 duration-200`: `rotate-180 duration-200` } onClick={() => {setOpen(!open)}}>{ ele.addIcon }</span>
                                        
                                    </div>
                                </Link>
                                <div className={`${open? 'visible': 'hidden'} minor-list flex flex-col gap-3 ml-9 mt-3 duration-200`}>
                                    {
                                        ele.list.map(element => (
                                            <Link key={element.name} to={element.link} target='_blank' >{ element.name }</Link>
                                        ))
                                    }
                                </div>
                            </li>
                        )
                        else
                            return(
                                <li key={ele.text} className="w-full">
                                    <Link className={`flex flex-col gap-3 hover:active`} to={ele.to}>
                                        <div className="list-items flex gap-3 items-center">
                                            <span className='icon p-2'>{ ele.icon }</span>
                                            <span>{ ele.text }</span>
                                        </div>
                                    </Link>
                                </li>
                            )
                })
            }

        </ul>
    </div>
  )
}

export default Sidebar