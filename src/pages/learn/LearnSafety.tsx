import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import ScreenHeader from "@/components/ScreenHeader";
import ChapterFooter from "@/components/ChapterFooter";
import { Shield, AlertTriangle } from "lucide-react";

const LearnSafety = () => {
  return (
    <div className="min-h-screen zen-texture pb-safe">
      <ScreenHeader backTo="/learn" backLabel="Learn" title="Practice Tips & Safety" subtitle="Essential guidelines for safe practice" />

      <div className="container max-w-4xl mx-auto px-4">
        <div className="space-y-6">
          <Card className="border-red-500/20 bg-red-500/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                <AlertTriangle className="h-6 w-6" />
                Important Safety Warnings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold mb-2">DO NOT practice if you have:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Severe respiratory conditions (asthma, COPD)</li>
                  <li>• Heart disease or recent cardiac events</li>
                  <li>• Uncontrolled hypertension</li>
                  <li>• Recent surgery or injury</li>
                  <li>• Pregnancy (without medical clearance)</li>
                  <li>• Active mental health crisis</li>
                </ul>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm italic">
                  "Just as lions, elephants and tigers are controlled by a careful breaking process, the breath is controlled with great care and slow progression, otherwise it can kill the practitioner."
                </p>
                <p className="text-xs text-muted-foreground mt-2">— Hatha Yoga Pradipika 2.15</p>
              </div>

              <div className="bg-red-500/10 p-4 rounded-lg">
                <p className="font-semibold text-sm mb-2">Consult a physician before starting if:</p>
                <ul className="text-sm space-y-1">
                  <li>• You have any medical conditions</li>
                  <li>• You're taking prescription medications</li>
                  <li>• You're unsure about your health status</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-6 w-6" />
                Best Practices
              </CardTitle>
              <CardDescription>How to practice safely and effectively</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Timing & Environment:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Practice on an empty stomach (2-3 hours after eating)</li>
                  <li>• Best times: early morning or evening</li>
                  <li>• Choose a quiet, well-ventilated space</li>
                  <li>• Sit comfortably with spine straight</li>
                  <li>• Avoid practicing right before bed</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Progressive Training:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Start with comfortable durations (4-5 second inhale)</li>
                  <li>• Never strain or force the breath</li>
                  <li>• Increase duration gradually over weeks/months</li>
                  <li>• If dizzy or uncomfortable, return to normal breathing</li>
                  <li>• Master each level before advancing</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Warning Signs to Stop:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Dizziness or lightheadedness</li>
                  <li>• Chest pain or tightness</li>
                  <li>• Severe breathlessness</li>
                  <li>• Rapid heart rate</li>
                  <li>• Anxiety or panic</li>
                  <li>• Any physical discomfort</li>
                </ul>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm">
                  If you experience any warning signs, immediately return to normal breathing and rest. Consult a healthcare provider if symptoms persist.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Optimal Practice Schedule</CardTitle>
              <CardDescription>Building a sustainable routine</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Frequency:</p>
                <ul className="space-y-1 text-sm">
                  <li>• Beginners: 5-10 cycles per session, 3-4x per week</li>
                  <li>• Intermediate: 10-20 cycles per session, daily</li>
                  <li>• Advanced: 20+ cycles per session, twice daily</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold mb-2">Consistency Over Intensity:</p>
                <p className="text-sm">
                  Regular practice at comfortable levels produces better results than sporadic intense sessions. Aim for sustainable, enjoyable practice.
                </p>
              </div>

              <div className="bg-secondary/50 p-4 rounded-lg">
                <p className="text-sm italic">
                  "The practitioner should progress gradually. There is no benefit in hurrying the process."
                </p>
                <p className="text-xs text-muted-foreground mt-2">— Traditional Teaching</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <ChapterFooter />
      </div>
    </div>
  );
};

export default LearnSafety;
