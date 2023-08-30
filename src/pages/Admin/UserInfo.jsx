import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../../components/Admin/Layout'
import axios from 'axios'

const UserInfo = () => {

    const {userId} = useParams()

    const [userData, setUserData] = useState({})

    useEffect(() => {

        const fetchUserData = async () => {

            try{

                const {data} = await axios.get(import.meta.env.VITE_API+`/api/v1/admin/users/${userId}`)
                setUserData(data.userInfo)

            } catch (err) {
                console.log(err.message)
            } 

        }

        fetchUserData()

    },[])

  return (
    <Layout>UserInfo</Layout>
  )
}

export default UserInfo