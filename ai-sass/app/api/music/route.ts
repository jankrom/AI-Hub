import { NextResponse } from "next/server"
import Replicate from "replicate"

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json()

    if (!prompt) return new NextResponse("Prompt is required", { status: 400 })

    const freeTrial = await checkApiLimit()
    const isPro = await checkSubscription()

    if (!freeTrial && !isPro)
      return new NextResponse("Free trial has expired.", { status: 403 })

    const input = {
      prompt,
      model_version: "stereo-large",
      output_format: "mp3",
      normalization_strategy: "peak",
    }

    const response = await replicate.run(
      "meta/musicgen:671ac645ce5e552cc63a54a2bbff63fcf798043055d2dac5fc9e36a837eedcfb",
      { input }
    )

    if (!isPro) await increaseApiLimit()

    return NextResponse.json(response)
  } catch (error: any) {
    console.log(error)

    return new NextResponse(error.error.message, { status: 500 })
  }
}
