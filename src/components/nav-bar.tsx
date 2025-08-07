"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Plus, List, Moon, Sun } from "lucide-react"
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

export function NavBar() {
  const pathname = usePathname()
  const { user } = useUser()
  const router = useRouter();

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
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user?.user_metadata?.avatar_url} />
                <AvatarFallback>{user?.user_metadata?.name}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Meu Perfil</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem><button onClick={handleSignOut}>Sair</button></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}
