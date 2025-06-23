import React from 'react';
import { 
  Clock, 
  Eye, 
  Download, 
  Users,
  Target,
  MessageSquare,
  FileText,
  CheckCircle,
  ChevronLeft,
  AlertCircle,
  Lightbulb,
  ClipboardList
} from 'lucide-react';

interface ExerciseType {
  type: string;
  description: string;
  duration: string;
  participants: string;
  complexity: 'Low' | 'Medium' | 'High';
  bestFor: string[];
}

const exerciseTypes: ExerciseType[] = [
  {
    type: 'Discussion-Based',
    description: 'Walkthrough of response procedures',
    duration: '2-3 hours',
    participants: '5-10',
    complexity: 'Low',
    bestFor: ['Initial training', 'Policy review', 'Team building']
  },
  {
    type: 'Scenario-Based',
    description: 'Response to specific incident scenario',
    duration: '3-4 hours',
    participants: '10-15',
    complexity: 'Medium',
    bestFor: ['Testing procedures', 'Decision making', 'Communication']
  },
  {
    type: 'Advanced/Multi-Team',
    description: 'Complex scenarios with multiple teams',
    duration: '4-6 hours',
    participants: '15-25',
    complexity: 'High',
    bestFor: ['Cross-team coordination', 'Executive involvement', 'Crisis management']
  }
];

interface PlanningPhase {
  phase: string;
  timeline: string;
  activities: string[];
}

const planningPhases: PlanningPhase[] = [
  {
    phase: 'Initial Planning',
    timeline: '6-8 weeks before',
    activities: [
      'Define objectives and scope',
      'Identify participants',
      'Select facilitator',
      'Schedule exercise date'
    ]
  },
  {
    phase: 'Scenario Development',
    timeline: '4-6 weeks before',
    activities: [
      'Create realistic scenario',
      'Develop injects',
      'Prepare materials',
      'Review with stakeholders'
    ]
  },
  {
    phase: 'Logistics Preparation',
    timeline: '2-4 weeks before',
    activities: [
      'Book venue/virtual platform',
      'Send invitations',
      'Prepare handouts',
      'Test technology'
    ]
  },
  {
    phase: 'Final Preparation',
    timeline: '1 week before',
    activities: [
      'Conduct facilitator briefing',
      'Finalize materials',
      'Send reminders',
      'Prepare evaluation forms'
    ]
  }
];

interface ScenarioElement {
  element: string;
  description: string;
  examples: string[];
}

const scenarioElements: ScenarioElement[] = [
  {
    element: 'Initial Incident',
    description: 'The triggering event that starts the exercise',
    examples: [
      'Ransomware detected on file server',
      'Data breach notification from partner',
      'DDoS attack on public website',
      'Insider threat discovered'
    ]
  },
  {
    element: 'Complications',
    description: 'Additional challenges that arise during response',
    examples: [
      'Key personnel unavailable',
      'Systems spreading to other networks',
      'Media attention',
      'Regulatory inquiries'
    ]
  },
  {
    element: 'Decision Points',
    description: 'Critical decisions participants must make',
    examples: [
      'Shut down systems or isolate?',
      'Notify law enforcement?',
      'Public disclosure timing',
      'Pay ransom or not?'
    ]
  },
  {
    element: 'Resource Constraints',
    description: 'Limitations that add realism',
    examples: [
      'Limited staff availability',
      'Budget constraints',
      'Time pressure',
      'Technical limitations'
    ]
  }
];

interface Role {
  title: string;
  responsibilities: string[];
}

const keyRoles: Role[] = [
  {
    title: 'Exercise Director',
    responsibilities: [
      'Overall exercise management',
      'Approve scenario and objectives',
      'Ensure alignment with goals',
      'Authorize resources'
    ]
  },
  {
    title: 'Lead Facilitator',
    responsibilities: [
      'Guide exercise execution',
      'Present scenario and injects',
      'Manage time and pace',
      'Encourage participation'
    ]
  },
  {
    title: 'Evaluators',
    responsibilities: [
      'Observe participant actions',
      'Document decisions made',
      'Note strengths and gaps',
      'Provide feedback'
    ]
  },
  {
    title: 'Participants',
    responsibilities: [
      'Act in assigned roles',
      'Make decisions',
      'Communicate as they would in real incident',
      'Contribute to discussions'
    ]
  }
];

const facilitationTips = [
  'Start with clear ground rules and expectations',
  'Encourage participation from all attendees',
  'Keep discussions focused on objectives',
  'Allow realistic time for decision-making',
  'Don\'t provide answers - guide discovery',
  'Document key decisions and rationale',
  'Address conflicts constructively',
  'Maintain exercise pace and energy'
];

