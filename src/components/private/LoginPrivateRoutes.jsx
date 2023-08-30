import { Navigate, Outlet } from 'react-router-dom'
import useUserContext from '../../Hooks/useUserContext'
import AdminDashboard from "../../pages/Admin/AdminDashboard"
import Home from "../../pages/Home"
import jwtDecode from 'jwt-decode'

const LoginPrivateRoutes = () => {

  const token = localStorage?.getItem("token")

  const isAdmin = token == null ? null : jwtDecode(token).isAdmin

  return (
    token ? <Outlet/> : <Navigate to="/" />
  )

}

export default LoginPrivateRoutes