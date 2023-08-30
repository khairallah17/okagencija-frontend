import { createContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import useUserContext from "../Hooks/useUserContext";

const FormContext = createContext({})

export const FormProvider = ({ children }) => {

    const title = {
        0: 'Sponsor',
        1: 'User Info'
    }

    const { clientId } = useUserContext()

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

    const registerRefferal = async () => {
        
        if (data.confPassword != data.password)
            return toast.error("password does not match!")

        else{

            const body = {
                sponsorUsername: data.sponsorUsername,
                sponsorFullname: data.sponsorFullName,
                clientId: clientId,
            }

            try {

                const response = await axios.post("http://localhost:3000/api/v1/client/refferals", body) 
                toast.success("refferal registred successfully !")

            } catch (err) {
                console.log(err.message)
            }

        }

    }

    const handleChange = e => {
        const type = e.target.type

        const name = e.target.name

        const value = type === "checkBox" ? e.target.checked : e.target.value

        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    return (
        <FormContext.Provider value={{ title, page, setPage, data, setData, handleChange, success, setSuccess, registerRefferal }}>
            { children }
        </FormContext.Provider>
    )

}

export default FormContext