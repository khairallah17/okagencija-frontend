import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    ArcElement, Tooltip, Legend
)

const data = {
    labels: [
      'capital',
      'profit',
      'other'
    ],
    datasets: [{
      label: 'My First Dataset',
      data: [300, 50, 100],
      backgroundColor: [
        '#65CB49',
        '#439FE3',
        '#D1D5DB'
      ],
      hoverOffset: 4
    }]
  };

const DoughnutChart = () => {
  return (
    <div>
        <Doughnut data={data} />
    </div>
  )
}

export default DoughnutChart