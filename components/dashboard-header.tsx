// Update the dashboard header to include a chat link
"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Leaf, Menu, MessageSquare, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function DashboardHeader() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b bg-white">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-2">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <div className="flex flex-col gap-6">
                <div className="flex items-center gap-2">
                  <Leaf className="h-6 w-6 text-emerald-600" />
                  <span className="text-xl font-semibold">EcoConnect</span>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    href="/dashboard"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <Link
                    href="/carbon-calculator"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Carbon Calculator
                  </Link>
                  <Link
                    href="/community"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Community
                  </Link>
                  <Link
                    href="/tips"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Sustainability Tips
                  </Link>
                  <Link
                    href="/chat"
                    className="text-sm font-medium hover:underline underline-offset-4"
                    onClick={() => setIsOpen(false)}
                  >
                    Chat
                  </Link>
                </nav>
              </div>
            </SheetContent>
          </Sheet>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-emerald-600" />
            <span className="text-xl font-semibold hidden md:inline">EcoConnect</span>
          </Link>
        </div>
        <nav className="hidden md:flex gap-4 sm:gap-6">
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="/carbon-calculator" className="text-sm font-medium hover:underline underline-offset-4">
            Carbon Calculator
          </Link>
          <Link href="/community" className="text-sm font-medium hover:underline underline-offset-4">
            Community
          </Link>
          <Link href="/tips" className="text-sm font-medium hover:underline underline-offset-4">
            Sustainability Tips
          </Link>
          <Link href="/chat" className="text-sm font-medium hover:underline underline-offset-4">
            Chat
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/chat">
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-emerald-500"></span>
              <span className="sr-only">Chat</span>
            </Button>
          </Link>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notifications</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
                <span className="sr-only">User menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href="/" className="w-full">
                  Logout
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
