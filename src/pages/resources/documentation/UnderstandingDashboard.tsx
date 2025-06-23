import React, { useState } from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
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
  X,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UnderstandingDashboard = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const navigate = useNavigate();

  const sections = [
    {
      id: 'risk-overview',
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
      details: {
        usage: "Monitor overall risk posture and trends",
        configuration: [
          "Filter by date range",
          "Select risk categories",
          "Choose visualization type",
          "Set refresh interval"
        ],
        bestPractices: [
          "Review daily for changes",
          "Focus on high-severity risks",
          "Track risk velocity",
          "Monitor treatment progress"
        ]
      }
    },
    {
      id: 'compliance-status',
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
      details: {
        usage: "Track compliance across frameworks",
        configuration: [
          "Select frameworks",
          "Configure scoring method",
          "Set compliance thresholds",
          "Enable notifications"
        ],
        bestPractices: [
          "Regular assessment reviews",
          "Document non-compliance",
          "Track remediation progress",
          "Monitor control effectiveness"
        ]
      }
    },
    {
      id: 'treatment-progress',
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
      details: {
        usage: "Monitor risk treatment implementation",
        configuration: [
          "Set milestone tracking",
          "Configure deadlines",
          "Define success criteria",
          "Enable reminders"
        ],
        bestPractices: [
          "Regular progress updates",
          "Prioritize critical treatments",
          "Track resource allocation",
          "Monitor effectiveness"
        ]
      }
    },
    {
      id: 'critical-alerts',
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
      details: {
        usage: "Stay informed of critical issues",
        configuration: [
          "Set alert criteria",
          "Configure notifications",
          "Define escalation rules",
          "Set alert priorities"
        ],
        bestPractices: [
          "Immediate alert review",
          "Clear response procedures",
          "Regular threshold review",
          "Document alert handling"
        ]
      }
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
          <h1 className="text-4xl font-bold mb-4 text-foreground">Understanding the Dashboard</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn how to use and customize your risk management dashboard
          </p>
        </div>

        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-8 text-foreground">Dashboard Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sections.map((section) => (
              <Card key={section.id} className="hover:shadow-lg transition-shadow dark:border-muted">
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
                    onClick={() => setSelectedSection(section.id)}
                  >
                    View Details
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  {selectedSection === section.id && (
                    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                      <div className="bg-background rounded-lg shadow-lg dark:border dark:border-muted max-w-2xl w-full p-6 relative">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-4 top-4"
                          onClick={() => setSelectedSection(null)}
                        >
                          <X className="h-4 w-4" />
                        </Button>

                        <section.icon className="h-8 w-8 text-primary mb-4" />
                        <h3 className="text-2xl font-semibold mb-2 text-foreground">{section.title}</h3>
                        <p className="text-muted-foreground mb-6">{section.description}</p>

                        <div className="space-y-6">
                          <div>
                            <h4 className="text-sm font-semibold mb-2 text-foreground">Usage</h4>
                            <p className="text-sm text-foreground">{section.details.usage}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold mb-2 text-foreground">Configuration Options</h4>
                            <ul className="space-y-2">
                              {section.details.configuration.map((option, index) => (
                                <li key={index} className="flex items-center text-sm">
                                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                  <span className="text-foreground">{option}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-semibold mb-2 text-foreground">Best Practices</h4>
                            <ul className="space-y-2">
                              {section.details.bestPractices.map((practice, index) => (
                                <li key={index} className="flex items-center text-sm">
                                  <CheckCircle className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                                  <span className="text-foreground">{practice}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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

export default UnderstandingDashboard;