import React from 'react'
import { Bars3BottomLeftIcon, EnvelopeIcon, BellIcon } from "@heroicons/react/24/outline";
import useUserContext from '../Hooks/useUserContext';
import useAdminContext from '../Hooks/useAdminContext';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';


const Header = () => {

    const token = localStorage.getItem("token")
    const username = jwtDecode(token).username

    const navigate = useNavigate()

    const logout = () => {
        console.log("logged out")
        localStorage.removeItem("token")
        navigate("/")
    }

  return (
    <div className='header flex w-full items-center bg-white shadow-2xl px-5 h-[8%] z-10'>
        <div className="header-left flex flex-grow gap-5 items-center">
            <Bars3BottomLeftIcon className="h-6 w-6 text-black cursor-pointer" />
            <img src="/logo-vertical.png" alt="" className='w-32 mr-10' />
            <select name="language" id="" className='bg-transparent'>
                <option value="united kingDom Flag" className=' bg-uk-flag'>UK-EU
                </option>
            </select>
        </div>

        <div className="header-right flex gap-12 items-center mr-5">
            <EnvelopeIcon className="h-6 w-6 text-gray-500" />
            <BellIcon className="h-6 w-6 text-gray-500" />
            <div className="header-profile flex items-center gap-2">
                <img src="/user.png" alt="user profile image" className='w-10' />
                <div className="details">
                    <p>{username}</p>
                    <button onClick={() => logout()}>logout</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header