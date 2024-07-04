"use client"

import { CircleUserIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout } from "@/app/(auth)/login/actions"
import MobileSidebar from "./mobile-sidebar"

interface Props {
  apiLimitCount: number
}

const Navbar = async ({ apiLimitCount }: Props) => {
  return (
    <div className="flex items-center p-4">
      <MobileSidebar apiLimitCount={apiLimitCount} />
      <div className="flex w-full justify-end">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <CircleUserIcon size="45" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => logout()}
              className="cursor-pointer"
            >
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
export default Navbar
