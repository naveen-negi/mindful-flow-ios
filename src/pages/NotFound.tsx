import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="zen-texture flex min-h-screen items-center justify-center p-6">
      <div className="text-center">
        <h1 className="mb-2 font-serif text-4xl font-semibold text-foreground">Nothing here</h1>
        <p className="mb-6 font-sans text-muted-foreground">That screen doesn't exist.</p>
        {/* Router navigation, not a raw href: a plain "/" link breaks out of the SPA inside the Capacitor webview */}
        <Button onClick={() => navigate("/")} className="rounded-xl px-8 py-6 text-lg font-medium">
          Return Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
