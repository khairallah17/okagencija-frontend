import React from 'react'
import { Line } from 'react-chartjs-2'
import { Chart as ChartJS, Title, LineElement, Legend, Tooltip, CategoryScale, LinearScale, PointElement } from 'chart.js'

ChartJS.register(
    Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement
)

const LineChart = () => {


    const data = {
        labels: ["jan 21","fev 21","mar 21", "apr 21","may 21","jun 21","jul 21"],
        datasets: [
            {
                label: 'capital',
                data: [28, 28, 65, 65, 65, 65, 65],
                fill: false,
                borderColor: '#65CB49',
                tension: 0.1
            },
            {
                label: 'profit',
                data: [28, 32, 29, 65, 60, 70, 100],
                fill: false,
                borderColor: '#439FE3',
                tension: 0.1
            }
        ]
    };

    const config = {
        type: 'line',
        data: data,
    };

    const style = {
        width: "300",
        height: "300"
    }
 
    return (
        // <div style={{width:'500px',height:'500px'}}>
            <Line data={data}/>
        /* </div> */
  )
}

export default LineChart