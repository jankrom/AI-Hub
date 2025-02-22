"use client"

import { createClient } from "@/utils/supabase/client"
import Link from "next/link"
import TypewriterComponent from "typewriter-effect"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import Image from "next/image"

const LandingHero = () => {
  const [isSignedIn, setIsSignedIn] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      setIsSignedIn(!user ? false : true)
    }

    getUser()
  }, [])

  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>The Best AI Tool for</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Chatbot",
                "Photo Generation",
                "Music Generation",
                "Code Generation",
                "Video Generation",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
      </div>
      <div className="text-sm md:text-xl font-light text-zinc-400">
        Create content using AI 10x faster
      </div>
      <div>
        <Link href={isSignedIn ? "/dashboard" : "singup"}>
          <Button
            variant="premium"
            className="md:text-lg p-4 md:p-6 rounded-full font-semibold"
          >
            Start Generating For Free
          </Button>
        </Link>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required
      </div>
      <div className="w-full flex justify-center rounded-lg">
        <Image
          className="rounded-2xl mt-10"
          width={1024}
          height={632}
          alt="Example of what website will look like"
          src="/Hero-Image.png"
        />
      </div>
    </div>
  )
}
export default LandingHero
