import { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import Layout from '../components/Layout'
import LineChart from '../components/LineChart'
import DoughnutChart from '../components/DoughnutChart'
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
import { HiOutlineArrowTrendingDown } from "react-icons/hi2"
import { BsDashLg } from "react-icons/bs"
import axios from 'axios'
import useUserContext from '../Hooks/useUserContext'
import jwtDecode from 'jwt-decode'

const statsCard = ["monthly report q4 2022","monthly report q1 2023"]

const Portfolio = () => {

    const [reports, setReports] = useState([])
    const [portfolio, setPortfolio] = useState([])
    const [profit, setProfit] = useState([])
    const [loading, setLoading] = useState(true)
    const [clientId, setClientId] = useState(jwtDecode(localStorage.getItem("token")).clientId)
    const [lineChartData, setLineChartData] = useState([])
    const [pieChartData, setPieChartData] = useState([])
    const [up, setUp] = useState(0)
    const [calculatedPortfolio, setCalculatedPortfolio] = useState(0)

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

    const states = [{value: <BsDashLg className="h-6 w-6 text-gray-500" />, class: "text-white bg-gray-500 rounded-2xl   px-2 text-gray-500", classGlobal: "text-card-lower px-2 flex flex-col gap-1 border-l-4 border-l-gray-500"},
                    {value: <HiOutlineArrowTrendingDown className="h-6 w-6 text-red-500" />, class: " bg-red-500 rounded-2xl px-2 text-white", classGlobal: "text-card-lower px-2 flex flex-col gap-1 border-l-4 border-l-red-500"},
                    {value: <ArrowTrendingUpIcon className="h-6 w-6 text-[#6EC89C]" />, class: " bg-[#CDEBDC] rounded-2xl px-2 text-[#6EC89C]", classGlobal: "text-card-lower px-2 flex flex-col gap-1 border-l-4 border-l-[#6EC89C]"}]

    const GenerateYears = () => {
        var max = new Date().getFullYear()
        var min = max - 9
        var years = []
      
        for (var i = max; i >= min; i--) {
          years.push(i)
        }
        return years
      }

    let years = GenerateYears()

    useEffect(() => {

        const retreiveReports = async () => {

            try {
                
                const { data } = await axios.post(import.meta.env.VITE_API+`/api/v1/admin/users/info`,{
                    clientId: clientId
                })

                setReports(data.userData[0].Reports)
                setPortfolio(data.userData[0].Portfolio)
                setProfit(data.userData[0].Profits)
                setLineChartData(data.userData[0].Profits)
                setPieChartData(data.userData[0].Profits)

                let sub = data.userData[0].Portfolio.portfolio_current_balance - data.userData[0].Portfolio.portfolio_start_balance
                let percent = (sub / data.userData[0].Portfolio.portfolio_start_balance )* 100
        
                if (percent < 0)
                    setUp(1)
                else if (percent == 0)
                    setUp(0)
                else if (percent > 0)
                    setUp(2)
    
                console.log(up)
                    
                setCalculatedPortfolio(percent.toFixed(0))

                setLoading(false)


            } catch (error) {
                console.log(error.message)
            }

        }

        const calculatePortfolio = () => {

        }

        retreiveReports()
        calculatePortfolio()

    },[])

    const filterDoghnut = (e) => {

        let filtred = profit.filter(obj => obj.month == e.target.value)
        filtred = filtred.map(({capital, profit}) => {
            return {capital, profit}
        })

        setPieChartData(filtred)

    }
    const filterLineChart = (e) => {

        let filtred = profit.filter(obj => obj.year == e.target.value)
        filtred = filtred.map(({capital, profit}) => {
            return {capital, profit}
        })

        setLineChartData(filtred)

    }

  return (
    <Layout>
        <h4 className='font-bold text-white uppercase mb-5' >portfolio</h4>

        <div className="portfolio-stats bg-white flex items-center p-12 mb-8 rounded-xl max-w-full overflow-scroll flex-wrap">
            
            <div className="portfolio-stats-cards flex flex-grow flex-wrap gap-8 p-5 px-8">
               <div>
                    {
                        reports.map(({report_name, report_file}, key) => (
                            <div key={key} className="stat-card p-2 shadow-xl h-72 w-64 rounded-lg">
                                <div className="card-border border border-gray-200 h-full w-full flex flex-col items-center justify-between">
                                    <div className="img-card-container p-8 px-16 bg-gray-300 w-full flex justify-center">
                                        <img src="/logo.png" alt="" className='w-16 bg-contain' />
                                    </div>
                                    <p className='capitalize text-center'>{ report_name }</p>
                                    <Link to={import.meta.env.VITE_API+`${report_file}`} target='_blank' className='bg-[#5DC291] text-white p-5 py-2 rounded-md mb-5' >open</Link>
                                </div>
                            </div>
                        ))
                    }
                    <p className='mt-5 text-center'>Uploaded Reports: {reports.length}</p>
               </div>
            </div>

            <div className="portfolio-text flex-grow">

                <div className="portfolio-text-card p-2 shadow-xl h-72 w-64 rounded-lg">
                    <div className="portfolio-text-card h-full flex justify-center items-center border border-gray-200">
                        
                        <div className="card-border h-full w-full flex flex-col items-start justify-center p-5">
                            <div className="text-card-upper px-2 flex flex-col gap-1 border-l-4 border-[#9A9A9A] mb-5">
                                <p>start balance</p>
                                <p className=' font-bold'>{portfolio.portfolio_start_balance} $</p>
                            </div>

                            <div className={states[up].classGlobal}>
                                <p>current balance</p>
                                <p className=' font-bold'>{portfolio.portfolio_current_balance} $</p>
                                <div className="card-lower-stat flex items-center">
                                    <span className={states[up].class}>{calculatedPortfolio} %</span>
                                    {states[up].value}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>  

        <div className="portfolio-charts flex bg-white items-center justify-around p-5 py-14 rounded-xl">
            
            <div className="portfolio-lineChart w-[500px] flex flex-col gap-4 items-center">
                { loading ? <p>Loading...</p> : <LineChart capital_profit={lineChartData} /> }
                <div className="year-filter flex items-center gap-4">
                    <label htmlFor="choose year">Choose a year :</label>
                    <select name="choose year" id="" className='outline-none bg-gray-200 p-2 rounded-lg' onChange={filterLineChart}>
                        {
                            years.map((value, key) => (
                                <option key={key} value={value}>{value}</option>
                            ))
                        }
                    </select>
                </div>
            </div>

            <div className="portfolio-doughnut w-[300px] flex flex-col items-center gap-4">
                { loading ? <p>Loading...</p> : <DoughnutChart capital_profit={pieChartData} /> }
                <div className="month flex gap-2 items-center">
                    <label htmlFor="month">Month: </label>
                    <select name="month" className='outline-none bg-gray-200 p-2 rounded-lg' onChange={filterDoghnut}>
                    {

                        months.map(({value, name}, key) => (
                        <option value={value} key={key}>{name}</option>
                        ))

                    }
                    </select>
                </div>
            </div>

        </div>

    </Layout>
  )
}

export default Portfolio