import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, BookOpen, Brain, Clock, Heart, Sparkles, CheckCircle2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [safetyAcknowledged, setSafetyAcknowledged] = useState(false);

  const totalSteps = 8;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
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
    <div key="tradition" className="space-y-4 sm:space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-3 sm:space-y-4">
        <BookOpen className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-primary" />
        <h1 className="text-2xl sm:text-4xl font-bold">The Ancient Tradition</h1>
        <p className="text-sm sm:text-base text-muted-foreground">A practice refined over 3,500 years</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>1500 BCE - The Vedas</CardTitle>
            <CardDescription>Earliest mentions of breath control in ancient India</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Source: Rig Veda, Brihadaranyaka Upanishad</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>200 BCE - Patanjali's Yoga Sutras</CardTitle>
            <CardDescription>Pranayama established as the 4th of 8 limbs of yoga</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="italic mb-2">"When pranayama is practiced, the veil covering inner illumination is dissolved."</p>
            <p className="text-sm text-muted-foreground">— Yoga Sutras 2:52</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>1450 CE - Hatha Yoga Pradipika</CardTitle>
            <CardDescription>Written by Swami Svatmarama</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="italic mb-2">"Just as elephants, lions and tigers are controlled with steady training, so too is the breath."</p>
            <p className="text-sm text-muted-foreground">— HYP Chapter 2, Verse 15</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>1600s CE - Gheranda Samhita</CardTitle>
            <CardDescription>Explicitly recommends the 1:4:2 ratio</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="italic mb-2">"The breath ratio of 1:4:2 (inhalation: retention: exhalation) is advisable for advanced practitioners."</p>
            <p className="text-sm text-muted-foreground">— Gheranda Samhita 5.40-5.41</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Present Day</CardTitle>
            <CardDescription>1,400+ scientific studies validate the benefits</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>,

    // Step 3: The Science
    <div key="science" className="space-y-4 sm:space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-3 sm:space-y-4">
        <Brain className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-primary" />
        <h1 className="text-2xl sm:text-4xl font-bold">The Science</h1>
        <p className="text-base sm:text-xl">Ancient Wisdom Meets Modern Research</p>
        <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
          What yogis discovered through direct experience, science now confirms through measurement.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>🫁 The Bohr Effect</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">During breath retention, CO₂ buildup triggers oxygen release from hemoglobin—flooding your tissues with fresh oxygen.</p>
            <p className="text-xs text-muted-foreground">Source: John Douillard, LifeSpa, 2022; Original discovery 1904</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>❤️ Cardiovascular Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Slow pranayamic breathing decreases heart rate and blood pressure within minutes.</p>
            <p className="text-xs text-muted-foreground">Source: Physiology of Long Pranayamic Breathing, Medical Hypotheses, 2006</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🧠 Brain Changes</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Breath retention activates the brain's respiratory control center, training it for more efficient breathing over time.</p>
            <p className="text-xs text-muted-foreground">Source: Proposed Physiological Mechanisms of Pranayama, PMC, 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>⚡ Nervous System Shift</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Pranayama shifts the autonomic nervous system from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest).</p>
            <p className="text-xs text-muted-foreground">Source: Physiology of Long Pranayamic Breathing, 2006</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>😌 Mood Improvement</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-2">Just 5 minutes of breathwork improved mood and reduced anxiety better than mindfulness meditation.</p>
            <p className="text-xs text-muted-foreground">Source: Stanford University, Cell Reports Medicine, 2023</p>
          </CardContent>
        </Card>

        <p className="text-center font-semibold mt-6">Over 1,400 studies on pranayama in the PubMed medical database.</p>
      </div>
    </div>,

    // Step 4: Safety Warning
    <div key="safety" className="space-y-4 sm:space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-3 sm:space-y-4">
        <AlertTriangle className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-destructive" />
        <h1 className="text-2xl sm:text-4xl font-bold text-destructive">Safety Warning</h1>
        <p className="text-base sm:text-xl font-semibold max-w-2xl mx-auto px-2">
          The ancient texts are clear: breath work must be approached with wisdom and care.
        </p>
      </div>

      <Card className="max-w-3xl mx-auto border-destructive">
        <CardHeader>
          <CardTitle>Warning from Tradition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="italic">
            "The breath must be controlled with great care and slow progression, otherwise it can harm the practitioner."
          </p>
          <p className="text-sm text-muted-foreground">— Hatha Yoga Pradipika, Chapter 2, Verse 15</p>

          <p className="italic mt-4">
            "If done improperly, pranayama may create diseases that cannot be easily cured. Proceed cautiously and ideally learn from a teacher."
          </p>
          <p className="text-sm text-muted-foreground">— Traditional Yoga Teaching</p>
        </CardContent>
      </Card>

      <Card className="max-w-3xl mx-auto border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Do NOT Practice Breath Retention If You Have:</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>❌ High or low blood pressure</li>
            <li>❌ Heart conditions or cardiovascular disease</li>
            <li>❌ Pregnancy</li>
            <li>❌ Respiratory infections or lung disease</li>
            <li>❌ Recent surgery (within 6 months)</li>
            <li>❌ Panic disorder or severe anxiety</li>
            <li>❌ Epilepsy or seizure disorders</li>
          </ul>

          <div className="bg-secondary/50 p-4 rounded-lg mt-4">
            <p className="font-semibold mb-2">Modified Practice Available:</p>
            <p className="text-sm">People with blood pressure issues can practice WITHOUT retention (1:0:2 ratio).</p>
            <p className="text-xs text-muted-foreground mt-2">Source: Tummee.com Yoga Database, Gheranda Samhita Commentary</p>
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-3xl mx-auto border-destructive">
        <CardHeader>
          <CardTitle className="text-destructive">Stop Immediately If You Feel:</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>⚠️ Dizzy or lightheaded</li>
            <li>⚠️ Pain or chest discomfort</li>
            <li>⚠️ Nauseous</li>
            <li>⚠️ Shortness of breath</li>
            <li>⚠️ Anxious or panicked</li>
            <li>⚠️ Tingling in extremities</li>
          </ul>
        </CardContent>
      </Card>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>The Right Way</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            <li>✓ Never force the breath</li>
            <li>✓ Start small and progress slowly</li>
            <li>✓ Practice on an empty stomach (3-4 hours after meals)</li>
            <li>✓ Breathe through your nose</li>
            <li>✓ Stay aware and present</li>
            <li>✓ Listen to your body</li>
          </ul>
        </CardContent>
      </Card>

      <div className="max-w-3xl mx-auto mt-6 flex items-start space-x-3 p-4 bg-secondary/50 rounded-lg">
        <Checkbox 
          id="safety-acknowledge"
          checked={safetyAcknowledged}
          onCheckedChange={(checked) => setSafetyAcknowledged(checked as boolean)}
        />
        <label htmlFor="safety-acknowledge" className="text-sm cursor-pointer">
          I understand the safety warnings and will practice responsibly. I will consult healthcare providers if I have any contraindicated conditions, and I will stop immediately if I feel uncomfortable.
        </label>
      </div>
    </div>,

    // Step 5: How to Practice - Three Phases
    <div key="phases" className="space-y-4 sm:space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-3 sm:space-y-4">
        <Heart className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-primary" />
        <h1 className="text-2xl sm:text-4xl font-bold">The Three Phases</h1>
        <p className="text-sm sm:text-base text-muted-foreground">Understanding each part of the breath cycle</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Phase 1: Puraka (Inhalation)</CardTitle>
            <CardDescription>Sanskrit: पूरक | Meaning: Filling, to fill completely</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">How To Practice:</p>
              <ul className="space-y-1 text-sm">
                <li>• Inhale slowly through both nostrils</li>
                <li>• Begin by expanding the belly (diaphragmatic breathing)</li>
                <li>• Then expand the ribs</li>
                <li>• Finally fill the upper chest</li>
                <li>• This is "three-part breath" or complete yogic breathing</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Qualities:</p>
              <ul className="space-y-1 text-sm">
                <li>• Smooth, not jerky</li>
                <li>• Steady pace throughout</li>
                <li>• Silent (no audible sound)</li>
                <li>• Effortless, not forced</li>
                <li>• Complete but not straining</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Common Mistakes:</p>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Inhaling too quickly</li>
                <li>• Raising shoulders</li>
                <li>• Creating tension in face or throat</li>
                <li>• Incomplete filling</li>
                <li>• Breathing through mouth</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phase 2: Kumbhaka (Retention)</CardTitle>
            <CardDescription>Sanskrit: कुम्भक | Meaning: Pot, vessel | Duration: 4× your inhalation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">How To Practice:</p>
              <ul className="space-y-1 text-sm">
                <li>• At peak of inhalation, gently close the throat</li>
                <li>• Keep chest expanded but relaxed</li>
                <li>• Maintain stillness—no movement</li>
                <li>• Don't "trap" air forcefully</li>
              </ul>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="text-sm italic mb-2">
                "During retention, the body fills up with prana, which is retained just as a pot retains liquid. But since retention of the breath also stabilizes the mind, kumbhaka is likened to a lamp inside a pot that does not flicker because no breeze can reach it."
              </p>
              <p className="text-xs text-muted-foreground">— Yoga Tattva Upanishad 142</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Physiological Process:</p>
              <p className="text-sm">This is when:</p>
              <ul className="space-y-1 text-sm">
                <li>• Peak gas exchange occurs</li>
                <li>• CO₂ builds up (triggering oxygen release)</li>
                <li>• Blood oxygenation maximizes</li>
                <li>• Cerebral blood flow increases</li>
                <li>• Mind becomes still</li>
              </ul>
            </div>

            <div className="bg-destructive/10 p-4 rounded-lg">
              <p className="font-semibold text-sm mb-1">Safety Note:</p>
              <p className="text-sm">Kumbhaka has to be practiced in a relaxed state of mind. Don't hold your breath by force, don't go beyond your capacity.</p>
              <p className="text-xs text-muted-foreground mt-1">— YOGATEKET</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Phase 3: Rechaka (Exhalation)</CardTitle>
            <CardDescription>Sanskrit: रेचक | Meaning: Emptying, purification | Duration: 2× your inhalation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="font-semibold mb-2">How To Practice:</p>
              <ul className="space-y-1 text-sm">
                <li>• Gently open the throat</li>
                <li>• Exhale slowly through both nostrils</li>
                <li>• Begin by releasing from upper chest</li>
                <li>• Then ribs contract</li>
                <li>• Finally pull navel toward spine (complete emptying)</li>
              </ul>
            </div>

            <div>
              <p className="font-semibold mb-2">Qualities:</p>
              <ul className="space-y-1 text-sm">
                <li>• Slower than inhalation (twice as long)</li>
                <li>• Smooth and controlled</li>
                <li>• Complete but not forced</li>
                <li>• Silent</li>
                <li>• Steady pace throughout</li>
              </ul>
            </div>

            <div className="bg-secondary/50 p-4 rounded-lg">
              <p className="font-semibold text-sm mb-2">Purpose of Extended Exhale:</p>
              <p className="text-sm italic mb-2">
                "Exhalation being twice the time of inhalation, stale air and waste products are drained from the lungs."
              </p>
              <p className="text-xs text-muted-foreground">— BookYogaRetreats.com, Traditional Teaching</p>
            </div>

            <div>
              <p className="font-semibold mb-2">Nervous System Effect:</p>
              <p className="text-sm">The long, controlled exhale is what primarily activates the parasympathetic nervous system (relaxation response).</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>,

    // Step 6: Progression Levels
    <div key="progression" className="space-y-4 sm:space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-3 sm:space-y-4">
        <CheckCircle2 className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-primary" />
        <h1 className="text-2xl sm:text-4xl font-bold">Progression Levels</h1>
        <p className="text-sm sm:text-base text-muted-foreground">A realistic path from beginner to master</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-2xl">Traditional Progression Table</CardTitle>
            <CardDescription className="text-xs sm:text-sm">Progress slowly and master each level before advancing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto -mx-2 sm:mx-0">
              <table className="w-full text-xs sm:text-sm min-w-[300px]">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-1.5 sm:p-2 text-xs">Level</th>
                    <th className="text-center p-1.5 sm:p-2 text-xs">In</th>
                    <th className="text-center p-1.5 sm:p-2 text-xs">Hold</th>
                    <th className="text-center p-1.5 sm:p-2 text-xs">Out</th>
                    <th className="text-center p-1.5 sm:p-2 text-xs">Total</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm">
                  <tr className="border-b"><td className="p-1.5 sm:p-2 font-semibold text-xs sm:text-sm">Beginner</td><td className="text-center p-1.5 sm:p-2">4s</td><td className="text-center p-1.5 sm:p-2">16s</td><td className="text-center p-1.5 sm:p-2">8s</td><td className="text-center p-1.5 sm:p-2">28s</td></tr>
                  <tr className="border-b"><td className="p-1.5 sm:p-2 font-semibold text-xs sm:text-sm">Developing</td><td className="text-center p-1.5 sm:p-2">5s</td><td className="text-center p-1.5 sm:p-2">20s</td><td className="text-center p-1.5 sm:p-2">10s</td><td className="text-center p-1.5 sm:p-2">35s</td></tr>
                  <tr className="border-b"><td className="p-1.5 sm:p-2 font-semibold text-xs sm:text-sm">Intermediate</td><td className="text-center p-1.5 sm:p-2">6s</td><td className="text-center p-1.5 sm:p-2">24s</td><td className="text-center p-1.5 sm:p-2">12s</td><td className="text-center p-1.5 sm:p-2">42s</td></tr>
                  <tr className="border-b"><td className="p-1.5 sm:p-2 font-semibold text-xs sm:text-sm">Progressing</td><td className="text-center p-1.5 sm:p-2">8s</td><td className="text-center p-1.5 sm:p-2">32s</td><td className="text-center p-1.5 sm:p-2">16s</td><td className="text-center p-1.5 sm:p-2">56s</td></tr>
                  <tr className="border-b"><td className="p-1.5 sm:p-2 font-semibold text-xs sm:text-sm">Advanced</td><td className="text-center p-1.5 sm:p-2">10s</td><td className="text-center p-1.5 sm:p-2">40s</td><td className="text-center p-1.5 sm:p-2">20s</td><td className="text-center p-1.5 sm:p-2">70s</td></tr>
                  <tr className="border-b"><td className="p-1.5 sm:p-2 font-semibold text-xs sm:text-sm">V. Advanced</td><td className="text-center p-1.5 sm:p-2">12s</td><td className="text-center p-1.5 sm:p-2">48s</td><td className="text-center p-1.5 sm:p-2">24s</td><td className="text-center p-1.5 sm:p-2">84s</td></tr>
                  <tr className="border-b"><td className="p-1.5 sm:p-2 font-semibold text-xs sm:text-sm">Expert</td><td className="text-center p-1.5 sm:p-2">15s</td><td className="text-center p-1.5 sm:p-2">60s</td><td className="text-center p-1.5 sm:p-2">30s</td><td className="text-center p-1.5 sm:p-2">105s</td></tr>
                  <tr className="border-b"><td className="p-1.5 sm:p-2 font-semibold text-xs sm:text-sm">H. Expert</td><td className="text-center p-1.5 sm:p-2">18s</td><td className="text-center p-1.5 sm:p-2">72s</td><td className="text-center p-1.5 sm:p-2">36s</td><td className="text-center p-1.5 sm:p-2">126s</td></tr>
                  <tr className="border-b"><td className="p-1.5 sm:p-2 font-semibold text-xs sm:text-sm">Master</td><td className="text-center p-1.5 sm:p-2">20s</td><td className="text-center p-1.5 sm:p-2">80s</td><td className="text-center p-1.5 sm:p-2">40s</td><td className="text-center p-1.5 sm:p-2">140s</td></tr>
                  <tr><td className="p-1.5 sm:p-2 font-semibold text-xs sm:text-sm">Adv. Master</td><td className="text-center p-1.5 sm:p-2">22s</td><td className="text-center p-1.5 sm:p-2">88s</td><td className="text-center p-1.5 sm:p-2">44s</td><td className="text-center p-1.5 sm:p-2">154s</td></tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 space-y-4">
              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="font-semibold mb-2">Traditional Guidance:</p>
                <p className="text-sm italic mb-2">
                  "Duration depends entirely on the practitioner's capacity. Start with what's comfortable and increase gradually."
                </p>
                <p className="text-xs text-muted-foreground">— Himalayan Yoga Institute</p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm italic mb-2">
                  "Progressing from beginner to advanced may take years. Each level should be mastered before advancing."
                </p>
                <p className="text-xs text-muted-foreground">— Traditional Teaching</p>
              </div>
            </div>

            <p className="text-xs text-muted-foreground mt-4">
              Source: Himalayan Yoga Institute ("can be increased up to 20 seconds or even more"), Gheranda Samhita 5.40-5.41
            </p>
          </CardContent>
        </Card>
      </div>
    </div>,

    // Step 7: Self-Inquiry (optional section)
    <div key="self-inquiry" className="space-y-4 sm:space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-3 sm:space-y-4">
        <Sparkles className="h-12 w-12 sm:h-16 sm:w-16 mx-auto text-primary" />
        <h1 className="text-2xl sm:text-4xl font-bold">Self-Inquiry</h1>
        <p className="text-base sm:text-xl">Deepening the Practice</p>
      </div>

      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>What Is This?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>After your pranayama practice, your mind is naturally quiet. This creates perfect conditions for self-inquiry (Atma Vichara).</p>

          <div>
            <p className="font-semibold mb-2">The Tradition:</p>
            <p className="text-sm mb-2">Self-inquiry is the direct path taught by sages like:</p>
            <ul className="text-sm space-y-1">
              <li>• Ramana Maharshi (1879-1950)</li>
              <li>• Nisargadatta Maharaj (1897-1981)</li>
              <li>• John Wheeler (contemporary teacher)</li>
            </ul>
          </div>

          <div>
            <p className="font-semibold mb-2">The Practice:</p>
            <p className="text-sm">These aren't riddles to be solved. They're pointers to direct your attention inward.</p>
            <p className="text-sm mt-2">The question "Who am I?" isn't asking for your name, history, or role. It's an invitation to look at what's looking.</p>
          </div>

          <div>
            <p className="font-semibold mb-2">How It Works:</p>
            <ol className="text-sm space-y-1 list-decimal list-inside">
              <li>A pointer appears after your practice</li>
              <li>Sit quietly with the question</li>
              <li>Don't seek intellectual answers</li>
              <li>Simply look directly</li>
              <li>Rest in not-knowing</li>
            </ol>
          </div>

          <div className="bg-secondary/50 p-4 rounded-lg">
            <p className="font-semibold mb-2">The Goal:</p>
            <p className="text-sm">There is no goal. The inquiry itself is the practice. Looking is more important than finding.</p>
          </div>

          <p className="text-sm italic text-center mt-4">
            "The seeker is the sought. Investigate."<br />
            — Traditional pointer
          </p>
        </CardContent>
      </Card>
    </div>,

    // Step 8: Ready to Begin
    <div key="ready" className="space-y-4 sm:space-y-6 animate-in fade-in-50 duration-500 px-2">
      <div className="text-center space-y-4 sm:space-y-6">
        <CheckCircle2 className="h-16 w-16 sm:h-20 sm:w-20 mx-auto text-primary" />
        <h1 className="text-3xl sm:text-5xl font-bold">You're Ready</h1>
        <p className="text-base sm:text-xl text-muted-foreground max-w-2xl mx-auto px-2">
          You now understand the ancient tradition, the science, and how to practice safely.
        </p>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Remember</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-left">
            <p>✓ Start with the beginner level (4:16:8)</p>
            <p>✓ Practice on an empty stomach</p>
            <p>✓ Never force the breath</p>
            <p>✓ Progress slowly over weeks and months</p>
            <p>✓ Stop if you feel uncomfortable</p>
            <p>✓ Consistency matters more than intensity</p>
          </CardContent>
        </Card>

        <div className="max-w-2xl mx-auto bg-secondary/50 p-6 rounded-lg">
          <p className="text-lg italic">
            "The journey of a thousand miles begins with a single breath."
          </p>
        </div>

        <p className="text-muted-foreground">
          You can always review this information in the Learn section.
        </p>
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="container max-w-4xl mx-auto px-3 sm:px-4 py-4 sm:py-8 pb-20">
        {/* Progress bar */}
        <div className="mb-4 sm:mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs sm:text-sm font-medium">Step {currentStep + 1} of {totalSteps}</span>
            <Button variant="ghost" size="sm" onClick={handleSkip} className="text-xs sm:text-sm">
              Skip
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Current step content */}
        <div className="mb-4 sm:mb-8 overflow-y-auto max-h-[calc(100vh-180px)]">
          {steps[currentStep]}
        </div>

        {/* Navigation buttons */}
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-3 sm:p-4 flex justify-between items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="flex-1 sm:flex-initial"
          >
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStep === 4 && !safetyAcknowledged}
            className="flex-1 sm:flex-initial"
          >
            {currentStep === totalSteps - 1 ? "Start Practicing" : "Next"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
