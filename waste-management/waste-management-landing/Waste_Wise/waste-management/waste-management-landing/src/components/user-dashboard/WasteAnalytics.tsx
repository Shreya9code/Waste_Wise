import { Pie } from 'react-chartjs-2'

const WasteAnalytics = ({ wasteEntries }: { wasteEntries: any[] }) => {
  const categories = ['organic', 'recyclable', 'hazardous', 'others']
  const data = categories.map(cat => 
    wasteEntries.filter(entry => entry.category === cat).length
  )

  const chartData = {
    labels: categories,
    datasets: [{
      data,
      backgroundColor: ['#34D399', '#60A5FA', '#F87171', '#9CA3AF']
    }]
  }

  return <Pie data={chartData} />
}

export default WasteAnalytics
