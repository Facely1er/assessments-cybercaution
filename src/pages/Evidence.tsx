import React, { useState } from 'react';
import { useDocuments } from '../context/DocumentContext';
import { Evidence as EvidenceType } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import {
  FileText, 
  Plus, 
  Filter, 
  Search, 
  Download, 
  Trash2, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Upload 
} from 'lucide-react';

const Evidence = () => {
  const { evidences } = useDocuments();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
  });

  const filteredEvidences = evidences.filter(evidence => {
    const matchesSearch = searchQuery.toLowerCase().split(' ').every(term =>
      evidence.title.toLowerCase().includes(term) ||
      evidence.description.toLowerCase().includes(term)
    );

    const matchesType = !filters.type || evidence.type === filters.type;
    const matchesStatus = !filters.status || evidence.status === filters.status;

    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusIcon = (status: EvidenceType['status']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'Approved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'Rejected':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'Expired':
        return <Clock className="h-4 w-4 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: EvidenceType['status']) => {
    switch (status) {
      case 'Pending':
        return 'bg-warning/10 text-warning';
      case 'Approved':
        return 'bg-success/10 text-success';
      case 'Rejected':
        return 'bg-destructive/10 text-destructive';
      case 'Expired':
        return 'bg-destructive/10 text-destructive';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Evidence Repository</h1>
          <p className="text-muted-foreground">Manage and track compliance evidence artifacts</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Upload className="mr-2 h-4 w-4" />
            Upload Evidence
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search evidence..."
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
                <option value="Document">Document</option>
                <option value="Screenshot">Screenshot</option>
                <option value="Log">Log</option>
                <option value="Report">Report</option>
                <option value="Certification">Certification</option>
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
                <option value="Pending">Pending</option>
                <option value="Approved">Approved</option>
                <option value="Rejected">Rejected</option>
                <option value="Expired">Expired</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Evidence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredEvidences.map((evidence) => (
          <Card key={evidence.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="rounded-lg p-2 bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(evidence.status)}
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(evidence.status)}`}>
                    {evidence.status}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-1">{evidence.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {evidence.description}
              </p>
              
              <div className="grid grid-cols-2 gap-y-2 text-xs text-muted-foreground mb-4">
                <div>Type: <span className="font-medium">{evidence.type || 'N/A'}</span></div>
                <div>Collected: <span className="font-medium">
                  {new Date(evidence.collectionDate || evidence.collectedAt).toLocaleDateString()}
                </span></div>
                <div>Controls: <span className="font-medium">{evidence.controls ? evidence.controls.length : 0}</span></div>
                <div>Requirements: <span className="font-medium">{evidence.requirements ? evidence.requirements.length : 0}</span></div>
              </div>

              {evidence.validUntil && (
                <div className="mb-4 text-xs">
                  <div className={`px-2 py-1 rounded ${
                    new Date(evidence.validUntil) < new Date() 
                      ? 'bg-destructive/10 text-destructive'
                      : 'bg-warning/10 text-warning'
                  }`}>
                    Valid until: {new Date(evidence.validUntil).toLocaleDateString()}
                  </div>
                </div>
              )}
              
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">View Details</Button>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => {}}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive" onClick={() => {}}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvidences.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No evidence found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Evidence;