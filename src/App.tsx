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
import Path from "./pages/krama/Path";
import NadiWhy from "./pages/krama/NadiWhy";
import NadiHow from "./pages/krama/NadiHow";
import NadiPractice from "./pages/krama/NadiPractice";
import Hub from "./pages/krama/Hub";
import Sites from "./pages/krama/Sites";
import Sounds from "./pages/krama/Sounds";
import Sit from "./pages/krama/Sit";
import MahaMudra from "./pages/krama/MahaMudra";
import SafetyGate from "./pages/krama/SafetyGate";
import DrillWhy from "./pages/krama/DrillWhy";
import DrillHow from "./pages/krama/DrillHow";
import DrillSetup from "./pages/krama/DrillSetup";
import DrillRun from "./pages/krama/DrillRun";
import Gloss from "./pages/krama/Gloss";
import Reference from "./pages/krama/Reference";
import ReferenceEntry from "./pages/krama/ReferenceEntry";
import Plates from "./pages/krama/Plates";
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
            {/* Haṭha krama — stage one, stage three, and the library behind them */}
            <Route path="/krama" element={<Path />} />
            <Route path="/krama/nadi" element={<NadiWhy />} />
            <Route path="/krama/nadi/how" element={<NadiHow />} />
            <Route path="/krama/nadi/practice" element={<NadiPractice />} />
            <Route path="/bandha" element={<Hub />} />
            <Route path="/bandha/sites" element={<Sites />} />
            <Route path="/bandha/sounds" element={<Sounds />} />
            <Route path="/bandha/sit" element={<Sit />} />
            <Route path="/bandha/maha-mudra" element={<MahaMudra />} />
            <Route path="/bandha/maha-mudra/setup" element={<DrillSetup />} />
            <Route path="/bandha/maha-mudra/run" element={<DrillRun />} />
            <Route path="/bandha/uddiyana/check" element={<SafetyGate />} />
            <Route path="/bandha/:drill" element={<DrillWhy />} />
            <Route path="/bandha/:drill/how" element={<DrillHow />} />
            <Route path="/bandha/:drill/gloss" element={<Gloss />} />
            <Route path="/bandha/:drill/setup" element={<DrillSetup />} />
            <Route path="/bandha/:drill/run" element={<DrillRun />} />
            <Route path="/reference" element={<Reference />} />
            <Route path="/reference/plates" element={<Plates />} />
            <Route path="/reference/:drill" element={<ReferenceEntry />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </ProProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
