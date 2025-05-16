
import { AuthForm } from "@/components/auth/auth-form";
import { Navbar } from "@/components/landing/navbar";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex flex-col items-center justify-center py-10">
        <div className="relative w-full">
          {/* Background blurs */}
          <div className="motion-background">
            <div className="blur-circle w-96 h-96 bg-tech-purple-light -left-48 top-0"></div>
            <div className="blur-circle w-80 h-80 bg-tech-blue right-0 -bottom-40"></div>
          </div>
          
          <div className="relative z-10">
            <Link to="/" className="absolute top-4 left-4 text-muted-foreground hover:text-foreground">
              ← Back to home
            </Link>
            <div className="flex flex-col items-center justify-center">
              <AuthForm mode="signup" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Signup;
