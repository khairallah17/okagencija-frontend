import React, { useEffect, useState } from 'react'
import Layout from '../../components/Admin/Layout'
import { Link } from 'react-router-dom'
import { EyeIcon } from "@heroicons/react/24/outline";
import profile from "../../../public/user.png"
import useAdminContext from '../../Hooks/useAdminContext';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

const clientData = []

const AdminDashboard = () => {

  const [clients, setClients] = useState([])
  const [deposits, setDeposits] = useState([])
  const [payouts, setPayouts] = useState([])
  const [loadig, setLoading] = useState(true)

  useEffect(() => {
    const retreiveDeposits = async () => {

      try{

        const response = await axios.get(import.meta.env.VITE_API+'/api/v1/admin/deposits')
        const data = await response.data.depositData


        setDeposits(data)

      } catch (err) {
          console.log(err.message)
      }

    }

    const retreiveClients = async () => {

      try {
        
        const response = await axios.get(import.meta.env.VITE_API+"/api/v1/admin/users")
        const data = await response.data.users

        setClients(data)

      } catch (err) {
        console.log(err.message)
      }

    }


    const retreivePayouts = async () => {

      try {
        
        const response = await axios.get(import.meta.env.VITE_API+"/api/v1/client/payouts",{
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


  return (
    <Layout>
      
      <div className="payout-container flex flex-col gap-5">

        <div className="last-deposits bg-white p-5 rounded-lg flex flex-col gap-4">

          <h1 className='capitalize font-bold text-2xl'>last deposits</h1>

          <table>
                  <thead>
                      <tr>
                          <th> client</th>
                          <th> Details</th>
                          <th> VALUE </th>
                          <th> DATE </th>
                          <th> status</th>
                      </tr>
                  </thead>
                  <tbody>
                    {
                      deposits.slice(0,5).map(({deposit_amount, deposit_date, deposit_name, deposit_status, user}, key) => (
                          <tr key={key}>
                            <td>{user?.username}</td>
                            <td>{deposit_name}</td>
                            <td>{deposit_amount}</td>
                            <td>{deposit_date.split(" ")[0]}</td>
                            <td>{deposit_status ? "approved" : "pending ..."}</td>
                          </tr>
                        )
                      )
                    }
                  </tbody>
            </table>

            <Link className='text-blue-500 underline' to="/admin/deposit">See more</Link>

        </div>

        <div className="last-payouts bg-white p-5 rounded-lg flex flex-col gap-4">

          <h1 className="capitalize font-bold text-2xl">last payouts</h1>

          <table>
                  <thead>
                      <tr>
                          <th> Client</th>
                          <th> Details</th>
                          <th> VALUE </th>
                          <th> DATE </th>
                          <th> status</th>
                      </tr>
                  </thead>
                  <tbody>
                    {

                      payouts.slice(0,5).map(({payout_detail, payout_value, payout_date, payout_status, user}, key) => (
                        <tr key={key}>
                          <td>{user?.username}</td>
                          <td>{payout_detail}</td>
                          <td>{payout_value}</td>
                          <td>{payout_date.split(" ")[0]}</td>
                          <td>{payout_status ? "approved" : "pending ..."}</td>
                        </tr>
                      ))

                    }
                  </tbody>
            </table>

            <Link className='text-blue-600 underline' to="/admin/payout" > See more</Link>

          </div>

          <div className="new-clients bg-white p-5 rounded-lg flex flex-col gap-4">

            <h1 className='capitalize font-bold text-2xl'>new clients</h1>

            <div className="uses-container flex items-center gap-4 justify-start flex-wrap">

              {
                clients.map(({username, id}, key) => (
                  <div key={key} className="client flex items-center gap-4">
                    <img src={profile} alt="client image" className='w-10' />
                    <h2>{ username }</h2>
                    {/* <Link to={`/admin/user/${id}`} >
                      <EyeIcon className="h-6 w-6 text-black" />
                    </Link> */}
                  </div>
                ))
              }

            </div>

          </div>

        </div>


    </Layout>
  )
}

export default AdminDashboard