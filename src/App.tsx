import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Practice from "./pages/Practice";
import SessionComplete from "./pages/SessionComplete";
import Progress from "./pages/Progress";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import Onboarding from "./pages/Onboarding";
import LearnIndex from "./pages/learn/LearnIndex";
import LearnAbout from "./pages/learn/LearnAbout";
import LearnBasics from "./pages/learn/LearnBasics";
import LearnTradition from "./pages/learn/LearnTradition";
import LearnScience from "./pages/learn/LearnScience";
import LearnSafety from "./pages/learn/LearnSafety";
import LearnFAQ from "./pages/learn/LearnFAQ";
import Pro from "./pages/Pro";
import { ProProvider } from "./contexts/ProProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ProProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pro" element={<Pro />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/session-complete" element={<SessionComplete />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/learn" element={<LearnIndex />} />
            <Route path="/learn/about" element={<LearnAbout />} />
            <Route path="/learn/basics" element={<LearnBasics />} />
            <Route path="/learn/tradition" element={<LearnTradition />} />
            <Route path="/learn/science" element={<LearnScience />} />
            <Route path="/learn/safety" element={<LearnSafety />} />
            <Route path="/learn/faq" element={<LearnFAQ />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </ProProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
