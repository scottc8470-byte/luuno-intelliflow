import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">404</h1>
        <p className="text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="inline-block px-6 py-3 bg-gradient-primary text-white rounded-lg hover:shadow-premium transition-all duration-300">
          Return to Dashboard
        </a>
      </div>
    </div>
  );
};

export default NotFound;
