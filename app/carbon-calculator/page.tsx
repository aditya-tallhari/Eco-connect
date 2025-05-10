"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import DashboardHeader from "@/components/dashboard-header"
import CarbonFootprintResult from "@/components/carbon-footprint-result"

export default function CarbonCalculatorPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("transportation")
  const [isCalculating, setIsCalculating] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const [formData, setFormData] = useState({
    transportation: {
      carType: "gasoline",
      milesDriven: 50,
      publicTransport: 5,
    },
    energy: {
      electricityUsage: 500,
      renewablePercentage: 20,
      gasUsage: 50,
    },
    diet: {
      dietType: "omnivore",
      localFoodPercentage: 30,
      foodWaste: 20,
    },
    waste: {
      recyclingRate: 50,
      compostingRate: 20,
      singleUseItems: 10,
    },
  })

  const [footprintResult, setFootprintResult] = useState({
    totalFootprint: 0,
    breakdown: {
      transportation: 0,
      energy: 0,
      diet: 0,
      waste: 0,
    },
    recommendations: [],
  })

  const handleInputChange = (category, field, value) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: value,
      },
    })
  }

  const handleRadioChange = (category, field, value) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: value,
      },
    })
  }

  const handleSliderChange = (category, field, value) => {
    setFormData({
      ...formData,
      [category]: {
        ...formData[category],
        [field]: value[0],
      },
    })
  }

  const calculateFootprint = () => {
    setIsCalculating(true)

    // Simulate API call or calculation
    setTimeout(() => {
      // Simple calculation logic (in a real app, this would be more complex)
      const transportationFootprint =
        formData.transportation.carType === "electric"
          ? formData.transportation.milesDriven * 0.1
          : formData.transportation.milesDriven * 0.3

      const energyFootprint =
        formData.energy.electricityUsage * (1 - formData.energy.renewablePercentage / 100) * 0.5 +
        formData.energy.gasUsage * 0.2

      const dietFootprint =
        formData.diet.dietType === "vegan" ? 50 : formData.diet.dietType === "vegetarian" ? 100 : 200

      const wasteFootprint = 100 - (formData.waste.recyclingRate + formData.waste.compostingRate) / 2

      const totalFootprint = transportationFootprint + energyFootprint + dietFootprint + wasteFootprint

      // Generate recommendations based on the highest contributors
      const recommendations = []

      if (formData.transportation.carType === "gasoline") {
        recommendations.push("Consider switching to an electric or hybrid vehicle to reduce emissions.")
      }

      if (formData.energy.renewablePercentage < 50) {
        recommendations.push("Increase your use of renewable energy sources or switch to a green energy provider.")
      }

      if (formData.diet.dietType === "omnivore") {
        recommendations.push("Try reducing meat consumption by having more plant-based meals each week.")
      }

      if (formData.waste.recyclingRate < 70) {
        recommendations.push("Improve your recycling habits and reduce single-use plastics.")
      }

      setFootprintResult({
        totalFootprint: Math.round(totalFootprint),
        breakdown: {
          transportation: Math.round(transportationFootprint),
          energy: Math.round(energyFootprint),
          diet: Math.round(dietFootprint),
          waste: Math.round(wasteFootprint),
        },
        recommendations:[],
      })

      setIsCalculating(false)
      setShowResults(true)

      toast({
        title: "Calculation Complete",
        description: "Your carbon footprint has been calculated.",
      })
    }, 1500)
  }

  const resetCalculator = () => {
    setShowResults(false)
    setActiveTab("transportation")
  }

  if (showResults) {
    return (
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />

        <main className="flex-1 py-6 bg-gray-50">
          <div className="container px-4 md:px-6 max-w-4xl mx-auto">
            <div className="mb-6">
              <Button variant="ghost" onClick={resetCalculator} className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Calculator
              </Button>
              <h1 className="text-3xl font-bold tracking-tight">Your Carbon Footprint Results</h1>
              <p className="text-gray-500">Based on your lifestyle choices</p>
            </div>

            <CarbonFootprintResult result={footprintResult} />

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={resetCalculator}
                variant="outline"
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                Recalculate
              </Button>
              <Link href="/dashboard">
                <Button className="bg-emerald-600 hover:bg-emerald-700 w-full sm:w-auto">Back to Dashboard</Button>
              </Link>
            </div>
          </div>
        </main>

        <footer className="border-t bg-white py-6">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              <p className="text-sm text-gray-500">© 2023 EcoConnect. All rights reserved.</p>
              <div className="flex items-center gap-4">
                <Link href="#" className="text-sm text-gray-500 hover:underline">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-gray-500 hover:underline">
                  Terms of Service
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 bg-gray-50">
        <div className="container px-4 md:px-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/dashboard">
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Carbon Footprint Calculator</h1>
            <p className="text-gray-500">Measure your environmental impact</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Calculate Your Carbon Footprint</CardTitle>
              <CardDescription>Answer questions about your lifestyle to estimate your carbon footprint</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-4 mb-8">
                  <TabsTrigger value="transportation">Transportation</TabsTrigger>
                  <TabsTrigger value="energy">Energy</TabsTrigger>
                  <TabsTrigger value="diet">Diet</TabsTrigger>
                  <TabsTrigger value="waste">Waste</TabsTrigger>
                </TabsList>

                <TabsContent value="transportation" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>What type of car do you drive?</Label>
                      <RadioGroup
                        value={formData.transportation.carType}
                        onValueChange={(value) => handleRadioChange("transportation", "carType", value)}
                        className="flex flex-col space-y-1 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="electric" id="car-electric" />
                          <Label htmlFor="car-electric">Electric</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="hybrid" id="car-hybrid" />
                          <Label htmlFor="car-hybrid">Hybrid</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="gasoline" id="car-gasoline" />
                          <Label htmlFor="car-gasoline">Gasoline</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>
                        How many miles do you drive per week?
                        <span className="ml-1 text-sm text-gray-500">
                          ({formData.transportation.milesDriven} miles)
                        </span>
                      </Label>
                      <Slider
                        value={[formData.transportation.milesDriven]}
                        min={0}
                        max={500}
                        step={5}
                        onValueChange={(value) => handleSliderChange("transportation", "milesDriven", value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        How many times do you use public transportation per week?
                        <span className="ml-1 text-sm text-gray-500">
                          ({formData.transportation.publicTransport} times)
                        </span>
                      </Label>
                      <Slider
                        value={[formData.transportation.publicTransport]}
                        min={0}
                        max={30}
                        step={1}
                        onValueChange={(value) => handleSliderChange("transportation", "publicTransport", value)}
                        className="mt-2"
                      />
                    </div>

                    <div className="flex justify-end">
                      <Button onClick={() => setActiveTab("energy")} className="bg-emerald-600 hover:bg-emerald-700">
                        Next
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="energy" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>
                        Monthly electricity usage (kWh)
                        <span className="ml-1 text-sm text-gray-500">({formData.energy.electricityUsage} kWh)</span>
                      </Label>
                      <Slider
                        value={[formData.energy.electricityUsage]}
                        min={0}
                        max={2000}
                        step={50}
                        onValueChange={(value) => handleSliderChange("energy", "electricityUsage", value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Percentage of renewable energy
                        <span className="ml-1 text-sm text-gray-500">({formData.energy.renewablePercentage}%)</span>
                      </Label>
                      <Slider
                        value={[formData.energy.renewablePercentage]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => handleSliderChange("energy", "renewablePercentage", value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Monthly natural gas usage (therms)
                        <span className="ml-1 text-sm text-gray-500">({formData.energy.gasUsage} therms)</span>
                      </Label>
                      <Slider
                        value={[formData.energy.gasUsage]}
                        min={0}
                        max={200}
                        step={5}
                        onValueChange={(value) => handleSliderChange("energy", "gasUsage", value)}
                        className="mt-2"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button onClick={() => setActiveTab("transportation")} variant="outline">
                        Previous
                      </Button>
                      <Button onClick={() => setActiveTab("diet")} className="bg-emerald-600 hover:bg-emerald-700">
                        Next
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="diet" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>What type of diet do you follow?</Label>
                      <RadioGroup
                        value={formData.diet.dietType}
                        onValueChange={(value) => handleRadioChange("diet", "dietType", value)}
                        className="flex flex-col space-y-1 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vegan" id="diet-vegan" />
                          <Label htmlFor="diet-vegan">Vegan</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="vegetarian" id="diet-vegetarian" />
                          <Label htmlFor="diet-vegetarian">Vegetarian</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="omnivore" id="diet-omnivore" />
                          <Label htmlFor="diet-omnivore">Omnivore</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>
                        Percentage of locally sourced food
                        <span className="ml-1 text-sm text-gray-500">({formData.diet.localFoodPercentage}%)</span>
                      </Label>
                      <Slider
                        value={[formData.diet.localFoodPercentage]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => handleSliderChange("diet", "localFoodPercentage", value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Food waste percentage
                        <span className="ml-1 text-sm text-gray-500">({formData.diet.foodWaste}%)</span>
                      </Label>
                      <Slider
                        value={[formData.diet.foodWaste]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => handleSliderChange("diet", "foodWaste", value)}
                        className="mt-2"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button onClick={() => setActiveTab("energy")} variant="outline">
                        Previous
                      </Button>
                      <Button onClick={() => setActiveTab("waste")} className="bg-emerald-600 hover:bg-emerald-700">
                        Next
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="waste" className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>
                        Recycling rate
                        <span className="ml-1 text-sm text-gray-500">({formData.waste.recyclingRate}%)</span>
                      </Label>
                      <Slider
                        value={[formData.waste.recyclingRate]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => handleSliderChange("waste", "recyclingRate", value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Composting rate
                        <span className="ml-1 text-sm text-gray-500">({formData.waste.compostingRate}%)</span>
                      </Label>
                      <Slider
                        value={[formData.waste.compostingRate]}
                        min={0}
                        max={100}
                        step={5}
                        onValueChange={(value) => handleSliderChange("waste", "compostingRate", value)}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Single-use items per week
                        <span className="ml-1 text-sm text-gray-500">({formData.waste.singleUseItems} items)</span>
                      </Label>
                      <Slider
                        value={[formData.waste.singleUseItems]}
                        min={0}
                        max={50}
                        step={1}
                        onValueChange={(value) => handleSliderChange("waste", "singleUseItems", value)}
                        className="mt-2"
                      />
                    </div>

                    <div className="flex justify-between">
                      <Button onClick={() => setActiveTab("diet")} variant="outline">
                        Previous
                      </Button>
                      <Button
                        onClick={calculateFootprint}
                        className="bg-emerald-600 hover:bg-emerald-700"
                        disabled={isCalculating}
                      >
                        {isCalculating ? "Calculating..." : "Calculate Footprint"}
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="border-t bg-white py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">© 2025 EcoConnect. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-gray-500 hover:underline">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
