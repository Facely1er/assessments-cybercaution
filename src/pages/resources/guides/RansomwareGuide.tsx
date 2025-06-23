import React from 'react';
import { Card, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { GuideProgress } from '../../../components/guides/GuideProgress';
import { toast } from '../../../components/ui/Toaster';
import { 
  Shield, 
  CheckCircle, 
  ArrowRight,
  FileText,
  AlertTriangle,
  Lock,
  Database,
  Users,
  Settings,
  Info,
  Clock,
  RefreshCcw,
  HardDrive,
  Network,
  UserCheck,
  Bell,
  ArrowLeft,
  Download,
  ClipboardList
} from 'lucide-react';

const RansomwareGuide = () => {
  const navigate = useNavigate();

  const sections = [
    {
      id: 'prevention',
      title: 'Prevention',
      items: [
        'Access Control',
        'System Hardening',
        'Email Security',
        'Network Segmentation'
      ]
    },
    {
      id: 'detection',
      title: 'Detection',
      items: [
        'Monitoring Systems',
        'Alert Configuration',
        'Behavioral Analysis',
        'Early Warning Signs'
      ]
    },
    {
      id: 'response',
      title: 'Response & Recovery',
      items: [
        'Incident Response Plan',
        'Backup Strategy',
        'Business Continuity',
        'System Restoration'
      ]
    }
  ];

  const handleComplete = () => {
    toast.success('Section completed!', 'Keep going to complete the guide');
  };

  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <Button 
          variant="outline" 
          className="mb-8"
          onClick={() => navigate('/resources/guides')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Guides
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main content - 3 columns */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              <h1>Ransomware Protection Guide</h1>
              <p className="lead">
                A comprehensive guide to protecting your organization against ransomware threats using NIST's ransomware risk management guidelines (IR 8374).
              </p>

              <div className="flex justify-between items-center my-8">
                <h2 className="m-0">NIST IR 8374 Framework</h2>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download Guide
                </Button>
              </div>

              <p>
                NIST Interagency Report 8374, "Cybersecurity Framework Profile for Ransomware Risk Management," provides a 
                ransomware-specific overlay of the NIST Cybersecurity Framework. This guide will help you implement the key 
                controls to prevent, detect, respond to, and recover from ransomware attacks.
              </p>

              <section>
                <h2>Prevention Strategies</h2>
                <p>
                  Implementing strong preventive measures is crucial for protecting against ransomware attacks.
                  Focus on these key areas to reduce your attack surface.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <Lock className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Access Control</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Implement multi-factor authentication</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Use strong password policies</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Regular access reviews</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Shield className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">System Hardening</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Regular security updates</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Application allowlisting</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Secure configuration</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <Network className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Network Security</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Network segmentation</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Firewall configuration</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Remote access security</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <UserCheck className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">User Training</h4>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Security awareness training</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Phishing simulations</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Incident reporting procedures</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted/30 rounded-lg p-6 my-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Info className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">NIST CSF Alignment</h4>
                      <p className="mb-4">These prevention strategies align with the following NIST CSF controls:</p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span><strong>PR.AC-1:</strong> Identities and credentials are managed</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span><strong>PR.AC-4:</strong> Access permissions are managed</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span><strong>PR.IP-12:</strong> A vulnerability management plan is developed and implemented</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span><strong>PR.AT-1:</strong> All users are informed and trained</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2>Detection Capabilities</h2>
                <p>
                  Early detection is crucial for minimizing the impact of ransomware attacks.
                  Implement comprehensive monitoring and detection systems.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <Bell className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Monitoring Systems</h4>
                      <p className="text-muted-foreground mb-4">
                        Implement comprehensive monitoring across your environment
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>File system monitoring</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Network traffic analysis</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Endpoint detection</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <AlertTriangle className="h-8 w-8 text-primary mb-4" />
                      <h4 className="text-lg font-semibold mb-2">Early Warning Signs</h4>
                      <p className="text-muted-foreground mb-4">
                        Key indicators of potential ransomware activity
                      </p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Unusual file activity</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Suspicious processes</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span>Network anomalies</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted/30 rounded-lg p-6 my-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Info className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">NIST CSF Alignment</h4>
                      <p className="mb-4">These detection capabilities align with the following NIST CSF controls:</p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span><strong>DE.CM-1:</strong> The network is monitored to detect potential cybersecurity events</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span><strong>DE.CM-4:</strong> Malicious code is detected</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span><strong>DE.CM-7:</strong> Monitoring for unauthorized personnel, connections, devices, and software is performed</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2>Response & Recovery</h2>
                <p>
                  Having a well-defined response and recovery plan is essential for minimizing damage
                  and quickly restoring operations after a ransomware attack.
                </p>

                <div className="space-y-6 my-8">
                  <Card>
                    <CardContent className="p-6">
                      <h4 className="text-lg font-semibold mb-4">Incident Response Steps</h4>
                      <div className="space-y-4">
                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            1
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Initial Response</h5>
                            <p className="text-muted-foreground">
                              Isolate affected systems and activate incident response team
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            2
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Investigation</h5>
                            <p className="text-muted-foreground">
                              Determine scope and entry point of the attack
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            3
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Containment</h5>
                            <p className="text-muted-foreground">
                              Prevent spread to other systems and networks
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            4
                          </div>
                          <div>
                            <h5 className="font-medium mb-1">Recovery</h5>
                            <p className="text-muted-foreground">
                              Restore systems from clean backups and verify integrity
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardContent className="p-6">
                        <Database className="h-8 w-8 text-primary mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Backup Strategy</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            <span>Maintain offline backups</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            <span>Regular testing of backups</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            <span>Secure backup storage</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardContent className="p-6">
                        <RefreshCcw className="h-8 w-8 text-primary mb-4" />
                        <h4 className="text-lg font-semibold mb-2">Business Continuity</h4>
                        <ul className="space-y-2">
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            <span>Alternative operations plans</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            <span>Communication procedures</span>
                          </li>
                          <li className="flex items-center">
                            <CheckCircle className="h-4 w-4 text-primary mr-2" />
                            <span>Recovery priorities</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-6 my-8">
                  <div className="flex items-start gap-4">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Info className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2">NIST CSF Alignment</h4>
                      <p className="mb-4">These response and recovery capabilities align with the following NIST CSF controls:</p>
                      <ul className="space-y-2">
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span><strong>PR.IP-4:</strong> Backups of information are conducted, maintained, and tested</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span><strong>RS.RP-1:</strong> Response plan is executed during or after an incident</span>
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-primary mr-2" />
                          <span><strong>RC.RP-1:</strong> Recovery plan is executed during or after a cybersecurity incident</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between mt-8">
                  <Button variant="outline">
                    Previous Section
                  </Button>
                  <Button>
                    Next Section
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </section>
            </div>
          </div>
          
          {/* Progress sidebar - 1 column */}
          <div className="lg:col-span-1">
            <GuideProgress
              guideId="ransomware-protection"
              currentSection="prevention"
              sections={sections}
              onComplete={handleComplete}
            />

            <Card className="mt-6">
              <CardContent className="p-6">
                <h3 className="font-medium mb-4">Additional Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <Button variant="outline" className="w-full text-left justify-start" onClick={() => navigate('/ransomware-assessment')}>
                      <AlertTriangle className="mr-2 h-4 w-4" />
                      Ransomware Assessment
                    </Button>
                  </li>
                  <li>
                    <Button variant="outline" className="w-full text-left justify-start" onClick={() => navigate('/tabletop-exercise')}>
                      <Users className="mr-2 h-4 w-4" />
                      Tabletop Exercises
                    </Button>
                  </li>
                  <li>
                    <Button variant="outline" className="w-full text-left justify-start" onClick={() => navigate('/nist-csf-alignment')}>
                      <Shield className="mr-2 h-4 w-4" />
                      NIST CSF Alignment
                    </Button>
                  </li>
                  <li>
                    <Button variant="outline" className="w-full text-left justify-start" onClick={() => navigate('/app/risk-register')}>
                      <ClipboardList className="mr-2 h-4 w-4" />
                      Risk Register
                    </Button>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RansomwareGuide;