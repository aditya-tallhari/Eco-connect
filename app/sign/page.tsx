"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { auth } from "@/lib/firebase"

export default function SignUpForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.")
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      setLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)

      // Update display name
      if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        })
      }

      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.")
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
        <h1 className="text-4xl font-bold mb-4">Join EcoConnect</h1>
        <p className="text-lg text-white/80 text-center">
          Start your journey toward a sustainable lifestyle 🌱
        </p>
      </motion.div>

      {/* Right side (sign up form) */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="flex flex-1 justify-center items-center p-8"
      >
        <Card className="w-full max-w-md shadow-2xl rounded-2xl border border-gray-200">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Enter your details below to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <Alert variant="destructive" className="rounded-lg">
                <Info className="h-5 w-5 text-destructive" />
                <AlertTitle className="ml-2 font-semibold">Signup Error</AlertTitle>
                <AlertDescription className="ml-6">{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-lg"
                />
              </div>

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

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
                {loading ? "Creating Account..." : "Sign Up"}
              </Button>
            </form>

            <div className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <a href="/login" className="font-semibold underline hover:text-primary">
                Sign In
              </a>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
