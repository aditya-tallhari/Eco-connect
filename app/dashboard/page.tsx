"use client"

import { useState, useEffect } from "react"
import React from "react";
import { StatCardProps,QuickActionCardProps,ActivityItemProps,EventItemProps,ResourceItemProps,ChallengeCardProps,AchievementCardProps } from '../types';
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  Award,
  BarChart3,
  Bell,
  Calendar,
  CheckCircle,
  ChevronRight,
  Clock,
  Leaf,
  LightbulbIcon,
  MessageSquare,
  ShoppingBag,
  Sparkles,
  Target,
  Trash2,
  TrendingUp,
  Users,
  Wind,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import WeatherDisplay from "@/components/weather-display"
import SustainabilityTip from "@/components/sustainability-tip"
import DashboardHeader from "@/components/dashboard-header"

export default function DashboardPage() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [progress, setProgress] = useState(65)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />

      <main className="flex-1 py-6 bg-gray-50">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Welcome, Eco Warrior!</h1>
                <p className="text-gray-500">Track your impact and make a difference today.</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  <Calendar className="mr-2 h-4 w-4" />
                  April 2025
                </Button>
                <Button variant="outline" size="sm" className="border-emerald-200 text-emerald-700 hover:bg-emerald-50">
                  <Bell className="h-4 w-4" />
                  <span className="sr-only">Notifications</span>
                </Button>
              </div>
            </div>

            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid grid-cols-3 md:w-[400px]">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="challenges">Challenges</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <Card className="bg-gradient-to-br from-emerald-50 to-white">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Eco Score</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <Skeleton className="h-12 w-full" />
                      ) : (
                        <div className="flex flex-col space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold">{progress}/100</span>
                            <Badge variant="outline" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                              +5 pts this week
                            </Badge>
                          </div>
                          <Progress
                            value={progress}
                            className="h-2 bg-emerald-100"
                            indicatorClassName="bg-emerald-600"
                          />
                          <p className="text-xs text-gray-500">Your eco-friendliness score is improving!</p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <StatCard
                    title="Carbon Footprint"
                    value="125 kg"
                    description="Saved this month"
                    icon={<Wind className="h-5 w-5" />}
                    trend="-12% from last month"
                    trendUp={false}
                    isLoading={isLoading}
                  />

                  <StatCard
                    title="Community Rank"
                    value="#42"
                    description="Out of 1,045 members"
                    icon={<Users className="h-5 w-5" />}
                    trend="+5 positions this week"
                    trendUp={true}
                    isLoading={isLoading}
                  />

                  <StatCard
                    title="Eco Purchases"
                    value="12"
                    description="Made this month"
                    icon={<ShoppingBag className="h-5 w-5" />}
                    trend="+3 from last month"
                    trendUp={true}
                    isLoading={isLoading}
                  />
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <WeatherDisplay isLoading={isLoading} />
                  <SustainabilityTip isLoading={isLoading} />
                </div>

                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Current Challenge</CardTitle>
                      <CardDescription>Ends in 3 days</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-5/6" />
                          <Skeleton className="h-4 w-4/6" />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                              <Trash2 className="h-5 w-5 text-emerald-600" />
                            </div>
                            <div>
                              <h3 className="font-medium">Zero Waste Week</h3>
                              <p className="text-sm text-gray-500">Reduce your waste by avoiding single-use plastics</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span className="font-medium">4/7 days</span>
                            </div>
                            <Progress value={57} className="h-2" />
                          </div>
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant="outline"
                        className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        View Details
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription>Your latest eco actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <ActivityItem
                            icon={<CheckCircle className="h-4 w-4 text-emerald-600" />}
                            title="Completed daily challenge"
                            description="Used reusable shopping bags"
                            time="2 hours ago"
                          />
                          <ActivityItem
                            icon={<BarChart3 className="h-4 w-4 text-blue-600" />}
                            title="Updated carbon footprint"
                            description="Reduced by 2.3 kg CO₂"
                            time="Yesterday"
                          />
                          <ActivityItem
                            icon={<Award className="h-4 w-4 text-yellow-600" />}
                            title="Earned new badge"
                            description="Water Conservation Expert"
                            time="2 days ago"
                          />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full text-emerald-700 hover:bg-emerald-50">
                        View All Activity
                      </Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Upcoming Events</CardTitle>
                      <CardDescription>Environmental activities near you</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <EventItem title="Beach Cleanup" date="Apr 15, 2025" location="Ocean Beach" />
                          <EventItem
                            title="Sustainable Living Workshop"
                            date="Apr 22, 2025"
                            location="Community Center"
                          />
                          <EventItem title="Tree Planting Day" date="May 8, 2025" location="City Park" />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Link href="/community" className="w-full">
                        <Button
                          variant="outline"
                          className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                        >
                          View All Events
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Carbon Footprint Trends</CardTitle>
                      <CardDescription>Your impact over time</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] flex items-center justify-center">
                      {isLoading ? (
                        <Skeleton className="h-full w-full" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image
                            src="/foot.jpg?height=300&width=500&text=Carbon+Footprint+Chart"
                            width={500}
                            height={300}
                            alt="Carbon Footprint Chart"
                            className="rounded-md"
                          />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Link href="/carbon-calculator" className="w-full">
                        <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Update Carbon Footprint</Button>
                      </Link>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Resource Library</CardTitle>
                      <CardDescription>Recommended reading</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {isLoading ? (
                        <div className="space-y-4">
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                          <Skeleton className="h-12 w-full" />
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <ResourceItem
                            title="How to Reduce Your Carbon Footprint at Home"
                            type="Article"
                            readTime="5 min read"
                          />
                          <ResourceItem
                            title="The Impact of Fast Fashion on the Environment"
                            type="Guide"
                            readTime="10 min read"
                          />
                          <ResourceItem
                            title="Sustainable Eating: A Beginner's Guide"
                            type="Guide"
                            readTime="8 min read"
                          />
                        </div>
                      )}
                    </CardContent>
                    <CardFooter>
                      <Button variant="ghost" size="sm" className="w-full text-emerald-700 hover:bg-emerald-50">
                        Browse Library
                      </Button>
                    </CardFooter>
                  </Card>
                </div>

                <div className="grid gap-6 md:grid-cols-4">
                  <QuickActionCard
                    title="Carbon Calculator"
                    description="Calculate your carbon footprint"
                    icon={<BarChart3 className="h-5 w-5 text-emerald-600" />}
                    href="/carbon-calculator"
                    isLoading={isLoading}
                  />
                  <QuickActionCard
                    title="Community"
                    description="Connect with eco-minded people"
                    icon={<Users className="h-5 w-5 text-emerald-600" />}
                    href="/community"
                    isLoading={isLoading}
                  />
                  <QuickActionCard
                    title="Sustainability Tips"
                    description="Discover ways to live greener"
                    icon={<LightbulbIcon className="h-5 w-5 text-emerald-600" />}
                    href="/tips"
                    isLoading={isLoading}
                  />
                  <QuickActionCard
                    title="Chat"
                    description="Real-time conversations"
                    icon={<MessageSquare className="h-5 w-5 text-emerald-600" />}
                    href="/chat"
                    isLoading={isLoading}
                  />
                </div>
              </TabsContent>

              <TabsContent value="challenges" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  <ChallengeCard
                    title="Zero Waste Week"
                    description="Reduce your waste by avoiding single-use plastics"
                    icon={<Trash2 className="h-5 w-5 text-emerald-600" />}
                    progress={57}
                    daysLeft={3}
                    points={50}
                    isActive={true}
                    isLoading={isLoading}
                  />
                  <ChallengeCard
                    title="Plant-Based Diet"
                    description="Try eating plant-based meals for a week"
                    icon={<Leaf className="h-5 w-5 text-emerald-600" />}
                    progress={0}
                    daysLeft={7}
                    points={75}
                    isActive={false}
                    isLoading={isLoading}
                  />
                  <ChallengeCard
                    title="Energy Saver"
                    description="Reduce your electricity usage by 20%"
                    icon={<Sparkles className="h-5 w-5 text-emerald-600" />}
                    progress={0}
                    daysLeft={14}
                    points={100}
                    isActive={false}
                    isLoading={isLoading}
                  />
                  <ChallengeCard
                    title="Water Conservation"
                    description="Reduce your water usage by taking shorter showers"
                    icon={<Wind className="h-5 w-5 text-emerald-600" />}
                    progress={0}
                    daysLeft={10}
                    points={60}
                    isActive={false}
                    isLoading={isLoading}
                  />
                  <ChallengeCard
                    title="Sustainable Transportation"
                    description="Use public transport or bike instead of driving"
                    icon={<Wind className="h-5 w-5 text-emerald-600" />}
                    progress={0}
                    daysLeft={21}
                    points={80}
                    isActive={false}
                    isLoading={isLoading}
                  />
                  <Card className="border-dashed border-2 border-gray-200 bg-gray-50/50">
                    <CardContent className="flex flex-col items-center justify-center h-full py-6">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
                        <Plus className="h-6 w-6 text-emerald-600" />
                      </div>
                      <h3 className="font-medium text-center">Create Custom Challenge</h3>
                      <p className="text-sm text-gray-500 text-center mt-2">
                        Design your own eco-challenge based on your lifestyle
                      </p>
                      <Button className="mt-4 bg-emerald-600 hover:bg-emerald-700">Create Challenge</Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="achievements" className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  <AchievementCard
                    title="Carbon Reducer"
                    description="Reduced carbon footprint by 50kg"
                    icon={<Award className="h-6 w-6 text-yellow-500" />}
                    date="Apr 10, 2025"
                    isLocked={false}
                    isLoading={isLoading}
                  />
                  <AchievementCard
                    title="Community Leader"
                    description="Participated in 5 community events"
                    icon={<Users className="h-6 w-6 text-blue-500" />}
                    date="Mar 22, 2025"
                    isLocked={false}
                    isLoading={isLoading}
                  />
                  <AchievementCard
                    title="Eco Shopper"
                    description="Made 10 sustainable purchases"
                    icon={<ShoppingBag className="h-6 w-6 text-green-500" />}
                    date="Mar 15, 2025"
                    isLocked={false}
                    isLoading={isLoading}
                  />
                  <AchievementCard
                    title="Challenge Champion"
                    description="Completed 3 eco challenges"
                    icon={<Target className="h-6 w-6 text-purple-500" />}
                    date="Feb 28, 2025"
                    isLocked={false}
                    isLoading={isLoading}
                  />
                  <AchievementCard
                    title="Water Warrior"
                    description="Reduced water usage by 20%"
                    icon={<Wind className="h-6 w-6 text-blue-500" />}
                    date="Feb 15, 2025"
                    isLocked={false}
                    isLoading={isLoading}
                  />
                  <AchievementCard
                    title="Energy Master"
                    description="Reduced energy usage by 30%"
                    icon={<Sparkles className="h-6 w-6 text-yellow-500" />}
                    date="Jan 30, 2025"
                    isLocked={false}
                    isLoading={isLoading}
                  />
                  <AchievementCard
                    title="Zero Waste Hero"
                    description="Went zero waste for 7 days"
                    icon={<Trash2 className="h-6 w-6 text-green-500" />}
                    date="Jan 15, 2025"
                    isLocked={false}
                    isLoading={isLoading}
                  />
                  <AchievementCard
                    title="Eco Influencer"
                    description="Referred 5 friends to join EcoConnect"
                    icon={<Users className="h-6 w-6 text-indigo-500" />}
                    date=""
                    isLocked={true}
                    isLoading={isLoading}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>
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

function StatCard({ title, value, description, icon, trend, trendUp, isLoading }: StatCardProps){
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className="h-5 w-5 text-emerald-600">{icon}</div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <>
            <Skeleton className="h-7 w-24 mb-1" />
            <Skeleton className="h-4 w-32" />
          </>
        ) : (
          <>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-gray-500">{description}</p>
            <div className={`flex items-center mt-2 text-xs ${trendUp ? "text-green-600" : "text-red-600"}`}>
              {trendUp ? (
                <TrendingUp className="h-3 w-3 mr-1" />
              ) : (
                <TrendingUp className="h-3 w-3 mr-1 transform rotate-180" />
              )}
              {trend}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}

function QuickActionCard({ title, description, icon, href, isLoading }:QuickActionCardProps) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-9 w-28" />
        ) : (
          <Link href={href}>
            <Button className="bg-emerald-600 hover:bg-emerald-700 w-full">
              Go <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}

function ActivityItem({ icon, title, description, time }:ActivityItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-0.5">{icon}</div>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="text-xs text-gray-500 whitespace-nowrap flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          {time}
        </div>
      </div>
    </div>
  )
}

