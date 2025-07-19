import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  FileText, 
  Settings, 
  Users, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Archive,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Link,
  Target,
  BarChart3,
  Map,
  FileCheck,
  Bell,
  Calendar,
  BookOpen,
  Activity,
  Layers,
  Network,
  Sun,
  Moon,
  Loader2,
  WifiOff,
  CheckCircle2
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';

const PolicyOrchestrator = () => {
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Policy data structure
  const [policies, setPolicies] = useState([
    {
      id: 1,
      title: "Access Control Policy",
      category: "Access Control",
      status: "approved",
      version: "2.1",
      lastUpdated: "2024-01-15",
      reviewDate: "2024-07-15",
      owner: "Security Team",
      acknowledgments: 45,
      totalUsers: 52,
      description: "Defines standards for user access management and authentication requirements."
    },
    {
      id: 2,
      title: "Data Classification Policy",
      category: "Data Protection",
      status: "draft",
      version: "1.0",
      lastUpdated: "2024-01-10",
      reviewDate: "2024-04-10",
      owner: "Data Protection Officer",
      acknowledgments: 0,
      totalUsers: 52,
      description: "Establishes data classification standards and handling procedures."
    },
    {
      id: 3,
      title: "Incident Response Procedures",
      category: "Incident Response",
      status: "review",
      version: "3.2",
      lastUpdated: "2023-12-20",
      reviewDate: "2024-03-20",
      owner: "CISO",
      acknowledgments: 38,
      totalUsers: 52,
      description: "Comprehensive incident response and escalation procedures."
    }
  ]);

  const policyCategories = [
    "Access Control",
    "Data Protection",
    "Incident Response",
    "Risk Management",
    "Business Continuity",
    "Asset Management",
    "Personnel Security",
    "Physical Security",
    "Communications Security",
    "System Security"
  ];

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || policy.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const PolicyModal = () => (
    showPolicyModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {selectedPolicy ? 'Edit Policy' : 'Create New Policy'}
            </h2>
            <button
              onClick={() => setShowPolicyModal(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Policy Title
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter policy title"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                {policyCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Policy Content
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-md">
              <div className="bg-gray-50 dark:bg-gray-700 px-3 py-2 border-b border-gray-300 dark:border-gray-600 flex space-x-2">
                <button className="px-2 py-1 text-sm bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-50 dark:hover:bg-gray-500 dark:text-white">
                  Bold
                </button>
                <button className="px-2 py-1 text-sm bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded hover:bg-gray-50 dark:hover:bg-gray-500 dark:text-white">
                  Italic
                </button>
              </div>
              <textarea
                rows="12"
                className="w-full px-3 py-2 border-0 focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-white"
                placeholder="Enter detailed policy content, procedures, and requirements..."
              ></textarea>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setShowPolicyModal(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save Policy
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Policies</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{policies.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Approved</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {policies.filter(p => p.status === 'approved').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-yellow-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Under Review</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {policies.filter(p => p.status === 'review').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Avg. Acknowledgment</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">87%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search policies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Status</option>
              <option value="draft">Draft</option>
              <option value="review">Under Review</option>
              <option value="approved">Approved</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          <button
            onClick={() => setShowPolicyModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>New Policy</span>
          </button>
        </div>
      </div>

      {/* Policy List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Policy
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Owner
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Acknowledgments
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredPolicies.map((policy) => (
                <tr key={policy.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{policy.title}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{policy.category} • v{policy.version}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      policy.status === 'approved' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      policy.status === 'review' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      policy.status === 'draft' ? 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {policy.owner}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center">
                      <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{width: `${(policy.acknowledgments / policy.totalUsers) * 100}%`}}
                        ></div>
                      </div>
                      <span className="text-xs">{policy.acknowledgments}/{policy.totalUsers}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <PolicyModal />
    </div>
  );
};

const ComplianceMappingEngine = () => {
  const [selectedFramework, setSelectedFramework] = useState('nist-csf');
  const [showMappingModal, setShowMappingModal] = useState(false);

  // Compliance frameworks
  const frameworks = {
    'nist-csf': {
      name: 'NIST Cybersecurity Framework',
      categories: ['Identify', 'Protect', 'Detect', 'Respond', 'Recover'],
      controls: 108,
      implemented: 72,
      color: '#3B82F6'
    },
    'iso-27001': {
      name: 'ISO 27001',
      categories: ['Information Security Policies', 'Organization of Information Security', 'Human Resource Security', 'Asset Management', 'Access Control'],
      controls: 114,
      implemented: 89,
      color: '#10B981'
    },
    'soc2': {
      name: 'SOC 2 Type II',
      categories: ['Security', 'Availability', 'Processing Integrity', 'Confidentiality', 'Privacy'],
      controls: 64,
      implemented: 45,
      color: '#F59E0B'
    },
    'pci-dss': {
      name: 'PCI DSS',
      categories: ['Network Security', 'Data Protection', 'Vulnerability Management', 'Access Control', 'Monitoring'],
      controls: 78,
      implemented: 52,
      color: '#EF4444'
    }
  };

  const currentFramework = frameworks[selectedFramework];

  // Sample control mappings
  const controlMappings = [
    {
      id: 1,
      control: "AC-1 Access Control Policy",
      nist: "PR.AC-1",
      iso27001: "A.9.1.1",
      soc2: "CC6.1",
      pci: "7.1",
      implementation: "implemented",
      evidence: ["Access Control Policy v2.1", "User Access Review Q4 2023"],
      lastReview: "2024-01-15",
      responsible: "Security Team"
    },
    {
      id: 2,
      control: "Data Encryption Standards",
      nist: "PR.DS-1",
      iso27001: "A.10.1.1",
      soc2: "CC6.7",
      pci: "3.4",
      implementation: "partial",
      evidence: ["Encryption Policy Draft", "Technical Implementation Guide"],
      lastReview: "2024-01-10",
      responsible: "IT Security"
    }
  ];

  const MappingModal = () => (
    showMappingModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Control Mapping Interface</h2>
            <button
              onClick={() => setShowMappingModal(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <span className="sr-only">Close</span>
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Control Information */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Control ID
                </label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., AC-1"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Implementation Status
                </label>
                <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white">
                  <option value="not-implemented">Not Implemented</option>
                  <option value="partial">Partially Implemented</option>
                  <option value="implemented">Fully Implemented</option>
                  <option value="not-applicable">Not Applicable</option>
                </select>
              </div>
            </div>
            
            {/* Framework Mappings */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Framework Mappings</h3>
              
              {Object.entries(frameworks).map(([key, framework]) => (
                <div key={key} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">{framework.name}</h4>
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{backgroundColor: framework.color}}
                    ></span>
                  </div>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder={`${framework.name} control ID`}
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setShowMappingModal(false)}
              className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md hover:bg-gray-50 dark:hover:bg-gray-500"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Save Mapping
            </button>
          </div>
        </div>
      </div>
    )
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Framework Selector */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Framework Overview</h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedFramework}
              onChange={(e) => setSelectedFramework(e.target.value)}
              className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
            >
              {Object.entries(frameworks).map(([key, framework]) => (
                <option key={key} value={key}>{framework.name}</option>
              ))}
            </select>
            <button
              onClick={() => setShowMappingModal(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
            >
              <Link className="h-4 w-4" />
              <span>New Mapping</span>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <Target className="h-6 w-6 text-blue-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Controls</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{currentFramework.controls}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="h-6 w-6 text-green-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Implemented</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">{currentFramework.implemented}</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <Activity className="h-6 w-6 text-yellow-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">In Progress</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentFramework.controls - currentFramework.implemented}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 text-purple-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Compliance %</p>
                <p className="text-xl font-bold text-gray-900 dark:text-white">
                  {Math.round((currentFramework.implemented / currentFramework.controls) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compliance Coverage */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Framework Coverage</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Implementation Status by Category</h4>
            <div className="space-y-3">
              {currentFramework.categories.map((category, index) => {
                const percentage = Math.floor(Math.random() * 40) + 60; // Demo data
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400 flex-1">{category}</span>
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            percentage >= 80 ? 'bg-green-500' :
                            percentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{width: `${percentage}%`}}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 dark:text-white w-10">{percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white mb-3">Cross-Framework Mapping</h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(frameworks).map(([key, framework]) => (
                <div key={key} className="border border-gray-200 dark:border-gray-600 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">{framework.name}</span>
                    <span 
                      className="w-3 h-3 rounded-full"
                      style={{backgroundColor: framework.color}}
                    ></span>
                  </div>
                  <div className="text-xs text-gray-600 dark:text-gray-400">
                    {framework.implemented}/{framework.controls} mapped
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1 mt-1">
                    <div 
                      className="h-1 rounded-full"
                      style={{
                        width: `${(framework.implemented / framework.controls) * 100}%`,
                        backgroundColor: framework.color
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Control Mappings Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Control Mappings</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Control
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  NIST CSF
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  ISO 27001
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Implementation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Evidence
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {controlMappings.map((mapping) => (
                <tr key={mapping.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">{mapping.control}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Last reviewed: {mapping.lastReview}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {mapping.nist}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {mapping.iso27001}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      mapping.implementation === 'implemented' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                      mapping.implementation === 'partial' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                      'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                    }`}>
                      {mapping.implementation === 'implemented' ? 'Implemented' :
                       mapping.implementation === 'partial' ? 'Partial' : 'Not Implemented'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center space-x-1">
                      <FileCheck className="h-4 w-4 text-gray-400" />
                      <span>{mapping.evidence.length} docs</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <MappingModal />
    </div>
  );
};

const GovernanceFramework = () => {
  const [activeTab, setActiveTab] = useState('policy-orchestrator');
  const [theme, setTheme] = useState('light');
  const [connectionStatus, setConnectionStatus] = useState({
    isConnected: true,
    message: 'Connected to database',
    lastChecked: new Date()
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('cybercaution-theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('cybercaution-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const formatLastChecked = (date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours === 1) return '1 hour ago';
    return `${diffHours} hours ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="text-3xl">
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  GovernanceFramework
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Governance framework for policy orchestration and compliance mapping
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Connection Status */}
              <div className="flex items-center space-x-2 text-sm">
                {connectionStatus.isConnected ? (
                  <>
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {connectionStatus.message}
                    </span>
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4 text-red-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {connectionStatus.message}
                    </span>
                  </>
                )}
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  ({formatLastChecked(connectionStatus.lastChecked)})
                </span>
              </div>
              
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? (
                  <Moon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Sun className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {error && (
          <div className="mb-6 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
            <div className="flex">
              <AlertCircle className="h-5 w-5 text-red-400" />
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800 dark:text-red-200">
                  Error
                </h3>
                <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                  {error}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
              Loading tools...
            </p>
          </div>
        ) : (
          <div>
            {/* Navigation Tabs */}
            <div className="mb-8">
              <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('policy-orchestrator')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'policy-orchestrator'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4" />
                      <span>Policy Orchestrator</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab('compliance-mapping')}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'compliance-mapping'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Network className="h-4 w-4" />
                      <span>Compliance Mapping Engine</span>
                    </div>
                  </button>
                </nav>
              </div>
            </div>

            {/* Content */}
            {activeTab === 'policy-orchestrator' ? <PolicyOrchestrator /> : <ComplianceMappingEngine />}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>Tool ID: cybercaution-governance-framework-v1</span>
            <span>© 2024 CyberCaution - Security Orchestration & Governance Platform</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default GovernanceFramework;