import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, BookOpen, Brain, Heart, Shield, TrendingUp, MessageCircle, HelpCircle, Lightbulb, FileText } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const Learn = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-safe">
      <div className="container max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-4 sm:mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mb-3 sm:mb-4 text-sm sm:text-base">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <h1 className="text-2xl sm:text-4xl font-bold mb-2">Learn About Pranayama</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Everything you need to know about the 1:4:2 breathing technique
          </p>
        </div>

        {/* Main content with tabs */}
        <Tabs defaultValue="basics" className="space-y-4 sm:space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-5 h-auto gap-1">
            <TabsTrigger value="basics" className="text-xs sm:text-sm py-2">Basics</TabsTrigger>
            <TabsTrigger value="tradition" className="text-xs sm:text-sm py-2">Tradition</TabsTrigger>
            <TabsTrigger value="science" className="text-xs sm:text-sm py-2">Science</TabsTrigger>
            <TabsTrigger value="practice" className="text-xs sm:text-sm py-2">Practice</TabsTrigger>
            <TabsTrigger value="faq" className="text-xs sm:text-sm py-2 col-span-3 lg:col-span-1">FAQ</TabsTrigger>
          </TabsList>

          {/* Basics Tab */}
          <TabsContent value="basics" className="space-y-4 sm:space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-6 w-6" />
                  What is 1:4:2?
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
                        <li>• Inhale slowly through both nostrils</li>
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
                        <li>• Exhale slowly through both nostrils</li>
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
          </TabsContent>

          {/* Tradition Tab */}
          <TabsContent value="tradition" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>The Ancient Timeline</CardTitle>
                <CardDescription>A practice refined over 3,500 years</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-6">
                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold mb-2">1500 BCE - The Vedas</h3>
                    <p className="text-sm mb-2">Earliest mentions of breath control in ancient India</p>
                    <p className="text-xs text-muted-foreground">Source: Rig Veda, Brihadaranyaka Upanishad</p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold mb-2">800-200 BCE - The Upanishads</h3>
                    <p className="text-sm mb-2">The Upanishads began explicitly connecting breath with consciousness and spiritual realization.</p>
                    <div className="bg-secondary/50 p-3 rounded-lg mt-2">
                      <p className="text-sm italic">
                        "One should indeed breathe in (arise), but one should also breathe out (without setting) while saying, 'Let not the misery that is dying reach me.' When one would practice that (breathing), one should rather desire to thoroughly realize that (immortality)."
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">— Brihadaranyaka Upanishad (Hymn 1.5.23)</p>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold mb-2">200 BCE - 200 CE - Patanjali's Yoga Sutras</h3>
                    <p className="text-sm mb-2">Patanjali compiled and systematized yoga philosophy, establishing pranayama as the 4th of 8 limbs (Ashtanga Yoga).</p>
                    <div className="bg-secondary/50 p-3 rounded-lg mt-2">
                      <p className="text-sm mb-2">Pranayama is mentioned in verse 2.29 of the Yoga Sutras. Patanjali discusses his specific approach to pranayama in verses 2.49 through 2.51.</p>
                      <p className="text-sm italic mt-3">
                        "When pranayama is practiced, the veil covering inner illumination is dissolved."
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">— Yoga Sutra 2.52</p>
                    </div>
                    <p className="text-sm mt-3">Patanjali described four aspects of pranayama: Inhalation (Puraka), Exhalation (Rechaka), Retention (Kumbhaka), and a fourth pranayama that "surpasses or goes beyond the other three" (kevala kumbhaka).</p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold mb-2">1450 CE - Hatha Yoga Pradipika</h3>
                    <p className="text-sm mb-2">Author: Swami Svatmarama</p>
                    <p className="text-sm mb-2">Chapter 2 is entirely devoted to pranayama, establishing it as central to Hatha Yoga practice.</p>
                    <div className="space-y-3 mt-3">
                      <div className="bg-secondary/50 p-3 rounded-lg">
                        <p className="text-xs font-semibold mb-1">On Safety (Verse 2.15):</p>
                        <p className="text-sm italic">
                          "Just as lions, elephants and tigers are controlled by a careful breaking process, the breath is controlled with great care and slow progression, otherwise it can kill the practitioner."
                        </p>
                      </div>
                      <div className="bg-secondary/50 p-3 rounded-lg">
                        <p className="text-xs font-semibold mb-1">On Mind-Breath Connection (Verse 2.2):</p>
                        <p className="text-sm italic">
                          "When breath wanders, the mind is unsteady. But when breath is calmed, the mind too will be still."
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold mb-2">1600s CE - Gheranda Samhita</h3>
                    <p className="text-sm mb-2">Author: Sage Gheranda</p>
                    <div className="bg-primary/10 p-4 rounded-lg mt-2">
                      <p className="font-semibold mb-2">THE 1:4:2 RATIO EXPLICITLY STATED</p>
                      <p className="text-sm italic mb-2">
                        "The breath ratio of 1:4:2 (inhalation: retention: exhalation) is advisable for advanced practitioners."
                      </p>
                      <p className="text-xs text-muted-foreground">— Gheranda Samhita 5.40-5.41</p>
                    </div>
                    <div className="bg-secondary/50 p-3 rounded-lg mt-3">
                      <p className="text-sm">
                        "Yogis under the guidance of Guru begins with 12 counts of inhalation, 48 counts of retention, and 24 counts of exhalation. With time and progressive increase, breath counts can be increased up to 20 inhalation, 80 retention and 40 exhalation."
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">— Fitsri Yoga, 2021; Tummee.com</p>
                    </div>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold mb-2">1920s - Scientific Study Begins</h3>
                    <p className="text-sm mb-2">Swami Kuvalayananda (1883-1966) began the experimental study of pranayama in 1924. From 1929 he experimented on the effect of pranayama on the respiratory system.</p>
                    <p className="text-xs text-muted-foreground">Founded Kaivalyadhama Research Center.</p>
                  </div>

                  <div className="border-l-4 border-primary pl-4">
                    <h3 className="text-lg font-semibold mb-2">Present Day - Medical Validation</h3>
                    <p className="text-sm mb-2">Over 1,400 studies published in medical databases validating pranayama benefits.</p>
                    <p className="text-sm">Key research from Stanford University, medical journals, and yoga research institutions confirms what ancient yogis discovered through direct experience.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Self-Inquiry Tradition</CardTitle>
                <CardDescription>The practice of looking inward</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>After pranayama practice, your mind is naturally quiet. This creates perfect conditions for self-inquiry (Atma Vichara).</p>

                <div>
                  <p className="font-semibold mb-2">The Tradition:</p>
                  <p className="text-sm mb-2">Self-inquiry is the direct path taught by sages like:</p>
                  <ul className="text-sm space-y-1">
                    <li>• Ramana Maharshi (1879-1950)</li>
                    <li>• Nisargadatta Maharaj (1897-1981)</li>
                    <li>• John Wheeler (contemporary teacher)</li>
                  </ul>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="text-sm mb-2">These aren't riddles to be solved. They're pointers to direct your attention inward.</p>
                  <p className="text-sm">The question "Who am I?" isn't asking for your name, history, or role. It's an invitation to look at what's looking.</p>
                </div>

                <div>
                  <p className="font-semibold mb-2">The Practice:</p>
                  <ol className="text-sm space-y-1 list-decimal list-inside">
                    <li>A pointer appears after your practice</li>
                    <li>Sit quietly with the question</li>
                    <li>Don't seek intellectual answers</li>
                    <li>Simply look directly</li>
                    <li>Rest in not-knowing</li>
                  </ol>
                </div>

                <p className="text-sm italic text-center mt-4">
                  "The seeker is the sought. Investigate."<br />
                  — Traditional pointer
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Science Tab */}
          <TabsContent value="science" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-6 w-6" />
                  The Science of Pranayama
                </CardTitle>
                <CardDescription>Ancient wisdom meets modern research</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-6">What yogis discovered through direct experience, science now confirms through measurement.</p>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🫁 The Bohr Effect</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">During breath retention, CO₂ buildup triggers oxygen release from hemoglobin—flooding your tissues with fresh oxygen.</p>
                  <p className="text-sm mb-3">Most people have 95-98% blood oxygen saturation, but this measures oxygen IN the blood, not tissues. CO₂ buildup during retention triggers oxygen RELEASE into tissues where it's needed for energy and repair.</p>
                  <p className="text-xs text-muted-foreground">Source: John Douillard, LifeSpa, 2022; Original discovery 1904</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">❤️ Cardiovascular Benefits</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">Slow pranayamic breathing decreases heart rate and blood pressure within minutes.</p>
                  <p className="text-sm mb-3">Clinical studies show reduced blood pressure, improved lung capacity, and better stress management with regular pranayama practice.</p>
                  <p className="text-xs text-muted-foreground">Source: Physiology of Long Pranayamic Breathing, Medical Hypotheses, 2006</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🧠 Brain Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">Breath retention activates the brain's respiratory control center in the brainstem (pons and medulla), training it for more efficient breathing over time.</p>
                  <p className="text-sm mb-3">Increased theta wave amplitude during breath retention indicates deep parasympathetic state.</p>
                  <p className="text-xs text-muted-foreground">Source: Proposed Physiological Mechanisms of Pranayama, PMC, 2024</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">⚡ Nervous System Shift</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">Pranayama shifts the autonomic nervous system from sympathetic (fight-or-flight) to parasympathetic (rest-and-digest).</p>
                  <div className="text-sm mb-3 space-y-1">
                    <p className="font-semibold">The Shift:</p>
                    <p>Sympathetic → Parasympathetic</p>
                    <p>Stress → Calm</p>
                    <p>Tension → Relaxation</p>
                    <p>Scattered mind → Focused awareness</p>
                  </div>
                  <p className="text-xs text-muted-foreground">Source: Medical Hypotheses, 2006</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">😌 Mood Improvement</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">Just 5 minutes of breathwork improved mood and reduced anxiety better than mindfulness meditation.</p>
                  <p className="text-sm mb-3">You'll feel deep calm, mental clarity, present moment awareness, and reduced physiological arousal.</p>
                  <p className="text-xs text-muted-foreground">Source: Stanford University, Cell Reports Medicine, 2023</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">🧬 Cerebral Blood Flow</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-3">Breath retention after inhalation increases CO₂ levels, leading to vasodilation and increased cerebral blood flow.</p>
                  <p className="text-sm mb-3">More blood to the brain = enhanced mental function and clarity.</p>
                  <p className="text-xs text-muted-foreground">Source: Cerebral Hemodynamics Study, Nivethitha et al.</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Benefits Over Time</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Within Minutes (Immediate Effects)</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Deep calm</li>
                    <li>• Mental clarity</li>
                    <li>• Present moment awareness</li>
                    <li>• Reduced physiological arousal</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Within Weeks (Short-term Benefits)</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Better sleep quality</li>
                    <li>• Increased energy</li>
                    <li>• Enhanced focus</li>
                    <li>• Emotional stability</li>
                    <li>• Lower resting heart rate</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Within Months (Long-term Benefits)</h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• Easier meditation</li>
                    <li>• Greater self-awareness</li>
                    <li>• Deeper inner peace</li>
                    <li>• Connection to subtler dimensions of experience</li>
                    <li>• Improved cardiovascular health</li>
                    <li>• Better stress resilience</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>1,400+ Studies</CardTitle>
                <CardDescription>Over 1,400 studies on pranayama in the PubMed medical database</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm">Pranayama has demonstrated improvement in various cardiorespiratory conditions, reducing systolic and diastolic blood pressure in hypertensive patients while also reducing anxiety. It is used therapeutically for hypertension, asthma, anxiety disorders, PTSD, depression, and chronic stress.</p>
                <p className="text-xs text-muted-foreground mt-3">Source: Physiopedia Medical Database</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Practice Tab */}
          <TabsContent value="practice" className="space-y-6">
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <Shield className="h-6 w-6" />
                  Safety First
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="font-semibold mb-2 text-destructive">Do NOT Practice Breath Retention If You Have:</p>
                  <ul className="space-y-1 text-sm">
                    <li>❌ High or low blood pressure</li>
                    <li>❌ Heart conditions or cardiovascular disease</li>
                    <li>❌ Pregnancy</li>
                    <li>❌ Respiratory infections or lung disease</li>
                    <li>❌ Recent surgery (within 6 months)</li>
                    <li>❌ Panic disorder or severe anxiety</li>
                    <li>❌ Epilepsy or seizure disorders</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold mb-2 text-destructive">Stop Immediately If You Feel:</p>
                  <ul className="space-y-1 text-sm">
                    <li>⚠️ Dizzy or lightheaded</li>
                    <li>⚠️ Pain or chest discomfort</li>
                    <li>⚠️ Nauseous</li>
                    <li>⚠️ Shortness of breath</li>
                    <li>⚠️ Anxious or panicked</li>
                    <li>⚠️ Tingling in extremities</li>
                  </ul>
                </div>

                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="font-semibold mb-2">Modified Practice Available:</p>
                  <p className="text-sm">People with blood pressure issues can practice WITHOUT retention (1:0:2 ratio).</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lightbulb className="h-6 w-6" />
                  Practice Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Establishing Routine</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Practice at the same time daily</li>
                    <li>• Same location if possible</li>
                    <li>• Empty stomach (3-4 hours after meals)</li>
                    <li>• Create a small ritual (light candle, incense, etc.)</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Improving Technique</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Focus on smooth, not forceful, breathing</li>
                    <li>• Relax shoulders and face during hold</li>
                    <li>• Use diaphragmatic breathing (belly expands first)</li>
                    <li>• Make each breath silent</li>
                    <li>• Keep spine straight but comfortable</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Staying Motivated</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Review progress weekly</li>
                    <li>• Celebrate milestones</li>
                    <li>• Remember the tradition you're part of</li>
                    <li>• Notice subtle changes in daily life</li>
                    <li>• Join online communities</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Dealing with Obstacles</h4>
                  <ul className="text-sm space-y-1">
                    <li>• Missed days? Start again without judgment</li>
                    <li>• Difficulty holding? Reduce the count</li>
                    <li>• Mind very busy? Accept it, keep returning to breath</li>
                    <li>• Plateau? Stay patient, integration is happening</li>
                    <li>• Want to quit? Review why you started</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
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

                <div className="bg-secondary/50 p-4 rounded-lg mt-4">
                  <p className="text-sm italic">
                    "If it feels smooth, effortless, and you could continue indefinitely, you're doing it right. If you're straining or struggling, reduce the count."
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="h-6 w-6" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>I'm completely new to pranayama. Where should I start?</AccordionTrigger>
                    <AccordionContent>
                      Begin with the beginner level at 4:16:8 (4 seconds inhale, 16 seconds hold, 8 seconds exhale). Start with 5-10 rounds, which takes about 5-10 minutes. Quality matters more than quantity.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger>How long should I stay at each level?</AccordionTrigger>
                    <AccordionContent>
                      Traditional texts suggest mastering each level before advancing, typically 2-8 weeks. Stay at your current level until it feels effortless, then gradually progress.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger>Should I practice every day?</AccordionTrigger>
                    <AccordionContent>
                      Traditional teaching recommends daily practice, ideally at the same time. However, 3-4 times per week is a good start. Consistency over time matters more than daily perfection.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger>I feel dizzy during breath retention. What should I do?</AccordionTrigger>
                    <AccordionContent>
                      Stop immediately. This means you're holding too long. Reduce your base count by 1-2 seconds. Dizziness is a signal you're pushing too hard.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger>I can't hold my breath for 4× my inhale. Is that okay?</AccordionTrigger>
                    <AccordionContent>
                      Yes! Start with 1:2:2 or 1:3:2 ratio. The 1:4:2 is a goal to work toward over weeks or months, not an immediate requirement.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-6">
                    <AccordionTrigger>Should I breathe through my nose or mouth?</AccordionTrigger>
                    <AccordionContent>
                      Always through your nose, both inhale and exhale. Nasal breathing filters and warms the air.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-7">
                    <AccordionTrigger>My mind wanders constantly. Is that normal?</AccordionTrigger>
                    <AccordionContent>
                      Completely normal, especially at first. When you notice, gently return attention to the breath. This is the practice.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-8">
                    <AccordionTrigger>How do I know if I'm doing it right?</AccordionTrigger>
                    <AccordionContent>
                      If it feels smooth, effortless, and you could continue indefinitely, you're doing it right. If you're straining or struggling, reduce the count.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-9">
                    <AccordionTrigger>I have high blood pressure. Can I practice?</AccordionTrigger>
                    <AccordionContent>
                      Consult your doctor first. If approved, practice WITHOUT breath retention (1:0:2 ratio). The extended exhale alone provides benefits.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-10">
                    <AccordionTrigger>I'm pregnant. Is this safe?</AccordionTrigger>
                    <AccordionContent>
                      Breath retention during pregnancy is not recommended. Consult your healthcare provider.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-11">
                    <AccordionTrigger>I've plateaued. Is something wrong?</AccordionTrigger>
                    <AccordionContent>
                      No! Plateaus are natural and necessary. "Stability is also growth." Stay at your current level until it feels effortless, then gradually progress.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-12">
                    <AccordionTrigger>Can I skip levels?</AccordionTrigger>
                    <AccordionContent>
                      Not recommended. Each level builds capacity needed for the next. Skipping levels increases injury risk and reduces benefits.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-6 w-6" />
                  Medical Disclaimer
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="font-semibold">IMPORTANT:</p>
                <p>This app is for educational and informational purposes only and is not intended as medical advice, diagnosis, or treatment.</p>
                <ul className="space-y-1">
                  <li>• Pranayama practice may not be suitable for everyone</li>
                  <li>• Breath retention can be dangerous if practiced improperly</li>
                  <li>• Consult a qualified healthcare provider before beginning</li>
                  <li>• Consult a qualified yoga teacher for proper instruction</li>
                  <li>• This app is not a substitute for professional medical or yoga instruction</li>
                </ul>
                <p className="font-semibold">You assume all risks associated with using this app.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Learn;
