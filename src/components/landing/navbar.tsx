
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useState } from "react"

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  return (
    <header className="border-b border-border/40 backdrop-blur-md bg-background/80 sticky top-0 z-40">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="font-bold text-2xl gradient-text">E-Tech</Link>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {isMenuOpen ? (
              <path d="M18 6 6 18M6 6l12 12"/>
            ) : (
              <path d="M4 12h16M4 6h16M4 18h16"/>
            )}
          </svg>
        </button>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/features" className="text-muted-foreground hover:text-foreground transition-colors">
            Features
          </Link>
          <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
            About
          </Link>
          <Link to="/pricing" className="text-muted-foreground hover:text-foreground transition-colors">
            Pricing
          </Link>
          <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
            Contact
          </Link>
        </nav>
        
        {/* Auth and theme buttons */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          <Button asChild variant="outline">
            <Link to="/login">Log In</Link>
          </Button>
          <Button asChild className="gradient-bg">
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>
        
        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b border-border/40 md:hidden py-4 px-6 flex flex-col gap-4">
            <Link 
              to="/features" 
              className="text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/about" 
              className="text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/pricing" 
              className="text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/contact" 
              className="text-foreground py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="flex items-center gap-4 pt-2">
              <ThemeToggle />
              <Button asChild variant="outline" className="flex-1">
                <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log In</Link>
              </Button>
              <Button asChild className="gradient-bg flex-1">
                <Link to="/signup" onClick={() => setIsMenuOpen(false)}>Sign Up</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
