'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Leaf, Mail, Lock, User, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-green-800 text-white">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center text-white flex items-center justify-center">
              <Leaf className="mr-2 h-6 w-6 text-green-300" />
              WasteWise
            </CardTitle>
            <CardDescription className="text-center text-green-300">
              Join us in making a greener future
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-green-700">
                <TabsTrigger
                  value="login"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="register"
                  className="data-[state=active]:bg-green-600 data-[state=active]:text-white"
                >
                  Register
                </TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-green-300">Email</Label>
                      <Input id="email" placeholder="m@example.com" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-green-300">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-500 text-white" type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <motion.div
                          className="h-5 w-5 rounded-full border-t-2 border-r-2 border-green-500"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          Sign In <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-green-300">Name</Label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-green-300">Email</Label>
                      <Input id="email" placeholder="m@example.com" type="email" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-green-300">Password</Label>
                      <Input id="password" type="password" required />
                    </div>
                    <Button className="w-full bg-green-600 hover:bg-green-500 text-white" type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <motion.div
                          className="h-5 w-5 rounded-full border-t-2 border-r-2 border-green-500"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          Create Account <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <p className="text-center text-sm text-green-300 mt-2">
              By signing up, you agree to our{' '}
              <a href="#" className="text-green-400 hover:underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-green-400 hover:underline">
                Privacy Policy
              </a>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}