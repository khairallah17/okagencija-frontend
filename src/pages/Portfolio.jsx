import React from 'react'
import { Link } from "react-router-dom"
import Layout from '../components/Layout'
import LineChart from '../components/LineChart'
import DoughnutChart from '../components/DoughnutChart'
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

const statsCard = ["monthly report q4 2022","monthly report q1 2023"]

const Portfolio = () => {
  return (
    <Layout>
        <h4 className='font-bold text-white uppercase mb-5' >portfolio</h4>

        <div className="portfolio-stats bg-white flex items-center p-12 mb-8 rounded-xl max-w-full overflow-scroll">
            
            <div className="portfolio-stats-cards flex flex-grow flex-wrap gap-8 p-5 px-8">
                {
                    statsCard.map(text => (
                        <div className="stat-card p-2 shadow-xl h-72 w-64 rounded-lg">
                            <div className="card-border border border-gray-200 h-full w-full flex flex-col items-center justify-between">
                                <div className="img-card-container p-8 px-16 bg-gray-300 w-full flex justify-center">
                                    <img src="/logo.png" alt="" className='w-16 bg-contain' />
                                </div>
                                <p className='capitalize text-center'>{ text }</p>
                                <Link className='bg-[#5DC291] text-white p-5 py-2 rounded-md mb-5' >open</Link>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="portfolio-text flex-grow">

                <div className="portfolio-text-card p-2 shadow-xl h-72 w-64 rounded-lg">
                    <div className="portfolio-text-card h-full flex justify-center items-center border border-gray-200">
                        
                        <div className="card-border h-full w-full flex flex-col items-start justify-center p-5">
                            <div className="text-card-upper px-2 flex flex-col gap-1 border-l-4 border-[#9A9A9A] mb-5">
                                <p>start balance</p>
                                <p className=' font-bold'>10,000 $</p>
                            </div>

                            <div className="text-card-lower px-2 flex flex-col gap-1 border-l-4 border-l-[#6EC89C]">
                                <p>current balance</p>
                                <p className=' font-bold'>15,000 $</p>
                                <div className="card-lower-stat flex items-center ">
                                    <span className='bg-[#CDEBDC] text-[#6EC89C] rounded-2xl px-2'>+ 50 %</span>
                                    <ArrowTrendingUpIcon className="h-6 w-6 text-[#6EC89C]" />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>  

        <div className="portfolio-charts flex bg-white items-center justify-around p-5 py-14 rounded-xl">
            
            <div className="portfolio-lineChart w-[500px]">
                <LineChart/>
            </div>

            <div className="portfolio-doughnut w-[300px]">
                <DoughnutChart />
            </div>

        </div>

    </Layout>
  )
}

export default Portfolio