const evaluationMetrics = [
  { metric: 'Communication Effectiveness', description: 'How well teams shared information' },
  { metric: 'Decision Timeliness', description: 'Speed of critical decision-making' },
  { metric: 'Procedure Adherence', description: 'Following established protocols' },
  { metric: 'Resource Utilization', description: 'Effective use of available resources' },
  { metric: 'Coordination', description: 'Cross-team collaboration' },
  { metric: 'Documentation', description: 'Quality of incident documentation' }
];

const TabletopGuide: React.FC = () => {
  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Low': return 'bg-green-500/10 text-green-500';
      case 'Medium': return 'bg-amber-500/10 text-amber-500';
      case 'High': return 'bg-red-500/10 text-red-500';
      default: return 'bg-gray-500/10 text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header Section */}
      <div className="bg-gradient-to-b from-gray-800 to-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-2 mb-4">
              <a href="/resources/guides" className="text-gray-400 hover:text-gray-200 flex items-center">
                <ChevronLeft className="h-4 w-4 mr-1" />
                Guides
              </a>
              <span className="text-gray-600">/</span>
              <span className="text-gray-200">Tabletop Exercise Guide</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Tabletop Exercise Guide</h1>
            <p className="text-xl text-gray-300 mb-6">
              Design and run effective security incident tabletop exercises
            </p>
            <div className="flex items-center gap-4 text-sm">
              <span className="bg-amber-500/10 text-amber-500 px-3 py-1 rounded-full">Medium</span>
              <span className="flex items-center text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                35 minutes
              </span>
              <span className="flex items-center text-gray-400">
                <Eye className="h-4 w-4 mr-1" />
                2,234 views
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Introduction */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">Introduction</h2>
                <p className="text-gray-300 mb-4">
                  Tabletop exercises are discussion-based sessions where team members meet to walk through 
                  a simulated emergency scenario. They're one of the most effective ways to test incident 
                  response plans, identify gaps, and improve team coordination.
                </p>
                <p className="text-gray-300 mb-4">
                  This guide provides everything you need to plan, execute, and evaluate successful 
                  cybersecurity tabletop exercises.
                </p>
                
                <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mt-6">
                  <div className="flex items-center mb-2">
                    <Target className="h-5 w-5 text-blue-500 mr-2" />
                    <h3 className="font-semibold text-blue-500">Exercise Benefits</h3>
                  </div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Test incident response procedures</li>
                    <li>• Identify gaps in plans and processes</li>
                    <li>• Build team relationships</li>
                    <li>• Practice decision-making under pressure</li>
                    <li>• Satisfy compliance requirements</li>
                  </ul>
                </div>
              </section>

              {/* Exercise Types */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">1. Types of Tabletop Exercises</h2>
                
                <div className="space-y-4">
                  {exerciseTypes.map((exercise, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-semibold text-orange-500">{exercise.type}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${getComplexityColor(exercise.complexity)}`}>
                          {exercise.complexity} Complexity
                        </span>
                      </div>
                      <p className="text-gray-300 mb-3">{exercise.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div className="bg-gray-700 p-3 rounded">
                          <p className="text-xs text-gray-400">Duration</p>
                          <p className="font-medium">{exercise.duration}</p>
                        </div>
                        <div className="bg-gray-700 p-3 rounded">
                          <p className="text-xs text-gray-400">Participants</p>
                          <p className="font-medium">{exercise.participants}</p>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-200 mb-2">Best For:</p>
                        <div className="flex flex-wrap gap-2">
                          {exercise.bestFor.map((use, idx) => (
                            <span key={idx} className="text-xs bg-gray-700 px-2 py-1 rounded">
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Planning Timeline */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">2. Exercise Planning Timeline</h2>
                
                <div className="space-y-6">
                  {planningPhases.map((phase, index) => (
                    <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                            <Clock className="h-6 w-6" />
                          </div>
                        </div>
                        <div className="flex-grow">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-lg font-semibold">{phase.phase}</h3>
                            <span className="text-sm text-amber-500">{phase.timeline}</span>
                          </div>
                          <ul className="space-y-2">
                            {phase.activities.map((activity, idx) => (
                              <li key={idx} className="flex items-start text-gray-300">
                                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                {activity}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Scenario Development */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">3. Developing Effective Scenarios</h2>
                <p className="text-gray-300 mb-6">
                  A well-crafted scenario is crucial for a successful exercise. It should be realistic, 
                  relevant to your organization, and challenging enough to generate meaningful discussion.
                </p>
                
                <div className="space-y-4">
                  {scenarioElements.map((element, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <h3 className="font-medium text-amber-500 mb-2">{element.element}</h3>
                      <p className="text-sm text-gray-300 mb-3">{element.description}</p>
                      <div>
                        <p className="text-sm font-medium text-gray-200 mb-2">Examples:</p>
                        <div className="grid grid-cols-2 gap-2">
                          {element.examples.map((example, idx) => (
                            <div key={idx} className="text-xs text-gray-400 flex items-start">
                              <span className="mr-2">•</span>
                              {example}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mt-6">
                  <div className="flex items-center mb-2">
                    <Lightbulb className="h-5 w-5 text-amber-500 mr-2" />
                    <h3 className="font-semibold text-amber-500">Scenario Tips</h3>
                  </div>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Base scenarios on real incidents or threat intelligence</li>
                    <li>• Include realistic constraints and pressures</li>
                    <li>• Avoid making it too easy or impossibly difficult</li>
                    <li>• Include opportunities for multiple team involvement</li>
                  </ul>
                </div>
              </section>

              {/* Roles and Responsibilities */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">4. Key Roles and Responsibilities</h2>
                
                <div className="grid gap-4">
                  {keyRoles.map((role, index) => (
                    <div key={index} className="bg-gray-800 p-4 rounded-lg border border-gray-700">
                      <h3 className="font-medium text-orange-500 mb-3 flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        {role.title}
                      </h3>
                      <ul className="space-y-1">
                        {role.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-gray-300 flex items-start">
                            <span className="text-gray-600 mr-2">•</span>
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Facilitation Best Practices */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">5. Facilitation Best Practices</h2>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <div className="flex items-center mb-4">
                    <MessageSquare className="h-5 w-5 text-orange-500 mr-2" />
                    <h3 className="text-lg font-semibold">Effective Facilitation Techniques</h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    {facilitationTips.map((tip, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* Evaluation and Metrics */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">6. Exercise Evaluation</h2>
                
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700 mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <ClipboardList className="h-5 w-5 text-orange-500 mr-2" />
                    Key Evaluation Metrics
                  </h3>
                  <div className="grid gap-3">
                    {evaluationMetrics.map((item, index) => (
                      <div key={index} className="bg-gray-700 p-3 rounded">
                        <h4 className="font-medium text-sm mb-1">{item.metric}</h4>
                        <p className="text-xs text-gray-400">{item.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-semibold mb-4">After Action Report Components</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Executive summary of exercise</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Strengths identified during exercise</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Areas for improvement</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Specific recommendations</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Action items with owners and deadlines</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Common Pitfalls */}
              <section className="mb-12">
                <h2 className="text-2xl font-bold mb-4">7. Common Pitfalls to Avoid</h2>
                
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-6">
                  <div className="flex items-center mb-4">
                    <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                    <h3 className="text-lg font-semibold text-red-500">Exercise Pitfalls</h3>
                  </div>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Unrealistic scenarios that don't reflect actual threats</li>
                    <li>• Poor time management leading to rushed discussions</li>
                    <li>• Lack of senior leadership participation</li>
                    <li>• Focusing on technology rather than processes</li>
                    <li>• Not documenting lessons learned</li>
                    <li>• Failing to follow up on action items</li>
                  </ul>
                </div>
              </section>

              {/* Download Section */}
              <section className="mb-12">
                <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-6">
                  <h3 className="text-xl font-semibold mb-4">Download Resources</h3>
                  <div className="space-y-3">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-4 py-3 rounded-md flex items-center justify-between">
                      <span>Exercise Planning Template</span>
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-md flex items-center justify-between">
                      <span>Scenario Templates</span>
                      <Download className="h-5 w-5" />
                    </button>
                    <button className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 py-3 rounded-md flex items-center justify-between">
                      <span>After Action Report Template</span>
                      <Download className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Table of Contents */}
              <div className="bg-gray-800 rounded-lg p-6 mb-6 sticky top-24">
                <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                <nav className="space-y-2">
                  <a href="#introduction" className="block text-gray-400 hover:text-white">Introduction</a>
                  <a href="#types" className="block text-gray-400 hover:text-white">1. Exercise Types</a>
                  <a href="#planning" className="block text-gray-400 hover:text-white">2. Planning Timeline</a>
                  <a href="#scenarios" className="block text-gray-400 hover:text-white">3. Scenario Development</a>
                  <a href="#roles" className="block text-gray-400 hover:text-white">4. Roles & Responsibilities</a>
                  <a href="#facilitation" className="block text-gray-400 hover:text-white">5. Facilitation</a>
                  <a href="#evaluation" className="block text-gray-400 hover:text-white">6. Evaluation</a>
                  <a href="#pitfalls" className="block text-gray-400 hover:text-white">7. Common Pitfalls</a>
                </nav>
              </div>

              {/* Related Guides */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Related Guides</h3>
                <div className="space-y-3">
                  <a href="/resources/guides/ransomware-guide" className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                    <h4 className="font-medium mb-1">Ransomware Guide</h4>
                    <p className="text-sm text-gray-400">Test ransomware response</p>
                  </a>
                  <a href="/resources/guides/risk-assessment" className="block p-3 bg-gray-700 rounded hover:bg-gray-600 transition-colors">
                    <h4 className="font-medium mb-1">Risk Assessment Guide</h4>
                    <p className="text-sm text-gray-400">Identify scenario priorities</p>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabletopGuide;