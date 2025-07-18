import React, { useState, useEffect } from 'react';
import { Database, FileJson, FileText, Code, ChevronRight, Plus, Trash2, AlertCircle, CheckCircle, Loader, Download, Upload, RefreshCw, Filter, Grid, List, Eye, Copy, ArrowRight, Shield, AlertTriangle, Bug, Users, Server, FileWarning, Activity, Layers, GitCompare, History, FileCheck, Settings, BarChart3, FileUp, FolderOpen, Sun, Moon, Loader2, CheckCircle2, WifiOff } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client with Vite env vars
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL || '',
  import.meta.env.VITE_SUPABASE_ANON_KEY || ''
);

interface Template {
  id: string;
  name: string;
  dataType: string;
  sourceFormat: string;
  mappings: any[];
  validationRules: any[];
  created: string;
  modified: string;
  user_id?: string;
}

interface ConnectionStatus {
  isConnected: boolean;
  message: string;
  lastChecked: Date;
}

const DataNormalizationEngine = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>({
    isConnected: false,
    message: 'Checking connection...',
    lastChecked: new Date()
  });
  const [templates, setTemplates] = useState<Template[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<Template | null>(null);
  const [sourceData, setSourceData] = useState('');
  const [normalizedData, setNormalizedData] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<any[]>([]);
  const [dataQuality, setDataQuality] = useState({ score: 0, issues: [] });
  const [previewMode, setPreviewMode] = useState('split');
  const [bulkMode, setBulkMode] = useState(false);
  const [bulkFiles, setBulkFiles] = useState<File[]>([]);
  const [customValidations, setCustomValidations] = useState<any[]>([]);
  const [exportHistory, setExportHistory] = useState<any[]>([]);
  const [showCompareMode, setShowCompareMode] = useState(false);
  const [compareData, setCompareData] = useState(null);

  const dataTypes = [
    { id: 'alerts', name: 'Security Alerts', icon: AlertTriangle, color: 'red' },
    { id: 'vulnerabilities', name: 'Vulnerabilities', icon: Bug, color: 'orange' },
    { id: 'assets', name: 'Assets', icon: Server, color: 'blue' },
    { id: 'users', name: 'Users', icon: Users, color: 'green' },
    { id: 'incidents', name: 'Incidents', icon: FileWarning, color: 'yellow' },
    { id: 'logs', name: 'Logs', icon: Activity, color: 'purple' }
  ];

  const formats = ['JSON', 'CSV', 'XML', 'Syslog'];

  const transformationRules = [
    { id: 'lowercase', name: 'Convert to Lowercase' },
    { id: 'uppercase', name: 'Convert to Uppercase' },
    { id: 'trim', name: 'Trim Whitespace' },
    { id: 'date_iso', name: 'Convert to ISO Date' },
    { id: 'timestamp', name: 'Convert to Timestamp' },
    { id: 'hash', name: 'Hash Value (SHA256)' },
    { id: 'mask', name: 'Mask Sensitive Data' },
    { id: 'default', name: 'Set Default Value' },
    { id: 'regex', name: 'Regex Extract' },
    { id: 'concat', name: 'Concatenate Fields' }
  ];

  const standardFields = {
    alerts: [
      { field: 'id', type: 'string', required: true },
      { field: 'severity', type: 'enum', required: true, values: ['critical', 'high', 'medium', 'low'] },
      { field: 'title', type: 'string', required: true },
      { field: 'description', type: 'string', required: false },
      { field: 'source', type: 'string', required: true },
      { field: 'timestamp', type: 'datetime', required: true },
      { field: 'status', type: 'enum', required: true, values: ['open', 'investigating', 'resolved'] },
      { field: 'affected_assets', type: 'array', required: false }
    ],
    vulnerabilities: [
      { field: 'id', type: 'string', required: true },
      { field: 'cve_id', type: 'string', required: false },
      { field: 'severity_score', type: 'number', required: true },
      { field: 'title', type: 'string', required: true },
      { field: 'description', type: 'string', required: true },
      { field: 'affected_systems', type: 'array', required: true },
      { field: 'discovered_date', type: 'datetime', required: true },
      { field: 'remediation', type: 'string', required: false },
      { field: 'status', type: 'enum', required: true, values: ['new', 'active', 'mitigated', 'resolved'] }
    ],
    assets: [
      { field: 'id', type: 'string', required: true },
      { field: 'hostname', type: 'string', required: true },
      { field: 'ip_address', type: 'string', required: false },
      { field: 'type', type: 'enum', required: true, values: ['server', 'workstation', 'network', 'cloud'] },
      { field: 'os', type: 'string', required: false },
      { field: 'location', type: 'string', required: false },
      { field: 'owner', type: 'string', required: false },
      { field: 'criticality', type: 'enum', required: true, values: ['critical', 'high', 'medium', 'low'] },
      { field: 'last_seen', type: 'datetime', required: true }
    ]
  };

  // Load theme and check connection on mount
  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('cybercaution-theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }

    // Initial data load
    loadTemplates();
    checkSupabaseConnection();

    // Set up connection check interval
    const interval = setInterval(() => {
      checkSupabaseConnection();
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const checkSupabaseConnection = async () => {
    try {
      const { error } = await supabase.from('normalization_templates').select('count').single();
      
      if (error && error.code !== 'PGRST116') {
        setConnectionStatus({
          isConnected: false,
          message: 'Database connection failed',
          lastChecked: new Date()
        });
      } else {
        setConnectionStatus({
          isConnected: true,
          message: 'Connected to database',
          lastChecked: new Date()
        });
      }
    } catch (err) {
      setConnectionStatus({
        isConnected: false,
        message: 'Unable to connect to database',
        lastChecked: new Date()
      });
    }
  };

  const loadTemplates = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('normalization_templates')
        .select('*')
        .order('modified', { ascending: false });

      if (error) throw error;
      setTemplates(data || []);
    } catch (err) {
      setError('Failed to load templates');
      console.error('Error loading templates:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('cybercaution-theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const formatLastChecked = (date: Date): string => {
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

  const createNewTemplate = async () => {
    const newTemplate: Template = {
      id: crypto.randomUUID(),
      name: 'New Normalization Template',
      dataType: 'alerts',
      sourceFormat: 'JSON',
      mappings: [],
      validationRules: [],
      created: new Date().toISOString(),
      modified: new Date().toISOString()
    };

    try {
      const { data, error } = await supabase
        .from('normalization_templates')
        .insert([newTemplate])
        .select()
        .single();

      if (error) throw error;
      setTemplates([data, ...templates]);
      setActiveTemplate(data);
    } catch (err) {
      setError('Failed to create template');
      console.error('Error creating template:', err);
    }
  };

  const updateTemplate = async (updates: Partial<Template>) => {
    if (!activeTemplate) return;

    const updated = { 
      ...activeTemplate, 
      ...updates, 
      modified: new Date().toISOString() 
    };

    try {
      setIsSaving(true);
      const { error } = await supabase
        .from('normalization_templates')
        .update(updated)
        .eq('id', activeTemplate.id);

      if (error) throw error;
      
      setActiveTemplate(updated);
      setTemplates(templates.map(t => t.id === updated.id ? updated : t));
    } catch (err) {
      setError('Failed to update template');
      console.error('Error updating template:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTemplate = async (templateId: string) => {
    try {
      const { error } = await supabase
        .from('normalization_templates')
        .delete()
        .eq('id', templateId);

      if (error) throw error;
      
      setTemplates(templates.filter(t => t.id !== templateId));
      if (activeTemplate?.id === templateId) {
        setActiveTemplate(null);
      }
    } catch (err) {
      setError('Failed to delete template');
      console.error('Error deleting template:', err);
    }
  };

  const addMapping = () => {
    const newMapping = {
      id: Date.now(),
      sourceField: '',
      targetField: '',
      transformations: [],
      defaultValue: ''
    };
    updateTemplate({
      mappings: [...(activeTemplate?.mappings || []), newMapping]
    });
  };

  const updateMapping = (mappingId: number, updates: any) => {
    if (!activeTemplate) return;
    const updatedMappings = activeTemplate.mappings.map(m =>
      m.id === mappingId ? { ...m, ...updates } : m
    );
    updateTemplate({ mappings: updatedMappings });
  };

  const processData = async () => {
    setIsProcessing(true);
    setValidationErrors([]);
    
    try {
      // Simulate data processing
      setTimeout(() => {
        // Parse source data based on format
        let parsedData;
        if (activeTemplate?.sourceFormat === 'JSON') {
          parsedData = JSON.parse(sourceData);
        } else if (activeTemplate?.sourceFormat === 'CSV') {
          // Simple CSV parsing simulation
          const lines = sourceData.split('\n');
          const headers = lines[0].split(',');
          parsedData = lines.slice(1).map(line => {
            const values = line.split(',');
            return headers.reduce((obj, header, index) => {
              obj[header.trim()] = values[index]?.trim();
              return obj;
            }, {} as any);
          });
        }

        // Apply mappings
        const normalized = Array.isArray(parsedData) ? parsedData : [parsedData];
        const result = normalized.map(item => {
          const normalizedItem: any = {};
          
          activeTemplate?.mappings.forEach(mapping => {
            let value = item[mapping.sourceField];
            
            // Apply transformations
            mapping.transformations?.forEach(transform => {
              switch (transform) {
                case 'lowercase':
                  value = value?.toLowerCase();
                  break;
                case 'uppercase':
                  value = value?.toUpperCase();
                  break;
                case 'trim':
                  value = value?.trim();
                  break;
                case 'date_iso':
                  value = new Date(value).toISOString();
                  break;
                case 'timestamp':
                  value = new Date(value).getTime();
                  break;
                case 'mask':
                  value = value?.replace(/./g, '*');
                  break;
                default:
                  break;
              }
            });
            
            normalizedItem[mapping.targetField] = value || mapping.defaultValue;
          });
          
          return normalizedItem;
        });

        setNormalizedData(JSON.stringify(result, null, 2));
        
        // Calculate data quality
        const issues: any[] = [];
        const requiredFields = standardFields[activeTemplate?.dataType as keyof typeof standardFields] || [];
        
        result.forEach((item, index) => {
          requiredFields.forEach(field => {
            if (field.required && !item[field.field]) {
              issues.push({
                row: index + 1,
                field: field.field,
                issue: 'Missing required field'
              });
            }
          });
        });
        
        setDataQuality({
          score: Math.max(0, 100 - (issues.length * 5)),
          issues
        });
        
        // Save to export history
        const exportRecord = {
          id: crypto.randomUUID(),
          template_id: activeTemplate?.id,
          timestamp: new Date().toISOString(),
          records_processed: result.length,
          quality_score: Math.max(0, 100 - (issues.length * 5))
        };

        await supabase
          .from('normalization_exports')
          .insert([exportRecord]);

        setIsProcessing(false);
      }, 1500);
    } catch (error) {
      setValidationErrors([{ message: 'Failed to process data: ' + error }]);
      setIsProcessing(false);
    }
  };

  const MappingEditor = ({ mapping }: { mapping: any }) => {
    const targetFields = standardFields[activeTemplate?.dataType as keyof typeof standardFields] || [];
    
    return (
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-3">
        <div className="grid grid-cols-12 gap-3 items-start">
          <div className="col-span-4">
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Source Field</label>
            <input
              type="text"
              value={mapping.sourceField}
              onChange={(e) => updateMapping(mapping.id, { sourceField: e.target.value })}
              placeholder="field_name"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white text-sm"
            />
          </div>
          
          <div className="col-span-1 flex items-center justify-center pt-6">
            <ArrowRight className="w-4 h-4 text-gray-400 dark:text-gray-500" />
          </div>
          
          <div className="col-span-4">
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Target Field</label>
            <select
              value={mapping.targetField}
              onChange={(e) => updateMapping(mapping.id, { targetField: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white text-sm"
            >
              <option value="">Select field</option>
              {targetFields.map(field => (
                <option key={field.field} value={field.field}>
                  {field.field} {field.required && '*'}
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-span-2">
            <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Default Value</label>
            <input
              type="text"
              value={mapping.defaultValue}
              onChange={(e) => updateMapping(mapping.id, { defaultValue: e.target.value })}
              placeholder="Default"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white text-sm"
            />
          </div>
          
          <div className="col-span-1 flex items-end pb-2">
            <button
              onClick={() => {
                const filtered = activeTemplate?.mappings.filter(m => m.id !== mapping.id);
                updateTemplate({ mappings: filtered });
              }}
              className="p-2 text-gray-400 hover:text-red-500 dark:text-gray-500 dark:hover:text-red-400"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className="mt-3">
          <label className="block text-xs text-gray-600 dark:text-gray-400 mb-1">Transformations</label>
          <div className="flex flex-wrap gap-1">
            {transformationRules.map(rule => (
              <button
                key={rule.id}
                onClick={() => {
                  const transforms = mapping.transformations || [];
                  const updated = transforms.includes(rule.id)
                    ? transforms.filter(t => t !== rule.id)
                    : [...transforms, rule.id];
                  updateMapping(mapping.id, { transformations: updated });
                }}
                className={`px-2 py-1 text-xs rounded-md transition-colors ${
                  mapping.transformations?.includes(rule.id)
                    ? 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600'
                }`}
              >
                {rule.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const DataPreview = () => {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="font-semibold text-gray-900 dark:text-white">Data Preview</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewMode('split')}
              className={`p-2 rounded ${previewMode === 'split' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('source')}
              className={`p-2 rounded ${previewMode === 'source' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewMode('normalized')}
              className={`p-2 rounded ${previewMode === 'normalized' ? 'bg-gray-100 dark:bg-gray-700' : 'hover:bg-gray-50 dark:hover:bg-gray-700'}`}
            >
              <FileJson className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <div className={`grid ${previewMode === 'split' ? 'grid-cols-2' : 'grid-cols-1'} divide-x dark:divide-gray-700`}>
          {(previewMode === 'split' || previewMode === 'source') && (
            <div className="p-4">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Source Data</h4>
              <textarea
                value={sourceData}
                onChange={(e) => setSourceData(e.target.value)}
                placeholder={`Paste your ${activeTemplate?.sourceFormat || 'JSON'} data here...`}
                className="w-full h-64 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
              />
            </div>
          )}
          
          {(previewMode === 'split' || previewMode === 'normalized') && (
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Normalized Data</h4>
                {normalizedData && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(normalizedData);
                    }}
                    className="flex items-center gap-1 text-xs text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                  >
                    <Copy className="w-3 h-3" />
                    Copy
                  </button>
                )}
              </div>
              <pre className="w-full h-64 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg overflow-auto font-mono text-sm dark:text-gray-300">
                {normalizedData || 'Normalized data will appear here...'}
              </pre>
            </div>
          )}
        </div>
        
        {dataQuality.score > 0 && (
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Data Quality</h4>
              <span className={`text-sm font-medium ${
                dataQuality.score >= 80 ? 'text-green-600 dark:text-green-400' : 
                dataQuality.score >= 60 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
              }`}>
                {dataQuality.score}% Quality Score
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-3">
              <div 
                className={`h-2 rounded-full transition-all ${
                  dataQuality.score >= 80 ? 'bg-green-500' : 
                  dataQuality.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                style={{ width: `${dataQuality.score}%` }}
              />
            </div>
            {dataQuality.issues.length > 0 && (
              <div className="space-y-1 max-h-32 overflow-auto">
                {dataQuality.issues.slice(0, 5).map((issue, index) => (
                  <div key={index} className="flex items-center gap-2 text-xs">
                    <AlertCircle className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Row {issue.row}: {issue.issue} for field '{issue.field}'
                    </span>
                  </div>
                ))}
                {dataQuality.issues.length > 5 && (
                  <div className="text-xs text-gray-500 dark:text-gray-500 pl-5">
                    ... and {dataQuality.issues.length - 5} more issues
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <Database className="w-8 h-8 text-cyan-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Data Normalization Engine
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Standardize data from various security tools into a unified format
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
              
              <button
                onClick={createNewTemplate}
                className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Template
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
              Loading normalization engine...
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6">
            {/* Sidebar - Template List */}
            <div className="col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="font-semibold text-gray-900 dark:text-white">Normalization Templates</h2>
                </div>
                <div className="p-2">
                  {templates.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
                      No templates yet. Create your first one!
                    </p>
                  ) : (
                    templates.map(template => {
                      const dataType = dataTypes.find(dt => dt.id === template.dataType);
                      const Icon = dataType?.icon || Database;
                      
                      return (
                        <button
                          key={template.id}
                          onClick={() => setActiveTemplate(template)}
                          className={`w-full text-left px-3 py-2 rounded-lg mb-1 transition-colors ${
                            activeTemplate?.id === template.id
                              ? 'bg-cyan-50 text-cyan-700 dark:bg-cyan-900 dark:text-cyan-300'
                              : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <Icon className={`w-4 h-4 text-${dataType?.color || 'gray'}-500`} />
                            <div className="flex-1">
                              <div className="font-medium">{template.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {template.dataType} • {template.sourceFormat}
                              </div>
                            </div>
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="col-span-9">
              {activeTemplate ? (
                <div className="space-y-6">
                  {/* Template Configuration */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Template Configuration</h3>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Template Name
                        </label>
                        <input
                          type="text"
                          value={activeTemplate.name}
                          onChange={(e) => updateTemplate({ name: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Data Type
                        </label>
                        <select
                          value={activeTemplate.dataType}
                          onChange={(e) => updateTemplate({ dataType: e.target.value, mappings: [] })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                        >
                          {dataTypes.map(type => (
                            <option key={type.id} value={type.id}>{type.name}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Source Format
                        </label>
                        <select
                          value={activeTemplate.sourceFormat}
                          onChange={(e) => updateTemplate({ sourceFormat: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-cyan-500 dark:bg-gray-700 dark:text-white"
                        >
                          {formats.map(format => (
                            <option key={format} value={format}>{format}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Field Requirements */}
                    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 mb-6">
                      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Required Fields for {activeTemplate.dataType}</h4>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        {(standardFields[activeTemplate.dataType as keyof typeof standardFields] || []).map(field => (
                          <div key={field.field} className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${field.required ? 'bg-red-500' : 'bg-gray-300 dark:bg-gray-600'}`} />
                            <span className="font-mono">{field.field}</span>
                            <span className="text-gray-500 dark:text-gray-400">({field.type})</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Field Mappings */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Field Mappings</h4>
                        <button
                          onClick={addMapping}
                          className="flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300"
                        >
                          <Plus className="w-4 h-4" />
                          Add Mapping
                        </button>
                      </div>
                      
                      {activeTemplate.mappings?.length === 0 ? (
                        <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-4">
                          No mappings configured. Add field mappings to normalize your data.
                        </p>
                      ) : (
                        activeTemplate.mappings?.map(mapping => (
                          <MappingEditor key={mapping.id} mapping={mapping} />
                        ))
                      )}
                    </div>
                  </div>

                  {/* Data Preview and Processing */}
                  <DataPreview />

                  {/* Bulk Processing */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        Bulk Processing
                      </h3>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={bulkMode}
                          onChange={(e) => setBulkMode(e.target.checked)}
                          className="rounded text-cyan-600"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">Enable Bulk Mode</span>
                      </label>
                    </div>

                    {bulkMode && (
                      <div>
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                          <input
                            type="file"
                            multiple
                            accept=".json,.csv,.xml,.txt"
                            onChange={(e) => setBulkFiles(Array.from(e.target.files || []))}
                            className="hidden"
                            id="bulk-upload"
                          />
                          <label htmlFor="bulk-upload" className="cursor-pointer">
                            <FileUp className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Drop files here or click to upload
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                              Supports JSON, CSV, XML, and Syslog files
                            </p>
                          </label>
                        </div>

                        {bulkFiles.length > 0 && (
                          <div className="mt-4">
                            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Files to Process</h4>
                            <div className="space-y-2">
                              {bulkFiles.map((file, index) => (
                                <div key={index} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 rounded">
                                  <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gray-500" />
                                    <span className="text-sm">{file.name}</span>
                                    <span className="text-xs text-gray-500">({(file.size / 1024).toFixed(1)} KB)</span>
                                  </div>
                                  <button
                                    onClick={() => setBulkFiles(bulkFiles.filter((_, i) => i !== index))}
                                    className="text-gray-400 hover:text-red-500"
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              ))}
                            </div>
                            <button
                              onClick={() => {
                                setIsProcessing(true);
                                setTimeout(() => {
                                  setIsProcessing(false);
                                  setExportHistory([
                                    ...exportHistory,
                                    {
                                      id: Date.now(),
                                      timestamp: new Date().toISOString(),
                                      files: bulkFiles.length,
                                      records: Math.floor(Math.random() * 1000) + 100,
                                      template: activeTemplate.name
                                    }
                                  ]);
                                }, 2000);
                              }}
                              className="mt-3 w-full py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                            >
                              Process All Files
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Process Data</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          Transform your source data using the configured mappings
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        {isSaving && (
                          <span className="text-sm text-gray-500 flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Saving...
                          </span>
                        )}
                        <button
                          onClick={() => deleteTemplate(activeTemplate.id)}
                          className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 dark:border-red-700 dark:text-red-400 dark:hover:bg-red-900/20"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete Template
                        </button>
                        <button
                          onClick={processData}
                          disabled={isProcessing || !sourceData || activeTemplate.mappings?.length === 0}
                          className="flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isProcessing ? (
                            <Loader className="w-4 h-4 animate-spin" />
                          ) : (
                            <RefreshCw className="w-4 h-4" />
                          )}
                          Process Data
                        </button>
                        {normalizedData && (
                          <button
                            onClick={() => {
                              const blob = new Blob([normalizedData], { type: 'application/json' });
                              const url = window.URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `normalized-${activeTemplate.dataType}-${Date.now()}.json`;
                              a.click();
                            }}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <Download className="w-4 h-4" />
                            Export
                          </button>
                        )}
                      </div>
                    </div>
                    
                    {validationErrors.length > 0 && (
                      <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                        <div className="flex items-center gap-2 text-red-700 dark:text-red-300">
                          <AlertCircle className="w-4 h-4" />
                          <span className="font-medium">Validation Errors</span>
                        </div>
                        <ul className="mt-2 text-sm text-red-600 dark:text-red-400 space-y-1">
                          {validationErrors.map((error, index) => (
                            <li key={index}>{error.message}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-12">
                  <div className="text-center">
                    <Database className="w-16 h-16 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Select or create a normalization template
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Standardize data from various security tools into a unified format
                    </p>
                    <button
                      onClick={createNewTemplate}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700"
                    >
                      <Plus className="w-4 h-4" />
                      Create Your First Template
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center text-sm text-gray-600 dark:text-gray-400">
            <span>Tool ID: data-normalization-engine</span>
            <span>© 2024 CyberCaution - Security Orchestration & Governance Platform</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DataNormalizationEngine;