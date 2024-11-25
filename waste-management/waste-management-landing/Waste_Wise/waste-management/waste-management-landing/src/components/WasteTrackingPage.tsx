'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Camera, Trash2, Recycle } from 'lucide-react'
import { motion, useAnimation } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import '../app/globals.css'

interface WasteEntry {
  id: string;
  category: string;
  weight: number;
  image: string | null;
  date: string;
}

const wasteCategories = [
  { value: 'organic', label: 'Organic', color: 'bg-green-500', icon: '🍃' },
  { value: 'recyclable', label: 'Recyclable', color: 'bg-blue-500', icon: '♻️' },
  { value: 'hazardous', label: 'Hazardous', color: 'bg-red-500', icon: '☢️' },
  { value: 'others', label: 'Others', color: 'bg-gray-500', icon: '🗑️' },
]

const BackgroundAnimation = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              width: Math.random() * 40 + 10,
              height: Math.random() * 40 + 10,
              borderRadius: '50%',
              backgroundColor: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
                Math.random() * 255
              }, 0.3)`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default function WasteTrackingPage() {
  const [wasteEntries, setWasteEntries] = useState<WasteEntry[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [weight, setWeight] = useState<string>('')
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      scale: [1, 1.05, 1],
      transition: { duration: 2, repeat: Infinity },
    })
  }, [controls])

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (selectedCategory && weight) {
      setIsSubmitting(true)
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const newEntry: WasteEntry = {
        id: Date.now().toString(),
        category: selectedCategory,
        weight: parseFloat(weight),
        image: imagePreview,
        date: new Date().toLocaleString(),
      }
      setWasteEntries(prevEntries => [newEntry, ...prevEntries])
      setSelectedCategory('')
      setWeight('')
      setImagePreview(null)
      setIsSubmitting(false)
    }
  }

  const getCategoryDetails = (categoryValue: string) => {
    return wasteCategories.find((c) => c.value === categoryValue) || { color: 'bg-gray-500', icon: '🗑️', label: 'Unknown' }
  }

  return (
    <div className="min-h-screen bg-gray-100 relative">
      <BackgroundAnimation />
      <header className="bg-green-800 text-white py-4 relative z-10">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Waste Tracking and Reporting</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Waste Logging Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Recycle className="mr-2 text-green-600" />
                  Log Waste
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Waste Category
                    </label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        {wasteCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.icon} {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
                      Weight (kg)
                    </label>
                    <Input
                      type="number"
                      id="weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Waste Image</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        {imagePreview ? (
                          <div className="relative w-full h-48">
                            <Image
                              src={imagePreview}
                              alt="Waste preview"
                              fill
                              style={{ objectFit: 'cover' }}
                              className="rounded-md"
                            />
                            <button
                              type="button"
                              onClick={() => setImagePreview(null)}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ) : (
                          <>
                            <Camera className="mx-auto h-12 w-12 text-gray-400" />
                            <div className="flex text-sm text-gray-600">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                              >
                                <span>Upload a file</span>
                                <input
                                  id="file-upload"
                                  name="file-upload"
                                  type="file"
                                  className="sr-only"
                                  accept="image/*"
                                  onChange={handleImageUpload}
                                />
                              </label>
                              <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Logging...' : 'Log Waste'}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Waste Entries List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Waste Logs</CardTitle>
              </CardHeader>
              <CardContent>
                {wasteEntries.length === 0 ? (
                  <p className="text-gray-500">No waste entries logged yet.</p>
                ) : (
                  <ul className="space-y-4">
                    {wasteEntries.map((entry) => {
                      const categoryDetails = getCategoryDetails(entry.category)
                      return (
                        <motion.li
                          key={entry.id}
                          className="bg-gray-50 p-4 rounded-md shadow"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="flex items-center justify-between">
                            <span
                              className={`${categoryDetails.color} text-white px-2 py-1 rounded-full text-sm`}
                            >
                              {categoryDetails.icon} {categoryDetails.label}
                            </span>
                            <span className="text-sm text-gray-500">{entry.date}</span>
                          </div>
                          <p className="mt-2 font-semibold">{entry.weight} kg</p>
                          {entry.image && (
                            <div className="mt-2 relative w-full h-32">
                              <Image
                                src={entry.image}
                                alt={`Waste image for ${categoryDetails.label}`}
                                fill
                                style={{ objectFit: 'cover' }}
                                className="rounded-md"
                              />
                            </div>
                          )}
                        </motion.li>
                      )
                    })}
                  </ul>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}