import React, { useState } from 'react';
import { useRisk } from '../context/RiskContext';
import { RiskCategory, RiskStatus, RiskSeverity, Risk } from '../types';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { FilterX, Plus, FileText, Share2, Filter, Search, Download, ArrowRight } from 'lucide-react';

const RiskRegister: React.FC = () => {
  const { risks, filterRisks } = useRisk();
  
  const [filters, setFilters] = useState({
    category: '' as RiskCategory | '',
    status: '' as RiskStatus | '',
    severity: '' as RiskSeverity | '',
    search: '',
  });
  
  // Apply filters
  const filteredRisks = filters.category || filters.status || filters.severity || filters.search
    ? filterRisks({
        ...(filters.category ? { category: filters.category as RiskCategory } : {}),
        ...(filters.status ? { status: filters.status as RiskStatus } : {}),
        ...(filters.severity ? { severity: filters.severity as RiskSeverity } : {}),
        ...(filters.search ? { search: filters.search } : {}),
      })
    : risks;

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({
      ...prev,
      search: e.target.value,
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      status: '',
      severity: '',
      search: '',
    });
  };

  const getSeverityColor = (severity: RiskSeverity) => {
    switch (severity) {
      case RiskSeverity.Critical:
        return 'bg-destructive/10 text-destructive';
      case RiskSeverity.VeryHigh:
        return 'bg-destructive/10 text-destructive';
      case RiskSeverity.High:
        return 'bg-warning/10 text-warning';
      case RiskSeverity.Medium:
        return 'bg-warning/10 text-warning';
      case RiskSeverity.Low:
        return 'bg-success/10 text-success';
      case RiskSeverity.VeryLow:
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusColor = (status: RiskStatus) => {
    switch (status) {
      case RiskStatus.New:
        return 'bg-primary/10 text-primary';
      case RiskStatus.Assessed:
        return 'bg-secondary/10 text-secondary';
      case RiskStatus.InTreatment:
        return 'bg-warning/10 text-warning';
      case RiskStatus.Mitigated:
        return 'bg-success/10 text-success';
      case RiskStatus.Accepted:
        return 'bg-accent/10 text-accent';
      case RiskStatus.Transferred:
        return 'bg-muted text-muted-foreground';
      case RiskStatus.Closed:
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  // NIST CSF ID.RA mapping
  const getNistCsfMapping = (risk: Risk) => {
    // This is a simplified mapping - in a real app, this would be more sophisticated
    const mappings = [];
    
    if (risk.category === RiskCategory.Technology || risk.category === RiskCategory.SupplyChain) {
      mappings.push('ID.RA-1');
    }
    
    if (risk.severity === RiskSeverity.High || risk.severity === RiskSeverity.VeryHigh || risk.severity === RiskSeverity.Critical) {
      mappings.push('ID.RA-2');
    }
    
    if (risk.category === RiskCategory.Operational || risk.category === RiskCategory.Strategic) {
      mappings.push('ID.RA-3');
    }
    
    if (risk.category === RiskCategory.Compliance || risk.category === RiskCategory.Legal) {
      mappings.push('ID.RA-4');
    }
    
    if (risk.category === RiskCategory.Reputational) {
      mappings.push('ID.RA-5');
    }
    
    if (risk.status === RiskStatus.InTreatment || risk.status === RiskStatus.Mitigated) {
      mappings.push('ID.RA-6');
    }
    
    return mappings.length > 0 ? mappings : ['ID.RA-1']; // Default mapping if none match
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Ransomware Risk Register</h1>
          <p className="text-muted-foreground">Map and manage ransomware risks aligned with NIST CSF ID.RA controls</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Risk
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export Template
          </Button>
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Filters</CardTitle>
            {(filters.category || filters.status || filters.severity || filters.search) && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                <FilterX className="mr-2 h-4 w-4" />
                Clear Filters
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search risks..."
                value={filters.search}
                onChange={handleSearchChange}
                className="block w-full rounded-md border-border bg-background pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="block w-full rounded-md border-border bg-background py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Categories</option>
                {Object.values(RiskCategory).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="block w-full rounded-md border-border bg-background py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Statuses</option>
                {Object.values(RiskStatus).map((status) => (
                  <option key={status} value={status}>
                    {status.replace(/([A-Z])/g, ' $1').trim()}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <select
                name="severity"
                value={filters.severity}
                onChange={handleFilterChange}
                className="block w-full rounded-md border-border bg-background py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">All Severities</option>
                {Object.values(RiskSeverity).map((severity) => (
                  <option key={severity} value={severity}>
                    {severity}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NIST CSF ID.RA Mapping Guide */}
      <Card className="bg-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">NIST CSF ID.RA Control Mapping</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <p className="font-medium">ID.RA-1</p>
              <p className="text-muted-foreground">Asset vulnerabilities are identified and documented</p>
            </div>
            <div>
              <p className="font-medium">ID.RA-2</p>
              <p className="text-muted-foreground">Cyber threat intelligence is received from information sharing forums</p>
            </div>
            <div>
              <p className="font-medium">ID.RA-3</p>
              <p className="text-muted-foreground">Threats, both internal and external, are identified and documented</p>
            </div>
            <div>
              <p className="font-medium">ID.RA-4</p>
              <p className="text-muted-foreground">Potential business impacts and likelihoods are identified</p>
            </div>
            <div>
              <p className="font-medium">ID.RA-5</p>
              <p className="text-muted-foreground">Threats, vulnerabilities, likelihoods, and impacts are used to determine risk</p>
            </div>
            <div>
              <p className="font-medium">ID.RA-6</p>
              <p className="text-muted-foreground">Risk responses are identified and prioritized</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk List */}
      <div className="space-y-4">
        {filteredRisks.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No risks found matching your filters.</p>
          </div>
        ) : (
          filteredRisks.map((risk) => (
            <Card key={risk.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-medium">{risk.title}</h3>
                      <span className={`ml-3 text-xs rounded-full px-2 py-0.5 ${getSeverityColor(risk.severity)}`}>
                        {risk.severity}
                      </span>
                      <span className={`ml-2 text-xs rounded-full px-2 py-0.5 ${getStatusColor(risk.status)}`}>
                        {risk.status.replace(/([A-Z])/g, ' $1').trim()}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{risk.description}</p>
                    
                    {/* NIST CSF ID.RA Mapping */}
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground mb-1">NIST CSF Mapping:</p>
                      <div className="flex flex-wrap gap-2">
                        {getNistCsfMapping(risk).map((mapping, index) => (
                          <span key={index} className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                            {mapping}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-2 text-xs">
                      <div>
                        <span className="text-muted-foreground">Category:</span>
                        <span className="ml-1 font-medium">{risk.category}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Identified:</span>
                        <span className="ml-1 font-medium">
                          {new Date(risk.dateIdentified).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Owner:</span>
                        <span className="ml-1 font-medium capitalize">
                          {risk.owner.replace('user-', 'User ')}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Risk Score:</span>
                        <span className="ml-1 font-medium">{risk.inherentRiskScore}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0 md:ml-6 flex md:flex-col justify-end gap-2">
                    <Button size="sm">
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline">Edit</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <span className="font-medium">{filteredRisks.length}</span> of{' '}
          <span className="font-medium">{risks.length}</span> risks
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RiskRegister;