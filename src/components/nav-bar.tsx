"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, List, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { ModeToggle } from "./ui/mode-toggle"


export function NavBar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="flex flex-row items-center justify-center w-full border-b-1">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary"></div>
          <span className="text-xl font-bold">TripMemory</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button variant={pathname === "/" ? "default" : "ghost"} size="sm" asChild>
            <Link href="/">
              <List className="h-4 w-4 mr-2" />
              Trips
            </Link>
          </Button>

          <Button variant={pathname === "/create" ? "default" : "ghost"} size="sm" asChild>
            <Link href="#">
              <Plus className="h-4 w-4 mr-2" />
              Create
            </Link>
          </Button>

          <ModeToggle/>
        </div>
      </div>
    </nav>
  )
}
