import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useNavigate } from "react-router-dom";
import { X, ChevronLeft, FileText } from "lucide-react";

const LearnFAQ = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Navigation controls */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur border-t" style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
        <div className="container max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Button
            variant="default"
            onClick={() => navigate("/learn/safety")}
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
            variant="ghost"
            onClick={() => navigate("/learn")}
            size="sm"
          >
            Menu
          </Button>
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 pt-safe pb-24">
        <div className="mb-6 pt-4">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Frequently Asked Questions</h1>
          <p className="text-sm text-muted-foreground">Common questions answered</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Common Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>What's the best time of day to practice?</AccordionTrigger>
                  <AccordionContent>
                    Early morning (5-7 AM) or evening (6-8 PM) on an empty stomach. Avoid right before bed as it can be energizing.
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
                    Yes! Start with a 1:2:2 or 1:3:2 ratio. Sahita Kumbhaka is a goal to work toward over weeks or months, not an immediate requirement.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>Should I breathe through my nose or mouth?</AccordionTrigger>
                  <AccordionContent>
                    <strong>Inhale through nose, exhale through mouth.</strong> Nasal inhalation filters and warms the air, while mouth exhalation allows for complete release and activates the relaxation response.
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
        </div>
      </div>
    </div>
  );
};

export default LearnFAQ;
