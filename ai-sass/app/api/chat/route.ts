import { createClient } from "@/utils/supabase/server"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"
import { streamText } from "ai"

import { increaseApiLimit, checkApiLimit } from "@/lib/api-limit"
import { checkSubscription } from "@/lib/subscription"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

export async function POST(req: Request) {
  const { messages } = await req.json()

  const freeTrial = await checkApiLimit()
  const isPro = await checkSubscription()

  if (!freeTrial && !isPro)
    return new NextResponse("Free trial has expired.", { status: 403 })

  const result = await streamText({
    model: openai("gpt-3.5-turbo-0125"),
    messages,
  })

  if (!isPro) await increaseApiLimit()

  return result.toAIStreamResponse()
}
