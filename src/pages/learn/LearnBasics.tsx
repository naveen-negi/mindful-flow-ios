import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, BookOpen, Heart, TrendingUp } from "lucide-react";

const LearnBasics = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Navigation controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-t" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={() => navigate("/learn")}
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Menu
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            size="icon"
            className="h-9 w-9"
          >
            <X className="h-4 w-4" />
          </Button>

          <Button
            variant="default"
            onClick={() => navigate("/learn/tradition")}
            size="sm"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 pt-safe pb-24">
        <div className="mb-6 pt-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Basics of Sahita Kumbhaka</h1>
          <p className="text-sm text-muted-foreground">Understanding the fundamentals</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-6 w-6" />
                What is Sahita Kumbhaka?
              </CardTitle>
              <CardDescription>The Sacred Ratio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-6xl font-bold my-6">1 : 4 : 2</div>
                <div className="text-xl space-y-2">
                  <p><span className="font-semibold">1</span> - Inhale</p>
                  <p><span className="font-semibold">4</span> - Hold</p>
                  <p><span className="font-semibold">2</span> - Exhale</p>
                </div>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg mt-6">
                <p className="font-semibold mb-2">It's beautifully simple:</p>
                <ul className="space-y-2">
                  <li>• Inhale for any count you choose</li>
                  <li>• Hold for 4× that count</li>
                  <li>• Exhale for 2× that count</li>
                </ul>
              </div>

              <div className="bg-primary/10 p-4 rounded-lg mt-4">
                <p className="font-semibold mb-2">Example:</p>
                <p>If you inhale for 5 seconds:</p>
                <p>→ Hold for 20 seconds (5 × 4)</p>
                <p>→ Exhale for 10 seconds (5 × 2)</p>
                <p className="font-semibold mt-2">Total cycle: 35 seconds</p>
              </div>

              <div className="mt-6">
                <p className="font-semibold mb-2">Why This Works:</p>
                <p className="text-muted-foreground">
                  The extended hold creates peak gas exchange in your lungs, while the longer exhale activates your body's relaxation response.
                </p>
                <p className="text-sm italic mt-2 text-muted-foreground">
                  "The highest rate of gas exchange in the lungs occurs during retention (holding the breath)."
                  <br />— Himalayan Yoga Institute, 2016
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6" />
                The Three Phases
              </CardTitle>
              <CardDescription>Understanding each part of the breath cycle</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Phase 1: Puraka (Inhalation)</h3>
                <p className="text-sm text-muted-foreground mb-3">Sanskrit: पूरक | Meaning: Filling, to fill completely</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold mb-2">How To Practice:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Inhale slowly through nose</li>
                      <li>• Begin by expanding the belly (diaphragmatic breathing)</li>
                      <li>• Then expand the ribs</li>
                      <li>• Finally fill the upper chest</li>
                      <li>• This is "three-part breath" or complete yogic breathing</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">Qualities:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Smooth, not jerky</li>
                      <li>• Steady pace throughout</li>
                      <li>• Silent (no audible sound)</li>
                      <li>• Effortless, not forced</li>
                      <li>• Complete but not straining</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-3">Phase 2: Kumbhaka (Retention)</h3>
                <p className="text-sm text-muted-foreground mb-3">Sanskrit: कुम्भक | Meaning: Pot, vessel | Duration: 4× your inhalation</p>
                
                <div className="space-y-3">
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
                    <p className="font-semibold mb-2">Physiological Process - This is when:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Peak gas exchange occurs</li>
                      <li>• CO₂ builds up (triggering oxygen release)</li>
                      <li>• Blood oxygenation maximizes</li>
                      <li>• Cerebral blood flow increases</li>
                      <li>• Mind becomes still</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <h3 className="text-xl font-semibold mb-3">Phase 3: Rechaka (Exhalation)</h3>
                <p className="text-sm text-muted-foreground mb-3">Sanskrit: रेचक | Meaning: Emptying, purification | Duration: 2× your inhalation</p>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold mb-2">How To Practice:</p>
                    <ul className="space-y-1 text-sm">
                      <li>• Gently open the throat</li>
                      <li>• Exhale slowly through mouth</li>
                      <li>• Begin by releasing from upper chest</li>
                      <li>• Then ribs contract</li>
                      <li>• Finally pull navel toward spine (complete emptying)</li>
                    </ul>
                  </div>

                  <div>
                    <p className="font-semibold mb-2">Qualities:</p>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Slower than inhalation (twice as long)</li>
                      <li>• Smooth and controlled</li>
                      <li>• Complete but not forced</li>
                      <li>• Silent</li>
                      <li>• Steady pace throughout</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/50 p-4 rounded-lg">
                    <p className="font-semibold text-sm mb-2">Nervous System Effect:</p>
                    <p className="text-sm">The long, controlled exhale is what primarily activates the parasympathetic nervous system (relaxation response).</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-6 w-6" />
                Progression Levels
              </CardTitle>
              <CardDescription>A realistic path from beginner to master</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-2">Level</th>
                      <th className="text-center p-2">Inhale</th>
                      <th className="text-center p-2">Hold</th>
                      <th className="text-center p-2">Exhale</th>
                      <th className="text-center p-2">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b"><td className="p-2">Beginner</td><td className="text-center p-2">4s</td><td className="text-center p-2">16s</td><td className="text-center p-2">8s</td><td className="text-center p-2">28s</td></tr>
                    <tr className="border-b"><td className="p-2">Developing</td><td className="text-center p-2">5s</td><td className="text-center p-2">20s</td><td className="text-center p-2">10s</td><td className="text-center p-2">35s</td></tr>
                    <tr className="border-b"><td className="p-2">Intermediate</td><td className="text-center p-2">6s</td><td className="text-center p-2">24s</td><td className="text-center p-2">12s</td><td className="text-center p-2">42s</td></tr>
                    <tr className="border-b"><td className="p-2">Progressing</td><td className="text-center p-2">8s</td><td className="text-center p-2">32s</td><td className="text-center p-2">16s</td><td className="text-center p-2">56s</td></tr>
                    <tr className="border-b"><td className="p-2">Advanced</td><td className="text-center p-2">10s</td><td className="text-center p-2">40s</td><td className="text-center p-2">20s</td><td className="text-center p-2">70s</td></tr>
                    <tr className="border-b"><td className="p-2">Very Advanced</td><td className="text-center p-2">12s</td><td className="text-center p-2">48s</td><td className="text-center p-2">24s</td><td className="text-center p-2">84s</td></tr>
                    <tr className="border-b"><td className="p-2">Expert</td><td className="text-center p-2">15s</td><td className="text-center p-2">60s</td><td className="text-center p-2">30s</td><td className="text-center p-2">105s</td></tr>
                    <tr className="border-b"><td className="p-2">Highly Expert</td><td className="text-center p-2">18s</td><td className="text-center p-2">72s</td><td className="text-center p-2">36s</td><td className="text-center p-2">126s</td></tr>
                    <tr className="border-b"><td className="p-2">Master</td><td className="text-center p-2">20s</td><td className="text-center p-2">80s</td><td className="text-center p-2">40s</td><td className="text-center p-2">140s</td></tr>
                    <tr><td className="p-2">Advanced Master</td><td className="text-center p-2">22s</td><td className="text-center p-2">88s</td><td className="text-center p-2">44s</td><td className="text-center p-2">154s</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-4">
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm italic">
                    "Duration depends entirely on the practitioner's capacity. Start with what's comfortable and increase gradually."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">— Himalayan Yoga Institute</p>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm italic">
                    "Progressing from beginner to advanced may take years. Each level should be mastered before advancing."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">— Traditional Teaching</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LearnBasics;
