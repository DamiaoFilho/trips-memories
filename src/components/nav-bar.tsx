"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, List, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { ModeToggle } from "./ui/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function NavBar() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()

  return (
    <nav className="flex flex-row justify-center items-center w-full border-b-1">
      <div className="flex flex-row w-[90%] h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-primary"></div>
          <span className="text-xl font-bold">TripMemories</span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button variant={pathname === "/" ? "default" : "ghost"} size="sm" asChild>
            <Link href="/">
              <List className="h-4 w-4" />
              <span className="align-middle">Viagens</span>
            </Link>
          </Button>

          <Button variant={pathname === "/create" ? "default" : "ghost"} size="sm" asChild>
            <Link href="/create">
              <Plus className="h-4 w-4" />
              <span>Criar</span>
            </Link>
          </Button>

          <ModeToggle />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </nav>
  )
}
