"use client"

import { useState, useEffect } from "react"
import { Lightbulb, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"

// Array of sustainability tips
const TIPS = [
  "Turn off lights when you leave a room to save energy.",
  "Use a reusable water bottle instead of buying plastic bottles.",
  "Take shorter showers to conserve water.",
  "Unplug electronics when not in use to reduce phantom energy usage.",
  "Use public transportation, bike, or walk instead of driving when possible.",
  "Buy local produce to reduce carbon emissions from transportation.",
  "Use a programmable thermostat to reduce heating and cooling when you're away.",
  "Compost food scraps to reduce landfill waste and create nutrient-rich soil.",
  "Use cloth napkins instead of paper napkins.",
  "Bring reusable bags when shopping to reduce plastic waste.",
  "Plant trees or support tree-planting organizations to offset carbon emissions.",
  "Reduce meat consumption, especially beef, to lower your carbon footprint.",
  "Fix leaky faucets to save water.",
  "Use natural cleaning products to reduce chemical pollution.",
  "Wash clothes in cold water to save energy.",
]

export default function SustainabilityTip({ isLoading }: { isLoading: boolean }) {
  // Get a random tip index
  const getRandomTipIndex = () => Math.floor(Math.random() * TIPS.length)

  // Initialize with a random tip
  const [tipIndex, setTipIndex] = useState(getRandomTipIndex())
  const [isRotating, setIsRotating] = useState(false)

  const getNewTip = () => {
    setIsRotating(true)

    // Get a new random tip (different from current)
    let newIndex
    do {
      newIndex = getRandomTipIndex()
    } while (newIndex === tipIndex)

    // Simulate loading delay
    setTimeout(() => {
      setTipIndex(newIndex)
      setIsRotating(false)
    }, 500)
  }

  useEffect(() => {
    if (!isLoading) {
      // Load the first random tip when not loading
      setTipIndex(getRandomTipIndex())
    }
  }, [isLoading]) // Runs whenever isLoading changes

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Sustainability Tip</CardTitle>
        <CardDescription>Daily eco-friendly advice</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-4/6" />
          </div>
        ) : (
          <div className="flex items-start space-x-4">
            <Lightbulb className="h-6 w-6 text-yellow-500 mt-0.5 shrink-0" />
            <p className="text-gray-700">{TIPS[tipIndex]}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          size="sm"
          className="ml-auto border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          onClick={getNewTip}
          disabled={isLoading || isRotating}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isRotating ? "animate-spin" : ""}`} />
          New Tip
        </Button>
      </CardFooter>
    </Card>
  )
}
