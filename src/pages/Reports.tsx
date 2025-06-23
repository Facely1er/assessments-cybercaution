import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileText, Download, Settings, Printer, BarChart3, Filter, Search, Clock, Calendar } from 'lucide-react';

const Reports = () => {
  const [activeTab, setActiveTab] = useState('all');
  
  const reportTemplates = [
    { id: 'risk-register', name: 'Risk Register', description: 'Complete list of all identified risks with details', type: 'standard' },
    { id: 'executive-summary', name: 'Executive Summary', description: 'High-level overview of risk posture for executives', type: 'standard' },
    { id: 'compliance-status', name: 'Compliance Status', description: 'Status of compliance with regulatory frameworks', type: 'standard' },
    { id: 'risk-assessment', name: 'Risk Assessment', description: 'Detailed analysis of risk assessment results', type: 'standard' },
    { id: 'treatment-plan', name: 'Risk Treatment Plan', description: 'Plan for treating and mitigating identified risks', type: 'standard' },
    { id: 'incident-report', name: 'Incident Report', description: 'Report on security incidents and response actions', type: 'standard' },
    { id: 'audit-report', name: 'Audit Report', description: 'Results of internal or external security audits', type: 'advanced' },
    { id: 'metrics-dashboard', name: 'Risk Metrics Dashboard', description: 'Visual dashboard of key risk metrics', type: 'advanced' },
    { id: 'trend-analysis', name: 'Risk Trend Analysis', description: 'Analysis of risk trends over time', type: 'advanced' },
    { id: 'control-effectiveness', name: 'Control Effectiveness', description: 'Assessment of security control effectiveness', type: 'advanced' },
  ];

  const recentReports = [
    { id: 'report-1', name: 'Q1 2025 Risk Register', date: '2025-03-15', type: 'Risk Register', format: 'PDF', size: '2.4 MB' },
    { id: 'report-2', name: 'ISO 27001 Compliance Status', date: '2025-03-10', type: 'Compliance Status', format: 'XLSX', size: '1.8 MB' },
    { id: 'report-3', name: 'Executive Summary - March 2025', date: '2025-03-08', type: 'Executive Summary', format: 'PDF', size: '1.2 MB' },
    { id: 'report-4', name: 'GDPR Compliance Assessment', date: '2025-03-01', type: 'Compliance Status', format: 'DOCX', size: '3.1 MB' },
    { id: 'report-5', name: 'Risk Treatment Progress Report', date: '2025-02-25', type: 'Risk Treatment Plan', format: 'PDF', size: '1.7 MB' },
    { id: 'report-6', name: 'Security Control Assessment Results', date: '2025-02-20', type: 'Control Effectiveness', format: 'PDF', size: '2.2 MB' },
  ];

  const schedules = [
    { id: 'schedule-1', name: 'Monthly Risk Register', schedule: 'Monthly (1st)', lastRun: '2025-03-01', nextRun: '2025-04-01', type: 'Risk Register' },
    { id: 'schedule-2', name: 'Quarterly Executive Summary', schedule: 'Quarterly', lastRun: '2025-01-01', nextRun: '2025-04-01', type: 'Executive Summary' },
    { id: 'schedule-3', name: 'Weekly Metrics Dashboard', schedule: 'Weekly (Monday)', lastRun: '2025-03-18', nextRun: '2025-03-25', type: 'Risk Metrics Dashboard' },
  ];

  const filteredTemplates = activeTab === 'all' 
    ? reportTemplates 
    : reportTemplates.filter(template => template.type === activeTab);

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-muted-foreground">Generate, schedule, and manage reports for your risk management program</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            New Report
          </Button>
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure
          </Button>
        </div>
      </div>

      {/* Recent Reports Card */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Recently generated reports that are available for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              placeholder="Search reports..."
              className="block w-full rounded-md border-border bg-background pl-10 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary mb-4"
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted/30">
                  <th className="text-left py-2 px-4 text-sm font-medium">Report Name</th>
                  <th className="text-left py-2 px-4 text-sm font-medium">Date</th>
                  <th className="text-left py-2 px-4 text-sm font-medium">Type</th>
                  <th className="text-left py-2 px-4 text-sm font-medium">Format</th>
                  <th className="text-left py-2 px-4 text-sm font-medium">Size</th>
                  <th className="text-left py-2 px-4 text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentReports.map((report) => (
                  <tr key={report.id} className="border-b border-border hover:bg-muted/20">
                    <td className="py-3 px-4 text-sm">{report.name}</td>
                    <td className="py-3 px-4 text-sm">{report.date}</td>
                    <td className="py-3 px-4 text-sm">{report.type}</td>
                    <td className="py-3 px-4 text-sm">{report.format}</td>
                    <td className="py-3 px-4 text-sm">{report.size}</td>
                    <td className="py-3 px-4 text-sm">
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Printer className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <div>
        <h2 className="text-xl font-bold mb-4">Report Templates</h2>
        
        <div className="flex border-b border-border mb-4">
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'all' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('all')}
          >
            All Templates
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'standard' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('standard')}
          >
            Standard Reports
          </button>
          <button
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === 'advanced' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'
            }`}
            onClick={() => setActiveTab('advanced')}
          >
            Advanced Analytics
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTemplates.map((template) => (
            <Card key={template.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <div className="rounded-full p-2 bg-primary/10">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  {template.type === 'advanced' && (
                    <span className="bg-secondary/10 text-secondary text-xs rounded-full px-2 py-1">
                      Advanced
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                <div className="flex space-x-2">
                  <Button size="sm">Generate</Button>
                  <Button size="sm" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Scheduled Reports */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Scheduled Reports
          </CardTitle>
          <CardDescription>Automatically generated reports on a schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h3 className="font-medium mb-1">{schedule.name}</h3>
                  <div className="flex text-xs text-muted-foreground">
                    <div className="flex items-center mr-4">
                      <Filter className="h-3 w-3 mr-1" />
                      {schedule.type}
                    </div>
                    <div className="flex items-center mr-4">
                      <Calendar className="h-3 w-3 mr-1" />
                      {schedule.schedule}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Next: {schedule.nextRun}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">Edit</Button>
                  <Button size="sm" variant="ghost">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            
            <Button variant="outline" className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule New Report
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Formats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6 text-center">
            <div className="rounded-full p-3 bg-primary/10 mx-auto mb-4 w-12 h-12 flex items-center justify-center">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-1">PDF Reports</h3>
            <p className="text-xs text-muted-foreground">Formatted documents for sharing and printing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="rounded-full p-3 bg-secondary/10 mx-auto mb-4 w-12 h-12 flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="font-medium mb-1">Excel Export</h3>
            <p className="text-xs text-muted-foreground">Spreadsheets for data analysis and manipulation</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="rounded-full p-3 bg-accent/10 mx-auto mb-4 w-12 h-12 flex items-center justify-center">
              <div className="h-6 w-6 text-accent flex items-center justify-center font-bold">
                CSV
              </div>
            </div>
            <h3 className="font-medium mb-1">CSV Data</h3>
            <p className="text-xs text-muted-foreground">Raw data for import into other systems</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6 text-center">
            <div className="rounded-full p-3 bg-success/10 mx-auto mb-4 w-12 h-12 flex items-center justify-center">
              <div className="h-6 w-6 text-success flex items-center justify-center font-bold">
                API
              </div>
            </div>
            <h3 className="font-medium mb-1">API Access</h3>
            <p className="text-xs text-muted-foreground">Direct data access for system integration</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;