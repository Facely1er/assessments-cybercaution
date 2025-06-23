import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BarChart2, 
  Network, 
  Link2, 
  ArrowRight, 
  Download, 
  PieChart, 
  CheckCircle, 
  AlertTriangle, 
  ExternalLink,
  Building2,
  FileText,
  Calendar,
  User,
  Map,
  Search,
  Filter,
  ChevronDown,
  Clock,
  Star,
  AlertCircle,
  Lock,
  Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart as RePieChart, Pie, Cell } from 'recharts';

const SupplyChainRiskDashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample data for vendors
  const vendors = [
    {
      id: 'v1',
      name: 'TechSecure Solutions',
      category: 'Critical',
      services: ['Cloud Infrastructure', 'Security Services'],
      riskScore: 85,
      riskLevel: 'High',
      onboardingDate: '2024-01-15',
      lastAssessmentDate: '2025-02-01',
      complianceScore: 78,
      geographicRisk: 'Low',
      financialStability: 'Strong',
      certifications: ['ISO 27001', 'SOC 2 Type II'],
    },
    {
      id: 'v2',
      name: 'DataStore Inc.',
      category: 'Critical',
      services: ['Data Storage', 'Backup Services'],
      riskScore: 62,
      riskLevel: 'Medium',
      onboardingDate: '2023-06-10',
      lastAssessmentDate: '2025-01-15',
      complianceScore: 82,
      geographicRisk: 'Low',
      financialStability: 'Strong',
      certifications: ['ISO 27001', 'HIPAA Compliant'],
    },
    {
      id: 'v3',
      name: 'Global Connect Provider',
      category: 'High',
      services: ['Network Services', 'Internet Connectivity'],
      riskScore: 78,
      riskLevel: 'Medium',
      onboardingDate: '2022-03-22',
      lastAssessmentDate: '2025-03-05',
      complianceScore: 75,
      geographicRisk: 'Medium',
      financialStability: 'Stable',
      certifications: ['ISO 27001'],
    },
    {
      id: 'v4',
      name: 'SecureAuth Systems',
      category: 'High',
      services: ['Identity Management', 'Authentication Services'],
      riskScore: 92,
      riskLevel: 'High',
      onboardingDate: '2023-11-30',
      lastAssessmentDate: '2025-02-28',
      complianceScore: 68,
      geographicRisk: 'Low',
      financialStability: 'Stable',
      certifications: ['ISO 27001', 'SOC 2 Type II', 'FedRAMP'],
    },
    {
      id: 'v5',
      name: 'SoftDev Enterprises',
      category: 'Medium',
      services: ['Software Development', 'Application Maintenance'],
      riskScore: 72,
      riskLevel: 'Medium',
      onboardingDate: '2023-08-05',
      lastAssessmentDate: '2025-01-20',
      complianceScore: 70,
      geographicRisk: 'Medium',
      financialStability: 'Stable',
      certifications: ['ISO 9001'],
    },
  ];

  // Compute statistics
  const criticalVendors = vendors.filter(v => v.category === 'Critical').length;
  const highRiskVendors = vendors.filter(v => v.riskLevel === 'High').length;
  const avgRiskScore = vendors.reduce((sum, v) => sum + v.riskScore, 0) / vendors.length;
  const vendorsWithCertifications = vendors.filter(v => v.certifications.length > 0).length;

  // NIST 800-161 controls implementation stats
  const controlStats = {
    identify: { total: 15, implemented: 9, partial: 4, notImplemented: 2 },
    protect: { total: 18, implemented: 12, partial: 5, notImplemented: 1 },
    detect: { total: 10, implemented: 6, partial: 3, notImplemented: 1 },
    respond: { total: 12, implemented: 8, partial: 3, notImplemented: 1 },
    recover: { total: 8, implemented: 5, partial: 2, notImplemented: 1 },
  };

  // Sample data for the charts
  const riskByVendorCategory = [
    { name: 'Critical', vendors: 2, averageRisk: 73.5 },
    { name: 'High', vendors: 2, averageRisk: 85 },
    { name: 'Medium', vendors: 1, averageRisk: 72 },
  ];

  const riskDistributionData = [
    { name: 'High Risk', value: highRiskVendors },
    { name: 'Medium Risk', value: vendors.filter(v => v.riskLevel === 'Medium').length },
    { name: 'Low Risk', value: vendors.filter(v => v.riskLevel === 'Low').length },
  ];

  const COLORS = ['#EF4444', '#F59E0B', '#10B981'];

  const getRiskLevelBadge = (level: string) => {
    switch (level) {
      case 'High':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-critical-red/10 text-critical-red">
          High
        </span>;
      case 'Medium':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-amber/10 text-warning-amber">
          Medium
        </span>;
      case 'Low':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secure-green/10 text-secure-green">
          Low
        </span>;
      default:
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted text-muted-foreground">
          {level}
        </span>;
    }
  };

  const getVendorCategoryBadge = (category: string) => {
    switch (category) {
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
          {category}
        </span>;
    }
  };

  const getRiskScoreColor = (score: number) => {
    if (score >= 90) return 'text-critical-red';
    if (score >= 70) return 'text-warning-amber';
    if (score >= 50) return 'text-electric-blue';
    return 'text-secure-green';
  }

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Supply Chain Risk Assessment</h1>
          <p className="text-muted-foreground">Manage and monitor risks across your vendor ecosystem</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Link2 className="mr-2 h-4 w-4" />
            Start New Assessment
          </Button>
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
            activeTab === 'vendors' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('vendors')}
        >
          Vendor Assessment
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'controls' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('controls')}
        >
          NIST Controls
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            activeTab === 'reports' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
          }`}
          onClick={() => setActiveTab('reports')}
        >
          Reports
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
                    <p className="text-sm font-medium text-muted-foreground">Total Vendors</p>
                    <h3 className="text-3xl font-bold">{vendors.length}</h3>
                  </div>
                  <div className="rounded-full p-3 bg-electric-blue/10 text-electric-blue">
                    <Building2 className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Critical Vendors</p>
                    <h3 className="text-3xl font-bold">{criticalVendors}</h3>
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
                    <p className="text-sm font-medium text-muted-foreground">Avg Risk Score</p>
                    <h3 className="text-3xl font-bold">{avgRiskScore.toFixed(1)}</h3>
                  </div>
                  <div className="rounded-full p-3 bg-warning-amber/10 text-warning-amber">
                    <BarChart2 className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">High Risk Vendors</p>
                    <h3 className="text-3xl font-bold">{highRiskVendors}</h3>
                  </div>
                  <div className="rounded-full p-3 bg-warning-amber/10 text-warning-amber">
                    <AlertCircle className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts and Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Risk by Vendor Category</CardTitle>
                <CardDescription>Average risk score by vendor criticality tier</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={riskByVendorCategory}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis domain={[0, 100]} />
                      <Tooltip />
                      <Bar dataKey="averageRisk" name="Average Risk Score" fill="#2563EB" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vendor Risk Distribution</CardTitle>
                <CardDescription>Distribution of vendors by risk level</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <RePieChart>
                      <Pie
                        data={riskDistributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {riskDistributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RePieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Critical Vendors Section */}
          <Card>
            <CardHeader className="flex-row justify-between items-center">
              <div>
                <CardTitle>Critical Vendors</CardTitle>
                <CardDescription>Vendors critical to your operations with highest risk impact</CardDescription>
              </div>
              <Button variant="outline" onClick={() => setActiveTab('vendors')}>
                View All Vendors
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-muted/30 text-xs uppercase">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Vendor</th>
                      <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Category</th>
                      <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Services</th>
                      <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Risk Score</th>
                      <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Last Assessment</th>
                      <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Certifications</th>
                      <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {vendors.filter(v => v.category === 'Critical').map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-muted/20">
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                          {vendor.name}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {getVendorCategoryBadge(vendor.category)}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {vendor.services.join(', ')}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className={`font-medium ${getRiskScoreColor(vendor.riskScore)}`}>
                            {vendor.riskScore}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          {new Date(vendor.lastAssessmentDate).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-3 text-sm">
                          {vendor.certifications.map((cert, i) => (
                            <span key={i} className="inline-block px-2 py-0.5 text-xs bg-muted rounded mr-1 mb-1">
                              {cert}
                            </span>
                          ))}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <Button size="sm" variant="link" className="h-6 px-0">View Details</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* NIST Control Implementation */}
          <Card>
            <CardHeader>
              <CardTitle>NIST SP 800-161 Implementation</CardTitle>
              <CardDescription>Supply Chain Risk Management controls implementation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {Object.entries(controlStats).map(([function_, stats]) => (
                  <div key={function_} className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-medium capitalize mb-2">{function_}</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>Implemented</span>
                        <span className="font-medium text-secure-green">{stats.implemented} / {stats.total}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Partial</span>
                        <span className="font-medium text-warning-amber">{stats.partial} / {stats.total}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Not Implemented</span>
                        <span className="font-medium text-critical-red">{stats.notImplemented} / {stats.total}</span>
                      </div>
                      <div className="mt-3 w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-2 bg-secure-green" 
                          style={{ width: `${(stats.implemented / stats.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-center">
                <Button variant="outline" onClick={() => setActiveTab('controls')}>
                  View Detailed Controls
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Geographic Risk Map */}
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Vendor locations and associated geographic risks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 bg-muted/30 rounded-lg flex items-center justify-center">
                <Map className="h-16 w-16 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">
                  Geographic risk map visualization would appear here
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Resources and Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Lock className="h-10 w-10 text-primary mr-3" />
                  <h3 className="text-lg font-medium">NIST SP 800-161</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  NIST Special Publication 800-161 "Supply Chain Risk Management Practices for Systems and Organizations"
                </p>
                <a 
                  href="https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full">
                    View Guide
                    <ExternalLink className="ml-2 h-3 w-3" />
                  </Button>
                </a>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <CheckCircle className="h-10 w-10 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Vendor Questionnaires</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Standardized security questionnaires for vendor risk assessment aligned with industry standards.
                </p>
                <Button variant="outline" className="w-full">
                  View Templates
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Calendar className="h-10 w-10 text-primary mr-3" />
                  <h3 className="text-lg font-medium">Next Assessments</h3>
                </div>
                <p className="text-muted-foreground mb-4">
                  Upcoming vendor assessments scheduled for the next 30 days.
                </p>
                <Button variant="outline" className="w-full">
                  View Calendar
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {activeTab === 'vendors' && (
        <Card>
          <CardHeader>
            <CardTitle>Vendor Assessment</CardTitle>
            <CardDescription>Manage and assess vendors in your supply chain</CardDescription>
          </CardHeader>
          <CardContent>
            {/* Search and Filter */}
            <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search vendors..."
                  className="pl-10 pr-4 py-2 border border-border rounded-md"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <div className="relative">
                  <select className="pr-8 py-2 border border-border rounded-md appearance-none">
                    <option value="">All Categories</option>
                    <option value="Critical">Critical</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="relative">
                  <select className="pr-8 py-2 border border-border rounded-md appearance-none">
                    <option value="">All Risk Levels</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Vendors Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead className="bg-muted/30 text-xs uppercase">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Vendor</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Category</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Services</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Risk Score</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Risk Level</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Last Assessment</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Compliance</th>
                    <th className="px-4 py-3 text-left font-medium whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {vendors.map((vendor) => (
                    <tr key={vendor.id} className="hover:bg-muted/20">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        {vendor.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {getVendorCategoryBadge(vendor.category)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {vendor.services.join(', ')}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`font-medium ${getRiskScoreColor(vendor.riskScore)}`}>
                          {vendor.riskScore}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {getRiskLevelBadge(vendor.riskLevel)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {new Date(vendor.lastAssessmentDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`font-medium ${
                          vendor.complianceScore >= 80 ? 'text-secure-green' :
                          vendor.complianceScore >= 60 ? 'text-warning-amber' :
                          'text-critical-red'
                        }`}>
                          {vendor.complianceScore}%
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <Button size="sm" variant="link" className="h-6 px-0">View Details</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex justify-end">
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Add Vendor
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'controls' && (
        <Card>
          <CardHeader>
            <CardTitle>NIST SP 800-161 Controls</CardTitle>
            <CardDescription>Implementation status of supply chain risk management controls</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                {
                  function: 'Identify',
                  description: 'Develop organizational understanding of supply chain risks',
                  controls: [
                    { id: 'ID.SC-1', name: 'Supply Chain Risk Management Process', status: 'Implemented', score: 85 },
                    { id: 'ID.SC-2', name: 'Identify Critical Suppliers', status: 'Implemented', score: 90 },
                    { id: 'ID.SC-3', name: 'Supplier Contracts', status: 'Partially Implemented', score: 60 },
                    { id: 'ID.SC-4', name: 'Third-Party Assessments', status: 'Implemented', score: 80 },
                    { id: 'ID.SC-5', name: 'Response and Recovery Planning', status: 'Partially Implemented', score: 65 },
                  ]
                },
                {
                  function: 'Protect',
                  description: 'Develop and implement safeguards for the supply chain',
                  controls: [
                    { id: 'PR.SC-1', name: 'Security in Supplier Agreements', status: 'Implemented', score: 85 },
                    { id: 'PR.SC-2', name: 'Supplier Compliance with Requirements', status: 'Implemented', score: 75 },
                    { id: 'PR.SC-3', name: 'Supply Chain Risk Assessments', status: 'Partially Implemented', score: 65 },
                    { id: 'PR.SC-4', name: 'Supplier Monitoring', status: 'Partially Implemented', score: 70 },
                    { id: 'PR.SC-5', name: 'Security Testing', status: 'Not Implemented', score: 30 },
                  ]
                },
                {
                  function: 'Detect',
                  description: 'Develop and implement activities to identify supply chain security events',
                  controls: [
                    { id: 'DE.SC-1', name: 'Anomalies and Events', status: 'Partially Implemented', score: 60 },
                    { id: 'DE.SC-2', name: 'Continuous Monitoring', status: 'Implemented', score: 75 },
                    { id: 'DE.SC-3', name: 'Detection Processes', status: 'Partially Implemented', score: 60 },
                  ]
                },
              ].map((category, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-medium mb-2">{category.function}</h3>
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
                            <td className="px-4 py-3 text-sm text-muted-foreground">{control.name}</td>
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
          </CardContent>
        </Card>
      )}

      {activeTab === 'reports' && (
        <Card>
          <CardHeader>
            <CardTitle>Supply Chain Reports</CardTitle>
            <CardDescription>Generate and view reports for supply chain risk management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-muted/20 hover:bg-muted/30 cursor-pointer transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-8 w-8 text-primary mr-3" />
                    <h3 className="font-medium">Vendor Risk Report</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Comprehensive report of all vendor risk assessments and scores.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">Generate</Button>
                </CardContent>
              </Card>
              <Card className="bg-muted/20 hover:bg-muted/30 cursor-pointer transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-8 w-8 text-primary mr-3" />
                    <h3 className="font-medium">Critical Suppliers Report</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Focused analysis of critical suppliers and their risk profiles.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">Generate</Button>
                </CardContent>
              </Card>
              <Card className="bg-muted/20 hover:bg-muted/30 cursor-pointer transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <FileText className="h-8 w-8 text-primary mr-3" />
                    <h3 className="font-medium">NIST Compliance Report</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Detailed report on NIST SP 800-161 compliance status.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">Generate</Button>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-lg font-medium mb-3">Recent Reports</h3>
            <div className="border border-border rounded-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Report Name</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Generated Date</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Generated By</th>
                    <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">Format</th>
                    <th className="px-4 py-3 text-center text-xs font-medium uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    { name: 'Monthly Vendor Risk Summary', date: '2025-03-01', user: 'John Smith', format: 'PDF' },
                    { name: 'Critical Suppliers Analysis', date: '2025-02-15', user: 'Jane Doe', format: 'XLSX' },
                    { name: 'NIST SP 800-161 Assessment', date: '2025-02-10', user: 'John Smith', format: 'PDF' },
                    { name: 'Quarterly Supply Chain Review', date: '2025-01-05', user: 'Jane Doe', format: 'PPTX' },
                  ].map((report, index) => (
                    <tr key={index} className="hover:bg-muted/20">
                      <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">
                        {report.name}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {report.date}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        {report.user}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm">
                        <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                          report.format === 'PDF' ? 'bg-critical-red/10 text-critical-red' :
                          report.format === 'XLSX' ? 'bg-secure-green/10 text-secure-green' :
                          'bg-electric-blue/10 text-electric-blue'
                        }`}>
                          {report.format}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-center">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-3 w-3" />
                          Download
                        </Button>
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
            <CardTitle className="text-lg">NIST SP 800-161</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              NIST Special Publication 800-161 provides guidance on supply chain risk management practices for systems and organizations.
            </p>
            <a 
              href="https://csrc.nist.gov/publications/detail/sp/800-161/rev-1/final" 
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
            <CardTitle className="text-lg">Assessment Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Standardized templates for conducting vendor security and supply chain risk assessments.
            </p>
            <Link to="/app/tools/assessment-templates">
              <Button variant="outline" size="sm">
                View Templates
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vendor Onboarding</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Guidelines and procedures for secure vendor onboarding and continuous monitoring.
            </p>
            <Link to="/app/tools/vendor-onboarding">
              <Button variant="outline" size="sm">
                View Guidelines
                <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SupplyChainRiskDashboard;