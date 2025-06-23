import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Lock, 
  Database, 
  Server, 
  FileText,
  Network,
  ArrowRight,
  Users,
  Mail,
  ExternalLink,
  Eye,
  Zap
} from 'lucide-react';
import { Link } from 'react-router-dom';

const RansomwarePage = () => {
  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Ransomware Protection</h1>
          <p className="text-muted-foreground">Comprehensive protection against ransomware threats</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Link to="/ransomware-assessment">
            <Button>
              <Eye className="mr-2 h-4 w-4" />
              Start Assessment
            </Button>
          </Link>
          <Button variant="outline">
            <Shield className="mr-2 h-4 w-4" />
            Protection Status
          </Button>
        </div>
      </div>

      {/* Protection Status */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Overall Protection</p>
                <h3 className="text-3xl font-bold">76%</h3>
              </div>
              <div className="rounded-full p-3 bg-electric-blue/10 text-electric-blue">
                <Shield className="h-6 w-6" />
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
                <AlertTriangle className="h-6 w-6" />
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

      {/* Protection Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            NIST-Aligned Ransomware Protection
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Identify */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center mr-2">
                    <Eye className="h-4 w-4 text-electric-blue" />
                  </div>
                  <h3 className="font-medium">Identify</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Asset and risk identification</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-1.5">
                  <span>Protection Level</span>
                  <span className="font-medium">85%</span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full">
                  <div className="bg-electric-blue h-1.5 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  <li className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-secure-green mr-1.5" />
                    <span>Asset inventory</span>
                  </li>
                  <li className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-secure-green mr-1.5" />
                    <span>Risk assessment</span>
                  </li>
                  <li className="flex items-center text-xs">
                    <AlertTriangle className="h-3 w-3 text-warning-amber mr-1.5" />
                    <span>Threat intelligence</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Protect */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center mr-2">
                    <Lock className="h-4 w-4 text-electric-blue" />
                  </div>
                  <h3 className="font-medium">Protect</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Preventative controls</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-1.5">
                  <span>Protection Level</span>
                  <span className="font-medium">65%</span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full">
                  <div className="bg-warning-amber h-1.5 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  <li className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-secure-green mr-1.5" />
                    <span>MFA implemented</span>
                  </li>
                  <li className="flex items-center text-xs">
                    <AlertTriangle className="h-3 w-3 text-warning-amber mr-1.5" />
                    <span>Network segmentation</span>
                  </li>
                  <li className="flex items-center text-xs">
                    <AlertTriangle className="h-3 w-3 text-critical-red mr-1.5" />
                    <span>Application controls</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Detect */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center mr-2">
                    <Zap className="h-4 w-4 text-electric-blue" />
                  </div>
                  <h3 className="font-medium">Detect</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Detection capabilities</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-1.5">
                  <span>Protection Level</span>
                  <span className="font-medium">70%</span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full">
                  <div className="bg-electric-blue h-1.5 rounded-full" style={{ width: '70%' }}></div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  <li className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-secure-green mr-1.5" />
                    <span>Endpoint monitoring</span>
                  </li>
                  <li className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-secure-green mr-1.5" />
                    <span>Log analysis</span>
                  </li>
                  <li className="flex items-center text-xs">
                    <AlertTriangle className="h-3 w-3 text-warning-amber mr-1.5" />
                    <span>Behavioral analytics</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Respond */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center mr-2">
                    <AlertTriangle className="h-4 w-4 text-electric-blue" />
                  </div>
                  <h3 className="font-medium">Respond</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Incident response</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-1.5">
                  <span>Protection Level</span>
                  <span className="font-medium">80%</span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full">
                  <div className="bg-secure-green h-1.5 rounded-full" style={{ width: '80%' }}></div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  <li className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-secure-green mr-1.5" />
                    <span>Incident response plan</span>
                  </li>
                  <li className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-secure-green mr-1.5" />
                    <span>Containment procedures</span>
                  </li>
                  <li className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-secure-green mr-1.5" />
                    <span>Communication process</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Recover */}
            <Card className="shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 rounded-full bg-electric-blue/10 flex items-center justify-center mr-2">
                    <Database className="h-4 w-4 text-electric-blue" />
                  </div>
                  <h3 className="font-medium">Recover</h3>
                </div>
                <p className="text-xs text-muted-foreground mb-3">Recovery capabilities</p>
                <div className="flex justify-between items-center text-xs text-muted-foreground mb-1.5">
                  <span>Protection Level</span>
                  <span className="font-medium">82%</span>
                </div>
                <div className="w-full bg-muted h-1.5 rounded-full">
                  <div className="bg-secure-green h-1.5 rounded-full" style={{ width: '82%' }}></div>
                </div>
                <ul className="mt-3 space-y-1.5">
                  <li className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-secure-green mr-1.5" />
                    <span>Backup strategy</span>
                  </li>
                  <li className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-secure-green mr-1.5" />
                    <span>Recovery procedures</span>
                  </li>
                  <li className="flex items-center text-xs">
                    <CheckCircle className="h-3 w-3 text-secure-green mr-1.5" />
                    <span>Testing program</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Critical Protection Gaps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="h-5 w-5 mr-2 text-warning-amber" />
            Critical Protection Gaps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border border-critical-red/20 rounded-lg bg-critical-red/5">
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-critical-red/10 text-critical-red mr-3 mt-0.5">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Incomplete Application Allowlisting</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Application allowlisting is not configured on all endpoints, allowing potential execution of ransomware payloads.
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <Lock className="h-3.5 w-3.5 mr-1" />
                    <span>NIST CSF: PR.PT-3</span>
                    <span className="mx-2">•</span>
                    <span>Priority: Critical</span>
                  </div>
                  <Button size="sm">
                    View Remediation Steps
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 border border-warning-amber/20 rounded-lg bg-warning-amber/5">
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-warning-amber/10 text-warning-amber mr-3 mt-0.5">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Insufficient Network Segmentation</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Inadequate network segmentation could allow ransomware to spread laterally throughout the organization.
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <Network className="h-3.5 w-3.5 mr-1" />
                    <span>NIST CSF: PR.AC-5</span>
                    <span className="mx-2">•</span>
                    <span>Priority: High</span>
                  </div>
                  <Button size="sm">
                    View Remediation Steps
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="p-4 border border-warning-amber/20 rounded-lg bg-warning-amber/5">
              <div className="flex items-start">
                <div className="rounded-full p-2 bg-warning-amber/10 text-warning-amber mr-3 mt-0.5">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium mb-1">Email Filtering Configuration</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    Current email security gateway settings allow potential ransomware delivery through phishing attachments.
                  </p>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <Mail className="h-3.5 w-3.5 mr-1" />
                    <span>NIST CSF: DE.CM-1</span>
                    <span className="mx-2">•</span>
                    <span>Priority: High</span>
                  </div>
                  <Button size="sm">
                    View Remediation Steps
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Protection Resources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-medium">Tabletop Exercises</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Practice ransomware incident response with realistic scenarios.
            </p>
            <Link to="/tabletop-exercise">
              <Button className="w-full">
                View Exercises
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Users className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-medium">Security Awareness</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Train staff to recognize and respond to ransomware threats.
            </p>
            <Link to="/security-awareness">
              <Button className="w-full">
                Training Resources
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <FileText className="h-8 w-8 text-primary mr-3" />
              <h3 className="text-lg font-medium">Ransomware Playbooks</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Step-by-step response procedures for ransomware incidents.
            </p>
            <Link to="/playbooks">
              <Button className="w-full">
                View Playbooks
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Industry Standards */}
      <Card>
        <CardHeader>
          <CardTitle>NIST-Aligned Protection Framework</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Our ransomware protection framework is aligned with NIST IR 8374, "Cybersecurity Framework Profile for Ransomware Risk Management," 
            which provides a prioritized subset of safeguards from the NIST Cybersecurity Framework.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">NIST IR 8374</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Cybersecurity Framework Profile for Ransomware Risk Management
                </p>
                <a 
                  href="https://nvlpubs.nist.gov/nistpubs/ir/2021/NIST.IR.8374.pdf" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center"
                >
                  View Framework
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium mb-1">NIST Cybersecurity Framework</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Core framework for cybersecurity risk management
                </p>
                <Link
                  to="/nist-csf-alignment"
                  className="text-sm text-primary hover:underline flex items-center"
                >
                  View CSF Alignment
                  <ArrowRight className="h-3.5 w-3.5 ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RansomwarePage;