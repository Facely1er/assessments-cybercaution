import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Users, 
  FileText, 
  Calendar, 
  BarChart3,
  Eye,
  Target,
  ArrowRight,
  Download,
  RefreshCw,
  Loader2,
  LogIn,
  UserPlus,
  Star,
  Zap,
  Brain,
  Network,
  Database,
  Lock,
  Globe,
  Activity,
  Award,
  Building2,
  Lightbulb,
  HeartPulse,
  Landmark,
  Factory,
  GraduationCap
} from 'lucide-react';
import { supabase, assessmentSubmissions } from '../lib/supabase';
import { toast } from '../components/ui/Toaster';
import { useAuth } from '../hooks/useAuth';
import AnimatedSection from '../utils/AnimatedSection';
import AnimatedItem from '../utils/AnimatedItem';

interface AssessmentData {
  id: string;
  name: string;
  date: string;
  score: number;
  status: 'completed' | 'in_progress' | 'not_started';
  type: string;
}

const Dashboard = () => {
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [recentAssessments, setRecentAssessments] = useState<AssessmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [criticalIssues, setCriticalIssues] = useState(0);
  const [riskLevel, setRiskLevel] = useState('Medium');

  // Features data
  const featuredTools = [
    {
      title: 'Ransomware Readiness Assessment',
      description: 'CISA-aligned assessment to evaluate your ransomware defense posture',
      icon: AlertTriangle,
      path: '/ransomware-assessment',
      color: 'text-red-600',
      bgColor: 'bg-red-100',
      category: 'Assessment'
    },
    {
      title: 'NIST CSF Alignment',
      description: 'Align your security program with the NIST Cybersecurity Framework',
      icon: Shield,
      path: '/nist-csf-alignment',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
      category: 'Compliance'
    },
    {
      title: 'Vendor Risk Management',
      description: 'Assess and monitor third-party security risks in your supply chain',
      icon: Network,
      path: '/tools/vendor-iq-enhanced',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
      category: 'Risk Management'
    },
    {
      title: 'Dark Web Monitoring',
      description: 'Continuous surveillance for credential leaks and organizational threats',
      icon: Eye,
      path: '/tools/dark-web-monitor',
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-100',
      category: 'Monitoring'
    },
    {
      title: 'Predictive Analytics',
      description: 'AI-powered vulnerability prediction and risk forecasting',
      icon: Brain,
      path: '/tools/predictive-analytics',
      color: 'text-green-600',
      bgColor: 'bg-green-100',
      category: 'Analytics'
    },
    {
      title: 'Business Impact Calculator',
      description: 'Quantify financial impact of cybersecurity incidents',
      icon: BarChart3,
      path: '/tools/business-impact',
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
      category: 'Planning'
    }
  ];

  const industryFeatures = [
    {
      industry: 'Healthcare',
      icon: HeartPulse,
      description: 'HIPAA-compliant security solutions',
      color: 'text-red-500'
    },
    {
      industry: 'Financial',
      icon: Landmark,
      description: 'Regulatory-compliant financial security',
      color: 'text-green-500'
    },
    {
      industry: 'Manufacturing',
      icon: Factory,
      description: 'Industrial cybersecurity protection',
      color: 'text-blue-500'
    },
    {
      industry: 'Education',
      icon: GraduationCap,
      description: 'Student data protection solutions',
      color: 'text-purple-500'
    }
  ];

  const securityStats = [
    { label: 'CISA Compliance Ready', value: '98%', icon: Shield, color: 'text-green-600' },
    { label: 'Threat Detection', value: '24/7', icon: Eye, color: 'text-blue-600' },
    { label: 'Response Time', value: '<2h', icon: Zap, color: 'text-orange-600' },
    { label: 'Success Rate', value: '99.9%', icon: Award, color: 'text-purple-600' }
  ];

  // Mapping of assessment types to user-friendly names
  const assessmentTypeNames: Record<string, string> = {
    'ransomware': 'Ransomware Readiness Assessment',
    'zero-trust': 'Zero Trust Maturity Assessment',
    'supply-chain': 'Supply Chain Risk Assessment',
    'incident-response': 'Incident Response Plan Assessment',
    'vulnerability-management': 'Vulnerability Management Assessment',
    'backup-readiness': 'Backup Readiness Assessment',
    'network-segmentation': 'Network Segmentation Assessment'
  };

  useEffect(() => {
    if (!authLoading) {
      if (isAuthenticated) {
        fetchDashboardData();
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, authLoading]);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      if (!user) {
        setIsLoading(false);
        return;
      }

      // Fetch user's assessment submissions
      const submissions = await assessmentSubmissions.getByUser(user.id);
      
      // Transform the data for the dashboard
      const transformedAssessments: AssessmentData[] = submissions.map(submission => ({
        id: submission.id,
        name: assessmentTypeNames[submission.assessment_type] || submission.framework_name,
        date: new Date(submission.completed_at).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric'
        }),
        score: submission.overall_score,
        status: submission.overall_score > 0 ? 'completed' : 'in_progress',
        type: submission.assessment_type
      }));

      // Sort by date (most recent first) and take the latest 5
      const sortedAssessments = transformedAssessments
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

      setRecentAssessments(sortedAssessments);

      // Calculate dashboard metrics
      const completed = transformedAssessments.filter(a => a.status === 'completed');
      const avgScore = completed.length > 0 
        ? Math.round(completed.reduce((sum, a) => sum + a.score, 0) / completed.length)
        : 0;
      
      const critical = completed.filter(a => a.score < 60).length;
      
      let risk = 'Low';
      if (avgScore < 40) risk = 'Critical';
      else if (avgScore < 60) risk = 'High';
      else if (avgScore < 80) risk = 'Medium';

      setOverallScore(avgScore);
      setCompletedCount(completed.length);
      setCriticalIssues(critical);
      setRiskLevel(risk);

    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data. Please try again.');
      toast.error('Error', 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-secure-green';
    if (score >= 60) return 'text-electric-blue';
    if (score >= 40) return 'text-warning-amber';
    return 'text-critical-red';
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'text-secure-green';
      case 'Medium': return 'text-warning-amber';
      case 'High': return 'text-critical-red';
      case 'Critical': return 'text-critical-red';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secure-green/10 text-secure-green">
          <CheckCircle className="w-3 h-3 mr-1" />
          Completed
        </span>;
      case 'in_progress':
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-warning-amber/10 text-warning-amber">
          <RefreshCw className="w-3 h-3 mr-1" />
          In Progress
        </span>;
      default:
        return <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          Not Started
        </span>;
    }
  };

  // If not authenticated, show feature showcase with login prompts
  if (!isAuthenticated && !authLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <AnimatedSection type="fadeIn">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Welcome to CyberCaution™ Dashboard
            </h1>
            <p className="text-xl text-orange-500 max-w-3xl mx-auto mb-8">
              Your comprehensive cybersecurity command center powered by CISA and NIST frameworks
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/login">
                <Button variant="orange" size="lg" className="w-full sm:w-auto">
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In to Dashboard
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        </AnimatedSection>

        {/* Security Stats */}
        <AnimatedSection type="fadeIn" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
            {securityStats.map((stat, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.2}>
                <Card className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted/30 mb-4`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        {/* Featured Tools */}
        <AnimatedSection type="fadeIn" delay={0.2}>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-4 text-foreground">
              Powerful Security Tools & Assessments
            </h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              Access professional-grade cybersecurity tools aligned with CISA and NIST frameworks
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTools.map((tool, index) => (
                <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.3}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6">
                      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${tool.bgColor} mb-4 group-hover:scale-110 transition-transform`}>
                        <tool.icon className={`h-6 w-6 ${tool.color}`} />
                      </div>
                      <div className="mb-2">
                        <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                          {tool.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold mb-2 text-foreground">{tool.title}</h3>
                      <p className="text-muted-foreground mb-4">{tool.description}</p>
                      <div className="flex items-center justify-between">
                        <Link to={tool.path} className="text-primary hover:underline text-sm font-medium">
                          Learn More →
                        </Link>
                        <div className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">
                          Sign In Required
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </AnimatedItem>
              ))}
            </div>
          </div>
        </AnimatedSection>

        {/* Industry Solutions */}
        <AnimatedSection type="fadeIn" delay={0.3} className="bg-muted/30 dark:bg-muted/10 rounded-lg p-8 mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4 text-foreground">Industry-Specific Solutions</h2>
            <p className="text-lg text-muted-foreground">
              Tailored cybersecurity solutions for your industry's unique challenges
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industryFeatures.map((industry, index) => (
              <AnimatedItem key={index} type="fadeIn" delay={index * 0.1 + 0.4}>
                <Card className="text-center hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <industry.icon className={`h-8 w-8 ${industry.color} mx-auto mb-3`} />
                    <h3 className="font-semibold mb-2">{industry.industry}</h3>
                    <p className="text-sm text-muted-foreground">{industry.description}</p>
                  </CardContent>
                </Card>
              </AnimatedItem>
            ))}
          </div>
        </AnimatedSection>

        {/* Call to Action */}
        <AnimatedSection type="fadeIn" delay={0.4}>
          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Organization?</h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of organizations using CyberCaution for comprehensive cybersecurity
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/login">
                  <Button variant="white" size="lg" className="w-full sm:w-auto bg-white text-orange-600 hover:bg-white/90">
                    <LogIn className="mr-2 h-5 w-5" />
                    Access Your Dashboard
                  </Button>
                </Link>
                <Link to="/demo">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-white text-white hover:bg-white/10">
                    Schedule Demo
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Quick Start */}
        <AnimatedSection type="fadeIn" delay={0.5} className="mt-16">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-6 text-foreground">Get Started in Minutes</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">1</div>
                <h3 className="font-semibold mb-2">Create Account</h3>
                <p className="text-sm text-muted-foreground">Sign up for free and access your personalized dashboard</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">2</div>
                <h3 className="font-semibold mb-2">Run Assessment</h3>
                <p className="text-sm text-muted-foreground">Complete your first CISA-aligned security assessment</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">3</div>
                <h3 className="font-semibold mb-2">Implement Security</h3>
                <p className="text-sm text-muted-foreground">Follow personalized recommendations to strengthen your defenses</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  if (authLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-muted-foreground">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-critical-red mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-foreground mb-2">Error Loading Dashboard</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button onClick={fetchDashboardData}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  // Authenticated user dashboard
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {user?.email?.split('@')[0]}
            </h1>
            <p className="text-muted-foreground">Track your organization's cybersecurity posture and assessment progress</p>
          </div>
          <Button variant="outline" onClick={fetchDashboardData} disabled={isLoading}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Security Score</p>
                <p className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</p>
              </div>
              <div className="h-12 w-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-electric-blue" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <BarChart3 className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-muted-foreground">Based on completed assessments</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assessments Completed</p>
                <p className="text-2xl font-bold text-foreground">{completedCount}</p>
              </div>
              <div className="h-12 w-12 bg-secure-green/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-secure-green" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-muted-foreground">Total completed</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Areas Needing Attention</p>
                <p className="text-2xl font-bold text-critical-red">{criticalIssues}</p>
              </div>
              <div className="h-12 w-12 bg-critical-red/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-critical-red" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <Target className="h-4 w-4 text-critical-red mr-1" />
                <span className="text-critical-red">Scores below 60%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Level</p>
                <p className={`text-2xl font-bold ${getRiskColor(riskLevel)}`}>{riskLevel}</p>
              </div>
              <div className="h-12 w-12 bg-warning-amber/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-warning-amber" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <Eye className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-muted-foreground">Overall assessment</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Assessments */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Assessments</span>
              <Link to="/assessments">
                <Button variant="outline" size="sm">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {recentAssessments.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-foreground mb-2">No Assessments Yet</h3>
                <p className="text-muted-foreground mb-4">Get started by taking your first security assessment</p>
                <Link to="/assessments">
                  <Button>
                    Start Assessment
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentAssessments.map((assessment) => (
                  <div key={assessment.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted/20 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground">{assessment.name}</h4>
                      <p className="text-sm text-muted-foreground">{assessment.date}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                      {assessment.status === 'completed' && (
                        <span className={`text-sm font-medium ${getScoreColor(assessment.score)}`}>
                          {assessment.score}%
                        </span>
                      )}
                      {getStatusBadge(assessment.status)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4">
              <Link to="/ransomware-assessment">
                <Button className="w-full justify-start" variant="outline">
                  <AlertTriangle className="mr-2 h-4 w-4" />
                  Start Ransomware Assessment
                </Button>
              </Link>
              
              <Link to="/zero-trust-maturity-assessment">
                <Button className="w-full justify-start" variant="outline">
                  <Shield className="mr-2 h-4 w-4" />
                  Zero Trust Maturity Check
                </Button>
              </Link>
              
              <Link to="/vulnerability-management-assessment">
                <Button className="w-full justify-start" variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Vulnerability Management Review
                </Button>
              </Link>
              
              <Link to="/tabletop-exercise">
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Run Tabletop Exercise
                </Button>
              </Link>
              
              <Link to="/toolkit">
                <Button className="w-full justify-start" variant="outline">
                  <Lightbulb className="mr-2 h-4 w-4" />
                  Explore Security Toolkit
                </Button>
              </Link>
              
              <Button 
                className="w-full justify-start" 
                variant="outline" 
                disabled={recentAssessments.length === 0}
                onClick={() => toast.info('Feature coming soon', 'Executive report generation will be available soon')}
              >
                <Download className="mr-2 h-4 w-4" />
                Download Executive Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Posture Overview */}
      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Security Posture Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-secure-green/10 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-8 w-8 text-secure-green" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Strong Areas</h3>
                <p className="text-sm text-muted-foreground">
                  {completedCount > 0 
                    ? `${recentAssessments.filter(a => a.score >= 80).length} assessments show strong performance`
                    : 'Complete assessments to identify your strong areas'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-warning-amber/10 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-warning-amber" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Areas for Improvement</h3>
                <p className="text-sm text-muted-foreground">
                  {criticalIssues > 0 
                    ? `${criticalIssues} assessment${criticalIssues !== 1 ? 's' : ''} need${criticalIssues === 1 ? 's' : ''} attention`
                    : 'All completed assessments show good performance'
                  }
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-electric-blue" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Next Steps</h3>
                <p className="text-sm text-muted-foreground">
                  {recentAssessments.length === 0 
                    ? 'Start with a ransomware readiness assessment'
                    : 'Continue with additional assessments and implement recommendations'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;