import React, { useState } from 'react';
import { useDocuments } from '../context/DocumentContext';
import { Document } from '../types';
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
  AlertCircle 
} from 'lucide-react';

const Documents = () => {
  const { documents, searchDocuments } = useDocuments();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    category: '',
  });

  const filteredDocuments = searchQuery || filters.type || filters.status || filters.category
    ? searchDocuments(searchQuery, {
        ...(filters.type ? { type: filters.type as Document['type'] } : {}),
        ...(filters.status ? { status: filters.status as Document['status'] } : {}),
        ...(filters.category ? { category: filters.category } : {}),
      })
    : documents;

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'Draft':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case 'In Review':
        return <AlertCircle className="h-4 w-4 text-warning" />;
      case 'Approved':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'Archived':
        return <FileText className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Document Repository</h1>
          <p className="text-muted-foreground">Manage and organize your compliance documentation</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Document
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search documents..."
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
                <option value="Policy">Policy</option>
                <option value="Procedure">Procedure</option>
                <option value="Evidence">Evidence</option>
                <option value="Report">Report</option>
                <option value="Template">Template</option>
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
                <option value="Draft">Draft</option>
                <option value="In Review">In Review</option>
                <option value="Approved">Approved</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                value={filters.category}
                onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
                className="block w-full rounded-md border-border bg-background py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Categories</option>
                <option value="Security">Security</option>
                <option value="Privacy">Privacy</option>
                <option value="Compliance">Compliance</option>
                <option value="Operations">Operations</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="rounded-lg p-2 bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(document.status)}
                  <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                    {document.status}
                  </span>
                </div>
              </div>
              
              <h3 className="text-lg font-medium mb-1">{document.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {document.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {document.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-muted px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="grid grid-cols-2 gap-y-2 text-xs text-muted-foreground mb-4">
                <div>Type: <span className="font-medium">{document.type}</span></div>
                <div>Version: <span className="font-medium">{document.version}</span></div>
                <div>Category: <span className="font-medium">{document.category}</span></div>
                <div>Updated: <span className="font-medium">
                  {new Date(document.updatedAt).toLocaleDateString()}
                </span></div>
              </div>
              
              <div className="flex justify-between items-center">
                <Button variant="outline" size="sm">View Details</Button>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No documents found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Documents;