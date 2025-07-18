import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import ToolTemplate from './ToolTemplate';
import { 
  Search, Plus, Upload, Download, Package, Brain, Settings,
  FileText, Database, Cloud, Network, Folder, File, Shield,
  AlertTriangle, CheckCircle, Info, X, ChevronRight, Filter,
  BarChart3, Users, GraduationCap, AlertCircle, TrendingUp
} from 'lucide-react';

// Initialize Supabase client
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || '',
  process.env.REACT_APP_SUPABASE_ANON_KEY || ''
);

// Types
interface Asset {
  id: string;
  name: string;
  type: string;
  category: string;
  owner: string;
  classification: 'Public' | 'Internal' | 'Confidential' | 'Restricted';
  description: string;
  location: string;
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Draft' | 'Active' | 'Under Review' | 'Remediation Required' | 'Archived';
  trainingRequired: boolean;
  tags: string[];
  compliance: string[];
  behaviorScore: number;
  humanInteractions: number;
  policyAdherence: number;
  createdDate: string;
  lastUpdated: string;
}

interface Template {
  id: string;
  name: string;
  industry: string;
  description: string;
  icon: string;
  assetCount: number;
  compliance: string[];
  tags: string[];
}

const AssetManager: React.FC = () => {
  // State management
  const [assets, setAssets] = useState<Asset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<Asset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('assets');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [showBehaviorModal, setShowBehaviorModal] = useState(false);

  // Form state for new asset
  const [newAsset, setNewAsset] = useState<Partial<Asset>>({
    name: '',
    type: 'Database',
    category: '',
    owner: '',
    classification: 'Internal',
    description: '',
    location: '',
    riskLevel: 'Medium',
    status: 'Active',
    trainingRequired: false,
    tags: [],
    compliance: []
  });

  // Load assets on mount
  useEffect(() => {
    loadAssets();
  }, []);

  // Filter assets when search query changes
  useEffect(() => {
    if (!searchQuery) {
      setFilteredAssets(assets);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = assets.filter(asset => 
        asset.name.toLowerCase().includes(query) ||
        asset.description.toLowerCase().includes(query) ||
        asset.owner.toLowerCase().includes(query) ||
        asset.category.toLowerCase().includes(query) ||
        asset.tags.some(tag => tag.toLowerCase().includes(query))
      );
      setFilteredAssets(filtered);
    }
  }, [searchQuery, assets]);

  // Load assets from database
  const loadAssets = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('information_assets')
        .select('*')
        .eq('is_deleted', false)
        .order('created_date', { ascending: false });

      if (error) throw error;
      
      setAssets(data || []);
      setFilteredAssets(data || []);
    } catch (err) {
      console.error('Error loading assets:', err);
      setError('Failed to load assets. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Add new asset
  const handleAddAsset = async () => {
    if (!newAsset.name || !newAsset.type || !newAsset.classification) {
      setError('Please fill in all required fields');
      return;
    }
    
    try {
      const assetToAdd = {
        ...newAsset,
        behaviorScore: Math.floor(Math.random() * 40) + 60,
        humanInteractions: Math.floor(Math.random() * 100) + 50,
        policyAdherence: Math.floor(Math.random() * 30) + 70,
        createdDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('information_assets')
        .insert([assetToAdd])
        .select()
        .single();

      if (error) throw error;

      setAssets([data, ...assets]);
      setShowAddModal(false);
      resetNewAsset();
    } catch (err) {
      console.error('Error adding asset:', err);
      setError('Failed to add asset. Please try again.');
    }
  };

  // Delete asset
  const handleDeleteAsset = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this asset?')) return;

    try {
      const { error } = await supabase
        .from('information_assets')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setAssets(assets.filter(asset => asset.id !== id));
      if (selectedAsset?.id === id) {
        setSelectedAsset(null);
      }
    } catch (err) {
      console.error('Error deleting asset:', err);
      setError('Failed to delete asset. Please try again.');
    }
  };

  // Reset new asset form
  const resetNewAsset = () => {
    setNewAsset({
      name: '',
      type: 'Database',
      category: '',
      owner: '',
      classification: 'Internal',
      description: '',
      location: '',
      riskLevel: 'Medium',
      status: 'Active',
      trainingRequired: false,
      tags: [],
      compliance: []
    });
  };

  // Get asset type icon
  const getAssetIcon = (type: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      'Database': <Database className="h-5 w-5" />,
      'Application': <FileText className="h-5 w-5" />,
      'Document Repository': <Folder className="h-5 w-5" />,
      'Structured Data': <BarChart3 className="h-5 w-5" />,
      'Reports': <File className="h-5 w-5" />,
      'Cloud Service': <Cloud className="h-5 w-5" />,
      'Network Infrastructure': <Network className="h-5 w-5" />
    };
    return icons[type] || <Database className="h-5 w-5" />;
  };

  // Get classification badge color
  const getClassificationColor = (classification: string) => {
    const colors: { [key: string]: string } = {
      'Public': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Internal': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'Confidential': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Restricted': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[classification] || 'bg-gray-100 text-gray-800';
  };

  // Get risk level badge color
  const getRiskLevelColor = (level: string) => {
    const colors: { [key: string]: string } = {
      'Low': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'Medium': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'High': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'Critical': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
    };
    return colors[level] || 'bg-gray-100 text-gray-800';
  };

  // Get behavior score color
  const getBehaviorScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 dark:text-green-400';
    if (score >= 60) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  // Calculate metrics
  const calculateMetrics = () => {
    const totalAssets = assets.length;
    const avgBehaviorScore = assets.length > 0 
      ? Math.round(assets.reduce((sum, asset) => sum + asset.behaviorScore, 0) / assets.length)
      : 0;
    const highRiskAssets = assets.filter(asset => 
      asset.riskLevel === 'High' || asset.riskLevel === 'Critical'
    ).length;
    const needTraining = assets.filter(asset => asset.trainingRequired).length;

    return { totalAssets, avgBehaviorScore, highRiskAssets, needTraining };
  };

  const metrics = calculateMetrics();

  return (
    <ToolTemplate
      title="Information Asset Manager"
      description="Human-Centric Information Asset Management & Behavioral Risk Assessment"
      icon={<Database className="h-8 w-8 text-blue-600" />}
      toolId="asset-manager"
      isLoading={isLoading}
      error={error}
    >
      {/* Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border border-blue-200 dark:border-blue-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-medium">Total Assets</p>
              <p className="text-2xl font-bold text-blue-900 dark:text-blue-100">{metrics.totalAssets}</p>
            </div>
            <Database className="h-8 w-8 text-blue-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border border-green-200 dark:border-green-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium">Behavior Score</p>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">{metrics.avgBehaviorScore}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-800/20 border border-orange-200 dark:border-orange-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 dark:text-orange-400 text-sm font-medium">High Risk Assets</p>
              <p className="text-2xl font-bold text-orange-900 dark:text-orange-100">{metrics.highRiskAssets}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-orange-500 opacity-50" />
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border border-purple-200 dark:border-purple-700 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 dark:text-purple-400 text-sm font-medium">Need Training</p>
              <p className="text-2xl font-bold text-purple-900 dark:text-purple-100">{metrics.needTraining}</p>
            </div>
            <GraduationCap className="h-8 w-8 text-purple-500 opacity-50" />
          </div>
        </div>
      </div>

      {/* Search and Actions Bar */}
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search assets by name, description, owner, category or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-4 w-4" />
              Add Asset
            </button>
            
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Upload className="h-4 w-4" />
              Import
            </button>
            
            <button
              onClick={() => setShowExportModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            
            <button
              onClick={() => setShowTemplateModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Package className="h-4 w-4" />
              Templates
            </button>
            
            <button
              onClick={() => setShowBehaviorModal(true)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Brain className="h-4 w-4" />
              Behavior Analysis
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex space-x-8 px-6">
            {[
              { id: 'assets', label: 'Assets', icon: <Database className="h-4 w-4" /> },
              { id: 'behavior', label: 'Behavioral Analytics', icon: <Brain className="h-4 w-4" /> },
              { id: 'compliance', label: 'Compliance', icon: <Shield className="h-4 w-4" /> },
              { id: 'risk', label: 'Risk Analysis', icon: <BarChart3 className="h-4 w-4" /> },
              { id: 'reports', label: 'Reports', icon: <FileText className="h-4 w-4" /> }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'assets' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Asset List */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Information Assets</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Browse your asset inventory</p>
                  </div>
                  
                  <div className="p-4 max-h-96 overflow-y-auto">
                    {filteredAssets.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <Database className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="mb-2 font-medium">No assets found</p>
                        <p className="text-sm mb-4">Get started by adding your first asset</p>
                        <button
                          onClick={() => setShowAddModal(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                        >
                          Create New Asset
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {filteredAssets.map(asset => (
                          <div
                            key={asset.id}
                            onClick={() => setSelectedAsset(asset)}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              selectedAsset?.id === asset.id
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {getAssetIcon(asset.type)}
                                <span className="font-medium text-gray-900 dark:text-white">{asset.name}</span>
                              </div>
                              <span className={`px-2 py-1 text-xs rounded-full ${getClassificationColor(asset.classification)}`}>
                                {asset.classification}
                              </span>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-600 dark:text-gray-400">
                                {asset.type} • {asset.category}
                              </div>
                              <span className={`px-2 py-1 text-xs rounded-full ${getRiskLevelColor(asset.riskLevel)}`}>
                                {asset.riskLevel}
                              </span>
                            </div>
                            
                            {(asset.behaviorScore > 0 || asset.trainingRequired) && (
                              <div className="flex items-center gap-3 mt-2 text-xs">
                                {asset.behaviorScore > 0 && (
                                  <span className={`flex items-center gap-1 ${getBehaviorScoreColor(asset.behaviorScore)}`}>
                                    <BarChart3 className="h-3 w-3" />
                                    {asset.behaviorScore}%
                                  </span>
                                )}
                                {asset.trainingRequired && (
                                  <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                                    <GraduationCap className="h-3 w-3" />
                                    Training
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Asset Details */}
              <div className="lg:col-span-2">
                {selectedAsset ? (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                          {selectedAsset.name}
                          <span className={`px-2 py-1 text-xs rounded-full ${getClassificationColor(selectedAsset.classification)}`}>
                            {selectedAsset.classification}
                          </span>
                          <span className={`px-2 py-1 text-xs rounded-full ${getRiskLevelColor(selectedAsset.riskLevel)}`}>
                            {selectedAsset.riskLevel}
                          </span>
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{selectedAsset.type} - {selectedAsset.category}</p>
                      </div>
                      
                      <button
                        onClick={() => handleDeleteAsset(selectedAsset.id)}
                        className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Delete
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Asset Information</h4>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Description:</span>
                            <p className="mt-1 text-gray-900 dark:text-gray-200">{selectedAsset.description || 'No description provided'}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Owner:</span>
                            <p className="text-gray-900 dark:text-gray-200">{selectedAsset.owner || 'Not assigned'}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Location:</span>
                            <p className="text-gray-900 dark:text-gray-200">{selectedAsset.location || 'Not specified'}</p>
                          </div>
                          <div>
                            <span className="text-gray-600 dark:text-gray-400">Status:</span>
                            <p className="text-gray-900 dark:text-gray-200">{selectedAsset.status}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">CyberCaution Metrics</h4>
                        <div className="space-y-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">Human Interactions:</span>
                            <span className="text-gray-900 dark:text-gray-200">{selectedAsset.humanInteractions}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <BarChart3 className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">Behavior Score:</span>
                            <span className={getBehaviorScoreColor(selectedAsset.behaviorScore)}>
                              {selectedAsset.behaviorScore}%
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">Policy Adherence:</span>
                            <span className="text-gray-900 dark:text-gray-200">{selectedAsset.policyAdherence}%</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <GraduationCap className="h-4 w-4 text-gray-400" />
                            <span className="text-gray-600 dark:text-gray-400">Training Required:</span>
                            <span className={selectedAsset.trainingRequired ? 'text-orange-600' : 'text-green-600'}>
                              {selectedAsset.trainingRequired ? 'Yes' : 'No'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {selectedAsset.tags && selectedAsset.tags.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedAsset.tags.map((tag, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedAsset.compliance && selectedAsset.compliance.length > 0 && (
                      <div className="mt-6">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">Compliance Requirements</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedAsset.compliance.map((comp, index) => (
                            <span key={index} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 rounded-full text-sm">
                              {comp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {(selectedAsset.riskLevel === 'High' || selectedAsset.riskLevel === 'Critical') && (
                      <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex gap-3">
                          <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                          <div>
                            <h5 className="font-medium text-red-800 dark:text-red-200">High Risk Asset - Immediate Attention Required</h5>
                            <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                              This asset contains sensitive data and requires immediate behavioral assessment, security reviews, and potential training interventions.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-12 text-center">
                    <Database className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400 mb-2">Select an information asset to view details</p>
                    <p className="text-sm text-gray-500 dark:text-gray-500">Or create a new asset to start building your CyberCaution inventory</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Other tabs content would go here */}
          {activeTab === 'behavior' && (
            <div className="text-center py-12 text-gray-500">
              <Brain className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Behavioral Analytics coming soon...</p>
            </div>
          )}

          {activeTab === 'compliance' && (
            <div className="text-center py-12 text-gray-500">
              <Shield className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Compliance Dashboard coming soon...</p>
            </div>
          )}

          {activeTab === 'risk' && (
            <div className="text-center py-12 text-gray-500">
              <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Risk Analysis coming soon...</p>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="text-center py-12 text-gray-500">
              <FileText className="h-16 w-16 mx-auto mb-4 opacity-50" />
              <p>Reports coming soon...</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Asset Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Information Asset</h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Asset Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newAsset.name}
                      onChange={(e) => setNewAsset({ ...newAsset, name: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter asset name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Asset Type *
                    </label>
                    <select
                      required
                      value={newAsset.type}
                      onChange={(e) => setNewAsset({ ...newAsset, type: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Database">Database</option>
                      <option value="Application">Application</option>
                      <option value="Document Repository">Document Repository</option>
                      <option value="Structured Data">Structured Data</option>
                      <option value="Reports">Reports</option>
                      <option value="Cloud Service">Cloud Service</option>
                      <option value="Network Infrastructure">Network Infrastructure</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={newAsset.category}
                      onChange={(e) => setNewAsset({ ...newAsset, category: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g. Finance, HR, Marketing"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Owner
                    </label>
                    <input
                      type="text"
                      value={newAsset.owner}
                      onChange={(e) => setNewAsset({ ...newAsset, owner: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Department or person responsible"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Classification *
                    </label>
                    <select
                      required
                      value={newAsset.classification}
                      onChange={(e) => setNewAsset({ ...newAsset, classification: e.target.value as Asset['classification'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Public">Public</option>
                      <option value="Internal">Internal</option>
                      <option value="Confidential">Confidential</option>
                      <option value="Restricted">Restricted</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Risk Level
                    </label>
                    <select
                      value={newAsset.riskLevel}
                      onChange={(e) => setNewAsset({ ...newAsset, riskLevel: e.target.value as Asset['riskLevel'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Low">Low</option>
                      <option value="Medium">Medium</option>
                      <option value="High">High</option>
                      <option value="Critical">Critical</option>
                    </select>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={newAsset.description}
                    onChange={(e) => setNewAsset({ ...newAsset, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe this information asset and its purpose"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Location
                    </label>
                    <input
                      type="text"
                      value={newAsset.location}
                      onChange={(e) => setNewAsset({ ...newAsset, location: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Where this asset is stored or hosted"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Status
                    </label>
                    <select
                      value={newAsset.status}
                      onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value as Asset['status'] })}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="Draft">Draft</option>
                      <option value="Active">Active</option>
                      <option value="Under Review">Under Review</option>
                      <option value="Remediation Required">Remediation Required</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="mb-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={newAsset.trainingRequired}
                      onChange={(e) => setNewAsset({ ...newAsset, trainingRequired: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Training Required for Access</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddAsset}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Save Asset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ToolTemplate>
  );
};

export default AssetManager;