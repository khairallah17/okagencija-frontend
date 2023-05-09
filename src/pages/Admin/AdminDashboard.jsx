import React from 'react'
import Layout from '../../components/Admin/Layout'
import { Link } from 'react-router-dom'
import { EyeIcon } from "@heroicons/react/24/outline";
import profile from "../../../public/user.png"

const clients = [
  { name: "client 1", image: profile, icon: <EyeIcon className="h-6 w-6 text-black" /> },
  { name: "client 1", image: profile, icon: <EyeIcon className="h-6 w-6 text-black" /> },
  { name: "client 1", image: profile, icon: <EyeIcon className="h-6 w-6 text-black" /> },
  { name: "client 1", image: profile, icon: <EyeIcon className="h-6 w-6 text-black" /> },
  { name: "client 1", image: profile, icon: <EyeIcon className="h-6 w-6 text-black" /> },
  { name: "client 1", image: profile, icon: <EyeIcon className="h-6 w-6 text-black" /> },
]

const AdminDashboard = () => {

  return (
    <Layout>
      
      <div className="payout-container flex flex-col gap-5">

        <div className="last-deposits bg-white p-5 rounded-lg flex flex-col gap-4">

          <h1 className='capitalize font-bold text-2xl'>last deposits</h1>

          <table>
                  <thead>
                      <tr>
                          <th> Details</th>
                          <th> VALUE </th>
                          <th> DATE </th>
                      </tr>
                  </thead>
                  <tbody>
                        <tr>
                            <td>Basic</td>
                            <td>10.000</td>
                            <td>2023-01-08</td>
                        </tr>
                        <tr>
                            <td>Basic</td>
                            <td>3.500</td>
                            <td>2023-02-08</td>
                        </tr>
                  </tbody>
            </table>

            <Link className='text-blue-500 underline' to="/admin/deposit">See more</Link>

        </div>

        <div className="last-payouts bg-white p-5 rounded-lg flex flex-col gap-4">

          <h1 className="capitalize font-bold text-2xl">last payouts</h1>

          <table>
                  <thead>
                      <tr>
                          <th> Details</th>
                          <th> VALUE </th>
                          <th> DATE </th>
                      </tr>
                  </thead>
                  <tbody>
                        <tr>
                            <td>Basic</td>
                            <td>10.000</td>
                            <td>2023-01-08</td>
                        </tr>
                        <tr>
                            <td>Basic</td>
                            <td>3.500</td>
                            <td>2023-02-08</td>
                        </tr>
                  </tbody>
            </table>

            <Link className='text-blue-600 underline' to="/admin/payout" > See more</Link>

          </div>

          <div className="new-clients bg-white p-5 rounded-lg flex flex-col gap-4">

            <h1 className='capitalize font-bold text-2xl'>new clients</h1>

            <div className="uses-container flex items-center justify-around flex-wrap">

              {
                clients.map(clt => (
                  <div className="client flex items-center gap-4">
                    <img src={clt.image} alt="client image" className='w-10' />
                    <h2>{ clt.name }</h2>
                    <Link to="/admin/portfolio">{ clt.icon }</Link>
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