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
import { useUser } from "@/hooks/useUser"
import { useForm } from "react-hook-form"
import { z } from "zod";
import { signupSchema } from "@/Validation/userSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"

type SignUpInput = z.infer<typeof signupSchema>;

export function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"div">) {

  const { signup } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<SignUpInput>({
    resolver: zodResolver(signupSchema)
  });

  const onSubmit = async (data: SignUpInput) => {
    try{
      await signup({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password
      });
      toast.success("Signed Up successfull !");
      navigate("/dashboard");
    }catch(err){
      toast.error("Sign Up Failed");
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome !</CardTitle>
          <CardDescription>
            Please Sign Up to Get Started !
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="grid gap-4">
              <div className="flex flex-col gap-4">
              </div>
              <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">First Name</Label>
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Asif"
                    required
                    {...register("firstName")}
                  />
                  {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="email">Last Name</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Ali"
                    required
                    {...register("lastName")}
                  />
                  {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
                </div>
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
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Button variant={"ghost"}  className="text-blue-400" onClick={() => navigate("/signin")}>Sign In</Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
