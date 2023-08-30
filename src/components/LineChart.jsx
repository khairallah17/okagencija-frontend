import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, LineElement, Legend, Tooltip, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(
    Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement
)

const LineChart = ({capital_profit}) => {

    const capital = capital_profit.map(({ capital }) => capital)
    const profit = capital_profit.map(({ profit }) => profit)

    const data = {
        labels: ["jan","fev","mar", "apr","may","jun","jul","aug", "sep", "oct", "nov", "dec"],
        datasets: [
            {
                label: 'capital',
                data: capital,
                fill: false,
                borderColor: '#65CB49',
                tension: 0.1
            },
            {
                label: 'profit',
                data: profit,
                fill: false,
                borderColor: '#439FE3',
                tension: 0.1
            }
        ]
    };

 
    return (
        <Line data={data}/>
  )
}

export default LineChart