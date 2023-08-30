import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

const AdminDataContext = createContext({})

export const AdminDataProvider = ({ children }) => {

    const [deposits, setDeposits] = useState([])
    const [payouts, setPayouts] = useState([])
    const [clients, setClients] = useState([])

    useEffect(() => {
        const retreiveDeposits = async () => {
    
          try{
    
            const response = await axios.get('http://api.okagencija.com/api/v1/admin/deposits')
            const data = await response.data.depositData
    
            setDeposits(data)
    
          } catch (err) {
              console.log(err.message)
          }
    
        }
    
        const retreiveClients = async () => {
    
          try {
            
            const response = await axios.get("http://api.okagencija.com/api/v1/admin/users")
            const data = await response.data.users
    
            setClients(data)
    
          } catch (err) {
            console.log(err.message)
          }
    
        }
    
    
        const retreivePayouts = async () => {
    
          try {
            
            const response = await axios.get("http://api.okagencija.com/api/v1/client/payouts",{
              headers: {
                "limit": 5
              }
            })
            const data = await response.data.payoutData
    
            setPayouts(data)
    
          } catch (error) {
            console.log(error.message)
          }
    
        }
    
        retreiveDeposits()
        retreiveClients()
        retreivePayouts()
      }, [])

    const values = {
        deposits,
        payouts,
        clients
    }

  return (
    <AdminDataContext.Provider value={values}>
        {children}
    </AdminDataContext.Provider>
  )
}

export default AdminDataContext