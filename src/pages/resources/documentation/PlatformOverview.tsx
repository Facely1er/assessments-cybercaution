import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight,
  BarChart2,
  PieChart,
  LineChart,
  AlertTriangle,
  CheckCircle,
  Clock,
  Shield,
  Info,
  ArrowLeft
} from 'lucide-react';

const PlatformOverview = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Risk Overview",
      description: "Key risk metrics and indicators",
      metrics: [
        "Total risks by severity",
        "Risk status distribution",
        "Risk trends over time",
        "Top risk categories"
      ],
      icon: BarChart2,
      type: "chart",
      path: "/documentation/understanding-dashboard"
    },
    {
      title: "Compliance Status",
      description: "Framework compliance metrics",
      metrics: [
        "Overall compliance score",
        "Framework-specific status",
        "Control effectiveness",
        "Gap analysis"
      ],
      icon: PieChart,
      type: "chart",
      path: "/documentation/understanding-dashboard"
    },
    {
      title: "Treatment Progress",
      description: "Risk treatment tracking",
      metrics: [
        "Treatment status",
        "Implementation progress",
        "Overdue actions",
        "Upcoming deadlines"
      ],
      icon: LineChart,
      type: "progress",
      path: "/documentation/understanding-dashboard"
    },
    {
      title: "Critical Alerts",
      description: "High-priority notifications",
      metrics: [
        "High-risk items",
        "Control failures",
        "Compliance issues",
        "Upcoming deadlines"
      ],
      icon: AlertTriangle,
      type: "alerts",
      path: "/documentation/understanding-dashboard"
    }
  ];

  const customization = [
    {
      title: "Widget Configuration",
      description: "Customize dashboard widgets",
      steps: [
        "Select relevant metrics",
        "Configure display options",
        "Set refresh intervals",
        "Define thresholds"
      ]
    },
    {
      title: "Layout Management",
      description: "Organize dashboard layout",
      steps: [
        "Arrange widgets",
        "Resize components",
        "Create custom views",
        "Save layouts"
      ]
    },
    {
      title: "Data Filtering",
      description: "Filter dashboard data",
      steps: [
        "Set date ranges",
        "Apply risk filters",
        "Filter by category",
        "Custom criteria"
      ]
    }
  ];

  return (
    <div className="py-20">
      <div className="max-w-6xl mx-auto px-6">
        <Button 
          variant="outline" 
          className="mb-8"
          onClick={() => navigate('/resources/documentation')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Documentation
        </Button>
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4 text-foreground">Platform Overview</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Understand CyberCaution's core features and capabilities
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Dashboard Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow dark:border-muted">
                <CardContent className="p-6">
                  <section.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{section.title}</h3>
                  <p className="text-muted-foreground mb-4">{section.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {section.metrics.map((metric, metricIndex) => (
                      <li key={metricIndex} className="flex items-center text-sm">
                        <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                        <span className="text-foreground">{metric}</span>
                      </li>
                    ))}
                  </ul>

                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => navigate(section.path)}
                  >
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Dashboard Customization</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {customization.map((item, index) => (
              <Card key={index} className="dark:border-muted">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-foreground">{item.title}</h3>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  
                  <div className="space-y-4">
                    {item.steps.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-primary/10 dark:bg-primary/20 text-primary flex items-center justify-center mr-3 flex-shrink-0">
                          {stepIndex + 1}
                        </div>
                        <span className="text-sm text-foreground">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="bg-muted/30 dark:bg-muted/20 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">Pro Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Set up automatic refresh intervals for real-time monitoring</span>
                </li>
                <li className="flex items-center text-sm">
                  <Shield className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Configure alert thresholds for critical metrics</span>
                </li>
                <li className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-primary mr-2" />
                  <span className="text-foreground">Save multiple dashboard layouts for different use cases</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlatformOverview;