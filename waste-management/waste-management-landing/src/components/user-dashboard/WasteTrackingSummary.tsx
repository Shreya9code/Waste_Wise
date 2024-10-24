import Image from 'next/image'

const WasteTrackingSummary = ({ wasteEntries }: { wasteEntries: any[] }) => {
  return (
    <ul>
      {wasteEntries.length === 0 ? (
        <p>No waste logged yet.</p>
      ) : (
        wasteEntries.map(entry => (
          <li key={entry.id}>
            <div className="flex justify-between">
              <span>{entry.category}</span>
              <span>{entry.date}</span>
            </div>
            <p>{entry.weight} kg</p>
            {entry.image && (
              <Image src={entry.image} alt="Waste" width={100} height={100} />
            )}
          </li>
        ))
      )}
    </ul>
  )
}

export default WasteTrackingSummary
