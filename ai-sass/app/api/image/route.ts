import { NextResponse } from "next/server"
import { OpenAI } from "openai"

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit"

const openai = new OpenAI()

export async function POST(req: Request) {
  try {
    const { prompt, amount = 1, resolution = "512x512" } = await req.json()

    if (!prompt) return new NextResponse("Prompt is required", { status: 400 })

    if (!amount) return new NextResponse("Amount is required", { status: 400 })

    if (!resolution)
      return new NextResponse("Resolution is required", { status: 400 })

    const freeTrial = await checkApiLimit()

    if (!freeTrial)
      return new NextResponse("Free trial has expired.", { status: 403 })

    const response = await openai.images.generate({
      model: "dall-e-2",
      prompt,
      n: parseInt(amount, 10),
      size: resolution,
    })

    await increaseApiLimit()

    return NextResponse.json(response.data)
  } catch (error) {
    console.log(error)

    return new NextResponse(error.error.message, { status: 500 })
  }
}