"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, List, Moon, Sun, Menu, X } from "lucide-react"
import { ModeToggle } from "./ui/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useUser } from "@/context/auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabase } from "../../lib/supaBaseClient"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import logo from "../../public/logo.png"
import Image from "next/image"
import { User } from "lucide-react"
export function NavBar() {
  const pathname = usePathname()
  const { user } = useUser()
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false)

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error);
      return;
    }

    router.push('/login');
  };

  return (
    <nav className="flex flex-row justify-center items-center w-full border-b-1">
      <div className="flex flex-row w-[90%] h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={logo} alt="Logo" className="rounded-full" width={32} height={32} />
          <span className="text-xl font-bold">TripMemories</span>
        </Link>

        <div className="hidden md:flex items-center space-x-4">
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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>
                  <span className="flex items-center justify-center w-full h-full">
                  <User className="h-4 w-4" />
                  </span>
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><button className="text-start w-full" onClick={handleSignOut}>Sair</button></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="md:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTitle></SheetTitle>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col items-center w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8 w-full p-4">
                <Button 
                  variant={pathname === "/" ? "default" : "ghost"} 
                  size="sm" 
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/" className="justify-start">
                    <List className="h-4 w-4 mr-2" />
                    <span>Viagens</span>
                  </Link>
                </Button>

                <Button 
                  variant={pathname === "/create" ? "default" : "ghost"} 
                  size="sm" 
                  asChild
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/create" className="justify-start">
                    <Plus className="h-4 w-4 mr-2" />
                    <span>Criar</span>
                  </Link>
                </Button>

                <div className="flex flex-row justify-start items-center gap-2">
                  <ModeToggle />
                  <span className="text-sm font-medium">Tema</span>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <Avatar>
                      <AvatarImage src={user?.user_metadata?.avatar_url} />
                      <AvatarFallback>{user?.user_metadata?.name}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{user?.user_metadata?.name}</p>
                      <p className="text-xs text-muted-foreground">{user?.email}</p>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full justify-start text-red-600 hover:text-red-700"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    Sair
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}