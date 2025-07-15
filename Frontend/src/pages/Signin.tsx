import { GalleryVerticalEnd } from "lucide-react"

import { SignInForm } from "@/components/signin-form"

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4 sm:p-6 md:p-10 min-h-[80vh] w-full">
      <div className="flex w-full max-w-xs sm:max-w-sm flex-col gap-6">
        <a href="/" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          <span className="text-base sm:text-lg">O-pay</span>
        </a>
        <SignInForm />
      </div>
    </div>
  )
}
