"use client"

import { useEffect } from "react"
import { Crisp } from "crisp-sdk-web"

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("a153b291-5a6f-4853-aff3-65e795b6295a")
  })

  return null
}
export default CrispChat
