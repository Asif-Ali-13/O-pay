import { cn } from "@/lib/utils"
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
import { useNavigate } from "react-router-dom"

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { signinSchema } from "@/Validation/userSchema"
import { useUser } from "@/hooks/useUser"
import { toast } from "sonner"

type SignInInput = z.infer<typeof signinSchema>;

export function SignInForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { signin } = useUser();
  const navigate = useNavigate();

  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting } 
  } = useForm<SignInInput>({
    resolver: zodResolver(signinSchema)
  });

  const onSubmit = async (data: SignInInput) => {
    try{
      await signin({ email: data.email!, password: data.password! });
      toast.success("Signed In Successfull !");
      navigate("/dashboard");
    }catch(err: any){
      toast.error(`Sign In Failed :(`);
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Please Login to continue !
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form 
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              </div>
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="ali@gmail.com"
                    required
                    {...register("email")}
                  />
                  {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
                </div>

                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="******"
                    required 
                    {...register("password")}
                  />
                  {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
                </div>
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <Button variant={"ghost"}  className="text-blue-400" onClick={() => navigate("/signup")}>Sign Up</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
