import { createContext, useState } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'

const UserContext = createContext({})

export const UserProvider = ({ children }) => {

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)
    const [token, setToken] = useState("")
    const [loggedIn, setLoggedIn] = useState(false)

    const decodeToken = (tk) => {
        const decoded = jwtDecode(tk)

        setEmail(decoded.email)
        setUsername(decoded.username)
        setIsAdmin(decoded.isAdmin)

        console.log(token)
    }

    const handleLogin = async (user, password) => {
        
        try {
            
            const response = await axios.post("http://localhost:3000/api/v1/login", {
                username: user,
                password: password
            })

            setToken(response.data.token)
            decodeToken(response.data.token)

        } catch (error) {
            console.log(error.message)
        }

    }

    const values = {
        username,
        email,
        isAdmin, 
        handleLogin,
        token
    }

  return (
    <UserContext.Provider value={values}>
        { children }
    </UserContext.Provider>
  )
}

export default UserContext