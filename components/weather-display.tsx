"use client"

import { useState, useEffect } from "react"
import {
  Cloud,
  CloudRain,
  Loader2,
  MapPin,
  Sun,
  ThermometerSun,
} from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

export default function WeatherDisplay({ isLoading }) {
  const { toast } = useToast()
  const [weather, setWeather] = useState(null)
  const [locationName, setLocationName] = useState(null)
  const [loadingLocation, setLoadingLocation] = useState(true)

  useEffect(() => {
    const defaultLocation = {
      latitude: 37.7749,
      longitude: -122.4194,
      name: "Shirpur",
    }

    const fetchWeather = async ({ latitude, longitude, name }) => {
      setLoadingLocation(true)

      try {
        const apiKey = "6026aab618467cef4c0036018aadcc8d" // 🔁 Replace this with your OpenWeatherMap API key
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${apiKey}`
        )

        if (!res.ok) {
          throw new Error("Failed to fetch weather data")
        }

        const data = await res.json()

        setLocationName(name || data.name || "Unknown")
        setWeather({
          temperature: Math.round(data.main.temp),
          condition: data.weather[0].main,
          humidity: data.main.humidity,
          windSpeed: Math.round(data.wind.speed),
        })
      } catch (err) {
        console.error("Weather API error:", err)
        toast({
          title: "Weather Fetch Error",
          description: "Could not load real-time weather data.",
          variant: "destructive",
        })
      } finally {
        setLoadingLocation(false)
      }
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords
          fetchWeather({ latitude, longitude })
        },
        () => {
          toast({
            title: "Using default location",
            description: "Location access denied. Showing default city.",
          })
          fetchWeather(defaultLocation)
        }
      )
    } else {
      toast({
        title: "Geolocation not supported",
        description: "Using default city.",
      })
      fetchWeather(defaultLocation)
    }
  }, [toast])

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "Clear":
        return <Sun className="h-8 w-8 text-yellow-500" />
      case "Clouds":
        return <Cloud className="h-8 w-8 text-gray-500" />
      case "Rain":
        return <CloudRain className="h-8 w-8 text-blue-500" />
      default:
        return <ThermometerSun className="h-8 w-8 text-orange-500" />
    }
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Current Weather</CardTitle>
        <CardDescription>
          {loadingLocation || isLoading ? (
            <Skeleton className="h-4 w-32" />
          ) : (
            <div className="flex items-center">
              <MapPin className="h-3 w-3 mr-1" />
              {locationName}
            </div>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {loadingLocation || isLoading ? (
          <div className="flex flex-col space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton className="h-12 w-24" />
              <Skeleton className="h-12 w-12 rounded-full" />
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : weather ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold">{weather.temperature}°F</div>
              {getWeatherIcon(weather.condition)}
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="text-gray-500">Condition</div>
              <div className="font-medium text-right">{weather.condition}</div>
              <div className="text-gray-500">Humidity</div>
              <div className="font-medium text-right">{weather.humidity}%</div>
              <div className="text-gray-500">Wind</div>
              <div className="font-medium text-right">{weather.windSpeed} mph</div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
