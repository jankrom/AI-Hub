import prismadb from "./prismadb"
import { createClient } from "@/utils/supabase/server"
import { MAX_FREE_COUNTS } from "@/constants"

export const increaseApiLimit = async () => {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user) return

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: user.id },
  })

  if (userApiLimit) {
    await prismadb.userApiLimit.update({
      where: { userId: user.id },
      data: { count: userApiLimit.count + 1 },
    })
  } else {
    // make a new userApiLimit if it does not exist
    await prismadb.userApiLimit.create({
      data: { userId: user.id, count: 1 },
    })
  }
}

export const checkApiLimit = async () => {
  const supabase = createClient()

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (!user) return

  const userApiLimit = await prismadb.userApiLimit.findUnique({
    where: { userId: user.id },
  })

  //   return true if user can still use app
  if (!userApiLimit || userApiLimit.count < MAX_FREE_COUNTS) return true

  return false
}
