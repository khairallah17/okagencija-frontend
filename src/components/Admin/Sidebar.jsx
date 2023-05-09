import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
    RectangleGroupIcon, 
    ChartPieIcon,
    FlagIcon,
    CurrencyDollarIcon,
    Cog6ToothIcon,
    ReceiptPercentIcon
} from "@heroicons/react/24/outline"

const sideMenu = [
    { to: "/admin", icon: <RectangleGroupIcon className="h-6 w-6 text-black" />, addIcon: "", text: "dashboard", active: true, list: [] },
    { to: "/admin/commission", icon: <ReceiptPercentIcon className="h-6 w-6 text-black" />, addIcon: "", text: "commissions", active: false, list:[]},
    { to: "/admin/payout", icon: <CurrencyDollarIcon className="h-6 w-6 text-black" />, addIcon: "", text: "payout", active: false, list: [] },
    { to: "/admin/deposit", icon: <FlagIcon className="h-6 w-6 text-black" />, addIcon: "", text: "deposit", active: false, list: [] },
    { to: "/admin/portfolio", icon: <ChartPieIcon className="h-6 w-6 text-black" />, addIcon: "", text: "portfolio", active: false, list: [] },
    { to: "/admin/tools", icon: <Cog6ToothIcon className="h-6 w-6 text-black" />, addIcon: "" , text: "tools", active: false, list: [] }
]

const Sidebar = () => {

    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)

  return (
    <div className='sidebar w-52 bg-slate-200 flex h-full'>
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
                                            <Link key={element} >{ element }</Link>
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