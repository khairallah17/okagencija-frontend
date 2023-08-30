import { useContext } from 'react'
import AdminDataContext from '../context/AdminDataContext'

const useAdminContext = () => {
  return (
    useContext(AdminDataContext)
  )
}

export default useAdminContext