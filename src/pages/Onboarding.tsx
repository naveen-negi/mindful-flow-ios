import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, BookOpen, Brain, Clock, Heart, Sparkles, CheckCircle2 } from "lucide-react";

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
    <div key="welcome" className="space-y-4 sm:space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-3 sm:space-y-4">
        <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-primary" />
        <h1 className="text-2xl sm:text-4xl font-bold">Welcome</h1>
        <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto px-2">
          You're about to learn the 1:4:2 pranayama technique—a 500-year-old breathing practice used by yogis to calm the mind and deepen awareness.
        </p>
        <p className="text-base sm:text-xl font-semibold px-2">
          This isn't just another breathing app.<br />
          This is a gateway to an ancient tradition.
        </p>
        <p className="text-xs sm:text-sm text-muted-foreground italic mt-3 sm:mt-4 px-2">
          Source: From the Hatha Yoga Pradipika (15th century) and Gheranda Samhita (17th century)
        </p>
      </div>
    </div>,

    // Step 1: What is 1:4:2
    <div key="what-is" className="space-y-4 sm:space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-3 sm:space-y-4">
        <Clock className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-primary" />
        <h1 className="text-2xl sm:text-4xl font-bold">The Sacred Ratio</h1>
        <div className="text-4xl sm:text-6xl font-bold my-4 sm:my-8">1 : 4 : 2</div>
        <div className="text-lg sm:text-2xl space-y-1 sm:space-y-2">
          <p><span className="font-semibold">1</span> - Inhale</p>
          <p><span className="font-semibold">4</span> - Hold</p>
          <p><span className="font-semibold">2</span> - Exhale</p>
        </div>
      </div>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>It's Beautifully Simple</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="space-y-2 text-left">
            <li>• Inhale for any count you choose</li>
            <li>• Hold for 4× that count</li>
            <li>• Exhale for 2× that count</li>
          </ul>

          <div className="bg-secondary/50 p-4 rounded-lg mt-4">
            <p className="font-semibold mb-2">Example:</p>
            <p>If you inhale for 5 seconds:</p>
            <p>→ Hold for 20 seconds (5 × 4)</p>
            <p>→ Exhale for 10 seconds (5 × 2)</p>
            <p className="font-semibold mt-2">Total cycle: 35 seconds</p>
          </div>

          <div className="mt-6 space-y-2">
            <p className="font-semibold">Why This Works:</p>
            <p className="text-sm text-muted-foreground">
              The extended hold creates peak gas exchange in your lungs, while the longer exhale activates your body's relaxation response.
            </p>
            <p className="text-xs italic mt-2">
              "The highest rate of gas exchange in the lungs occurs during retention (holding the breath)."
              <br />— Himalayan Yoga Institute, 2016
            </p>
          </div>
        </CardContent>
      </Card>
    </div>,

    // Step 2: Ancient Tradition
    <div key="tradition" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-4">
        <BookOpen className="h-14 w-14 mx-auto text-primary" />
        <h1 className="text-3xl font-bold">Ancient Tradition</h1>
        <p className="text-base text-muted-foreground">A 3,500-year-old practice</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">1600s CE - Gheranda Samhita</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic text-sm mb-2">"The breath ratio of 1:4:2 is advisable for advanced practitioners."</p>
            <p className="text-xs text-muted-foreground">— Gheranda Samhita 5.40-5.41</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">1450 CE - Hatha Yoga Pradipika</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="italic text-sm mb-2">"Just as elephants, lions and tigers are controlled with steady training, so too is the breath."</p>
            <p className="text-xs text-muted-foreground">— HYP Chapter 2, Verse 15</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Present Day</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">1,400+ scientific studies validate the benefits</p>
          </CardContent>
        </Card>
      </div>
    </div>,

    // Step 3: The Science
    <div key="science" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-4">
        <Brain className="h-14 w-14 mx-auto text-primary" />
        <h1 className="text-3xl font-bold">The Science</h1>
        <p className="text-base text-muted-foreground max-w-xl mx-auto">
          Ancient wisdom meets modern research
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">🫁 Peak Oxygen Exchange</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">CO₂ buildup during breath retention triggers oxygen release, flooding your tissues with fresh oxygen.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">🧠 Calms Your Mind</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm">Shifts from stress mode (fight-or-flight) to calm mode (rest-and-digest) within minutes.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">😌 Better Than Meditation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm mb-2">Just 5 minutes of breathwork improved mood and reduced anxiety better than meditation.</p>
            <p className="text-xs text-muted-foreground">— Stanford University, 2023</p>
          </CardContent>
        </Card>

        <p className="text-center text-sm font-medium pt-2">1,400+ studies validate these benefits</p>
      </div>
    </div>,

    // Step 4: How to Practice
    <div key="practice" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-4">
        <Heart className="h-14 w-14 mx-auto text-primary" />
        <h1 className="text-3xl font-bold">How to Practice</h1>
        <p className="text-base text-muted-foreground">The three-part breath cycle</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">1. Inhale (Puraka)</CardTitle>
            <CardDescription className="text-xs">Fill completely</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              <li>• Breathe slowly through your nose</li>
              <li>• Expand belly, then ribs, then chest</li>
              <li>• Smooth and silent</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">2. Hold (Kumbhaka)</CardTitle>
            <CardDescription className="text-xs">4× your inhale duration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <ul className="space-y-1 text-sm">
              <li>• Gently close throat</li>
              <li>• Keep chest expanded but relaxed</li>
              <li>• Don't force or strain</li>
            </ul>
            <div className="bg-secondary/30 p-3 rounded-lg">
              <p className="text-xs">This is when peak gas exchange occurs and your mind becomes still.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">3. Exhale (Rechaka)</CardTitle>
            <CardDescription className="text-xs">2× your inhale duration</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-1 text-sm">
              <li>• Breathe out slowly through your nose</li>
              <li>• Release from chest, ribs, then belly</li>
              <li>• Activates deep relaxation</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>,

    // Step 5: Progression Levels
    <div key="progression" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-4">
        <CheckCircle2 className="h-14 w-14 mx-auto text-primary" />
        <h1 className="text-3xl font-bold">Your Journey</h1>
        <p className="text-base text-muted-foreground">Progress at your own pace</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Start Here: Beginner</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-2">
              <div className="text-2xl font-bold mb-2">4 : 16 : 8</div>
              <p className="text-sm text-muted-foreground">4s inhale, 16s hold, 8s exhale</p>
              <p className="text-xs text-muted-foreground mt-2">Total cycle: 28 seconds</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Your Path Forward</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between py-1.5 border-b">
                <span className="font-medium">Developing</span>
                <span className="text-muted-foreground">5:20:10</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="font-medium">Intermediate</span>
                <span className="text-muted-foreground">6:24:12</span>
              </div>
              <div className="flex justify-between py-1.5 border-b">
                <span className="font-medium">Advanced</span>
                <span className="text-muted-foreground">10:40:20</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="font-medium">Master</span>
                <span className="text-muted-foreground">20:80:40</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-secondary/30">
          <CardContent className="pt-6">
            <p className="text-sm italic">
              "Progress may take months or years. Master each level before advancing."
            </p>
            <p className="text-xs text-muted-foreground mt-2">— Traditional Teaching</p>
          </CardContent>
        </Card>
      </div>
    </div>,

    // Step 6: Ready to Begin
    <div key="ready" className="space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-6">
        <CheckCircle2 className="h-16 w-16 mx-auto text-primary" />
        <h1 className="text-4xl font-bold">You're Ready</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          You now understand the ancient practice of 1:4:2 pranayama.
        </p>

        <Card className="max-w-2xl mx-auto">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Reminders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-left text-sm">
            <p>✓ Start beginner level (4:16:8)</p>
            <p>✓ Practice on empty stomach</p>
            <p>✓ Never force the breath</p>
            <p>✓ Stop if uncomfortable</p>
          </CardContent>
        </Card>

        <div className="max-w-xl mx-auto bg-secondary/30 p-5 rounded-lg">
          <p className="text-base italic">
            "The journey of a thousand miles begins with a single breath."
          </p>
        </div>

        <p className="text-sm text-muted-foreground">
          Review anytime in the Learn section
        </p>
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
