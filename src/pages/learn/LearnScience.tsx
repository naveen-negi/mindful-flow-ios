import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, Brain, Heart, Activity } from "lucide-react";

const LearnScience = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Navigation controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-t" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="default"
            onClick={() => navigate("/learn/tradition")}
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
            onClick={() => navigate("/learn/safety")}
            size="sm"
          >
            Next
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 pt-safe pb-24">
        <div className="mb-6 pt-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Science</h1>
          <p className="text-sm text-muted-foreground">Modern research validates ancient practice</p>
        </div>

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
      </div>
    </div>
  );
};

export default LearnScience;
