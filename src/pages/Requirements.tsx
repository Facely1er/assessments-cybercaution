import React, { useState } from 'react';
import { useDocuments } from '../context/DocumentContext';
import { Requirement } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { 
  Plus, 
  Filter, 
  Search, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  XCircle,
  FileText,
  Link,
  Calendar,
  User
} from 'lucide-react';

const Requirements = () => {
  const { requirements, evidences } = useDocuments();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    priority: '',
  });

  const filteredRequirements = requirements.filter(requirement => {
    const matchesSearch = searchQuery.toLowerCase().split(' ').every(term =>
      requirement.title.toLowerCase().includes(term) ||
      requirement.description.toLowerCase().includes(term) ||
      requirement.code.toLowerCase().includes(term)
    );

    const matchesType = !filters.type || requirement.type === filters.type;
    const matchesStatus = !filters.status || requirement.status === filters.status;
    const matchesPriority = !filters.priority || requirement.priority === filters.priority;

    return matchesSearch && matchesType && matchesStatus && matchesPriority;
  });

  const getStatusIcon = (status: Requirement['status']) => {
    switch (status) {
      case 'Not Started':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case 'In Progress':
        return <AlertTriangle className="h-4 w-4 text-warning" />;
      case 'Compliant':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'Non Compliant':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'Not Applicable':
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: Requirement['status']) => {
    switch (status) {
      case 'Not Started':
        return 'bg-muted text-muted-foreground';
      case 'In Progress':
        return 'bg-warning/10 text-warning';
      case 'Compliant':
        return 'bg-success/10 text-success';
      case 'Non Compliant':
        return 'bg-destructive/10 text-destructive';
      case 'Not Applicable':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority: Requirement['priority']) => {
    switch (priority) {
      case 'Critical':
        return 'bg-destructive/10 text-destructive';
      case 'High':
        return 'bg-warning/10 text-warning';
      case 'Medium':
        return 'bg-secondary/10 text-secondary';
      case 'Low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Requirements</h1>
          <p className="text-muted-foreground">Track and manage compliance requirements across frameworks</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Requirement
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Import
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search requirements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full rounded-md border-border bg-background pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filters.type}
                onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value }))}
                className="block w-full rounded-md border-border bg-background py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Types</option>
                <option value="Privacy">Privacy</option>
                <option value="Security">Security</option>
                <option value="Supply Chain">Supply Chain</option>
                <option value="Ransomware">Ransomware</option>
                <option value="CUI">CUI</option>
                <option value="Other">Other</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="block w-full rounded-md border-border bg-background py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Statuses</option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Compliant">Compliant</option>
                <option value="Non Compliant">Non Compliant</option>
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
                className="block w-full rounded-md border-border bg-background py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requirements List */}
      <div className="space-y-4">
        {filteredRequirements.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No requirements found matching your filters.</p>
          </div>
        ) : (
          filteredRequirements.map((requirement) => (
            <Card key={requirement.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-mono bg-muted px-2 py-0.5 rounded mr-2">
                        {requirement.code}
                      </span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(requirement.status)}`}>
                        {requirement.status}
                      </span>
                      <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${getPriorityColor(requirement.priority)}`}>
                        {requirement.priority}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-medium mb-2">{requirement.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{requirement.description}</p>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Assigned to:</span>
                        <span className="ml-1 font-medium">{requirement.owner}</span>
                      </div>
                      
                      {requirement.dueDate && (
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                          <span className="text-muted-foreground">Due:</span>
                          <span className="ml-1 font-medium">
                            {new Date(requirement.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center">
                        <Link className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Controls:</span>
                        <span className="ml-1 font-medium">{requirement.controls?.length || 0}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-muted-foreground">Evidence:</span>
                        <span className="ml-1 font-medium">{requirement.evidences?.length || 0}</span>
                      </div>
                    </div>

                    {/* This is where the error was happening - checking if dependencies exist first */}
                    {requirement.dependencies && requirement.dependencies.length > 0 && (
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground mb-1">Dependencies:</p>
                        <div className="flex flex-wrap gap-2">
                          {requirement.dependencies.map((dep, index) => (
                            <span key={index} className="text-xs bg-muted px-2 py-0.5 rounded">
                              {dep}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end gap-2">
                    <Button size="sm">View Details</Button>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Requirements;