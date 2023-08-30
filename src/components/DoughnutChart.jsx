import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    ArcElement, Tooltip, Legend
)


const DoughnutChart = ({capital_profit}) => {
  
  let profit = capital_profit.map(({ profit }) => profit)
  let capital = capital_profit.map(({ capital }) => capital)

  profit = profit.reduce((a, b) => a + b, 0)
  capital = capital.reduce((a, b) => a + b, 0)

  let percent = (((capital + profit) * 30) / 100)
  console.log(percent)

  const data = {
      labels: [
        'capital',
        'profit',
        'other'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [capital, profit, percent],
        backgroundColor: [
          '#65CB49',
          '#439FE3',
          '#D1D5DB'
        ],
        hoverOffset: 4
      }]
    };
  
    return (
    <div>
        <Doughnut data={data} />
    </div>
  )
}

export default DoughnutChart