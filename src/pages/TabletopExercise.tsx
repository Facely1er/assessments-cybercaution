import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Shield, 
  Download, 
  FileText, 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Calendar,
  Settings,
  MessageSquare,
  Printer
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TabletopExercise = () => {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  
  const scenarios = [
    {
      id: 'scenario-1',
      title: 'Ransomware via Phishing Attack',
      description: 'Simulate a ransomware infection that begins with a successful phishing attack targeting an executive.',
      difficulty: 'Moderate',
      duration: '3-4 hours',
      participants: ['IT Security', 'Executive Team', 'Legal', 'Communications'],
      objectives: [
        'Test email security controls',
        'Evaluate incident detection capabilities',
        'Practice executive decision-making',
        'Test communication procedures'
      ]
    },
    {
      id: 'scenario-2',
      title: 'Supply Chain Compromise',
      description: 'Simulate a ransomware attack that originates from a compromised third-party software update.',
      difficulty: 'Advanced',
      duration: '4-5 hours',
      participants: ['IT Security', 'Vendor Management', 'Legal', 'Executive Team', 'Operations'],
      objectives: [
        'Test software update verification procedures',
        'Evaluate vendor incident response coordination',
        'Practice business continuity procedures',
        'Test recovery from trusted backups'
      ]
    },
    {
      id: 'scenario-3',
      title: 'Remote Access Compromise',
      description: 'Simulate a ransomware attack that begins with compromised VPN credentials.',
      difficulty: 'Moderate',
      duration: '3-4 hours',
      participants: ['IT Security', 'Network Team', 'Help Desk', 'Communications'],
      objectives: [
        'Test remote access security controls',
        'Evaluate lateral movement detection',
        'Practice containment procedures',
        'Test user communication procedures'
      ]
    }
  ];

  const exercisePhases = [
    {
      name: 'Planning',
      description: 'Prepare exercise materials, identify participants, and set objectives',
      tasks: [
        'Define exercise scope and objectives',
        'Identify and invite participants',
        'Prepare scenario documentation',
        'Set up evaluation criteria',
        'Schedule the exercise'
      ]
    },
    {
      name: 'Execution',
      description: 'Conduct the tabletop exercise with all participants',
      tasks: [
        'Brief participants on exercise rules',
        'Present the scenario and injects',
        'Facilitate discussion and decision-making',
        'Document responses and decisions',
        'Observe team interactions and processes'
      ]
    },
    {
      name: 'Evaluation',
      description: 'Assess performance and identify improvement areas',
      tasks: [
        'Conduct hot wash immediately after exercise',
        'Gather participant feedback',
        'Evaluate against established criteria',
        'Identify strengths and weaknesses',
        'Document lessons learned'
      ]
    },
    {
      name: 'Improvement',
      description: 'Implement changes based on exercise findings',
      tasks: [
        'Develop improvement plan',
        'Assign action items with owners',
        'Update incident response procedures',
        'Enhance technical controls as needed',
        'Schedule follow-up exercise'
      ]
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link to="/" className="inline-flex items-center text-foreground hover:text-primary transition-colors mb-4">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold mb-2 text-foreground">Ransomware Tabletop Exercise Kit</h1>
        <p className="text-muted-foreground mb-6">NIST-aligned tabletop exercises to test and improve your ransomware response capabilities</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Exercise Scenarios</CardTitle>
              <CardDescription>Select a scenario to view details and download exercise materials</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scenarios.map((scenario) => (
                  <Card 
                    key={scenario.id} 
                    className={`cursor-pointer hover:shadow-md transition-shadow ${
                      selectedScenario === scenario.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedScenario(scenario.id)}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-medium mb-1">{scenario.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{scenario.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-2">
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                              Difficulty: {scenario.difficulty}
                            </span>
                            <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                              Duration: {scenario.duration}
                            </span>
                          </div>
                          
                          <div className="text-xs text-muted-foreground">
                            Participants: {scenario.participants.join(', ')}
                          </div>
                        </div>
                        
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="ml-2 flex-shrink-0"
                        >
                          {selectedScenario === scenario.id ? 'Selected' : 'Select'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {selectedScenario && (
            <Card>
              <CardHeader>
                <CardTitle>
                  {scenarios.find(s => s.id === selectedScenario)?.title} - Exercise Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">Exercise Objectives</h3>
                    <ul className="space-y-2">
                      {scenarios.find(s => s.id === selectedScenario)?.objectives.map((objective, index) => (
                        <li key={index} className="flex items-start">
                          <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                          <span>{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Users className="h-4 w-4 mr-2 text-primary" />
                        Required Participants
                      </h4>
                      <ul className="space-y-1 text-sm">
                        {scenarios.find(s => s.id === selectedScenario)?.participants.map((participant, index) => (
                          <li key={index} className="flex items-center">
                            <CheckCircle className="h-3 w-3 text-primary mr-2" />
                            {participant}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <h4 className="font-medium mb-2 flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-primary" />
                        Timeline
                      </h4>
                      <ul className="space-y-1 text-sm">
                        <li className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-primary mr-2" />
                          Planning: 1-2 weeks before
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-primary mr-2" />
                          Pre-brief: 30 minutes
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-primary mr-2" />
                          Exercise: {scenarios.find(s => s.id === selectedScenario)?.duration}
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-primary mr-2" />
                          Hot wash: 30 minutes
                        </li>
                        <li className="flex items-center">
                          <CheckCircle className="h-3 w-3 text-primary mr-2" />
                          Report: 1 week after
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <Button variant="orange">
                      <Download className="mr-2 h-4 w-4" />
                      Download Exercise Kit
                    </Button>
                    <Button variant="outline">
                      <Printer className="mr-2 h-4 w-4" />
                      Print Materials
                    </Button>
                    <Button variant="outline">
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Exercise
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2 text-primary" />
                NIST Alignment
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                These tabletop exercises are aligned with NIST IR 8374 "Cybersecurity Framework Profile for Ransomware Risk Management" and NIST CSF.
              </p>
              
              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded text-primary mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">PR.IP-10</p>
                    <p className="text-xs text-muted-foreground">Response and recovery plans are tested</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded text-primary mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">RS.RP-1</p>
                    <p className="text-xs text-muted-foreground">Response plan is executed during or after an incident</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded text-primary mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">RS.CO-1</p>
                    <p className="text-xs text-muted-foreground">Personnel know their roles and order of operations when a response is needed</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded text-primary mr-2 mt-0.5">
                    <CheckCircle className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">RC.RP-1</p>
                    <p className="text-xs text-muted-foreground">Recovery plan is executed during or after a cybersecurity incident</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2 text-primary" />
                Exercise Process
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {exercisePhases.map((phase, index) => (
                  <div key={phase.name} className="relative pl-8 pb-6 last:pb-0">
                    {index < exercisePhases.length - 1 && (
                      <div className="absolute left-3.5 top-3 bottom-0 w-px bg-border" />
                    )}
                    <div className="absolute left-0 top-1 w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-primary font-medium">{index + 1}</span>
                    </div>
                    <h3 className="font-medium mb-1">{phase.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                    <ul className="space-y-1">
                      {phase.tasks.map((task, taskIndex) => (
                        <li key={taskIndex} className="text-xs flex items-start">
                          <CheckCircle className="h-3 w-3 text-primary mr-1.5 mt-0.5" />
                          <span>{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <Button variant="outline" className="w-full">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Request Facilitation Support
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-primary/5 rounded-lg">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-medium mb-1">Why Tabletop Exercises Matter</h3>
            <p className="text-sm text-muted-foreground">
              NIST IR 8374 emphasizes the importance of testing response plans through exercises. 
              Regular tabletop exercises help organizations identify gaps in their ransomware response 
              capabilities, build muscle memory for incident response, and improve coordination between 
              technical and non-technical stakeholders.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabletopExercise;