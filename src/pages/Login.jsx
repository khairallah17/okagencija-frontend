import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useUserContext from "../Hooks/useUserContext"

const Login = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate({})

    const { handleLogin } = useUserContext()

  return (
    <div className="flex items-center justify-center h-screen flex-col gap-5">
        <div className="card w-[500px] drop-shadow-2xl rounded-xl bg-white">

        <div className="card-up flex-grow flex items-center justify-center">
            <img src="/logo-vertical.png" alt="logo ok agencija" className=' h-32'/>
        </div>

        <div className="car-welcome flex flex-grow bg-primary justify-between items-center px-3">

            <div className="card-welcome-left w-1/2">
                <h3 className="font-bold text-green-700 text-3xl">Welcome back!</h3>
                <p className=' text-green-300'>Sign in to continue</p>
            </div>

            <div className="card-welcome-image w-1/2 flex items-end justify-end">
                <img src="/welcome-image.png" alt="" className='w-40'/>
            </div>

        </div>

        <div className="card-form flex-grow">
            <div className='flex flex-col gap-5 p-5'>
                <input type="text" className='border-2 rounded-md p-3 text-darker_gray outline-none ' value={username} onChange={(e) => setUsername(e.target.value)} name='username' placeholder='Username' />
                <input type="password" className='border-2 rounded-md p-3 text-darker_gray outline-none ' value={password} onChange={(e) => setPassword(e.target.value)} name='Password' placeholder='Password' />
                <a className=' font-bold capitalize text-darker_gray' >
                    forget password?
                </a>
                <div className="card-form-submit flex justify-center">
                    <button type='submit' onClick={() => handleLogin(username, password)} className='rounded-full bg-green-700 text-white p-4 px-10 hover:bg-green-600 duration-200 border-2 border-darker_gray'>Submit</button>
                </div>
            </div>
        </div>

        </div>
        <p>2023 &copy; Ok Agencija d.o.o</p>
    </div>
  )
}

export default Login