
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

export function Hero() {
  return (
    <div className="relative">
      {/* Background blurs */}
      <div className="motion-background">
        <div className="blur-circle w-96 h-96 bg-tech-purple-light left-1/4 -top-24"></div>
        <div className="blur-circle w-80 h-80 bg-tech-blue right-1/4 top-10"></div>
      </div>
      
      <div className="container flex flex-col items-center text-center py-20 lg:py-32 relative">
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
          <span className="gradient-text">E-Tech</span>
          <span className="block mt-2">Redefining Online Education</span>
        </h1>
        
        <p className="text-lg text-muted-foreground max-w-2xl mb-8">
          Combining AI-powered learning, real-time communication, and gamification 
          for a revolutionary educational experience.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="gradient-bg">
            <Link to="/login">Get Started</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/about">Learn More</Link>
          </Button>
        </div>
        
        {/* Feature callouts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div className="h-12 w-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Learning</h3>
            <p className="text-muted-foreground">Get instant answers to your questions and personalized study plans.</p>
          </div>
          
          <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="h-12 w-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Interactive Content</h3>
            <p className="text-muted-foreground">Learn through games, quizzes, and collaborative exercises.</p>
          </div>
          
          <div className="glass-card p-6 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            <div className="h-12 w-12 gradient-bg rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Real-time Collaboration</h3>
            <p className="text-muted-foreground">Connect with peers and teachers through text, voice, and video.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