function EventItem({ title, date, location }:EventItemProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded bg-emerald-100 flex items-center justify-center text-emerald-600">
        <Calendar className="h-5 w-5" />
      </div>
      <div className="flex-1 space-y-1">
        <p className="font-medium leading-none">{title}</p>
        <div className="flex items-center text-xs text-gray-500">
          <Clock className="h-3 w-3 mr-1" />
          {date}
        </div>
        <div className="flex items-center text-xs text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 mr-1"
          >
            <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          {location}
        </div>
      </div>
    </div>
  )
}

function ResourceItem({ title, type, readTime }:ResourceItemProps ) {
  return (
    <div className="flex items-start gap-4">
      <div className="h-10 w-10 rounded bg-emerald-100 flex items-center justify-center text-emerald-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      </div>
      <div className="flex-1 space-y-1">
        <p className="font-medium leading-none">{title}</p>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {type}
          </Badge>
          <span className="text-xs text-gray-500">{readTime}</span>
        </div>
      </div>
      <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
}

function ChallengeCard({ title, description, icon, progress, daysLeft, points, isActive, isLoading }:ChallengeCardProps) {
  return (
    <Card className={isActive ? "border-emerald-200 bg-emerald-50/50" : ""}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">{icon}</div>
            <CardTitle className="text-base">{title}</CardTitle>
          </div>
          <Badge variant="outline" className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
            {points} pts
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-2 w-full" />
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{daysLeft} days left</span>
              {isActive ? <span className="text-emerald-600 font-medium">In Progress</span> : <span>Not Started</span>}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          className={
            isActive
              ? "w-full bg-emerald-600 hover:bg-emerald-700"
              : "w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50"
          }
          variant={isActive ? "default" : "outline"}
        >
          {isActive ? "Continue Challenge" : "Start Challenge"}
        </Button>
      </CardFooter>
    </Card>
  )
}

function AchievementCard({ title, description, icon, date, isLocked, isLoading }:AchievementCardProps) {
  return (
    <Card className={isLocked ? "bg-gray-50 border-dashed" : ""}>
      <CardContent className="pt-6">
        {isLoading ? (
          <div className="flex flex-col items-center text-center space-y-2">
            <Skeleton className="h-16 w-16 rounded-full" />
            <Skeleton className="h-4 w-24 mt-2" />
            <Skeleton className="h-3 w-32" />
          </div>
        ) : (
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center mb-2">
              {isLocked ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-8 w-8 text-gray-400"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              ) : (
                icon
              )}
            </div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-xs text-gray-500">{description}</p>
            {!isLocked && date && (
              <Badge variant="outline" className="mt-2">
                Earned {date}
              </Badge>
            )}
            {isLocked && (
              <Badge variant="outline" className="bg-gray-100 text-gray-500 mt-2">
                Locked
              </Badge>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function Plus({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14"></path>
      <path d="M12 5v14"></path>
    </svg>
  );
}

