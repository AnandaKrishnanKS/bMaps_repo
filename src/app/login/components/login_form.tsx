"use client"

import * as React from "react"

import { tw_style_merge } from "@/lib/utils"
import { Icons } from "@/components/icons"
import { Button } from "@/components/shared/button"
import { Input } from "@/components/shared/input"
import { Label } from "@/components/shared/label"
import { login, getUserDetails } from "@/src/app/api/auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/shared/use-toast"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  
  const [signInClicked, setSignInClicked] = React.useState(false);
  
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async () => {
    try {
      const response = await login({ username, password });
      // Handle successful login, e.g., save token, redirect user, etc.
      const access_token = response.access_token;
      sessionStorage.setItem("access_token", access_token);
      sessionStorage.setItem("refresh_token", response.refresh_token);      
      
      // Fetch user data and save to session storage...
      const user_data = getUserDetails()
      router.replace('/dashboard');
      setSignInClicked(false);
    } catch (error) {
      if (error instanceof Error) {
        // Handle login error safely
        toast({
          variant: "destructive",
          title: "Warning",
          description: error.message,
        })
        setSignInClicked(false);
      } else {
        // Handle unexpected errors
        toast({
          variant: "destructive",
          title: "Error!",
          description: "An unexpected error occurred.",
        })
        setSignInClicked(false);
      }
    }
  };

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setSignInClicked(true)
    handleLogin();
  }

  return (
    <div className={tw_style_merge("grid gap-6", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              Username
            </Label>
            <Input
              id="username"
              placeholder="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={signInClicked}
            />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              password
            </Label>
            <Input
              id="password"
              placeholder="***"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={signInClicked}
            />
          </div>
          <Button className="w-1/2" disabled={signInClicked}>
            {signInClicked && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}