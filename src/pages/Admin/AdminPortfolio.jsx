import { useState, useEffect } from 'react'
import Layout from '../../components/Admin/Layout'
import profile from "../../../public/user.png"
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import Modal from '../../components/Modal';
import toast, { Toaster } from 'react-hot-toast';
import useAdminContext from '../../Hooks/useAdminContext';
import axios from 'axios';

const AdminPortfolio = () => {

  const [open ,setOpen] = useState(false)
  const [opentReport, setOpenReport] = useState(false)
  const [reportName, setReportName] = useState("")
  const [reportFile, setReportFile] = useState("")
  const [startBalance, setStartBalance] = useState(0)
  const [currentBalance, setCurrentBalance] = useState(0)
  const [profit, setProfite] = useState(0)
  const [capital, setCapital] = useState(0)
  const [month, setMonth] = useState("jan")
  const [year, setYear] = useState("")
  const [clientId, setClientId] = useState(0)

  const [portfolios, setPortfolios] = useState([])

  const months = [{ value: "jan", name: "january" },
                  { value: "feb", name: "February" },
                  { value: "mar", name: "Mars" },
                  { value: "apr", name: "April" },
                  { value: "may", name: "may" },
                  { value: "jun", name: "june" },
                  { value: "jul", name: "july" },
                  { value: "aug", name: "august" },
                  { value: "sep", name: "spetember" },
                  { value: "oct", name: "october" },
                  { value: "nov", name: "november" },
                  { value: "dec", name: "december" }]

  const handleClickSubmit = (string, myPromise) => {
    toast.promise(myPromise, {
      loading: 'request processing',
      success: string,
      error: 'An error has been occured',
    });
  }

  const deleteSinglePortfolio = async (e) => {

    let id = e.target.id

    try {

      await axios.delete(`${import.meta.env.VITE_API}/api/v1/admin/portfolio/${id}`)
      
    } catch (err) {
      console.log(err.message)
    }

  }

  const getIdWhenModalShowsReport = (e) => {
    setClientId(e.target.id)
    setOpenReport(true)
  }

  const getIdWhenModalShowsEdit = (e) => {

    const clt = portfolios.find(obj => obj.id == e.target.id)

    setClientId(e.target.id)
    setStartBalance(clt.Portfolio.portfolio_start_balance)
    setCurrentBalance(clt.Portfolio.portfolio_current_balance)
    setOpen(true)
  }

  const uploadReport = async () => {

    const formData = new FormData()
    formData.append('reportFile', reportFile)
    formData.append('reportName', reportName)
    formData.append('clientId', clientId)

    try {

      await axios.post(import.meta.env.VITE_API+"/api/v1/admin/portfolio/reports", formData)
      setOpenReport(false)

    } catch (error) {
      console.log(error.message)
    }

  }

  const EditPortfolio = async () => {

    try {

      await axios.post(import.meta.env.VITE_API+"/api/v1/admin/portfolio", {
        profit,
        capital,
        startBalance,
        currentBalance,
        clientId,
        month,
        year
      })

      setTimeout(() => {
        setOpenReport(false)
      }, 1000)

    } catch (err) {
      console.log(err.message)
    }

  }

  useEffect(() => {

    const retreivePortfolios = async () => {

      try {

        const { data } = await axios.get(import.meta.env.VITE_API+"/api/v1/admin/users")
        setPortfolios(data.users)

      } catch (err) {
        console.log(err.message)
      }

    }

    retreivePortfolios()

  }, [])

  return (
    <Layout>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />

      <Modal open={open} onClose={() => setOpen(false)}>
      
        <div className="profit-details flex flex-col gap-4">

          <h1 className='font-bold text-2xl capitalize'>Edit Client Portfolio</h1>

          <div className="profit flex flex-col gap-2">
            <label htmlFor="Profit">Profit</label>
            <input type="text" name="profit" value={profit} onChange={(e) => setProfite(e.target.value)} className='outline-none bg-gray-200 p-2 rounded-lg' id="" />
          </div>

          <div className="capital flex flex-col gap-2">
            <label htmlFor="Capital">Capital</label>
            <input type="text" name='Capital' value={capital} onChange={(e) => setCapital(e.target.value)} className='outline-none bg-gray-200 p-2 rounded-lg' />
          </div>

          <div className="start-balance flex flex-col gap-2">
            <label htmlFor="start balance">Start Balance</label>
            <input type="text" name="start balance" value={startBalance} onChange={(e) => setStartBalance(e.target.value)} className='outline-none bg-gray-200 p-2 rounded-lg' />
          </div>

          <div className="current-balance flex flex-col gap-2">
            <label htmlFor="current balance">Current Balance</label>
            <input type="text" name='current balance' value={currentBalance} onChange={(e) => setCurrentBalance(e.target.value)} className='outline-none bg-gray-200 p-2 rounded-lg' />
          </div>

          <div className="month flex flex-col gap-2">
            <label htmlFor="month">Month</label>
            <select name="month" className='outline-none bg-gray-200 p-2 rounded-lg' onChange={(e) => setMonth(e.target.value)}>
              {

                months.map(({value, name}, key) => (
                  <option value={value} key={key}>{name}</option>
                ))

              }
            </select>
          </div>

          <div className="year flex flex-col gap-2">
            <label htmlFor="year">Year</label>
            <input type="text" name="year" id="" className='outline-none bg-gray-200 p-2 rounded-lg' value={year} onChange={(e) => setYear(e.target.value)} />
          </div>

          <button onClick={() => handleClickSubmit("Portfolio edited successfully!!", EditPortfolio())} className="bg-violet-600 duration-200 hover:bg-violet-500 text-white p-2 px-4 rounded-lg" >submit</button>

        </div>

      </Modal>

      <Modal open={opentReport} onClose={() => setOpenReport(false)}>
      
      <div className="profit-details flex flex-col gap-4">

        <h1 className='font-bold text-2xl capitalize'>Update Client report</h1>

        <div className="report-name flex flex-col gap-2">
          <label htmlFor="report name">Report Name</label>
          <input type="text" name="report name" value={reportName} onChange={(e) => setReportName(e.target.value)} id="" className='outline-none bg-gray-200 p-2 rounded-lg' />
        </div>

        <div className="report flex flex-col gap-2">
          <label htmlFor="report">Report</label>
          <input type="file" name="report" onChange={(e) => setReportFile(e.target.files[0])} accept='pdf' id="" className='outline-none bg-gray-200 p-2 rounded-lg' />
        </div>

        <button onClick={() => handleClickSubmit("report uploaded successfully", uploadReport())} className="bg-violet-600 duration-200 hover:bg-violet-500 text-white p-2 px-4 rounded-lg" >submit</button>

      </div>

      </Modal>

      <div className='clients-wrapper flex gap-x-10 gap-y-5 flex-wrap'>

        {

          portfolios.map(({username, id, Portfolio}, key) => (
            <div className="client-card bg-white rounded-lg h-full flex flex-col gap-4 w-64" key={key}>
              <div className="pt-5 px-5">
              <img src={profile} alt="" className='w-10' />
              <p>{username}</p>

              <div className="portfolio-text-card h-full flex justify-center items-center ">
                  
                  <div className="card-border h-full w-full flex flex-col items-start justify-center">
                      <div className="text-card-upper px-2 flex flex-col gap-1 border-l-4 border-[#9A9A9A] mb-5">
                          <p>start balance</p>
                          <p className=' font-bold'>{Portfolio.portfolio_start_balance} $</p>
                      </div>

                      <div className="text-card-lower px-2 flex flex-col gap-1 border-l-4 border-l-[#6EC89C]">
                          <p>current balance</p>
                          <p className=' font-bold'>{Portfolio.portfolio_current_balance} $</p>
                          <div className="card-lower-stat flex items-center ">
                              {/* <span className='bg-[#CDEBDC] text-[#67a788] rounded-2xl px-2'>+ 50 %</span> */}
                              {/* <ArrowTrendingUpIcon className="h-6 w-6 text-[#6EC89C]" /> */}
                          </div>
                      </div>
                  </div>

                </div>
              </div>


                <div className="edit-upload w-full flex gap-2 p-2">
                <button onClick={(e) => getIdWhenModalShowsEdit(e)} id={id} className='p-2 px-4 bg-green-600 duration-200 hover:bg-green-500 text-white rounded-lg w-full' >Edit</button>
                <button onClick={(e) => getIdWhenModalShowsReport(e)} id={id} className='p-2 px-4 bg-yellow-600 duration-200 hover:bg-yellow-500 text-white rounded-lg w-full' >Report</button>
                <button type="submit" onClick={(e) => handleClickSubmit("portfolio deleted successfully", deleteSinglePortfolio(e))} id={id} className='p-2 px-4 bg-red-600 duration-200 hover:bg-red-500 text-white rounded-lg w-full'>Delete</button>
                </div>
            </div>
          ))

        }

      </div>

    </Layout>
  )
}

export default AdminPortfolio