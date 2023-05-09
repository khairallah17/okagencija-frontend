import { Navigate, Outlet } from 'react-router-dom'
import useUserContext from '../../Hooks/useUserContext'

const LoginPrivateRoutes = () => {

    const { token } = useUserContext()

    console.log(token)

  return (
    token ? <Outlet/> : <Navigate to="/"/>
  )

}

export default LoginPrivateRoutes