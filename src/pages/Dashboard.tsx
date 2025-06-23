import React from 'react';
import { useRisk } from '../context/RiskContext';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { RiskCategory, RiskSeverity, RiskStatus } from '../types';
import { AlertTriangle, CheckCircle, Clock, Bookmark } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';

const Dashboard = () => {
  const { dashboardMetrics } = useRisk();

  // Format data for charts
  const categoryData = Object.entries(dashboardMetrics.risksByCategory).map(([category, count]) => ({
    name: category,
    value: count
  })).filter(item => item.value > 0);

  const severityData = Object.entries(dashboardMetrics.risksBySeverity).map(([severity, count]) => ({
    name: severity,
    value: count
  })).filter(item => item.value > 0);

  const statusData = Object.entries(dashboardMetrics.risksByStatus).map(([status, count]) => ({
    name: status.replace(/([A-Z])/g, ' $1').trim(), // Add spaces before capital letters
    value: count
  })).filter(item => item.value > 0);

  // Colors for pie charts
  const SEVERITY_COLORS = {
    [RiskSeverity.VeryLow]: '#84CC16',
    [RiskSeverity.Low]: '#84CC16',
    [RiskSeverity.Medium]: '#F59E0B',
    [RiskSeverity.High]: '#F59E0B',
    [RiskSeverity.VeryHigh]: '#EF4444',
    [RiskSeverity.Critical]: '#EF4444',
  };

  const CATEGORY_COLORS = {
    [RiskCategory.Strategic]: '#2563EB',
    [RiskCategory.Operational]: '#3B82F6',
    [RiskCategory.Financial]: '#60A5FA',
    [RiskCategory.Compliance]: '#93C5FD',
    [RiskCategory.Reputational]: '#BFDBFE',
    [RiskCategory.Technology]: '#2563EB',
    [RiskCategory.Legal]: '#1E3A8A',
    [RiskCategory.Environmental]: '#3B82F6',
    [RiskCategory.People]: '#60A5FA',
    [RiskCategory.Other]: '#93C5FD',
  };

  const STATUS_COLORS = {
    [RiskStatus.New]: '#2563EB',
    [RiskStatus.Assessed]: '#3B82F6',
    [RiskStatus.InTreatment]: '#F59E0B',
    [RiskStatus.Mitigated]: '#84CC16',
    [RiskStatus.Accepted]: '#F59E0B',
    [RiskStatus.Transferred]: '#6B7280',
    [RiskStatus.Closed]: '#27272A',
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-2xl font-bold">Risk Management Dashboard</h1>
          <p className="text-muted-foreground">Overview of your organization's risk posture</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button>Export Dashboard</Button>
          <Button variant="outline">Refresh Data</Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Risks</p>
                <h3 className="text-3xl font-bold">{dashboardMetrics.totalRisks}</h3>
              </div>
              <div className="rounded-full p-3 bg-electric-blue/10 text-electric-blue">
                <Bookmark className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Open Risks</p>
                <h3 className="text-3xl font-bold">{dashboardMetrics.openRisks}</h3>
              </div>
              <div className="rounded-full p-3 bg-warning-amber/10 text-warning-amber">
                <Clock className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-muted-foreground">High Severity</p>
                <h3 className="text-3xl font-bold">{dashboardMetrics.highSeverityRisks}</h3>
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
                <p className="text-sm font-medium text-muted-foreground">Mitigated Risks</p>
                <h3 className="text-3xl font-bold">{dashboardMetrics.mitigatedRisks}</h3>
              </div>
              <div className="rounded-full p-3 bg-secure-green/10 text-secure-green">
                <CheckCircle className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Risks by Severity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={severityData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {severityData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={SEVERITY_COLORS[entry.name as RiskSeverity] || '#6B7280'} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Risks by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                    nameKey="name"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    labelLine={false}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={CATEGORY_COLORS[entry.name as RiskCategory] || '#6B7280'} 
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Risks by Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={statusData}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 60, bottom: 5 }}
                >
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {statusData.map((entry, index) => {
                      const statusKey = Object.keys(RiskStatus).find(
                        key => RiskStatus[key as keyof typeof RiskStatus].replace(/([A-Z])/g, ' $1').trim() === entry.name
                      );
                      const color = statusKey ? STATUS_COLORS[RiskStatus[statusKey as keyof typeof RiskStatus]] : '#6B7280';
                      return <Cell key={`cell-${index}`} fill={color} />;
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trends and Top Risks Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Risk Trend Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={dashboardMetrics.risksOverTime}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Risks"
                    stroke="#2563EB"
                    strokeWidth={2}
                    dot={{ r: 4 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {dashboardMetrics.topRisks.map(risk => (
                <div key={risk.id} className="flex items-start space-x-4">
                  <div className={`mt-0.5 rounded-full p-1 ${
                    risk.severity === RiskSeverity.Critical || risk.severity === RiskSeverity.VeryHigh
                      ? 'bg-critical-red/10 text-critical-red'
                      : risk.severity === RiskSeverity.High
                      ? 'bg-warning-amber/10 text-warning-amber'
                      : 'bg-electric-blue/10 text-electric-blue'
                  }`}>
                    <AlertTriangle className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="text-sm font-medium">{risk.title}</h4>
                      <span className={`text-xs rounded-full px-2 py-0.5 ${
                        risk.severity === RiskSeverity.Critical
                          ? 'bg-critical-red/10 text-critical-red'
                          : risk.severity === RiskSeverity.VeryHigh
                          ? 'bg-critical-red/10 text-critical-red'
                          : risk.severity === RiskSeverity.High
                          ? 'bg-warning-amber/10 text-warning-amber'
                          : risk.severity === RiskSeverity.Medium
                          ? 'bg-warning-amber/10 text-warning-amber'
                          : 'bg-secure-green/10 text-secure-green'
                      }`}>
                        {risk.severity}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{risk.description.substring(0, 100)}...</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        Score: {risk.inherentRiskScore}
                      </span>
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {risk.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;