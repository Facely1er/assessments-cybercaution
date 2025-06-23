import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  AlertOctagon, 
  FileText, 
  Shield, 
  ArrowRight, 
  Download, 
  Calendar, 
  FileCheck, 
  Settings,
  Users,
  Mail,
  ExternalLink,
  Eye,
  Lock,
  Database,
  Server,
  Network,
  RefreshCw,
  BarChart3,
  Activity
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';

const RansomwareAssessmentDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data for the dashboard
  const readinessScore = 68;
  
  const domainScores = [
    { domain: 'Backup Systems', score: 82, baseline: 90 },
    { domain: 'Security Controls', score: 65, baseline: 85 },
    { domain: 'Employee Training', score: 58, baseline: 80 },
    { domain: 'Incident Response', score: 72, baseline: 90 },
    { domain: 'System Vulnerabilities', score: 63, baseline: 85 },
  ];
  
  const historicalScores = [
    { month: 'Jan', score: 54 },
    { month: 'Feb', score: 57 },
    { month: 'Mar', score: 62 },
    { month: 'Apr', score: 65 },
    { month: 'May', score: 68 },
  ];
  
  const criticalActions = [
    {
      id: 1,
      title: 'Deploy MFA for all remote access',
      description: 'Implement multi-factor authentication for VPN and remote desktop connections to prevent credential-based attacks',
      priority: 'Critical',
      dueDate: '2025-04-15',
      status: 'In Progress'
    },
    {
      id: 2,
      title: 'Enhance network segmentation',
      description: 'Implement additional network segmentation to limit lateral movement in case of compromise',
      priority: 'High',
      dueDate: '2025-04-30',
      status: 'Not Started'
    },
    {
      id: 3,
      title: 'Test backup restoration',
      description: 'Conduct full restore test of critical systems from backups to ensure recoverability',
      priority: 'Critical',
      dueDate: '2025-04-10',
      status: 'Not Started'
    },
    {
      id: 4,
      title: 'Update security awareness training',
      description: 'Update phishing awareness training with current ransomware tactics',
      priority: 'Medium',
      dueDate: '2025-05-15',
      status: 'Not Started'
    },
    {
      id: 5,
      title: 'Implement endpoint application control',
      description: 'Deploy application whitelisting to prevent unauthorized executables from running',
      priority: 'High',
      dueDate: '2025-05-20',
      status: 'Not Started'
    },
    {
      id: 6,
      title: 'Offline backup verification',
      description: 'Verify that critical backups are truly air-gapped from the network',
      priority: 'Critical',
      dueDate: '2025-04-05',
      status: 'Not Started'
    },
  ];

  const securityControlsData = [
    { name: "Email filtering", value: 85, category: "Protection" },
    { name: "Endpoint security", value: 72, category: "Protection" },
    { name: "Backup systems", value: 82, category: "Recovery" },
    { name: "Network segmentation", value: 63, category: "Protection" },
    { name: "Privileged access", value: 58, category: "Protection" },
    { name: "User training", value: 68, category: "Prevention" },
    { name: "Patch management", value: 59, category: "Protection" },
    { name: "Incident response", value: 72, category: "Response" }
  ];
  
  const radarData = domainScores.map(item => ({
    subject: item.domain,
    A: item.score,
    B: item.baseline,
    fullMark: 100,
  }));

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-secure-green';
    if (score >= 60) return 'text-warning-amber';
    return 'text-critical-red';
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secure-green/10 text-secure-green">
          <CheckCircle className="mr-1 h-3 w-3" /> Completed
        </span>;
      case 'In Progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-amber/10 text-warning-amber">
          <Clock className="mr-1 h-3 w-3" /> In Progress
        </span>;
      case 'Not Started':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          <AlertTriangle className="mr-1 h-3 w-3" /> Not Started
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          {status}
        </span>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-critical-red/10 text-critical-red">
          Critical
        </span>;
      case 'High':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-amber/10 text-warning-amber">
          High
        </span>;
      case 'Medium':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-electric-blue/10 text-electric-blue">
          Medium
        </span>;
      case 'Low':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secure-green/10 text-secure-green">
          Low
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          {priority}
        </span>;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Ransomware Readiness Assessment</h1>
          <p className="text-muted-foreground">Evaluate and enhance your organization's ransomware defenses</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Link to="/ransomware-assessment">
            <Button>
              <Shield className="mr-2 h-4 w-4" />
              Start New Assessment
            </Button>
          </Link>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-border">
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'dashboard' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'controls' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('controls')}
        >
          Controls Assessment
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'actionItems' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('actionItems')}
        >
          Action Items
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'history' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('history')}
        >
          Assessment History
        </button>
      </div>

      {activeTab === 'dashboard' && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Overall Readiness</p>
                    <h3 className="text-3xl font-bold">{readinessScore}%</h3>
                  </div>
                  <div className="rounded-full p-3 bg-electric-blue/10 text-electric-blue">
                    <Activity className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Critical Gaps</p>
                    <h3 className="text-3xl font-bold">3</h3>
                  </div>
                  <div className="rounded-full p-3 bg-critical-red/10 text-critical-red">
                    <AlertOctagon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Last Assessment</p>
                    <h3 className="text-3xl font-bold">14d</h3>
                  </div>
                  <div className="rounded-full p-3 bg-warning-amber/10 text-warning-amber">
                    <Clock className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Recovery Readiness</p>
                    <h3 className="text-3xl font-bold">82%</h3>
                  </div>
                  <div className="rounded-full p-3 bg-secure-green/10 text-secure-green">
                    <Database className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Domain Readiness Radar Chart */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Domain Readiness</CardTitle>
                <CardDescription>Readiness scores by protection domain</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgb(var(--foreground))', fontSize: 12 }} />
                      <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 10 }} />
                      <Radar 
                        name="Current Score" 
                        dataKey="A" 
                        stroke="#2563EB" 
                        fill="#2563EB" 
                        fillOpacity={0.6} 
                      />
                      <Radar 
                        name="Baseline" 
                        dataKey="B" 
                        stroke="#7c7c7c" 
                        fill="#7c7c7c" 
                        fillOpacity={0.3} 
                      />
                      <Legend />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Historical Progress</CardTitle>
                <CardDescription>Readiness score trends over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={historicalScores}
                      margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        name="Readiness Score"
                        stroke="#2563EB" 
                        strokeWidth={2}
                        dot={{ r: 5 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Domain Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Domain-Specific Assessment</CardTitle>
              <CardDescription>Detailed breakdown of ransomware readiness by domain</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {domainScores.map((domain, index) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <h4 className="font-medium">{domain.domain}</h4>
                        <span className="ml-2 text-sm text-muted-foreground">({domain.score}% of {domain.baseline}% recommended)</span>
                      </div>
                      <span className={getScoreColor(domain.score)}>
                        {domain.score}%
                      </span>
                    </div>
                    <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-2 rounded-full ${
                          domain.score >= 80 ? 'bg-secure-green' :
                          domain.score >= 60 ? 'bg-warning-amber' :
                          'bg-critical-red'
                        }`}
                        style={{ width: `${domain.score}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <h3 className="text-lg font-semibold mb-4">Key Findings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-critical-red/5 p-4 rounded-lg border border-critical-red/20">
                    <div className="flex items-start">
                      <AlertTriangle className="h-5 w-5 text-critical-red mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Critical Gaps</h4>
                        <ul className="text-sm space-y-1">
                          <li>Employee training completion rate below threshold</li>
                          <li>MFA not implemented for all remote access</li>
                          <li>Offline backup verification not performed</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-secure-green/5 p-4 rounded-lg border border-secure-green/20">
                    <div className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-secure-green mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Strengths</h4>
                        <ul className="text-sm space-y-1">
                          <li>Backup systems well maintained</li>
                          <li>Incident response plan documented</li>
                          <li>Email security controls effective</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Critical Action Items */}
          <Card>
            <CardHeader className="flex-row justify-between items-center">
              <div>
                <CardTitle>Critical Action Items</CardTitle>
                <CardDescription>Recommended actions to improve ransomware readiness</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setActiveTab('actionItems')}>
                View All Actions
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {criticalActions.slice(0, 3).map((action) => (
                  <div key={action.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-1">
                          <h4 className="font-medium">{action.title}</h4>
                          <div className="ml-2">
                            {getPriorityBadge(action.priority)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Due: {new Date(action.dueDate).toLocaleDateString()}</span>
                          <span className="mx-2">•</span>
                          {getStatusBadge(action.status)}
                        </div>
                      </div>
                      <Button variant="outline" size="sm" className="ml-4">
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-center">
                <Button variant="link" onClick={() => setActiveTab('actionItems')}>
                  View all {criticalActions.length} action items
                  <ArrowRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Security Controls Effectiveness */}
          <Card>
            <CardHeader>
              <CardTitle>Security Controls Effectiveness</CardTitle>
              <CardDescription>Effectiveness rating of implemented security controls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={securityControlsData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="name" 
                      angle={-45}
                      textAnchor="end"
                      height={60}
                      interval={0}
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, 'Effectiveness']} />
                    <Bar 
                      dataKey="value" 
                      name="Effectiveness" 
                      fill="#2563EB" 
                      radius={4}
                      label={{ 
                        position: 'top', 
                        content: ({ value }) => `${value}%`,
                        fill: '#2563EB',
                        fontSize: 10,
                        offset: 10
                      }}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Tools and Resources Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Database className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Backup Validation</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Test your backup restoration procedures to ensure recoverability in case of a ransomware attack.
                </p>
                <Link to="/app/toolkit/backup-validation">
                  <Button className="w-full">
                    Validate Backups
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Tabletop Exercise</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Create and run ransomware incident response tabletop exercises.
                </p>
                <Link to="/tabletop-exercise">
                  <Button className="w-full">
                    Create Exercise
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <FileText className="h-8 w-8 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Response Playbook</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Generate a customized ransomware response playbook based on your environment.
                </p>
                <Link to="/app/toolkit/playbook-generator">
                  <Button className="w-full">
                    Create Playbook
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'controls' && (
        <Card>
          <CardHeader>
            <CardTitle>Controls Assessment</CardTitle>
            <CardDescription>Evaluation of individual ransomware protection controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {[
                {
                  category: 'Prevention Controls',
                  description: 'Controls that help prevent ransomware infections',
                  controls: [
                    { id: 'MFA-1', name: 'Multi-Factor Authentication for Remote Access', description: 'Require MFA for all VPN and remote access connections', status: 'Partially Implemented', score: 65 },
                    { id: 'EPP-1', name: 'Endpoint Protection Platform', description: 'Deploy modern EPP solution with ransomware prevention features', status: 'Implemented', score: 85 },
                    { id: 'APP-1', name: 'Application Control', description: 'Implement application allowlisting to prevent unauthorized executables', status: 'Not Implemented', score: 0 },
                    { id: 'EMAIL-1', name: 'Email Security Gateway', description: 'Deploy email security with advanced threat protection', status: 'Implemented', score: 90 },
                    { id: 'PATCH-1', name: 'Patch Management', description: 'Regular patching of operating systems and applications', status: 'Partially Implemented', score: 60 },
                  ]
                },
                {
                  category: 'Detection Controls',
                  description: 'Controls that help detect ransomware activity',
                  controls: [
                    { id: 'EDR-1', name: 'Endpoint Detection and Response', description: 'Deploy EDR solution to detect suspicious activity', status: 'Implemented', score: 80 },
                    { id: 'LOG-1', name: 'Centralized Logging', description: 'Collect and analyze security logs centrally', status: 'Implemented', score: 85 },
                    { id: 'SIEM-1', name: 'Security Monitoring', description: '24/7 monitoring of security events with alerts', status: 'Partially Implemented', score: 70 },
                    { id: 'HFT-1', name: 'File Integrity Monitoring', description: 'Monitor for suspicious file changes', status: 'Not Implemented', score: 10 },
                  ]
                },
                {
                  category: 'Recovery Controls',
                  description: 'Controls that help recover from ransomware',
                  controls: [
                    { id: 'BKP-1', name: 'Offline Backups', description: 'Maintain offline, air-gapped backup copies', status: 'Partially Implemented', score: 65 },
                    { id: 'BKP-2', name: 'Backup Testing', description: 'Regular testing of backup restoration process', status: 'Implemented', score: 85 },
                    { id: 'DR-1', name: 'Disaster Recovery Plan', description: 'Maintained and tested DR plan for ransomware', status: 'Implemented', score: 80 },
                    { id: 'IR-1', name: 'Incident Response Plan', description: 'Ransomware-specific incident response procedures', status: 'Implemented', score: 90 },
                  ]
                },
              ].map((category, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-medium mb-2">{category.category}</h3>
                  <p className="text-muted-foreground mb-4">{category.description}</p>
                  
                  <div className="border border-border rounded-md overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Control</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Description</th>
                          <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                          <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">Score</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-card">
                        {category.controls.map((control, cIndex) => (
                          <tr key={cIndex} className="hover:bg-muted/20">
                            <td className="px-4 py-3 text-sm font-medium">{control.id}</td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                              <div className="font-medium">{control.name}</div>
                              <div className="text-xs mt-1">{control.description}</div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                                control.status === 'Implemented' ? 'bg-secure-green/10 text-secure-green' :
                                control.status === 'Partially Implemented' ? 'bg-warning-amber/10 text-warning-amber' :
                                'bg-critical-red/10 text-critical-red'
                              }`}>
                                {control.status}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-sm text-center">
                              <div className="flex flex-col items-center">
                                <span className={`font-medium ${
                                  control.score >= 80 ? 'text-secure-green' :
                                  control.score >= 60 ? 'text-warning-amber' :
                                  'text-critical-red'
                                }`}>{control.score}%</span>
                                <div className="w-16 bg-muted h-1.5 rounded-full mt-1 overflow-hidden">
                                  <div 
                                    className={`h-1.5 rounded-full ${
                                      control.score >= 80 ? 'bg-secure-green' :
                                      control.score >= 60 ? 'bg-warning-amber' :
                                      'bg-critical-red'
                                    }`}
                                    style={{ width: `${control.score}%` }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-end mt-6">
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Export Assessment Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'actionItems' && (
        <Card>
          <CardHeader>
            <CardTitle>Action Items</CardTitle>
            <CardDescription>Recommended actions to improve ransomware readiness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search actions..."
                  className="pl-10 pr-4 py-2 border border-border rounded-md w-full md:w-80"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              {criticalActions.map((action) => (
                <div key={action.id} className="p-4 border border-border rounded-lg">
                  <div className="flex items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <h4 className="font-medium">{action.title}</h4>
                        <div className="ml-2">
                          {getPriorityBadge(action.priority)}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3.5 w-3.5 mr-1" />
                          <span>Due: {new Date(action.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                          <User className="h-3.5 w-3.5 mr-1" />
                          <span>Assigned: IT Security Team</span>
                        </div>
                        <div>
                          {getStatusBadge(action.status)}
                        </div>
                      </div>
                    </div>
                    <div className="ml-4 flex-shrink-0">
                      <Button variant="outline" size="sm">View Details</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 flex justify-between items-center">
              <div className="text-sm text-muted-foreground">
                {criticalActions.length} action items found
              </div>
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Generate Action Plan
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'history' && (
        <Card>
          <CardHeader>
            <CardTitle>Assessment History</CardTitle>
            <CardDescription>Track your ransomware readiness over time</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">Historical Readiness Scores</h3>
              <div className="h-60 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={[
                      { date: '2024-10-15', score: 51 },
                      { date: '2024-11-10', score: 54 },
                      { date: '2024-12-15', score: 57 },
                      { date: '2025-01-12', score: 62 },
                      { date: '2025-02-15', score: 65 },
                      { date: '2025-03-10', score: 68 },
                    ]}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short' })} 
                    />
                    <YAxis domain={[0, 100]} />
                    <Tooltip 
                      formatter={(value) => [`${value}%`, 'Score']}
                      labelFormatter={(date) => new Date(date).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      name="Readiness Score"
                      stroke="#2563EB" 
                      strokeWidth={2}
                      dot={{ r: 5 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            <h3 className="text-lg font-medium mb-3">Previous Assessments</h3>
            <div className="border border-border rounded-md overflow-hidden">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Score</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Assessor</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-card divide-y divide-border">
                  {[
                    { date: '2025-03-10', score: 68, assessor: 'John Smith', status: 'Complete' },
                    { date: '2025-02-15', score: 65, assessor: 'John Smith', status: 'Complete' },
                    { date: '2025-01-12', score: 62, assessor: 'Jane Doe', status: 'Complete' },
                    { date: '2024-12-15', score: 57, assessor: 'Jane Doe', status: 'Complete' },
                    { date: '2024-11-10', score: 54, assessor: 'John Smith', status: 'Complete' },
                    { date: '2024-10-15', score: 51, assessor: 'John Smith', status: 'Complete' },
                  ].map((assessment, index) => (
                    <tr key={index} className="hover:bg-muted/20">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {new Date(assessment.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`font-medium ${getScoreColor(assessment.score)}`}>
                          {assessment.score}%
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        {assessment.assessor}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className="inline-flex px-2 py-1 text-xs rounded-full bg-secure-green/10 text-secure-green">
                          {assessment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                        <Button variant="outline" size="sm">View Report</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Resources Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">NIST IR 8374</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              NIST Interagency Report 8374 provides guidance specifically tailored to ransomware protection.
            </p>
            <a 
              href="https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8374.pdf" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center"
            >
              <Button variant="outline" size="sm">
                View Resource
                <ExternalLink className="ml-1 h-3 w-3" />
              </Button>
            </a>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Training Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Access training resources for your team including phishing simulations and ransomware awareness training materials.
            </p>
            <Link to="/app/training">
              <Button variant="outline" size="sm">
                View Training
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Backup Validation</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Test your backup restoration procedures to ensure recoverability in case of a ransomware attack.
            </p>
            <Link to="/app/toolkit/backup-validation">
              <Button variant="outline" size="sm">
                Validate Backups
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Custom Thresholds Setting */}
      <Card>
        <CardHeader>
          <CardTitle>Risk Threshold Settings</CardTitle>
          <CardDescription>Customize risk level thresholds for ransomware assessment</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm font-medium mb-3">Readiness Score Thresholds</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Critical Risk</span>
                    <span>Below 40%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-critical-red" style={{ width: '40%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">High Risk</span>
                    <span>40% - 60%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-warning-amber" style={{ width: '60%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Moderate Risk</span>
                    <span>60% - 80%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-electric-blue" style={{ width: '80%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Low Risk</span>
                    <span>Above 80%</span>
                  </div>
                  <div className="w-full bg-muted h-2 rounded-full">
                    <div className="h-2 rounded-full bg-secure-green" style={{ width: '100%' }}></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium mb-3">Alert Configuration</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Email alerts for critical findings</span>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="email-alerts"
                      defaultChecked 
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Dashboard notifications</span>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="dashboard-alerts"
                      defaultChecked 
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Scheduled assessment reminders</span>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="assessment-reminders"
                      defaultChecked 
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm">Risk threshold change alerts</span>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="threshold-alerts"
                      defaultChecked 
                      className="rounded border-border text-primary focus:ring-primary"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline" size="sm" className="w-full">
                  <Settings className="mr-2 h-4 w-4" />
                  Configure Alert Settings
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RansomwareAssessmentDashboard;