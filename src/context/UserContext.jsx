import { createContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [clientId, setClientId] = useState("")
    const [token, setToken] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    const navigate = useNavigate()

    const decodeToken = (tk) => {
        const decoded = jwtDecode(tk)

        setEmail(decoded.email)
        setUsername(decoded.username)
        setIsAdmin(decoded.isAdmin)
        setClientId(decoded.clientId)

        
        decoded.isAdmin ? navigate("/admin") : navigate("/home")
    }

    const handleLogin = async (user, password) => {
        
        try {
            
            const response = await axios.post(import.meta.env.VITE_API+"/api/v1/login", {
                username: user,
                password: password
            })

            const tk = await response.data.token

            localStorage.setItem("token",tk)
            decodeToken(response.data.token)

        } catch (error) {
            console.log(error.message)
        }

    }

    const logout = () => {
        console.log("remove token")
        localStorage.removeItem("token")
        navigate("/")
    }

    const values = {
        username,
        email,
        isAdmin, 
        handleLogin,
        token,
        logout,
        clientId
    }

  return (
    <UserContext.Provider value={values}>
        { children }
    </UserContext.Provider>
  )
}

export default UserContext