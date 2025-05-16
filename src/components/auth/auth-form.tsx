
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { useToast } from "@/hooks/use-toast"

interface AuthFormProps {
  mode: "login" | "signup"
}

export function AuthForm({ mode }: AuthFormProps) {
  const navigate = useNavigate()
  const { toast } = useToast()
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })
  
  const [isLoading, setIsLoading] = useState(false)
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Normally this would be a real API call
      console.log("Form submitted:", formData)
      
      toast({
        title: mode === "login" ? "Logged in successfully!" : "Account created successfully!",
        description: "Welcome to E-Tech learning platform.",
      })
      
      // Redirect to dashboard
      navigate("/dashboard")
    } catch (error) {
      console.error("Authentication error:", error)
      toast({
        title: "Authentication failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    
    try {
      // Simulate OAuth delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast({
        title: "Google authentication successful!",
        description: "Welcome to E-Tech learning platform.",
      })
      
      navigate("/dashboard")
    } catch (error) {
      console.error("Google auth error:", error)
      toast({
        title: "Google authentication failed",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="glass-card p-8 w-full max-w-md">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {mode === "login" 
            ? "Enter your credentials to access your account" 
            : "Sign up to get started with E-Tech"
          }
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === "signup" && (
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input 
              id="name" 
              name="name"
              placeholder="John Doe" 
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
        )}
        
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input 
            id="email" 
            name="email"
            type="email" 
            placeholder="your@email.com" 
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            {mode === "login" && (
              <Link 
                to="/forgot-password"
                className="text-sm text-muted-foreground hover:text-accent underline underline-offset-4"
              >
                Forgot password?
              </Link>
            )}
          </div>
          <Input 
            id="password" 
            name="password"
            type="password" 
            placeholder="••••••••" 
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        
        <Button type="submit" className="w-full gradient-bg" disabled={isLoading}>
          {isLoading && (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin mr-2 h-4 w-4"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
          )}
          {mode === "login" ? "Sign in" : "Sign up"}
        </Button>
      </form>
      
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      
      <Button 
        type="button" 
        variant="outline" 
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48" className="mr-2 h-4 w-4">
          <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
          <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
          <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
          <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
          <path fill="none" d="M0 0h48v48H0z"/>
        </svg>
        Google
      </Button>
      
      <div className="text-center mt-6">
        <p className="text-sm text-muted-foreground">
          {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
          <Link
            to={mode === "login" ? "/signup" : "/login"}
            className="text-accent underline underline-offset-4"
          >
            {mode === "login" ? "Sign up" : "Sign in"}
          </Link>
        </p>
      </div>
    </div>
  )
}
