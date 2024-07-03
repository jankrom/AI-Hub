"use client"

import { useEffect, useRef } from "react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Code } from "lucide-react"
import { useForm } from "react-hook-form"
import ReactMarkdown from "react-markdown"

import { formSchema } from "./constants"
import Heading from "@/components/Heading"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import { useChat } from "ai/react"
import Loader from "@/components/Loader"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"

const CodePage = () => {
  const router = useRouter()
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/code",
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { prompt: "" },
  })

  const isLoading = form.formState.isSubmitting

  const chatParent = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const domNode = chatParent.current

    if (domNode) {
      console.log(domNode.scrollHeight)
      domNode.scrollTop = domNode.scrollHeight
    }
  })

  const onSubmit = async (e: any) => {
    try {
      await handleSubmit(e)

      form.reset()
    } catch (error: any) {
    } finally {
      setTimeout(() => router.refresh(), 3000)
    }
  }

  return (
    <div>
      <Heading
        title="Code Generation"
        description="Generate code using decriptive text"
        icon={Code}
        iconColor="text-green-700"
        bgColor="bg-green-700/10"
      />
      <div className="px-4 lg:px-8">
        <div>
          <Form {...form}>
            <form
              onSubmit={onSubmit}
              className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
            >
              <FormField
                name="prompt"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-10">
                    <FormControl className="m-0 p-0">
                      <Input
                        className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                        disabled={isLoading}
                        placeholder="Make a for loop in python using enumerate."
                        value={input}
                        onChange={handleInputChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="col-span-12 lg:col-span-2 w-full"
                disabled={isLoading}
              >
                Generate
              </Button>
            </form>
          </Form>
        </div>
        <div className="space-y-4 mt-4">
          {isLoading && (
            <div className="p-8 rounded-lg w-full flex items-center justify-content bg-muted">
              <Loader />
            </div>
          )}
          <div className="flex flex-col-reverse gap-y-4">
            {messages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "p-8 flex items-start gap-x-8 rounded-lg",
                  m.role === "user"
                    ? "bg-white border border-black/10"
                    : "bg-muted"
                )}
              >
                <p className="text-sm">
                  {m.role !== "user" && (
                    <span className="font-bold">Answer: </span>
                  )}
                </p>
                <ReactMarkdown
                  components={{
                    pre: ({ node, ...props }) => (
                      <div className="overflow-auto w-full my-2 bg-black/10 p-2 rounded-lg">
                        <pre {...props} />
                      </div>
                    ),
                    code: ({ node, ...props }) => (
                      <code className="bg-black/10 rounded-lg p-1" {...props} />
                    ),
                  }}
                  className="text-sm overflow-hidden leading-7"
                >
                  {m.content || ""}
                </ReactMarkdown>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
export default CodePage
