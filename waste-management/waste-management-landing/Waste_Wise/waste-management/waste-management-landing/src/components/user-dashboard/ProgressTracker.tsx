const ProgressTracker = ({ wasteEntries }: { wasteEntries: any[] }) => {
    const totalWaste = wasteEntries.reduce((acc, entry) => acc + entry.weight, 0)
    const goal = 50 // Assume goal is to reduce 50kg of waste
    const progress = (totalWaste / goal) * 100
  
    return (
      <div>
        <p>Total Waste: {totalWaste} kg</p>
        <p>Goal: {goal} kg</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-green-500 h-2.5 rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    )
  }
  
  export default ProgressTracker
  