import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'

// CLIENT ROUTES
import Home from './pages/Home'
import Deposit from './pages/Deposit'
import Payout from './pages/Payout'
import Portfolio from './pages/Portfolio'
import Register from './pages/Register'
import Referrals from './pages/Referrals'
import Tools from './pages/Tools'
import Kyc from './pages/Kyc'
import MoreInfo from './pages/MoreInfo'

// ADMIN ROUTES
import AdminCommission from './pages/Admin/AdminCommission'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminDeposit from './pages/Admin/AdminDeposit'
import AdminPayout from './pages/Admin/AdminPayout'
import AdminPortfolio from './pages/Admin/AdminPortfolio'
import AdminTools from './pages/Admin/AdminTools'
import UserInfo from "./pages/Admin/UserInfo"
import AdminClients from './pages/Admin/AdminClients'
import AdminNews from './pages/Admin/AdminNews'
import AdminReports from './pages/Admin/AdminReports'
import AdminUploadFiles from './pages/Admin/AdminUploadFiles'

import LoginPrivateRoutes from './components/private/LoginPrivateRoutes'

// CLIENT CONTEXT
import { UserProvider } from './context/UserContext'

// ADMIN CONTEXT
import { AdminDataProvider } from './context/AdminDataContext'

import './App.css'

function App() {

  return (
    <BrowserRouter>

      <UserProvider>
        <AdminDataProvider>
          <Routes>

            <Route path="" element={<Login/>} />

            <Route path='' element={<LoginPrivateRoutes/>}>

              <Route path="/">
                <Route path='home' element={<Home/>} />
                <Route path="deposit" element={<Deposit/>} />
                <Route path='payout' element={<Payout/>} />
                <Route path='portfolio' element={<Portfolio/>} />
                <Route path='register' element={<Register/>} />
                <Route path='referrals' element={<Referrals/>} />
                <Route path='tools' element={<Tools/>} />
                <Route path='kyc' element={<Kyc/>} />
                <Route path='moreinfo' element={<MoreInfo/>} />
              </Route>

                <Route path='/admin'>
                  <Route path='' element={<AdminDashboard/>}/>
                  <Route path='commission' element={<AdminCommission/>} />
                  <Route path='deposit' element={<AdminDeposit/>} />
                  <Route path='payout' element={<AdminPayout/>} />
                  <Route path='portfolio' element={<AdminPortfolio/>} />
                  <Route path='tools' element={<AdminTools/>} />
                  <Route path="user/:userId" element={<UserInfo/>} />
                  <Route path="clients" element={<AdminClients/>} />
                  <Route path="news" element={<AdminNews/>} />
                  <Route path='reports' element={<AdminReports/>} />
                  <Route path='files' element={<AdminUploadFiles/>} />
                </Route>
            
            </Route>

          </Routes>
        </AdminDataProvider>
      </UserProvider>

    </BrowserRouter>
  )
}

export default App
