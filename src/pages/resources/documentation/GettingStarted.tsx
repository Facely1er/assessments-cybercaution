import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { 
  Shield, 
  ArrowRight, 
  CheckCircle,
  FileText,
  Settings,
  BarChart3,
  Users,
  Lock
} from 'lucide-react';

const GettingStarted = () => {
  const navigate = useNavigate();
  const guides = [
    {
      title: "Platform Overview",
      description: "Learn about CyberCaution's core features and capabilities",
      steps: [
        "Dashboard navigation",
        "Key features overview",
        "User interface basics",
        "Common workflows"
      ],
      time: "15 mins",
      icon: Shield,
      path: "/documentation/platform-overview"
    },
    {
      title: "First Risk Assessment",
      description: "Complete your first risk assessment using NIST CSF framework",
      steps: [
        "Risk identification",
        "Impact analysis",
        "Control evaluation",
        "Treatment planning"
      ],
      time: "30 mins",
      icon: FileText,
      path: "/documentation/quick-start"
    },
    {
      title: "Security Controls Setup",
      description: "Configure and implement security controls",
      steps: [
        "Control framework selection",
        "Control mapping",
        "Implementation guidance",
        "Effectiveness monitoring"
      ],
      time: "45 mins",
      icon: Lock,
      path: "/documentation/platform-overview"
    },
    {
      title: "Dashboard Configuration",
      description: "Customize your dashboard and reporting views",
      steps: [
        "Widget configuration",
        "Metric selection",
        "Report customization",
        "Alert setup"
      ],
      time: "20 mins",
      icon: BarChart3,
      path: "/documentation/understanding-dashboard"
    },
    {
      title: "User Management",
      description: "Set up users, roles, and permissions",
      steps: [
        "User roles overview",
        "Permission configuration",
        "Team setup",
        "Access control"
      ],
      time: "25 mins",
      icon: Users,
      path: "/documentation/platform-overview"
    },
    {
      title: "System Configuration",
      description: "Configure system settings and integrations",
      steps: [
        "General settings",
        "Integration setup",
        "Notification configuration",
        "Backup settings"
      ],
      time: "35 mins",
      icon: Settings,
      path: "/documentation/platform-overview"
    }
  ];

  return (
    <div className="py-20">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4 text-foreground">Getting Started with CyberCaution</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Follow these guides to set up and start using CyberCaution effectively
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow dark:border-muted">
            <CardContent className="p-6">
              <guide.icon className="h-12 w-12 text-primary mb-4" />
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs bg-primary/10 dark:bg-primary/20 text-primary px-2 py-1 rounded-full">
                  Estimated time: {guide.time}
                </span>
              </div>

              <h3 className="text-xl font-semibold mb-2 text-foreground">{guide.title}</h3>
              <p className="text-muted-foreground mb-4">{guide.description}</p>

              <div className="space-y-2 mb-6">
                {guide.steps.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-center text-sm">
                    <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                    <span className="text-foreground">{step}</span>
                  </div>
                ))}
              </div>

              <Button 
                className="w-full"
                onClick={() => navigate(guide.path)}
              >
                Start Guide
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Card className="inline-block dark:border-muted">
          <CardContent className="p-6">
            <p className="text-muted-foreground mb-4">
              Need help? Contact our support team for personalized assistance.
            </p>
            <Button variant="outline">Contact Support</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GettingStarted;