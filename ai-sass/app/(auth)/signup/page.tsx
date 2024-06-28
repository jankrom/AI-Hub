import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Icons } from "@/components/ui/icons"
import { signupWithEmail } from "../login/actions"

export default function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl text-center">
          Sign up to continue to AI-Hub
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="grid gap-4">
          <Button variant="outline" className="w-full">
            <Icons.google className="mr-2 h-4 w-4" /> Google
          </Button>
          <Button variant="outline" type="button">
            <Icons.gitHub className="mr-2 h-4 w-4" /> GitHub
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or
              </span>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              name="email"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" name="password" required />
          </div>
          <Button type="submit" className="w-full" formAction={signupWithEmail}>
            Sign up
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
