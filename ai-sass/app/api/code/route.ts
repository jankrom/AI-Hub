import { createClient } from "@/utils/supabase/server"
import { openai } from "@ai-sdk/openai"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

const instructionMessage = {
  role: "system",
  content:
    "You are a code generator. You must answer only in markdown snippets. Use code comments for explanations of what the code is doing. Provide an explanation of what the code is doing and why it works outside the markdown.",
}

export async function POST(req: Request) {
  const { messages } = await req.json()

  const result = await streamText({
    model: openai("gpt-3.5-turbo-0125"),
    messages: [instructionMessage, ...messages],
  })

  return result.toAIStreamResponse()
}
