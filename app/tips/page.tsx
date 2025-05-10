"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Bookmark, Filter, Leaf, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import DashboardHeader from "@/components/dashboard-header"

interface Tip {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: "Easy" | "Medium" | "Hard";
  impact: "Low" | "Medium" | "High";
}

const TIPS_DATA: Tip[] = [
  {
    id: 1,
    title: "Reduce Your Water Usage",
    description: "Install low-flow showerheads and faucets to reduce water consumption by up to 50%. Fix leaky faucets promptly - a dripping faucet can waste up to 3,000 gallons per year.",
    category: "Water",
    difficulty: "Easy",
    impact: "Medium",
  },
  {
    id: 2,
    title: "Switch to LED Lighting",
    description: "Replace incandescent bulbs with energy-efficient LED lights. They use at least 75% less energy and last up to 25 times longer.",
    category: "Energy",
    difficulty: "Easy",
    impact: "High",
  },
  {
    id: 3,
    title: "Use Public Transportation",
    description: "Reduce your carbon footprint by using buses, trains, or carpooling. It helps cut down greenhouse gas emissions and reduces traffic congestion.",
    category: "Transportation",
    difficulty: "Medium",
    impact: "High",
  },
  {
    id: 4,
    title: "Unplug Idle Electronics",
    description: "Even when turned off, electronics consume energy. Unplug chargers, TVs, and appliances when not in use to save electricity.",
    category: "Energy",
    difficulty: "Easy",
    impact: "Medium",
  },
  {
    id: 5,
    title: "Compost Your Food Waste",
    description: "Turn food scraps and yard waste into compost. It reduces landfill waste and enriches soil naturally.",
    category: "Waste",
    difficulty: "Medium",
    impact: "High",
  },
  {
    id: 6,
    title: "Buy Local and Seasonal Produce",
    description: "Support local farmers and reduce transportation emissions by buying seasonal fruits and vegetables grown near you.",
    category: "Food",
    difficulty: "Easy",
    impact: "Medium",
  }  
  // ... other tips
]

