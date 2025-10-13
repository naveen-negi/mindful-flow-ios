import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const LearnTradition = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Navigation controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-t" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="default"
            onClick={() => navigate("/learn/basics")}
            size="sm"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Previous
          </Button>
          
          <Button
            variant="ghost"
            onClick={() => navigate("/learn")}
            size="icon"
            className="h-9 w-9"
          >
            <X className="h-4 w-4" />
          </Button>

          <Button
            variant="default"
            onClick={() => navigate("/learn/science")}
            size="sm"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 pt-safe pb-24">
        <div className="mb-6 pt-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Tradition</h1>
          <p className="text-sm text-muted-foreground">3,500 years of ancient wisdom</p>
        </div>

        <div className="space-y-6">
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
                    <p className="font-semibold mb-2">SAHITA KUMBHAKA EXPLICITLY STATED</p>
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
        </div>
      </div>
    </div>
  );
};

export default LearnTradition;
