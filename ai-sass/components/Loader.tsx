import Image from "next/image"
import { LoaderIcon } from "lucide-react"

const Loader = () => {
  return (
    <div className="h-full w-full flex flex-col gap-y-4 items-center justify-center">
      <div className="relative animate-spin">
        <LoaderIcon />
      </div>
      <p className="text-sm text-muted-foreground">AI-Hub is thinking...</p>
    </div>
  )
}
export default Loader
