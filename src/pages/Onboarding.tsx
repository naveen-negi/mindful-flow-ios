import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = 3;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      localStorage.setItem("onboardingComplete", "true");
      navigate("/");
    }
  };

  const handleSkip = () => {
    localStorage.setItem("onboardingComplete", "true");
    navigate("/");
  };

  const steps = [
    // Step 0: Welcome + What is 1:4:2
    <div key="welcome" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl font-bold">Sahita Kumbhaka</h1>
        <p className="text-base sm:text-lg font-semibold">
          Master Your Breath, Transform Your Mind
        </p>
        <p className="text-base text-muted-foreground leading-relaxed px-4">
          This app teaches Sahita Kumbhaka—the classical pranayama technique using the sacred 1:4:2 ratio.
        </p>
        
        <div className="bg-secondary/30 p-6 rounded-2xl space-y-3">
          <div className="text-4xl sm:text-5xl font-bold">1 : 4 : 2</div>
          <div className="text-base space-y-1">
            <p><span className="font-semibold">1</span> Inhale</p>
            <p><span className="font-semibold">4</span> Hold</p>
            <p><span className="font-semibold">2</span> Exhale</p>
          </div>
          <p className="text-sm text-muted-foreground italic pt-2">
            Example: Inhale 5s → Hold 20s → Exhale 10s
          </p>
        </div>
      </div>
    </div>,

    // Step 1: How to Practice
    <div key="practice" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">How to Practice</h1>
        <p className="text-base text-muted-foreground">The three-part cycle</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">1. Inhale (Nose)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Breathe slowly through nose, expand belly to chest</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">2. Hold (4×)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Gently hold, stay relaxed, don't strain</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">3. Exhale (Mouth) (2×)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Release slowly through mouth, activates deep relaxation</p>
          </CardContent>
        </Card>
      </div>
    </div>,

    // Step 2: Ready to Begin
    <div key="ready" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">You're Ready</h1>
        <p className="text-base text-muted-foreground">
          Begin your pranayama practice
        </p>

        <div className="bg-secondary/30 p-6 rounded-2xl space-y-3">
          <p className="font-semibold">Start: Beginner Level</p>
          <div className="text-3xl font-bold">4 : 16 : 8</div>
          <p className="text-sm text-muted-foreground">28 second cycle</p>
          <p className="text-xs text-muted-foreground italic pt-2">
            Progress naturally to longer cycles as you build capacity
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-4 space-y-2 text-sm">
            <p>✓ Practice on empty stomach</p>
            <p>✓ Never force the breath</p>
            <p>✓ Stop if uncomfortable</p>
          </CardContent>
        </Card>
      </div>
    </div>,
  ];

  return (
    <div className="zen-texture h-screen flex flex-col bg-background overflow-hidden relative">
      {/* Zen background decoration */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 600 600" className="w-full max-w-2xl">
          <circle
            cx="300"
            cy="300"
            r="250"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            opacity="0.3"
          />
        </svg>
      </div>
      
      {/* Fixed header with progress */}
      <div className="flex-shrink-0 border-b bg-background px-4 py-3 sm:py-4">
        <div className="container max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium">Step {currentStep + 1} of {totalSteps}</span>
            <Button variant="ghost" size="sm" onClick={handleSkip} className="text-xs sm:text-sm h-8">
              Skip
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      {/* Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="container max-w-4xl mx-auto px-4 py-4 sm:py-6 pb-24">
          {steps[currentStep]}
        </div>
      </div>

      {/* Fixed navigation buttons */}
      <div className="flex-shrink-0 border-t bg-background px-4 pt-4 pb-16 sm:py-4">
        <div className="container max-w-4xl mx-auto flex justify-between items-center gap-3">
          {currentStep > 0 && (
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              className="flex-1 sm:flex-initial min-w-[100px]"
            >
              Previous
            </Button>
          )}

          <Button
            onClick={handleNext}
            className={`flex-1 sm:flex-initial min-w-[100px] ${currentStep === 0 ? 'w-full' : ''}`}
          >
            {currentStep === totalSteps - 1 ? "Start Practicing" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
