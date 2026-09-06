import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ScreenHeader from "@/components/ScreenHeader";
import ChapterFooter from "@/components/ChapterFooter";
import { Brain, Heart, Activity } from "lucide-react";

const LearnScience = () => {
  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader backTo="/learn" backLabel="Learn" title="Science" subtitle="Modern research validates ancient practice" />

      <div className="container max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-6 w-6" />
                Neurological Effects
              </CardTitle>
              <CardDescription>What happens in your brain</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Breath Retention Benefits:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Increases CO₂ levels (hypercapnia)</li>
                  <li>• Triggers vasodilation (blood vessels expand)</li>
                  <li>• Enhances cerebral blood flow</li>
                  <li>• Improves oxygen delivery to brain tissue</li>
                </ul>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm italic">
                  "Controlled breath retention creates mild, safe hypercapnia that signals the body to improve oxygen utilization - a training effect that builds CO₂ tolerance."
                </p>
                <p className="text-xs text-muted-foreground mt-2">— Stanford Huberman Lab</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Autonomic Nervous System
              </CardTitle>
              <CardDescription>Balancing stress and relaxation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Sympathetic vs Parasympathetic:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                  <div className="bg-red-500/10 p-4 rounded-lg">
                    <p className="font-semibold text-sm mb-2">Sympathetic (Stress)</p>
                    <ul className="text-xs space-y-1">
                      <li>• Fight-or-flight response</li>
                      <li>• Rapid breathing</li>
                      <li>• Elevated heart rate</li>
                      <li>• Cortisol release</li>
                    </ul>
                  </div>
                  <div className="bg-green-500/10 p-4 rounded-lg">
                    <p className="font-semibold text-sm mb-2">Parasympathetic (Calm)</p>
                    <ul className="text-xs space-y-1">
                      <li>• Rest-and-digest response</li>
                      <li>• Slow, deep breathing</li>
                      <li>• Reduced heart rate</li>
                      <li>• Lowered cortisol</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg mt-4">
                <p className="text-sm">
                  The extended exhale (2× inhale duration) in Sahita Kumbhaka primarily activates the parasympathetic nervous system, promoting deep relaxation while maintaining mental clarity.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-6 w-6" />
                Documented Benefits
              </CardTitle>
              <CardDescription>Peer-reviewed research findings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Mental Health:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Reduces anxiety and depression symptoms</li>
                  <li>• Improves emotional regulation</li>
                  <li>• Enhances focus and concentration</li>
                  <li>• Reduces perceived stress levels</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Physical Health:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Lowers blood pressure</li>
                  <li>• Improves lung capacity</li>
                  <li>• Enhances cardiovascular efficiency</li>
                  <li>• Strengthens respiratory muscles</li>
                  <li>• Improves sleep quality</li>
                </ul>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm italic">
                  "Over 1,400 studies in medical databases confirm pranayama's therapeutic effects on anxiety, depression, hypertension, and respiratory conditions."
                </p>
                <p className="text-xs text-muted-foreground mt-2">— PubMed Database Analysis</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <ChapterFooter />
      </div>
    </div>
  );
};

export default LearnScience;
