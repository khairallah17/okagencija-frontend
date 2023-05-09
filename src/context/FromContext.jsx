import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

const FormContext = createContext({})

export const FormProvider = ({ children }) => {

    const title = {
        0: 'Sponsor',
        1: 'User Info'
    }

    const [token, setToken] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    const [page, setPage] = useState(0)

    const [success, setSuccess] = useState(false)

    const [data, setData] = useState({
        sponsorUsername: "",
        sponsorFullName: "",
        username: "",
        email: "",
        password: "",
        confPassword: "",
        phoneNumber: ""
    })

    const handleChange = e => {
        const type = e.target.type

        const name = e.target.name

        const value = type === "checkBox" ? e.target.checked : e.target.value

        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const decodeToken = () => {
        console.log(jwtDecode(token).username)
    }

    return (
        <FormContext.Provider value={{ title, page, setPage, data, setData, handleChange, success, setSuccess, token, setToken, decodeToken }}>
            { children }
        </FormContext.Provider>
    )

}

export default FormContext