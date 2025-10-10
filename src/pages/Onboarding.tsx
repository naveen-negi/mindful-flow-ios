import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import welcomeImage from "@/assets/onboarding-welcome.jpg";
import ratioImage from "@/assets/onboarding-ratio.jpg";
import traditionImage from "@/assets/onboarding-tradition.jpg";
import scienceImage from "@/assets/onboarding-science.jpg";
import practiceImage from "@/assets/onboarding-practice.jpg";
import progressionImage from "@/assets/onboarding-progression.jpg";
import readyImage from "@/assets/onboarding-ready.jpg";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = 7;
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
    // Step 0: Welcome
    <div key="welcome" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <img src={welcomeImage} alt="Welcome" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold">Welcome</h1>
        <p className="text-base sm:text-lg font-semibold px-2">
          A 500-year-old breathing practice<br />for calm and awareness
        </p>
        <p className="text-sm text-muted-foreground italic px-2">
          From the Hatha Yoga Pradipika (15th century)
        </p>
      </div>
    </div>,

    // Step 1: What is 1:4:2
    <div key="what-is" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <img src={ratioImage} alt="Sacred Ratio" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl font-bold">The Sacred Ratio</h1>
        <div className="text-5xl sm:text-6xl font-bold my-4">1 : 4 : 2</div>
        <div className="text-lg space-y-1">
          <p><span className="font-semibold">1</span> Inhale</p>
          <p><span className="font-semibold">4</span> Hold</p>
          <p><span className="font-semibold">2</span> Exhale</p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6 space-y-3">
          <div className="bg-secondary/50 p-4 rounded-lg">
            <p className="font-semibold mb-2">Example:</p>
            <p className="text-sm">Inhale 5s → Hold 20s → Exhale 10s</p>
          </div>
          <p className="text-sm text-muted-foreground italic">
            Peak gas exchange during retention activates deep relaxation
          </p>
        </CardContent>
      </Card>
    </div>,

    // Step 2: Ancient Tradition
    <div key="tradition" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <img src={traditionImage} alt="Ancient Tradition" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Ancient Tradition</h1>
        <p className="text-base text-muted-foreground">500+ years of wisdom</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Gheranda Samhita (1600s)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic text-sm">"The 1:4:2 ratio for advanced practitioners"</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">1,400+ studies validate the benefits</p>
          </CardContent>
        </Card>
      </div>
    </div>,

    // Step 3: The Science
    <div key="science" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <img src={scienceImage} alt="The Science" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">The Science</h1>
        <p className="text-base text-muted-foreground">Ancient wisdom meets research</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">🫁 Peak Oxygen Exchange</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Breath retention triggers oxygen release</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">🧠 Activates Calm Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Shifts from stress to relaxation in minutes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">😌 Proven Effective</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Better than meditation (Stanford, 2023)</p>
          </CardContent>
        </Card>
      </div>
    </div>,

    // Step 4: How to Practice
    <div key="practice" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <img src={practiceImage} alt="How to Practice" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">How to Practice</h1>
        <p className="text-base text-muted-foreground">The three-part cycle</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">1. Inhale</CardTitle>
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
            <CardTitle className="text-base">3. Exhale (2×)</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Release slowly, activates deep relaxation</p>
          </CardContent>
        </Card>
      </div>
    </div>,

    // Step 5: Progression Levels
    <div key="progression" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <img src={progressionImage} alt="Your Journey" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
      <div className="text-center space-y-3">
        <h1 className="text-3xl font-bold">Your Journey</h1>
        <p className="text-base text-muted-foreground">Progress at your own pace</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Start: Beginner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-1">
              <div className="text-2xl font-bold">4 : 16 : 8</div>
              <p className="text-xs text-muted-foreground mt-1">28 second cycle</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1">
                <span>Developing</span>
                <span className="text-muted-foreground">5:20:10</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Intermediate</span>
                <span className="text-muted-foreground">6:24:12</span>
              </div>
              <div className="flex justify-between py-1">
                <span>Advanced</span>
                <span className="text-muted-foreground">10:40:20</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>,

    // Step 6: Ready to Begin
    <div key="ready" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <img src={readyImage} alt="You're Ready" className="w-full h-48 object-cover rounded-2xl shadow-lg" />
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">You're Ready</h1>
        <p className="text-base text-muted-foreground max-w-xl mx-auto">
          Begin your pranayama practice
        </p>

        <Card className="max-w-2xl mx-auto">
          <CardContent className="pt-4 space-y-2 text-sm">
            <p>✓ Start beginner level (4:16:8)</p>
            <p>✓ Practice on empty stomach</p>
            <p>✓ Never force the breath</p>
            <p>✓ Stop if uncomfortable</p>
          </CardContent>
        </Card>

        <div className="max-w-xl mx-auto bg-secondary/30 p-4 rounded-lg">
          <p className="text-sm italic">
            "The journey begins with a single breath"
          </p>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="h-screen flex flex-col bg-background overflow-hidden">
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
      <div className="flex-shrink-0 border-t bg-background px-4 py-3 sm:py-4">
        <div className="container max-w-4xl mx-auto flex justify-between items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex-1 sm:flex-initial min-w-[100px]"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            className="flex-1 sm:flex-initial min-w-[100px]"
          >
            {currentStep === totalSteps - 1 ? "Start Practicing" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
