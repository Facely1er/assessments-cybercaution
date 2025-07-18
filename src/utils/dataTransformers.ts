// utils/dataTransformers.ts

export interface SecurityEvent {
  id: string;
  timestamp: Date;
  source: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  metadata?: Record<string, any>;
}

export interface RiskMetric {
  category: string;
  score: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  factors: string[];
}

export interface ComplianceData {
  framework: string;
  controls: {
    id: string;
    name: string;
    status: 'implemented' | 'partial' | 'not_implemented';
    evidence?: string[];
  }[];
  overallScore: number;
}

/**
 * Transform raw SIEM data into standardized security events
 */
export const transformSIEMData = (rawData: any): SecurityEvent[] => {
  // Handle different SIEM formats (Splunk, QRadar, etc.)
  if (Array.isArray(rawData)) {
    return rawData.map(event => ({
      id: event._id || event.id || `event-${Date.now()}-${Math.random()}`,
      timestamp: new Date(event.timestamp || event._time || event.date),
      source: event.source || event.sourcetype || 'unknown',
      type: event.eventtype || event.category || 'general',
      severity: normalizeSeverity(event.severity || event.priority || event.level),
      title: event.title || event.name || event.signature || 'Security Event',
      description: event.description || event.message || event.raw || '',
      metadata: event.metadata || event.fields || {}
    }));
  }
  
  // Handle single event
  return [{
    id: rawData.id || `event-${Date.now()}`,
    timestamp: new Date(rawData.timestamp || Date.now()),
    source: rawData.source || 'unknown',
    type: rawData.type || 'general',
    severity: normalizeSeverity(rawData.severity),
    title: rawData.title || 'Security Event',
    description: rawData.description || '',
    metadata: rawData.metadata || {}
  }];
};

/**
 * Transform EDR data into standardized format
 */
export const transformEDRData = (rawData: any): {
  endpoints: Array<{
    id: string;
    hostname: string;
    status: 'online' | 'offline' | 'isolated';
    lastSeen: Date;
    threats: number;
    os: string;
    agent: string;
  }>;
  incidents: SecurityEvent[];
} => {
  const endpoints = rawData.endpoints || rawData.devices || [];
  const incidents = rawData.incidents || rawData.detections || [];
  
  return {
    endpoints: endpoints.map((endpoint: any) => ({
      id: endpoint.id || endpoint.device_id,
      hostname: endpoint.hostname || endpoint.computer_name || endpoint.name,
      status: normalizeEndpointStatus(endpoint.status || endpoint.state),
      lastSeen: new Date(endpoint.last_seen || endpoint.lastContact || Date.now()),
      threats: endpoint.threat_count || endpoint.incidents || 0,
      os: endpoint.os || endpoint.platform || 'unknown',
      agent: endpoint.agent_version || endpoint.sensor_version || 'unknown'
    })),
    incidents: transformSIEMData(incidents)
  };
};

/**
 * Calculate risk scores from multiple data sources
 */
export const calculateRiskScore = (data: {
  vulnerabilities?: any[];
  incidents?: SecurityEvent[];
  configurations?: any[];
  threatIntel?: any[];
}): RiskMetric[] => {
  const metrics: RiskMetric[] = [];
  
  // Vulnerability risk
  if (data.vulnerabilities) {
    const criticalVulns = data.vulnerabilities.filter(v => 
      v.severity === 'critical' || v.cvss_score >= 9
    ).length;
    const highVulns = data.vulnerabilities.filter(v => 
      v.severity === 'high' || (v.cvss_score >= 7 && v.cvss_score < 9)
    ).length;
    
    metrics.push({
      category: 'Vulnerability',
      score: Math.min(100, criticalVulns * 20 + highVulns * 10),
      trend: 'stable', // Would need historical data for real trend
      factors: [
        `${criticalVulns} critical vulnerabilities`,
        `${highVulns} high vulnerabilities`
      ]
    });
  }
  
  // Incident risk
  if (data.incidents) {
    const recentIncidents = data.incidents.filter(i => 
      new Date(i.timestamp) > new Date(Date.now() - 24 * 60 * 60 * 1000)
    );
    const criticalIncidents = recentIncidents.filter(i => i.severity === 'critical').length;
    
    metrics.push({
      category: 'Active Threats',
      score: Math.min(100, criticalIncidents * 25 + recentIncidents.length * 5),
      trend: recentIncidents.length > 10 ? 'increasing' : 'stable',
      factors: [
        `${recentIncidents.length} incidents in last 24h`,
        `${criticalIncidents} critical severity`
      ]
    });
  }
  
  // Configuration risk
  if (data.configurations) {
    const misconfigurations = data.configurations.filter(c => 
      c.compliant === false || c.status === 'failed'
    ).length;
    
    metrics.push({
      category: 'Configuration',
      score: Math.min(100, misconfigurations * 15),
      trend: 'stable',
      factors: [`${misconfigurations} misconfigurations detected`]
    });
  }
  
  return metrics;
};

/**
 * Transform compliance scan results into standardized format
 */
export const transformComplianceData = (
  framework: string,
  scanResults: any
): ComplianceData => {
  const controls = scanResults.controls || scanResults.requirements || [];
  
  const transformedControls = controls.map((control: any) => ({
    id: control.id || control.control_id || control.requirement,
    name: control.name || control.title || control.description,
    status: normalizeComplianceStatus(control.status || control.result),
    evidence: control.evidence || control.artifacts || []
  }));
  
  const implementedCount = transformedControls.filter(
    (c: any) => c.status === 'implemented'
  ).length;
  const overallScore = Math.round((implementedCount / transformedControls.length) * 100);
  
  return {
    framework,
    controls: transformedControls,
    overallScore
  };
};

/**
 * Aggregate metrics from multiple data sources
 */
export const aggregateSecurityMetrics = (dataSources: Array<{
  type: string;
  data: any;
}>): {
  summary: {
    totalEvents: number;
    criticalFindings: number;
    riskScore: number;
    trendsUp: string[];
    trendsDown: string[];
  };
  timeline: Array<{
    timestamp: Date;
    count: number;
    severity: string;
  }>;
} => {
  let totalEvents = 0;
  let criticalFindings = 0;
  const timeline: any[] = [];
  
  dataSources.forEach(source => {
    if (source.type === 'siem' || source.type === 'events') {
      const events = transformSIEMData(source.data);
      totalEvents += events.length;
      criticalFindings += events.filter(e => e.severity === 'critical').length;
      
      // Add to timeline
      events.forEach(event => {
        timeline.push({
          timestamp: event.timestamp,
          count: 1,
          severity: event.severity
        });
      });
    }
  });
  
  // Calculate overall risk score
  const riskMetrics = calculateRiskScore({
    incidents: timeline
  });
  const riskScore = Math.round(
    riskMetrics.reduce((sum, m) => sum + m.score, 0) / riskMetrics.length
  );
  
  return {
    summary: {
      totalEvents,
      crit