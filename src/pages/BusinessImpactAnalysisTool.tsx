import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  BarChart3, 
  FileText, 
  ArrowRight, 
  Building2, 
  TrendingDown, 
  Clock, 
  DollarSign, 
  Users, 
  Shield, 
  Download, 
  Save, 
  Trash2,
  PlusCircle,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  HelpCircle,
  ArrowLeft,
  Link2,
  Search
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from '../components/ui/Toaster';

// Define types for the impact analysis
type CriticalFunction = {
  id: string;
  name: string;
  description: string;
  owner: string;
  category: 'Revenue Generation' | 'Operations' | 'Customer Service' | 'Administrative';
  impactLevel: 'Critical' | 'High' | 'Medium' | 'Low';
  mtd: number; // Maximum Tolerable Downtime in hours
  rto: number; // Recovery Time Objective in hours
  rpo: number; // Recovery Point Objective in hours
  dependencies: string[];
  financialImpact: {
    daily: number;
    weekly: number;
    monthly: number;
  };
};

const BusinessImpactAnalysisTool = () => {
  const [functions, setFunctions] = useState<CriticalFunction[]>([
    {
      id: '1',
      name: 'Customer Order Processing',
      description: 'Handles all customer orders and payment processing',
      owner: 'Sales Department',
      category: 'Revenue Generation',
      impactLevel: 'Critical',
      mtd: 4,
      rto: 2,
      rpo: 1,
      dependencies: ['CRM System', 'Payment Gateway', 'Inventory System'],
      financialImpact: {
        daily: 50000,
        weekly: 350000,
        monthly: 1500000
      }
    },
    {
      id: '2',
      name: 'Customer Support Systems',
      description: 'Provides customer service and support functionality',
      owner: 'Customer Success',
      category: 'Customer Service',
      impactLevel: 'High',
      mtd: 12,
      rto: 8,
      rpo: 4,
      dependencies: ['CRM System', 'Knowledge Base', 'Email System'],
      financialImpact: {
        daily: 25000,
        weekly: 175000,
        monthly: 750000
      }
    },
    {
      id: '3',
      name: 'Inventory Management',
      description: 'Tracks inventory levels and manages stock',
      owner: 'Operations',
      category: 'Operations',
      impactLevel: 'High',
      mtd: 24,
      rto: 12,
      rpo: 6,
      dependencies: ['Warehouse System', 'ERP System', 'Supplier Portal'],
      financialImpact: {
        daily: 30000,
        weekly: 210000,
        monthly: 900000
      }
    }
  ]);

  const [showNewFunctionForm, setShowNewFunctionForm] = useState(false);
  const [editFunction, setEditFunction] = useState<CriticalFunction | null>(null);
  const [newFunction, setNewFunction] = useState<Partial<CriticalFunction>>({
    name: '',
    description: '',
    owner: '',
    category: 'Operations',
    impactLevel: 'Medium',
    mtd: 24,
    rto: 12,
    rpo: 6,
    dependencies: [],
    financialImpact: {
      daily: 0,
      weekly: 0,
      monthly: 0
    }
  });

  const [sortBy, setSortBy] = useState<keyof CriticalFunction>('impactLevel');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filterBy, setFilterBy] = useState<string>('');
  
  const totalDailyImpact = functions.reduce((sum, func) => sum + func.financialImpact.daily, 0);

  const handleSort = (key: keyof CriticalFunction) => {
    if (sortBy === key) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortDirection('asc');
    }
  };

  const sortedFunctions = [...functions].sort((a, b) => {
    // For impact level sorting
    if (sortBy === 'impactLevel') {
      const impactOrder = { 'Critical': 0, 'High': 1, 'Medium': 2, 'Low': 3 };
      const aValue = impactOrder[a.impactLevel];
      const bValue = impactOrder[b.impactLevel];
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    // For MTD, RTO, RPO sorting
    if (sortBy === 'mtd' || sortBy === 'rto' || sortBy === 'rpo') {
      return sortDirection === 'asc' 
        ? a[sortBy] - b[sortBy] 
        : b[sortBy] - a[sortBy];
    }
    
    // For other string-based columns
    const aValue = String(a[sortBy] || '');
    const bValue = String(b[sortBy] || '');
    return sortDirection === 'asc' 
      ? aValue.localeCompare(bValue) 
      : bValue.localeCompare(aValue);
  });

  const filteredFunctions = filterBy 
    ? sortedFunctions.filter(f => 
        f.name.toLowerCase().includes(filterBy.toLowerCase()) || 
        f.description.toLowerCase().includes(filterBy.toLowerCase()) ||
        f.owner.toLowerCase().includes(filterBy.toLowerCase()) ||
        f.category.toLowerCase().includes(filterBy.toLowerCase()) ||
        f.impactLevel.toLowerCase().includes(filterBy.toLowerCase())
      )
    : sortedFunctions;

  const handleAddFunction = () => {
    if (!newFunction.name || !newFunction.owner) {
      toast.error('Required fields missing', 'Please complete all required fields');
      return;
    }
    
    const newId = (Math.max(...functions.map(f => parseInt(f.id)), 0) + 1).toString();
    
    setFunctions([
      ...functions,
      {
        ...newFunction as CriticalFunction,
        id: newId,
        dependencies: newFunction.dependencies || [],
        financialImpact: {
          daily: newFunction.financialImpact?.daily || 0,
          weekly: newFunction.financialImpact?.weekly || 0,
          monthly: newFunction.financialImpact?.monthly || 0
        }
      }
    ]);
    
    setShowNewFunctionForm(false);
    setNewFunction({
      name: '',
      description: '',
      owner: '',
      category: 'Operations',
      impactLevel: 'Medium',
      mtd: 24,
      rto: 12,
      rpo: 6,
      dependencies: [],
      financialImpact: {
        daily: 0,
        weekly: 0,
        monthly: 0
      }
    });
    
    toast.success('Business function added', 'The critical business function has been added to the analysis');
  };

  const handleEditFunction = () => {
    if (!editFunction) return;
    
    setFunctions(functions.map(f => 
      f.id === editFunction.id ? editFunction : f
    ));
    
    setEditFunction(null);
    toast.success('Business function updated', 'The critical business function has been updated');
  };

  const handleDeleteFunction = (id: string) => {
    setFunctions(functions.filter(f => f.id !== id));
    toast.success('Business function removed', 'The function has been removed from the analysis');
  };

  const handleDependencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dependencies = e.target.value.split(',').map(d => d.trim()).filter(d => d);
    if (editFunction) {
      setEditFunction({...editFunction, dependencies});
    } else {
      setNewFunction({...newFunction, dependencies});
    }
  };

  const getImpactLevelClassName = (level: string) => {
    switch(level) {
      case 'Critical':
        return 'bg-critical-red/10 text-critical-red';
      case 'High':
        return 'bg-warning-amber/10 text-warning-amber';
      case 'Medium':
        return 'bg-electric-blue/10 text-electric-blue';
      case 'Low':
        return 'bg-secure-green/10 text-secure-green';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const handleGenerateReport = () => {
    toast.success('Report generated', 'Your Business Impact Analysis report has been generated');
  };

  const handleSaveAnalysis = () => {
    toast.success('Analysis saved', 'Your Business Impact Analysis has been saved');
  };

  const FunctionForm = ({ isEdit = false }: { isEdit?: boolean }) => {
    const formData = isEdit ? editFunction : newFunction;
    const setFormData = isEdit 
      ? (data: Partial<CriticalFunction>) => setEditFunction({...editFunction!, ...data})
      : setNewFunction;
    
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Name*</label>
            <input 
              type="text"
              value={formData?.name || ''}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full rounded-md border-border bg-background p-2 text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Owner*</label>
            <input 
              type="text"
              value={formData?.owner || ''}
              onChange={(e) => setFormData({...formData, owner: e.target.value})}
              className="w-full rounded-md border-border bg-background p-2 text-sm"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea 
            value={formData?.description || ''}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full rounded-md border-border bg-background p-2 text-sm"
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <select
              value={formData?.category || 'Operations'}
              onChange={(e) => setFormData({...formData, category: e.target.value as any})}
              className="w-full rounded-md border-border bg-background p-2 text-sm"
            >
              <option value="Revenue Generation">Revenue Generation</option>
              <option value="Operations">Operations</option>
              <option value="Customer Service">Customer Service</option>
              <option value="Administrative">Administrative</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Impact Level</label>
            <select
              value={formData?.impactLevel || 'Medium'}
              onChange={(e) => setFormData({...formData, impactLevel: e.target.value as any})}
              className="w-full rounded-md border-border bg-background p-2 text-sm"
            >
              <option value="Critical">Critical</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Maximum Tolerable Downtime (hours)</label>
            <input 
              type="number"
              min="0"
              value={formData?.mtd || 0}
              onChange={(e) => setFormData({...formData, mtd: parseInt(e.target.value)})}
              className="w-full rounded-md border-border bg-background p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Recovery Time Objective (hours)</label>
            <input 
              type="number"
              min="0"
              value={formData?.rto || 0}
              onChange={(e) => setFormData({...formData, rto: parseInt(e.target.value)})}
              className="w-full rounded-md border-border bg-background p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Recovery Point Objective (hours)</label>
            <input 
              type="number"
              min="0"
              value={formData?.rpo || 0}
              onChange={(e) => setFormData({...formData, rpo: parseInt(e.target.value)})}
              className="w-full rounded-md border-border bg-background p-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Dependencies (comma-separated)</label>
          <input 
            type="text"
            value={formData?.dependencies?.join(', ') || ''}
            onChange={handleDependencyChange}
            className="w-full rounded-md border-border bg-background p-2 text-sm"
            placeholder="CRM System, Network, Database, etc."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Financial Impact (Daily $)</label>
            <input 
              type="number"
              min="0"
              value={formData?.financialImpact?.daily || 0}
              onChange={(e) => setFormData({
                ...formData, 
                financialImpact: {
                  ...formData?.financialImpact as any,
                  daily: parseInt(e.target.value),
                  weekly: parseInt(e.target.value) * 7,
                  monthly: parseInt(e.target.value) * 30
                }
              })}
              className="w-full rounded-md border-border bg-background p-2 text-sm"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Financial Impact (Weekly $)</label>
            <input 
              type="number"
              min="0"
              value={formData?.financialImpact?.weekly || 0}
              onChange={(e) => setFormData({
                ...formData, 
                financialImpact: {
                  ...formData?.financialImpact as any,
                  weekly: parseInt(e.target.value)
                }
              })}
              className="w-full rounded-md border-border bg-background p-2 text-sm"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Financial Impact (Monthly $)</label>
            <input 
              type="number"
              min="0"
              value={formData?.financialImpact?.monthly || 0}
              onChange={(e) => setFormData({
                ...formData, 
                financialImpact: {
                  ...formData?.financialImpact as any,
                  monthly: parseInt(e.target.value)
                }
              })}
              className="w-full rounded-md border-border bg-background p-2 text-sm"
              disabled
            />
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-6">
          <Button 
            variant="outline"
            onClick={() => isEdit ? setEditFunction(null) : setShowNewFunctionForm(false)}
          >
            Cancel
          </Button>
          <Button 
            variant="orange"
            onClick={isEdit ? handleEditFunction : handleAddFunction}
          >
            {isEdit ? 'Update Function' : 'Add Function'}
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <Link to="/app/business-impact" className="inline-flex items-center text-foreground hover:text-orange-500 transition-colors mb-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Business Impact
          </Link>
          <h1 className="text-2xl font-bold">Business Impact Analysis Tool</h1>
          <p className="text-muted-foreground">Evaluate ransomware impact on critical business functions</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="orange" onClick={handleGenerateReport}>
            <FileText className="mr-2 h-4 w-4" />
            Generate Report
          </Button>
          <Button variant="outline" onClick={handleSaveAnalysis}>
            <Save className="mr-2 h-4 w-4" />
            Save Analysis
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Critical Functions</p>
                <h3 className="text-3xl font-bold">{functions.filter(f => f.impactLevel === 'Critical').length}</h3>
                <p className="text-xs text-muted-foreground">Of {functions.length} total functions</p>
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
                <p className="text-sm font-medium text-muted-foreground">Daily Impact</p>
                <h3 className="text-3xl font-bold">${totalDailyImpact.toLocaleString()}</h3>
                <p className="text-xs text-muted-foreground">Estimated financial loss</p>
              </div>
              <div className="rounded-full p-3 bg-warning-amber/10 text-warning-amber">
                <DollarSign className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Recovery Time</p>
                <h3 className="text-3xl font-bold">
                  {Math.round(functions.reduce((sum, f) => sum + f.rto, 0) / functions.length)}h
                </h3>
                <p className="text-xs text-muted-foreground">Average RTO</p>
              </div>
              <div className="rounded-full p-3 bg-electric-blue/10 text-electric-blue">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Dependencies</p>
                <h3 className="text-3xl font-bold">
                  {new Set(functions.flatMap(f => f.dependencies)).size}
                </h3>
                <p className="text-xs text-muted-foreground">Unique systems/services</p>
              </div>
              <div className="rounded-full p-3 bg-secure-green/10 text-secure-green">
                <Link2 className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tool Introduction */}
      <Card>
        <CardHeader>
          <CardTitle>Business Impact Analysis Tool</CardTitle>
          <CardDescription>
            Analyze and document the impact of ransomware on critical business functions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <p className="text-muted-foreground mb-4">
              This tool helps you identify and document the potential impact of ransomware attacks on your critical 
              business functions. By analyzing recovery time objectives (RTO), recovery point objectives (RPO), 
              and financial impact, you can prioritize recovery efforts and make informed decisions about 
              investments in ransomware defense measures.
            </p>
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="flex items-start">
                <HelpCircle className="h-5 w-5 text-[#FF6B00] mr-3 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium mb-1">How to use this tool</h3>
                  <ol className="list-decimal list-inside text-sm text-muted-foreground space-y-1">
                    <li>Identify critical business functions that could be impacted by ransomware</li>
                    <li>Document their recovery requirements (MTD, RTO, RPO) and financial impact</li>
                    <li>Identify and document dependencies for each function</li>
                    <li>Prioritize recovery based on impact levels and financial consequences</li>
                    <li>Generate a report to inform your ransomware readiness planning</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Functions List */}
      <Card>
        <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle>Critical Business Functions</CardTitle>
            <CardDescription>
              Functions essential to your business operations
            </CardDescription>
          </div>
          <Button 
            variant="orange" 
            onClick={() => setShowNewFunctionForm(true)}
            className="mt-4 sm:mt-0"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Function
          </Button>
        </CardHeader>
        <CardContent>
          {/* Filter row */}
          <div className="mb-4 flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search functions..."
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-border rounded-md"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>
          </div>
          
          {showNewFunctionForm && (
            <Card className="mb-6 border-[#FF6B00]">
              <CardHeader>
                <CardTitle>Add New Business Function</CardTitle>
              </CardHeader>
              <CardContent>
                <FunctionForm />
              </CardContent>
            </Card>
          )}
          
          {editFunction && (
            <Card className="mb-6 border-[#FF6B00]">
              <CardHeader>
                <CardTitle>Edit Business Function</CardTitle>
              </CardHeader>
              <CardContent>
                <FunctionForm isEdit />
              </CardContent>
            </Card>
          )}
          
          {/* Functions table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/50">
                  <th className="p-2 text-left font-medium text-muted-foreground text-sm cursor-pointer" 
                      onClick={() => handleSort('name')}>
                    Name
                  </th>
                  <th className="p-2 text-left font-medium text-muted-foreground text-sm cursor-pointer" 
                      onClick={() => handleSort('category')}>
                    Category
                  </th>
                  <th className="p-2 text-left font-medium text-muted-foreground text-sm cursor-pointer" 
                      onClick={() => handleSort('impactLevel')}>
                    Impact
                  </th>
                  <th className="p-2 text-left font-medium text-muted-foreground text-sm cursor-pointer" 
                      onClick={() => handleSort('mtd')}>
                    MTD (h)
                  </th>
                  <th className="p-2 text-left font-medium text-muted-foreground text-sm cursor-pointer" 
                      onClick={() => handleSort('rto')}>
                    RTO (h)
                  </th>
                  <th className="p-2 text-left font-medium text-muted-foreground text-sm">
                    Financial Impact
                  </th>
                  <th className="p-2 text-left font-medium text-muted-foreground text-sm">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredFunctions.map((func) => (
                  <tr key={func.id} className="border-b border-border hover:bg-muted/20">
                    <td className="p-2 align-top">
                      <div>
                        <div className="font-medium">{func.name}</div>
                        <div className="text-sm text-muted-foreground">{func.owner}</div>
                      </div>
                    </td>
                    <td className="p-2">{func.category}</td>
                    <td className="p-2">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getImpactLevelClassName(func.impactLevel)}`}>
                        {func.impactLevel}
                      </span>
                    </td>
                    <td className="p-2">{func.mtd}</td>
                    <td className="p-2">{func.rto}</td>
                    <td className="p-2">
                      <div className="text-muted-foreground text-sm">
                        <div>${func.financialImpact.daily.toLocaleString()} / day</div>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setEditFunction(func)}
                        >
                          Edit
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleDeleteFunction(func.id)}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredFunctions.length === 0 && (
                  <tr>
                    <td colSpan={7} className="p-4 text-center text-muted-foreground">
                      No functions found. Add a critical business function to begin your analysis.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {functions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Impact Analysis Results</CardTitle>
            <CardDescription>
              Summary of financial and operational impacts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Financial Impact Summary */}
              <div>
                <h3 className="text-lg font-medium mb-4">Financial Impact</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="h-8 w-8 mx-auto mb-2 text-warning-amber" />
                      <div className="text-2xl font-bold">${totalDailyImpact.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Daily Impact</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="h-8 w-8 mx-auto mb-2 text-warning-amber" />
                      <div className="text-2xl font-bold">${(totalDailyImpact * 7).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Weekly Impact</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <DollarSign className="h-8 w-8 mx-auto mb-2 text-warning-amber" />
                      <div className="text-2xl font-bold">${(totalDailyImpact * 30).toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Monthly Impact</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Recovery Time Summary */}
              <div>
                <h3 className="text-lg font-medium mb-4">Recovery Time Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Recovery Time Objectives (RTO)</h4>
                      <div className="space-y-3">
                        {['Critical', 'High', 'Medium', 'Low'].map(impact => {
                          const funcsByImpact = functions.filter(f => f.impactLevel === impact);
                          if (funcsByImpact.length === 0) return null;
                          
                          const avgRTO = Math.round(funcsByImpact.reduce((sum, f) => sum + f.rto, 0) / funcsByImpact.length);
                          
                          return (
                            <div key={impact}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">
                                  {impact} Impact Functions
                                </span>
                                <span className="text-sm font-medium">
                                  {avgRTO}h average
                                </span>
                              </div>
                              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-2 rounded-full ${
                                    impact === 'Critical' ? 'bg-critical-red' :
                                    impact === 'High' ? 'bg-warning-amber' :
                                    impact === 'Medium' ? 'bg-electric-blue' :
                                    'bg-secure-green'
                                  }`}
                                  style={{ width: `${Math.min(100, (avgRTO / 48) * 100)}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-3">Maximum Tolerable Downtime (MTD)</h4>
                      <div className="space-y-3">
                        {['Critical', 'High', 'Medium', 'Low'].map(impact => {
                          const funcsByImpact = functions.filter(f => f.impactLevel === impact);
                          if (funcsByImpact.length === 0) return null;
                          
                          const avgMTD = Math.round(funcsByImpact.reduce((sum, f) => sum + f.mtd, 0) / funcsByImpact.length);
                          
                          return (
                            <div key={impact}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">
                                  {impact} Impact Functions
                                </span>
                                <span className="text-sm font-medium">
                                  {avgMTD}h average
                                </span>
                              </div>
                              <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                                <div 
                                  className={`h-2 rounded-full ${
                                    impact === 'Critical' ? 'bg-critical-red' :
                                    impact === 'High' ? 'bg-warning-amber' :
                                    impact === 'Medium' ? 'bg-electric-blue' :
                                    'bg-secure-green'
                                  }`}
                                  style={{ width: `${Math.min(100, (avgMTD / 72) * 100)}%` }}
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              {/* Dependencies Analysis */}
              <div>
                <h3 className="text-lg font-medium mb-4">Critical Dependencies</h3>
                <div className="bg-muted/30 rounded-lg p-4">
                  <div className="mb-4">
                    <p className="text-muted-foreground text-sm">
                      The following systems and services are critical dependencies that support multiple business functions.
                      Protecting these dependencies should be prioritized in your ransomware defense strategy.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {Array.from(new Set(functions.flatMap(f => f.dependencies)))
                      .map(dep => ({
                        name: dep,
                        count: functions.filter(f => f.dependencies.includes(dep)).length,
                        criticalCount: functions.filter(f => f.dependencies.includes(dep) && f.impactLevel === 'Critical').length
                      }))
                      .sort((a, b) => b.count - a.count)
                      .slice(0, 9)
                      .map((dep, index) => (
                        <div key={index} className="border border-border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div className="font-medium">{dep.name}</div>
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              dep.criticalCount > 0 ? 'bg-critical-red/10 text-critical-red' : 'bg-muted text-muted-foreground'
                            }`}>
                              {dep.count} functions
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Supports {dep.criticalCount} critical function{dep.criticalCount !== 1 ? 's' : ''}
                          </div>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
            
            {/* Analysis Actions */}
            <div className="flex justify-between mt-8">
              <Button variant="outline" onClick={handleSaveAnalysis}>
                <Save className="mr-2 h-4 w-4" />
                Save Analysis
              </Button>
              <Button variant="orange" onClick={handleGenerateReport}>
                <FileText className="mr-2 h-4 w-4" />
                Generate Detailed Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Recommendations */}
      {functions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
            <CardDescription>
              Based on your business impact analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-critical-red/5 border border-critical-red/20">
                <div className="flex items-start">
                  <AlertTriangle className="h-5 w-5 text-critical-red mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Prioritize Backup Strategy for Critical Functions</h3>
                    <p className="text-sm text-muted-foreground">
                      Your critical functions have an average RTO of {
                        Math.round(
                          functions
                            .filter(f => f.impactLevel === 'Critical')
                            .reduce((sum, f) => sum + f.rto, 0) / 
                            Math.max(1, functions.filter(f => f.impactLevel === 'Critical').length)
                        )
                      } hours. 
                      Ensure your backup and recovery strategy can meet these RTOs by implementing more frequent 
                      backups and testing restoration procedures regularly.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-warning-amber/5 border border-warning-amber/20">
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-warning-amber mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Develop Ransomware-Specific Recovery Procedures</h3>
                    <p className="text-sm text-muted-foreground">
                      The estimated daily financial impact of ${totalDailyImpact.toLocaleString()} necessitates 
                      specific recovery procedures for ransomware incidents. Create detailed, step-by-step recovery 
                      procedures that can be followed by IT staff during a ransomware incident.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 rounded-lg bg-secure-green/5 border border-secure-green/20">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-secure-green mr-3 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium mb-1">Protect Critical Dependencies</h3>
                    <p className="text-sm text-muted-foreground">
                      Focus ransomware protection measures on the systems and services identified as critical dependencies. 
                      Implement additional security controls, monitoring, and backup strategies for these systems to 
                      minimize the risk of widespread business disruption.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <Button variant="orange" onClick={handleGenerateReport}>
                <Shield className="mr-2 h-4 w-4" />
                Generate Comprehensive Recommendations
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BusinessImpactAnalysisTool;