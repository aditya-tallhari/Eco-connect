"use client";

import { Check, Info } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define types for the result prop
interface CarbonFootprintResultProps {
  result: {
    totalFootprint: number;
    breakdown: Record<string, number>;
    recommendations: string[];
  };
}

export default function CarbonFootprintResult({ result }: CarbonFootprintResultProps) {
  // Calculate the percentage for the progress circle
  const calculatePercentage = (value: number, max = 500) => {
    const percentage = (value / max) * 100;
    return Math.min(percentage, 100); // Cap at 100%
  };

  // Get color based on footprint value
  const getFootprintColor = (value: number) => {
    if (value < 150) return "text-green-500";
    if (value < 300) return "text-yellow-500";
    return "text-red-500";
  };

  // Get category color
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "transportation":
        return "text-blue-500";
      case "energy":
        return "text-yellow-500";
      case "diet":
        return "text-green-500";
      case "waste":
        return "text-purple-500";
      default:
        return "text-gray-500";
    }
  };

  // Get category label
  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "transportation":
        return "Transportation";
      case "energy":
        return "Energy";
      case "diet":
        return "Diet";
      case "waste":
        return "Waste";
      default:
        return category;
    }
  };

  // Calculate the circumference of the circle
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  // Calculate the dash offset based on the percentage
  const percentage = calculatePercentage(result.totalFootprint);
  const dashOffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Your Carbon Footprint</CardTitle>
          <CardDescription>Based on your lifestyle choices</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <div className="relative w-40 h-40 mb-4">
            <svg className="w-full h-full" viewBox="0 0 150 150">
              {/* Background circle */}
              <circle cx="75" cy="75" r={radius} fill="none" stroke="#e6e6e6" strokeWidth="12" />
              {/* Progress circle */}
              <circle
                cx="75"
                cy="75"
                r={radius}
                fill="none"
                stroke={percentage < 50 ? "#10b981" : percentage < 75 ? "#f59e0b" : "#ef4444"}
                strokeWidth="12"
                strokeDasharray={circumference}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                transform="rotate(-90 75 75)"
              />
              {/* Text in the middle */}
              <text
                x="75"
                y="75"
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="24"
                fontWeight="bold"
                className={getFootprintColor(result.totalFootprint)}
              >
                {result.totalFootprint}
              </text>
              <text x="75" y="95" textAnchor="middle" dominantBaseline="middle" fontSize="12" fill="#6b7280">
                kg CO₂e
              </text>
            </svg>
          </div>

          <div className="text-center mb-6">
            <h3 className="text-lg font-semibold mb-1">Your Carbon Rating</h3>
            <p className="text-gray-500">
              {result.totalFootprint < 150
                ? "Excellent! Your carbon footprint is low."
                : result.totalFootprint < 300
                ? "Good. There's room for improvement."
                : "High. Consider making lifestyle changes."}
            </p>
          </div>

          <div className="w-full space-y-2">
            <h4 className="font-medium text-sm text-gray-500 mb-2">BREAKDOWN</h4>
            {Object.entries(result.breakdown).map(([category, value]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full ${getCategoryColor(category).replace("text-", "bg-")} mr-2`}
                  ></div>
                  <span>{getCategoryLabel(category)}</span>
                </div>
                <span className="font-medium">{value} kg</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Ways to reduce your carbon footprint</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {result.recommendations.map((recommendation, index) => (
              <Alert key={index}>
                <Check className="h-4 w-4 text-emerald-600" />
                <AlertTitle className="ml-2 text-emerald-600 font-medium">Eco Tip {index + 1}</AlertTitle>
                <AlertDescription className="ml-6">{recommendation}</AlertDescription>
              </Alert>
            ))}

            {result.recommendations.length === 0 && (
              <Alert>
                <Info className="h-4 w-4" />
                <AlertTitle className="ml-2 font-medium">Great Job!</AlertTitle>
                <AlertDescription className="ml-6">
                  You're already making excellent eco-friendly choices. Keep up the good work!
                </AlertDescription>
              </Alert>
            )}

            <div className="pt-4">
              <h3 className="font-medium mb-2">General Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-emerald-600 mt-1 mr-2" />
                  <span>Use public transportation, bike, or walk when possible</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-emerald-600 mt-1 mr-2" />
                  <span>Reduce meat consumption, especially beef</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-emerald-600 mt-1 mr-2" />
                  <span>Use energy-efficient appliances and LED light bulbs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-emerald-600 mt-1 mr-2" />
                  <span>Properly insulate your home to reduce heating and cooling needs</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-emerald-600 mt-1 mr-2" />
                  <span>Reduce, reuse, and recycle whenever possible</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
