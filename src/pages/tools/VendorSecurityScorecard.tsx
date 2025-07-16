import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Progress } from '../../components/ui/progress';
import { Alert, AlertDescription } from '../../components/ui/alert';
import { 
  BarChart3,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Network,
  Lock,
  FileText,
  Users,
  Download,
  Plus,
  Edit,
  Trash2,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Eye,
  Clock,
  Building2,
  Award,
  Target,
  Activity
} from 'lucide-react';

const VendorSecurityScorecard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [vendors, setVendors] = useState([
    {
      id: 1,
      name: 'CloudTech Solutions',
      category: 'Cloud Services',
      criticality: 'High',
      overallScore: 85,
      lastAssessed: '2024-01-15',
      status: 'Active',
      riskLevel: 'Low',
      scores: {
        security: 88,
        compliance: 82,
        governance: 85,
        dataProtection: 90,
        incidentResponse: 78
      },
      assessmentData: {
        certifications: ['ISO 27001', 'SOC 2 Type II', 'FedRAMP'],
        dataLocation: 'US/EU',
        encryptionInTransit: true,
        encryptionAtRest: true,
        mfaEnabled: true,
        vulnerabilityManagement: 'Advanced',
        incidentResponseTime: '< 2 hours',
        dataRetentionPolicy: 'Compliant',
        accessControls: 'Role-based',
        auditFrequency: 'Annual'
      }
    },
    {
      id: 2,
      name: 'DataFlow Analytics',
      category: 'Data Analytics',
      criticality: 'Medium',
      overallScore: 72,
      lastAssessed: '2024-01-10',
      status: 'Under Review',
      riskLevel: 'Medium',
      scores: {
        security: 75,
        compliance: 68,
        governance: 70,
        dataProtection: 78,
        incidentResponse: 72
      },
      assessmentData: {
        certifications: ['SOC 2 Type I'],
        dataLocation: 'Global',
        encryptionInTransit: true,
        encryptionAtRest: false,
        mfaEnabled: false,
        vulnerabilityManagement: 'Basic',
        incidentResponseTime: '< 24 hours',
        dataRetentionPolicy: 'Needs Review',
        accessControls: 'Basic',
        auditFrequency: 'Bi-annual'
      }
    },
    {
      id: 3,
      name: 'SecureComm Inc',
      category: 'Communications',
      criticality: 'High',
      overallScore: 91,
      lastAssessed: '2024-01-20',
      status: 'Active',
      riskLevel: 'Low',
      scores: {
        security: 93,
        compliance: 89,
        governance: 92,
        dataProtection: 94,
        incidentResponse: 87
      },
      assessmentData: {
        certifications: ['ISO 27001', 'SOC 2 Type II', 'HIPAA'],
        dataLocation: 'US',
        encryptionInTransit: true,
        encryptionAtRest: true,
        mfaEnabled: true,
        vulnerabilityManagement: 'Advanced',
        incidentResponseTime: '< 1 hour',
        dataRetentionPolicy: 'Compliant',
        accessControls: 'Zero Trust',
        auditFrequency: 'Quarterly'
      }
    }
  ]);

  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showAssessmentForm, setShowAssessmentForm] = useState(false);
  const [assessmentForm, setAssessmentForm] = useState({
    vendorName: '',
    category: '',
    criticality: 'Medium',
    responses: {}
  });

  const assessmentCategories = [
    {
      id: 'security',
      name: 'Security Controls',
      weight: 0.25,
      questions: [
        {
          id: 'vulnerability_mgmt',
          question: 'Does the vendor have a formal vulnerability management program?',
          options: [
            { value: 0, label: 'No formal program' },
            { value: 2, label: 'Basic vulnerability scanning' },
            { value: 3, label: 'Regular scanning with remediation tracking' },
            { value: 4, label: 'Advanced program with threat intelligence' }
          ]
        },
        {
          id: 'access_controls',
          question: 'What type of access controls does the vendor implement?',
          options: [
            { value: 1, label: 'Basic username/password' },
            { value: 2, label: 'Role-based access control' },
            { value: 3, label: 'Multi-factor authentication required' },
            { value: 4, label: 'Zero trust architecture' }
          ]
        },
        {
          id: 'encryption',
          question: 'How does the vendor handle data encryption?',
          options: [
            { value: 1, label: 'Limited or no encryption' },
            { value: 2, label: 'Encryption in transit only' },
            { value: 3, label: 'Encryption in transit and at rest' },
            { value: 4, label: 'End-to-end encryption with key management' }
          ]
        }
      ]
    },
    {
      id: 'compliance',
      name: 'Compliance & Certifications',
      weight: 0.2,
      questions: [
        {
          id: 'certifications',
          question: 'What security certifications does the vendor maintain?',
          options: [
            { value: 1, label: 'No formal certifications' },
            { value: 2, label: 'Basic industry certifications' },
            { value: 3, label: 'SOC 2 or equivalent' },
            { value: 4, label: 'Multiple certifications (ISO 27001, SOC 2, etc.)' }
          ]
        },
        {
          id: 'audit_frequency',
          question: 'How frequently does the vendor undergo security audits?',
          options: [
            { value: 1, label: 'No regular audits' },
            { value: 2, label: 'Annual audits' },
            { value: 3, label: 'Bi-annual audits' },
            { value: 4, label: 'Quarterly or continuous auditing' }
          ]
        }
      ]
    },
    {
      id: 'governance',
      name: 'Governance & Risk Management',
      weight: 0.2,
      questions: [
        {
          id: 'security_program',
          question: 'Does the vendor have a formal cybersecurity program?',
          options: [
            { value: 1, label: 'No formal program' },
            { value: 2, label: 'Basic security policies' },
            { value: 3, label: 'Comprehensive security program' },
            { value: 4, label: 'Mature program with continuous improvement' }
          ]
        },
        {
          id: 'risk_assessment',
          question: 'How does the vendor conduct risk assessments?',
          options: [
            { value: 1, label: 'No formal risk assessments' },
            { value: 2, label: 'Annual risk assessments' },
            { value: 3, label: 'Regular risk assessments with documentation' },
            { value: 4, label: 'Continuous risk monitoring and assessment' }
          ]
        }
      ]
    },
    {
      id: 'dataProtection',
      name: 'Data Protection',
      weight: 0.2,
      questions: [
        {
          id: 'data_classification',
          question: 'How does the vendor classify and handle sensitive data?',
          options: [
            { value: 1, label: 'No formal data classification' },
            { value: 2, label: 'Basic data categorization' },
            { value: 3, label: 'Formal data classification scheme' },
            { value: 4, label: 'Advanced data loss prevention controls' }
          ]
        },
        {
          id: 'data_retention',
          question: 'Does the vendor have clear data retention and disposal policies?',
          options: [
            { value: 1, label: 'No formal policies' },
            { value: 2, label: 'Basic retention guidelines' },
            { value: 3, label: 'Documented retention and disposal procedures' },
            { value: 4, label: 'Automated retention management with compliance tracking' }
          ]
        }
      ]
    },
    {
      id: 'incidentResponse',
      name: 'Incident Response',
      weight: 0.15,
      questions: [
        {
          id: 'incident_plan',
          question: 'Does the vendor have a documented incident response plan?',
          options: [
            { value: 1, label: 'No formal incident response plan' },
            { value: 2, label: 'Basic incident procedures' },
            { value: 3, label: 'Comprehensive incident response plan' },
            { value: 4, label: 'Tested plan with regular exercises' }
          ]
        },
        {
          id: 'notification_time',
          question: 'What is the vendor\'s commitment for incident notification?',
          options: [
            { value: 1, label: 'No specific timeframe' },
            { value: 2, label: 'Within 72 hours' },
            { value: 3, label: 'Within 24 hours' },
            { value: 4, label: 'Within 2 hours for critical incidents' }
          ]
        }
      ]
    }
  ];

  const riskLevels = {
    'Critical': { color: 'text-red-600', bg: 'bg-red-50', score: 0 },
    'High': { color: 'text-orange-600', bg: 'bg-orange-50', score: 25 },
    'Medium': { color: 'text-yellow-600', bg: 'bg-yellow-50', score: 50 },
    'Low': { color: 'text-green-600', bg: 'bg-green-50', score: 75 }
  };

  const calculateVendorScore = (responses) => {
    let totalScore = 0;
    let totalWeight = 0;

    assessmentCategories.forEach(category => {
      let categoryScore = 0;
      let questionCount = 0;

      category.questions.forEach(question => {
        const response = responses[question.id];
        if (response !== undefined) {
          categoryScore += response;
          questionCount++;
        }
      });

      if (questionCount > 0) {
        const avgCategoryScore = (categoryScore / questionCount) / 4; // Normalize to 0-1
        totalScore += avgCategoryScore * category.weight;
        totalWeight += category.weight;
      }
    });

    return totalWeight > 0 ? Math.round((totalScore / totalWeight) * 100) : 0;
  };

  const getRiskLevel = (score) => {
    if (score >= 85) return 'Low';
    if (score >= 70) return 'Medium';
    if (score >= 50) return 'High';
    return 'Critical';
  };

  const handleAssessmentSubmit = () => {
    const overallScore = calculateVendorScore(assessmentForm.responses);
    const riskLevel = getRiskLevel(overallScore);
    
    // Calculate category scores
    const categoryScores = {};
    assessmentCategories.forEach(category => {
      let categoryScore = 0;
      let questionCount = 0;

      category.questions.forEach(question => {
        const response = assessmentForm.responses[question.id];
        if (response !== undefined) {
          categoryScore += response;
          questionCount++;
        }
      });

      categoryScores[category.id] = questionCount > 0 
        ? Math.round((categoryScore / questionCount) / 4 * 100)
        : 0;
    });

    const newVendor = {
      id: vendors.length + 1,
      name: assessmentForm.vendorName,
      category: assessmentForm.category,
      criticality: assessmentForm.criticality,
      overallScore,
      lastAssessed: new Date().toISOString().split('T')[0],
      status: 'Active',
      riskLevel,
      scores: categoryScores,
      assessmentData: {
        certifications: [],
        responses: assessmentForm.responses
      }
    };

    setVendors([...vendors, newVendor]);
    setShowAssessmentForm(false);
    setAssessmentForm({ vendorName: '', category: '', criticality: 'Medium', responses: {} });
    setCurrentView('dashboard');
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Vendors</p>
                <p className="text-2xl font-bold">{vendors.length}</p>
              </div>
              <Building2 className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">High Risk</p>
                <p className="text-2xl font-bold text-red-600">
                  {vendors.filter(v => v.riskLevel === 'High' || v.riskLevel === 'Critical').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(vendors.reduce((sum, v) => sum + v.overallScore, 0) / vendors.length)}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Critical Vendors</p>
                <p className="text-2xl font-bold text-orange-600">
                  {vendors.filter(v => v.criticality === 'High').length}
                </p>
              </div>
              <Target className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Risk Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Risk Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(riskLevels).map(([level, config]) => {
              const count = vendors.filter(v => v.riskLevel === level).length;
              const percentage = vendors.length > 0 ? (count / vendors.length) * 100 : 0;
              
              return (
                <div key={level} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded ${config.bg} border`}></div>
                    <span className="font-medium">{level} Risk</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32">
                      <Progress value={percentage} className="h-2" />
                    </div>
                    <span className="text-sm text-gray-600 w-12">{count} ({Math.round(percentage)}%)</span>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Vendor List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Network className="h-5 w-5" />
              Vendor Security Scorecards
            </CardTitle>
            <Button onClick={() => setShowAssessmentForm(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Vendor
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {vendors.map((vendor) => (
              <div key={vendor.id} 
                   className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                   onClick={() => setSelectedVendor(vendor)}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-lg">{vendor.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskLevels[vendor.riskLevel].bg} ${riskLevels[vendor.riskLevel].color}`}>
                        {vendor.riskLevel} Risk
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        vendor.criticality === 'High' ? 'bg-red-100 text-red-800' :
                        vendor.criticality === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {vendor.criticality} Criticality
                      </span>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-gray-600">
                      <span>{vendor.category}</span>
                      <span>Last assessed: {vendor.lastAssessed}</span>
                      <span>Status: {vendor.status}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold mb-1">{vendor.overallScore}</div>
                    <div className="text-sm text-gray-600">Overall Score</div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <div className="grid grid-cols-5 gap-4">
                    {Object.entries(vendor.scores).map(([category, score]) => (
                      <div key={category} className="text-center">
                        <div className="text-sm font-medium mb-1 capitalize">
                          {category.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                        <div className="text-lg font-bold">{score}</div>
                        <Progress value={score} className="h-1 mt-1" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderVendorDetail = () => {
    if (!selectedVendor) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">{selectedVendor.name}</h2>
            <p className="text-gray-600">{selectedVendor.category} • {selectedVendor.criticality} Criticality</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setSelectedVendor(null)}>
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Back to Dashboard
            </Button>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Overall Score Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Overall Security Score</h3>
                <div className="flex items-center gap-4">
                  <div className="text-4xl font-bold">{selectedVendor.overallScore}</div>
                  <div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${riskLevels[selectedVendor.riskLevel].bg} ${riskLevels[selectedVendor.riskLevel].color}`}>
                      {selectedVendor.riskLevel} Risk
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Last Assessment</p>
                <p className="font-semibold">{selectedVendor.lastAssessed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Security Category Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(selectedVendor.scores).map(([category, score]) => {
                const categoryInfo = assessmentCategories.find(c => c.id === category);
                return (
                  <div key={category}>
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold capitalize">
                        {categoryInfo?.name || category.replace(/([A-Z])/g, ' $1').trim()}
                      </h4>
                      <span className="text-lg font-bold">{score}/100</span>
                    </div>
                    <Progress value={score} className="h-3" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>Poor</span>
                      <span>Excellent</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Key Findings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-600">
                <CheckCircle className="h-5 w-5" />
                Strengths
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {Object.entries(selectedVendor.scores)
                  .filter(([_, score]) => score >= 80)
                  .map(([category, score]) => (
                    <li key={category} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="capitalize">
                        {assessmentCategories.find(c => c.id === category)?.name || category} ({score}/100)
                      </span>
                    </li>
                  ))}
                {selectedVendor.assessmentData?.certifications?.map((cert) => (
                  <li key={cert} className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-blue-500" />
                    <span>{cert} Certified</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="h-5 w-5" />
                Areas for Improvement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {Object.entries(selectedVendor.scores)
                  .filter(([_, score]) => score < 75)
                  .map(([category, score]) => (
                    <li key={category} className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-orange-500" />
                      <span className="capitalize">
                        {assessmentCategories.find(c => c.id === category)?.name || category} ({score}/100)
                      </span>
                    </li>
                  ))}
                {!selectedVendor.assessmentData?.encryptionAtRest && (
                  <li className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>No encryption at rest</span>
                  </li>
                )}
                {!selectedVendor.assessmentData?.mfaEnabled && (
                  <li className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-500" />
                    <span>Multi-factor authentication not enabled</span>
                  </li>
                )}
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Recommended Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(selectedVendor.scores)
                .filter(([_, score]) => score < 75)
                .map(([category, score]) => (
                  <div key={category} className="border-l-4 border-orange-500 pl-4">
                    <h4 className="font-semibold capitalize">
                      Improve {assessmentCategories.find(c => c.id === category)?.name || category}
                    </h4>
                    <p className="text-sm text-gray-600 mt-1">
                      Current score: {score}/100. Consider requesting additional documentation or 
                      conducting a more detailed assessment of this area.
                    </p>
                  </div>
                ))}
              
              {selectedVendor.overallScore < 70 && (
                <div className="border-l-4 border-red-500 pl-4">
                  <h4 className="font-semibold">Schedule Security Review Meeting</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    The overall score indicates significant security concerns. Schedule a meeting 
                    with the vendor to discuss improvement plans and timelines.
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderAssessmentForm = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">New Vendor Assessment</h2>
        <Button variant="outline" onClick={() => setShowAssessmentForm(false)}>
          Cancel
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Vendor Name</label>
            <input
              type="text"
              value={assessmentForm.vendorName}
              onChange={(e) => setAssessmentForm({...assessmentForm, vendorName: e.target.value})}
              className="w-full p-2 border rounded-md"
              placeholder="Enter vendor name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={assessmentForm.category}
              onChange={(e) => setAssessmentForm({...assessmentForm, category: e.target.value})}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select category</option>
              <option value="Cloud Services">Cloud Services</option>
              <option value="Software Development">Software Development</option>
              <option value="Data Analytics">Data Analytics</option>
              <option value="Communications">Communications</option>
              <option value="Financial Services">Financial Services</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Business Criticality</label>
            <select
              value={assessmentForm.criticality}
              onChange={(e) => setAssessmentForm({...assessmentForm, criticality: e.target.value})}
              className="w-full p-2 border rounded-md"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Questions */}
      {assessmentCategories.map((category) => (
        <Card key={category.id}>
          <CardHeader>
            <CardTitle>{category.name}</CardTitle>
            <p className="text-sm text-gray-600">Weight: {Math.round(category.weight * 100)}%</p>
          </CardHeader>
          <CardContent className="space-y-6">
            {category.questions.map((question) => (
              <div key={question.id}>
                <h4 className="font-medium mb-3">{question.question}</h4>
                <div className="space-y-2">
                  {question.options.map((option) => (
                    <label key={option.value} className="flex items-center space-x-3 cursor-pointer">
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        onChange={(e) => setAssessmentForm({
                          ...assessmentForm,
                          responses: {
                            ...assessmentForm.responses,
                            [question.id]: parseInt(e.target.value)
                          }
                        })}
                        className="text-blue-600"
                      />
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}

      <div className="flex gap-4">
        <Button 
          onClick={handleAssessmentSubmit}
          disabled={!assessmentForm.vendorName || !assessmentForm.category}
          className="flex-1"
        >
          Complete Assessment
        </Button>
        <Button variant="outline" onClick={() => setShowAssessmentForm(false)}>
          Cancel
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Vendor Security Scorecard</h1>
          <p className="text-lg text-gray-600">
            Assess and monitor third-party security risks across your vendor ecosystem
          </p>
        </div>

        {/* Content */}
        {currentView === 'dashboard' && !showAssessmentForm && !selectedVendor && renderDashboard()}
        {selectedVendor && renderVendorDetail()}
        {showAssessmentForm && renderAssessmentForm()}
      </div>
    </div>
  );
};

export default VendorSecurityScorecard;