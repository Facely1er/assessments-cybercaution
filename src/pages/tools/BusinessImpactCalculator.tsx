import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Building2,
  DollarSign,
  Clock,
  TrendingDown,
  AlertTriangle,
  Shield,
  Users,
  Database,
  Download,
  Calculator,
  BarChart3,
  FileText,
  Target,
  Activity,
  Eye,
  Zap,
  RefreshCw
} from 'lucide-react';

const BusinessImpactCalculator = () => {
  const [currentView, setCurrentView] = useState('calculator');
  const [calculatorData, setCalculatorData] = useState({
    // Company Information
    annualRevenue: '',
    employeeCount: '',
    industry: '',
    
    // Incident Parameters
    incidentType: 'data-breach',
    incidentDuration: '',
    systemsAffected: '',
    
    // Financial Inputs
    hourlyRevenueLoss: '',
    hourlyOperatingCost: '',
    customersAffected: '',
    averageCustomerValue: '',
    
    // Recovery Costs
    incidentResponseCost: '',
    systemRecoveryCost: '',
    legalAndRegulatoryCost: '',
    publicRelationsCost: '',
    
    // Business Metrics
    brandDamagePercentage: '',
    customerChurnRate: '',
    productivityLoss: '',
    
    // Regulatory and Compliance
    regulatoryFines: '',
    complianceCosts: ''
  });

  const [results, setResults] = useState(null);
  const [savedScenarios, setSavedScenarios] = useState([
    {
      id: 1,
      name: 'Ransomware Attack - Critical Systems',
      incidentType: 'ransomware',
      totalImpact: 2450000,
      createdDate: '2024-01-15',
      duration: '72 hours',
      summary: 'Major ransomware incident affecting production systems'
    },
    {
      id: 2,
      name: 'Data Breach - Customer PII',
      incidentType: 'data-breach',
      totalImpact: 1850000,
      createdDate: '2024-01-10',
      duration: '48 hours',
      summary: 'Unauthorized access to customer database'
    }
  ]);

  const incidentTypes = [
    { value: 'data-breach', label: 'Data Breach', icon: Database, avgDuration: 48, description: 'Unauthorized access to sensitive data' },
    { value: 'ransomware', label: 'Ransomware Attack', icon: Shield, avgDuration: 72, description: 'Malicious encryption of systems and data' },
    { value: 'ddos', label: 'DDoS Attack', icon: Zap, avgDuration: 12, description: 'Distributed denial of service disruption' },
    { value: 'insider-threat', label: 'Insider Threat', icon: Users, avgDuration: 24, description: 'Malicious activity by internal users' },
    { value: 'supply-chain', label: 'Supply Chain Compromise', icon: Building2, avgDuration: 96, description: 'Attack through third-party vendors' },
    { value: 'system-outage', label: 'System Outage', icon: AlertTriangle, avgDuration: 8, description: 'Unplanned system downtime' }
  ];

  const industries = [
    { value: 'healthcare', label: 'Healthcare', avgCostPerRecord: 10.93 },
    { value: 'financial', label: 'Financial Services', avgCostPerRecord: 5.97 },
    { value: 'technology', label: 'Technology', avgCostPerRecord: 5.09 },
    { value: 'retail', label: 'Retail', avgCostPerRecord: 3.48 },
    { value: 'manufacturing', label: 'Manufacturing', avgCostPerRecord: 4.45 },
    { value: 'education', label: 'Education', avgCostPerRecord: 3.79 },
    { value: 'government', label: 'Government', avgCostPerRecord: 2.07 },
    { value: 'other', label: 'Other', avgCostPerRecord: 4.35 }
  ];

  const handleInputChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const calculateImpact = () => {
    const data = calculatorData;
    
    // Convert string inputs to numbers
    const annualRevenue = parseFloat(data.annualRevenue) || 0;
    const incidentDuration = parseFloat(data.incidentDuration) || 0;
    const customersAffected = parseFloat(data.customersAffected) || 0;
    const averageCustomerValue = parseFloat(data.averageCustomerValue) || 0;
    const employeeCount = parseFloat(data.employeeCount) || 0;
    
    // Calculate hourly revenue loss
    const hourlyRevenue = annualRevenue / (365 * 24);
    const directRevenueLoss = hourlyRevenue * incidentDuration;
    
    // Calculate operational costs
    const hourlyOperatingCost = parseFloat(data.hourlyOperatingCost) || (hourlyRevenue * 0.3);
    const operationalLoss = hourlyOperatingCost * incidentDuration;
    
    // Calculate customer impact
    const customerRevenueLoss = customersAffected * averageCustomerValue;
    const churnRate = parseFloat(data.customerChurnRate) || 5;
    const customerChurnLoss = (customersAffected * (churnRate / 100)) * averageCustomerValue * 12; // Annual impact
    
    // Calculate productivity loss
    const productivityLoss = parseFloat(data.productivityLoss) || 20;
    const avgSalary = 75000; // Estimated average salary
    const hourlyWage = avgSalary / (52 * 40);
    const productivityImpact = (employeeCount * hourlyWage * incidentDuration * (productivityLoss / 100));
    
    // Direct incident costs
    const incidentResponseCost = parseFloat(data.incidentResponseCost) || 0;
    const systemRecoveryCost = parseFloat(data.systemRecoveryCost) || 0;
    const legalAndRegulatoryCost = parseFloat(data.legalAndRegulatoryCost) || 0;
    const publicRelationsCost = parseFloat(data.publicRelationsCost) || 0;
    const regulatoryFines = parseFloat(data.regulatoryFines) || 0;
    const complianceCosts = parseFloat(data.complianceCosts) || 0;
    
    // Brand damage
    const brandDamagePercentage = parseFloat(data.brandDamagePercentage) || 2;
    const brandDamageCost = annualRevenue * (brandDamagePercentage / 100);
    
    // Industry-specific multipliers
    const selectedIndustry = industries.find(i => i.value === data.industry);
    const industryMultiplier = selectedIndustry ? selectedIndustry.avgCostPerRecord : 4.35;
    const perRecordCost = customersAffected * industryMultiplier;
    
    const results = {
      // Direct Costs
      directRevenueLoss: Math.round(directRevenueLoss),
      operationalLoss: Math.round(operationalLoss),
      productivityImpact: Math.round(productivityImpact),
      
      // Customer Impact
      customerRevenueLoss: Math.round(customerRevenueLoss),
      customerChurnLoss: Math.round(customerChurnLoss),
      
      // Recovery Costs
      incidentResponseCost,
      systemRecoveryCost,
      legalAndRegulatoryCost,
      publicRelationsCost,
      regulatoryFines,
      complianceCosts,
      
      // Brand and Reputation
      brandDamageCost: Math.round(brandDamageCost),
      perRecordCost: Math.round(perRecordCost),
      
      // Calculations
      totalDirectCosts: Math.round(directRevenueLoss + operationalLoss + productivityImpact),
      totalRecoveryCosts: Math.round(incidentResponseCost + systemRecoveryCost + legalAndRegulatoryCost + publicRelationsCost + regulatoryFines + complianceCosts),
      totalCustomerImpact: Math.round(customerRevenueLoss + customerChurnLoss),
      totalBrandImpact: Math.round(brandDamageCost + perRecordCost),
      
      // Meta information
      incidentType: data.incidentType,
      incidentDuration,
      customersAffected,
      industry: data.industry
    };
    
    results.totalImpact = results.totalDirectCosts + results.totalRecoveryCosts + results.totalCustomerImpact + results.totalBrandImpact;
    
    setResults(results);
  };

  const saveScenario = () => {
    if (!results) return;
    
    const scenarioName = prompt('Enter a name for this scenario:');
    if (!scenarioName) return;
    
    const newScenario = {
      id: savedScenarios.length + 1,
      name: scenarioName,
      incidentType: calculatorData.incidentType,
      totalImpact: results.totalImpact,
      createdDate: new Date().toISOString().split('T')[0],
      duration: `${calculatorData.incidentDuration} hours`,
      summary: `${incidentTypes.find(t => t.value === calculatorData.incidentType)?.label} scenario`,
      fullData: { calculatorData, results }
    };
    
    setSavedScenarios([...savedScenarios, newScenario]);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderCalculator = () => (
    <div className="space-y-6">
      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Company Information
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Annual Revenue ($)</label>
            <input
              type="number"
              value={calculatorData.annualRevenue}
              onChange={(e) => handleInputChange('annualRevenue', e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="e.g., 50000000"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Employee Count</label>
            <input
              type="number"
              value={calculatorData.employeeCount}
              onChange={(e) => handleInputChange('employeeCount', e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="e.g., 500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Industry</label>
            <select
              value={calculatorData.industry}
              onChange={(e) => handleInputChange('industry', e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select industry</option>
              {industries.map(industry => (
                <option key={industry.value} value={industry.value}>
                  {industry.label}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Incident Parameters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Incident Parameters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Incident Type</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {incidentTypes.map(type => (
                  <div
                    key={type.value}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      calculatorData.incidentType === type.value 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => {
                      handleInputChange('incidentType', type.value);
                      handleInputChange('incidentDuration', type.avgDuration.toString());
                    }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <type.icon className="h-5 w-5" />
                      <span className="font-medium">{type.label}</span>
                    </div>
                    <p className="text-sm text-gray-600">{type.description}</p>
                    <p className="text-xs text-blue-600 mt-1">Avg duration: {type.avgDuration}h</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Incident Duration (hours)</label>
                <input
                  type="number"
                  value={calculatorData.incidentDuration}
                  onChange={(e) => handleInputChange('incidentDuration', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., 48"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Customers Affected</label>
                <input
                  type="number"
                  value={calculatorData.customersAffected}
                  onChange={(e) => handleInputChange('customersAffected', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., 10000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Average Customer Value ($)</label>
                <input
                  type="number"
                  value={calculatorData.averageCustomerValue}
                  onChange={(e) => handleInputChange('averageCustomerValue', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="e.g., 1200"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Financial Impact Parameters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Customer Churn Rate (%)</label>
              <input
                type="number"
                value={calculatorData.customerChurnRate}
                onChange={(e) => handleInputChange('customerChurnRate', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 5"
              />
              <p className="text-xs text-gray-500 mt-1">Percentage of affected customers who will leave</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Productivity Loss (%)</label>
              <input
                type="number"
                value={calculatorData.productivityLoss}
                onChange={(e) => handleInputChange('productivityLoss', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 20"
              />
              <p className="text-xs text-gray-500 mt-1">Employee productivity reduction during incident</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Brand Damage Impact (%)</label>
              <input
                type="number"
                value={calculatorData.brandDamagePercentage}
                onChange={(e) => handleInputChange('brandDamagePercentage', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 2"
              />
              <p className="text-xs text-gray-500 mt-1">Percentage of annual revenue lost to brand damage</p>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Hourly Operating Cost ($)</label>
              <input
                type="number"
                value={calculatorData.hourlyOperatingCost}
                onChange={(e) => handleInputChange('hourlyOperatingCost', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="Auto-calculated if blank"
              />
              <p className="text-xs text-gray-500 mt-1">Cost to operate business per hour</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recovery and Response Costs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Recovery and Response Costs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Incident Response Cost ($)</label>
              <input
                type="number"
                value={calculatorData.incidentResponseCost}
                onChange={(e) => handleInputChange('incidentResponseCost', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 150000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">System Recovery Cost ($)</label>
              <input
                type="number"
                value={calculatorData.systemRecoveryCost}
                onChange={(e) => handleInputChange('systemRecoveryCost', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 200000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Legal & Regulatory Cost ($)</label>
              <input
                type="number"
                value={calculatorData.legalAndRegulatoryCost}
                onChange={(e) => handleInputChange('legalAndRegulatoryCost', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 100000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Public Relations Cost ($)</label>
              <input
                type="number"
                value={calculatorData.publicRelationsCost}
                onChange={(e) => handleInputChange('publicRelationsCost', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 75000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Regulatory Fines ($)</label>
              <input
                type="number"
                value={calculatorData.regulatoryFines}
                onChange={(e) => handleInputChange('regulatoryFines', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 500000"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Additional Compliance Costs ($)</label>
              <input
                type="number"
                value={calculatorData.complianceCosts}
                onChange={(e) => handleInputChange('complianceCosts', e.target.value)}
                className="w-full p-2 border rounded-md"
                placeholder="e.g., 50000"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Calculate Button */}
      <div className="flex gap-4">
        <Button onClick={calculateImpact} className="flex-1">
          <Calculator className="mr-2 h-4 w-4" />
          Calculate Business Impact
        </Button>
        {results && (
          <Button variant="outline" onClick={saveScenario}>
            Save Scenario
          </Button>
        )}
      </div>
    </div>
  );

  const renderResults = () => {
    if (!results) return null;

    const impactCategories = [
      {
        title: 'Direct Business Impact',
        amount: results.totalDirectCosts,
        color: 'border-red-500',
        items: [
          { label: 'Revenue Loss', amount: results.directRevenueLoss },
          { label: 'Operational Loss', amount: results.operationalLoss },
          { label: 'Productivity Impact', amount: results.productivityImpact }
        ]
      },
      {
        title: 'Recovery & Response Costs',
        amount: results.totalRecoveryCosts,
        color: 'border-orange-500',
        items: [
          { label: 'Incident Response', amount: results.incidentResponseCost },
          { label: 'System Recovery', amount: results.systemRecoveryCost },
          { label: 'Legal & Regulatory', amount: results.legalAndRegulatoryCost },
          { label: 'Public Relations', amount: results.publicRelationsCost },
          { label: 'Regulatory Fines', amount: results.regulatoryFines },
          { label: 'Compliance Costs', amount: results.complianceCosts }
        ]
      },
      {
        title: 'Customer Impact',
        amount: results.totalCustomerImpact,
        color: 'border-blue-500',
        items: [
          { label: 'Immediate Customer Loss', amount: results.customerRevenueLoss },
          { label: 'Customer Churn (Annual)', amount: results.customerChurnLoss }
        ]
      },
      {
        title: 'Brand & Reputation',
        amount: results.totalBrandImpact,
        color: 'border-purple-500',
        items: [
          { label: 'Brand Damage', amount: results.brandDamageCost },
          { label: 'Per-Record Costs', amount: results.perRecordCost }
        ]
      }
    ];

    return (
      <div className="space-y-6">
        {/* Total Impact Summary */}
        <Card className="border-2 border-red-500">
          <CardContent className="p-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Total Business Impact</h2>
              <div className="text-5xl font-bold text-red-600 mb-4">
                {formatCurrency(results.totalImpact)}
              </div>
              <div className="text-gray-600">
                {incidentTypes.find(t => t.value === results.incidentType)?.label} • {results.incidentDuration} hours • {results.customersAffected?.toLocaleString()} customers affected
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Impact Breakdown */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {impactCategories.map((category, index) => (
            <Card key={index} className={`border-l-4 ${category.color}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{category.title}</span>
                  <span className="text-lg font-bold">{formatCurrency(category.amount)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {category.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium">{formatCurrency(item.amount)}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Distribution Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Impact Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {impactCategories.map((category, index) => {
                const percentage = (category.amount / results.totalImpact) * 100;
                return (
                  <div key={index}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{category.title}</span>
                      <span className="text-sm text-gray-600">
                        {formatCurrency(category.amount)} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full ${
                          index === 0 ? 'bg-red-500' :
                          index === 1 ? 'bg-orange-500' :
                          index === 2 ? 'bg-blue-500' : 'bg-purple-500'
                        }`}
                        style={{ width: `${percentage}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Key Insights */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Key Insights & Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Primary Cost Driver:</strong> {
                    impactCategories.reduce((max, category) => 
                      category.amount > max.amount ? category : max
                    ).title
                  } accounts for {
                    ((impactCategories.reduce((max, category) => 
                      category.amount > max.amount ? category : max
                    ).amount / results.totalImpact) * 100).toFixed(1)
                  }% of total impact.
                </AlertDescription>
              </Alert>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Prevention Investment ROI</h4>
                  <p className="text-sm text-blue-800">
                    Investing {formatCurrency(results.totalImpact * 0.1)} (10% of impact) in security controls 
                    could potentially prevent this incident, providing a 10x return on investment.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">Recovery Time Improvement</h4>
                  <p className="text-sm text-green-800">
                    Reducing recovery time by 50% could save approximately {formatCurrency(results.totalDirectCosts * 0.5)} 
                    in direct business impact costs.
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold">Recommended Risk Mitigation Actions:</h4>
                <ul className="text-sm space-y-1 ml-4">
                  <li>• Implement backup and recovery solutions to reduce downtime</li>
                  <li>• Develop incident response playbooks to accelerate recovery</li>
                  <li>• Consider cyber insurance to offset financial impacts</li>
                  <li>• Invest in employee training to prevent incident occurrence</li>
                  <li>• Establish vendor relationships for rapid incident response</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button onClick={() => setCurrentView('calculator')} variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Modify Scenario
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Export Report
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Generate Executive Summary
          </Button>
        </div>
      </div>
    );
  };

  const renderScenarios = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Saved Impact Scenarios
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {savedScenarios.map((scenario) => (
              <div key={scenario.id} 
                   className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">{scenario.name}</h3>
                  <div className="text-right">
                    <div className="text-xl font-bold text-red-600">
                      {formatCurrency(scenario.totalImpact)}
                    </div>
                    <div className="text-sm text-gray-600">Total Impact</div>
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-2">
                  <span>Type: {incidentTypes.find(t => t.value === scenario.incidentType)?.label}</span>
                  <span>Duration: {scenario.duration}</span>
                  <span>Created: {scenario.createdDate}</span>
                </div>
                <p className="text-sm text-gray-700">{scenario.summary}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Impact Calculator</h1>
          <p className="text-lg text-gray-600">
            Quantify the financial impact of cybersecurity incidents on your organization
          </p>
        </div>

        {/* Navigation */}
        <div className="mb-8">
          <div className="flex gap-2 justify-center">
            <Button
              onClick={() => setCurrentView('calculator')}
              variant={currentView === 'calculator' ? 'default' : 'outline'}
            >
              Calculator
            </Button>
            <Button
              onClick={() => setCurrentView('results')}
              variant={currentView === 'results' ? 'default' : 'outline'}
              disabled={!results}
            >
              Results
            </Button>
            <Button
              onClick={() => setCurrentView('scenarios')}
              variant={currentView === 'scenarios' ? 'default' : 'outline'}
            >
              Saved Scenarios
            </Button>
          </div>
        </div>

        {/* Content */}
        {currentView === 'calculator' && renderCalculator()}
        {currentView === 'results' && renderResults()}
        {currentView === 'scenarios' && renderScenarios()}
      </div>
    </div>
  );
};

export default BusinessImpactCalculator;