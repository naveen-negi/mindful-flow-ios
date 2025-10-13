import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { X, BookOpen, Lightbulb, Brain, Shield, HelpCircle, ChevronRight } from "lucide-react";

const LearnIndex = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Basics",
      description: "Learn the fundamentals of Sahita Kumbhaka",
      icon: BookOpen,
      path: "/learn/basics",
      color: "text-blue-500"
    },
    {
      title: "Tradition",
      description: "3,500 years of ancient wisdom",
      icon: Lightbulb,
      path: "/learn/tradition",
      color: "text-amber-500"
    },
    {
      title: "Science",
      description: "Modern research and benefits",
      icon: Brain,
      path: "/learn/science",
      color: "text-purple-500"
    },
    {
      title: "Practice Tips & Safety",
      description: "Essential guidelines for safe practice",
      icon: Shield,
      path: "/learn/safety",
      color: "text-green-500"
    },
    {
      title: "FAQ",
      description: "Common questions answered",
      icon: HelpCircle,
      path: "/learn/faq",
      color: "text-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-safe">
      {/* Floating close button */}
      <div
        className="fixed left-4 sm:left-6 z-50"
        style={{ bottom: "calc(env(safe-area-inset-bottom, 0px) + 16px)" }}
      >
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          size="icon"
          aria-label="Close"
          className="shadow-lg h-12 w-12"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <div className="container max-w-4xl mx-auto px-4 pt-safe">
        <div className="mb-8 pt-8">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2">Learn About Pranayama</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Everything you need to know about Sahita Kumbhaka
          </p>
        </div>

        <div className="space-y-4 pb-20">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card
                key={section.path}
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => navigate(section.path)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className={`h-6 w-6 ${section.color}`} />
                      <span>{section.title}</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LearnIndex;
