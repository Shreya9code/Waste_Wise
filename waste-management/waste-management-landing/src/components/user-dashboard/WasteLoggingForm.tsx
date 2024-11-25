import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const wasteCategories = [
  { value: 'organic', label: 'Organic' },
  { value: 'recyclable', label: 'Recyclable' },
  { value: 'hazardous', label: 'Hazardous' },
  { value: 'others', label: 'Others' },
]

const WasteLoggingForm = ({ onSubmit }: { onSubmit: (entry: any) => void }) => {
  const [category, setCategory] = useState('')
  const [weight, setWeight] = useState('')
  const [image, setImage] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (category && weight) {
      const newEntry = {
        id: Date.now().toString(),
        category,
        weight: parseFloat(weight),
        image,
        date: new Date().toLocaleString(),
      }
      onSubmit(newEntry)
      setCategory('')
      setWeight('')
      setImage(null)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {wasteCategories.map(c => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label>Weight (kg)</label>
        <Input
          type="number"
          min="0"
          value={weight}
          onChange={e => setWeight(e.target.value)}
        />
      </div>

      <Button type="submit">Log Waste</Button>
    </form>
  )
}

export default WasteLoggingForm