export default function TipsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedDifficulties, setSelectedDifficulties] = useState<("Easy" | "Medium" | "Hard")[]>([])
  const [selectedImpacts, setSelectedImpacts] = useState<("Low" | "Medium" | "High")[]>([])
  const [savedTips, setSavedTips] = useState<number[]>([])

  const filteredTips = TIPS_DATA.filter((tip) => {
    const matchesSearch =
      searchQuery === "" ||
      tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tip.description.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(tip.category)
    const matchesDifficulty = selectedDifficulties.length === 0 || selectedDifficulties.includes(tip.difficulty)
    const matchesImpact = selectedImpacts.length === 0 || selectedImpacts.includes(tip.impact)

    return matchesSearch && matchesCategory && matchesDifficulty && matchesImpact
  })

  const toggleSavedTip = (tipId: number) => {
    setSavedTips(prev => 
      prev.includes(tipId) 
        ? prev.filter(id => id !== tipId) 
        : [...prev, tipId]
    )
  }

  const categories = ["Energy", "Water", "Waste", "Food", "Transportation"]
  const difficulties: ("Easy" | "Medium" | "Hard")[] = ["Easy", "Medium", "Hard"]
  const impacts: ("Low" | "Medium" | "High")[] = ["Low", "Medium", "High"]

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="mb-6">
            <Link href="/dashboard" passHref>
              <Button variant="ghost" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Dashboard
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Sustainability Tips</h1>
            <p className="text-gray-500">Discover ways to live more sustainably</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search tips..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex gap-2">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <div className="p-2">
                  <h4 className="mb-2 text-sm font-medium">Categories</h4>
                  {categories.map((category) => (
                    <DropdownMenuCheckboxItem
                      key={category}
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={(checked) => {
                        setSelectedCategories(prev =>
                          checked
                            ? [...prev, category]
                            : prev.filter(c => c !== category)
                        )
                      }}
                    >
                      {category}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>

                <div className="p-2 border-t">
                  <h4 className="mb-2 text-sm font-medium">Difficulty</h4>
                  {difficulties.map((difficulty) => (
                    <DropdownMenuCheckboxItem
                      key={difficulty}
                      checked={selectedDifficulties.includes(difficulty)}
                      onCheckedChange={(checked) => {
                        setSelectedDifficulties(prev =>
                          checked
                            ? [...prev, difficulty]
                            : prev.filter(d => d !== difficulty)
                        )
                      }}
                    >
                      {difficulty}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>

                <div className="p-2 border-t">
                  <h4 className="mb-2 text-sm font-medium">Impact</h4>
                  {impacts.map((impact) => (
                    <DropdownMenuCheckboxItem
                      key={impact}
                      checked={selectedImpacts.includes(impact)}
                      onCheckedChange={(checked) => {
                        setSelectedImpacts(prev =>
                          checked
                            ? [...prev, impact]
                            : prev.filter(i => i !== impact)
                        )
                      }}
                    >
                      {impact}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {(selectedCategories.length > 0 || selectedDifficulties.length > 0 || selectedImpacts.length > 0) && (
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategories.map((category) => (
                <Badge key={category} variant="outline" className="flex items-center gap-1">
                  {category}
                  <button
                    onClick={() => setSelectedCategories(selectedCategories.filter((c) => c !== category))}
                    className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                  >
                    ✕
                  </button>
                </Badge>
              ))}

              {selectedDifficulties.map((difficulty) => (
                <Badge key={difficulty} variant="outline" className="flex items-center gap-1">
                  {difficulty}
                  <button
                    onClick={() => setSelectedDifficulties(selectedDifficulties.filter((d) => d !== difficulty))}
                    className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                  >
                    ✕
                  </button>
                </Badge>
              ))}

              {selectedImpacts.map((impact) => (
                <Badge key={impact} variant="outline" className="flex items-center gap-1">
                  {impact}
                  <button
                    onClick={() => setSelectedImpacts(selectedImpacts.filter((i) => i !== impact))}
                    className="ml-1 rounded-full hover:bg-gray-200 p-0.5"
                  >
                    ✕
                  </button>
                </Badge>
              ))}

              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setSelectedCategories([])
                  setSelectedDifficulties([])
                  setSelectedImpacts([])
                }}
                className="text-sm"
              >
                Clear all
              </Button>
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTips.map((tip) => (
              <Card key={tip.id}>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <Button
                      variant="ghost"
                      size="icon"
                      className={savedTips.includes(tip.id) ? "text-emerald-600" : ""}
                      onClick={() => toggleSavedTip(tip.id)}
                    >
                      <Bookmark className="h-5 w-5" />
                    </Button>
                  </div>
                  <div className="flex gap-2 mt-1">
                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                      {tip.category}
                    </Badge>
                    <Badge variant="outline">{tip.difficulty}</Badge>
                    <Badge
                      variant="outline"
                      className={
                        tip.impact === "High"
                          ? "bg-green-50 text-green-700 hover:bg-green-50"
                          : tip.impact === "Medium"
                            ? "bg-yellow-50 text-yellow-700 hover:bg-yellow-50"
                            : "bg-gray-50 text-gray-700 hover:bg-gray-50"
                      }
                    >
                      {tip.impact} Impact
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{tip.description}</p>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Learn More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredTips.length === 0 && (
            <div className="text-center py-12">
              <Leaf className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium">No tips found</h3>
              <p className="text-gray-500">Try adjusting your filters or search query</p>
            </div>
          )}
        </div>
      </main>

      <footer className="border-t bg-white py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-gray-500">© 2025 EcoConnect. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <Link href="#" passHref>
                <span className="text-sm text-gray-500 hover:underline">Privacy Policy</span>
              </Link>
              <Link href="#" passHref>
                <span className="text-sm text-gray-500 hover:underline">Terms of Service</span>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}