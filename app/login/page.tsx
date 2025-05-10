"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase" // Make sure your firebase file is set up and exported correctly

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!email || !password) {
      setError("Please fill in all fields.")
      setLoading(false)
      return
    }

    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gradient-to-br from-emerald-500 to-emerald-700 text-white p-10"
      >
        <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
        <p className="text-lg text-white/80">
          Log in to continue your journey towards a greener future 🌍
        </p>
      </motion.div>

      {/* Right side */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-1 justify-center items-center p-8"
      >
        <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter your credentials below
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="rounded-lg">
                <Info className="h-5 w-5 text-destructive" />
                <AlertTitle className="ml-2 font-semibold">Login Error</AlertTitle>
                <AlertDescription className="ml-6">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>

              <Button
                type="submit"
                size="lg"
                className="w-full rounded-full mt-2"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-500">
              Don’t have an account?{" "}
              <Link href="/sign" className="font-semibold underline hover:text-primary">
                Create one
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
