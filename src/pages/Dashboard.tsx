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
  Loader2
} from 'lucide-react';
import { supabase, assessmentSubmissions } from '../lib/supabase';
import { toast } from '../components/ui/Toaster';

interface AssessmentData {
  id: string;
  name: string;
  date: string;
  score: number;
  status: 'completed' | 'in_progress' | 'not_started';
  type: string;
}

const Dashboard = () => {
  const [recentAssessments, setRecentAssessments] = useState<AssessmentData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [overallScore, setOverallScore] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [criticalIssues, setCriticalIssues] = useState(0);
  const [riskLevel, setRiskLevel] = useState('Medium');

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
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Get current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError || !user) {
        // User not authenticated, show guest data
        setRecentAssessments([]);
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Security Assessment Dashboard</h1>
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
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <p className={`text-2xl font-bold ${getScoreColor(overallScore)}`}>{overallScore}%</p>
                )}
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
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-foreground">{completedCount}</p>
                )}
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
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <p className="text-2xl font-bold text-critical-red">{criticalIssues}</p>
                )}
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
                {isLoading ? (
                  <div className="flex items-center">
                    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                  </div>
                ) : (
                  <p className={`text-2xl font-bold ${getRiskColor(riskLevel)}`}>{riskLevel}</p>
                )}
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
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading assessments...</span>
              </div>
            ) : recentAssessments.length === 0 ? (
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
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Loading overview...</span>
              </div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;