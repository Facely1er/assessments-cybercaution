import React from 'react';
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
  RefreshCw
} from 'lucide-react';

const Dashboard = () => {
  // Mock data - in a real app this would come from your backend
  const recentAssessments = [
    {
      id: '1',
      name: 'Ransomware Readiness Assessment',
      date: '2024-01-15',
      score: 72,
      status: 'completed'
    },
    {
      id: '2',
      name: 'Zero Trust Maturity Assessment',
      date: '2024-01-10',
      score: 68,
      status: 'completed'
    },
    {
      id: '3',
      name: 'Supply Chain Risk Assessment',
      date: '2024-01-08',
      score: 0,
      status: 'in_progress'
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-secure-green';
    if (score >= 60) return 'text-electric-blue';
    if (score >= 40) return 'text-warning-amber';
    return 'text-critical-red';
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Security Assessment Dashboard</h1>
        <p className="text-muted-foreground">Track your organization's cybersecurity posture and assessment progress</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Security Score</p>
                <p className="text-2xl font-bold text-electric-blue">72%</p>
              </div>
              <div className="h-12 w-12 bg-electric-blue/10 rounded-lg flex items-center justify-center">
                <Shield className="h-6 w-6 text-electric-blue" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <TrendingUp className="h-4 w-4 text-secure-green mr-1" />
                <span className="text-secure-green">+5% from last month</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Assessments Completed</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
              <div className="h-12 w-12 bg-secure-green/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-secure-green" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground mr-1" />
                <span className="text-muted-foreground">This quarter</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Issues</p>
                <p className="text-2xl font-bold text-critical-red">3</p>
              </div>
              <div className="h-12 w-12 bg-critical-red/10 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-critical-red" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <Target className="h-4 w-4 text-critical-red mr-1" />
                <span className="text-critical-red">Require attention</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Risk Trend</p>
                <p className="text-2xl font-bold text-warning-amber">Medium</p>
              </div>
              <div className="h-12 w-12 bg-warning-amber/10 rounded-lg flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-warning-amber" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center text-sm">
                <Eye className="h-4 w-4 text-warning-amber mr-1" />
                <span className="text-warning-amber">Monitor closely</span>
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
            <div className="space-y-4">
              {recentAssessments.map((assessment) => (
                <div key={assessment.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
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
              
              <Button className="w-full justify-start" variant="outline">
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
                  Identity management, access controls, and backup procedures show strong implementation
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-warning-amber/10 rounded-full flex items-center justify-center mb-4">
                  <AlertTriangle className="h-8 w-8 text-warning-amber" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Areas for Improvement</h3>
                <p className="text-sm text-muted-foreground">
                  Network segmentation and incident response procedures need enhancement
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto w-16 h-16 bg-electric-blue/10 rounded-full flex items-center justify-center mb-4">
                  <Target className="h-8 w-8 text-electric-blue" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-2">Next Steps</h3>
                <p className="text-sm text-muted-foreground">
                  Complete supply chain assessment and implement tabletop exercises
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