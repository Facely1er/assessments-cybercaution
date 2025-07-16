// =====================================================
// SUPABASE INTEGRATION HOOKS FOR CYBERSECURITY TOOLS
// File: hooks/useSupabase.js
// =====================================================

import { createClient } from '@supabase/supabase-js';
import { useState, useEffect, useCallback } from 'react';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generate unique session ID
const generateSessionId = () => {
  return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// =====================================================
// NIST CSF TOOLKIT HOOK
// =====================================================
export const useNistCsfAssessment = (sessionId = null) => {
  const [currentSessionId] = useState(sessionId || generateSessionId());
  const [assessment, setAssessment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load existing assessment
  const loadAssessment = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('nist_csf_assessments')
        .select('*')
        .eq('session_id', currentSessionId)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      setAssessment(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [currentSessionId]);

  // Save assessment data
  const saveAssessment = useCallback(async (assessmentData) => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        session_id: currentSessionId,
        organization_name: assessmentData.organizationName,
        industry: assessmentData.industry,
        assessment_data: assessmentData.responses || {},
        maturity_scores: assessmentData.maturityScores || {},
        overall_score: assessmentData.overallScore || 0,
        implementation_tier: assessmentData.implementationTier || 1,
        recommendations: assessmentData.recommendations || [],
        completed_functions: assessmentData.completedFunctions || [],
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('nist_csf_assessments')
        .upsert(payload, { 
          onConflict: 'session_id',
          returning: 'minimal'
        });

      if (error) throw error;

      // Log analytics
      await logToolUsage('NIST CSF Toolkit', 'assessment_saved', currentSessionId, assessmentData.organizationName);

      setAssessment({ ...assessment, ...payload });
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [currentSessionId, assessment]);

  // Generate report
  const generateReport = useCallback(async (reportData) => {
    try {
      await logToolUsage('NIST CSF Toolkit', 'report_generated', currentSessionId, reportData.organizationName);
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }, [currentSessionId]);

  useEffect(() => {
    loadAssessment();
  }, [loadAssessment]);

  return {
    sessionId: currentSessionId,
    assessment,
    loading,
    error,
    saveAssessment,
    loadAssessment,
    generateReport
  };
};

// =====================================================
// VENDOR SECURITY SCORECARD HOOK
// =====================================================
export const useVendorScorecard = (sessionId = null) => {
  const [currentSessionId] = useState(sessionId || generateSessionId());
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all vendors for session
  const loadVendors = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vendor_assessments')
        .select('*')
        .eq('session_id', currentSessionId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setVendors(data || []);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [currentSessionId]);

  // Save vendor assessment
  const saveVendorAssessment = useCallback(async (vendorData) => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        session_id: currentSessionId,
        vendor_name: vendorData.vendorName,
        vendor_category: vendorData.category,
        criticality: vendorData.criticality,
        overall_score: vendorData.overallScore,
        risk_level: vendorData.riskLevel,
        assessment_responses: vendorData.responses || {},
        category_scores: vendorData.categoryScores || {},
        assessment_data: vendorData.assessmentData || {},
        status: vendorData.status || 'Active',
        last_assessed: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('vendor_assessments')
        .upsert(payload, { 
          onConflict: 'session_id,vendor_name',
          returning: 'minimal'
        });

      if (error) throw error;

      // Log analytics
      await logToolUsage('Vendor Security Scorecard', 'vendor_assessed', currentSessionId, vendorData.vendorName);

      // Refresh vendors list
      await loadVendors();
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [currentSessionId, loadVendors]);

  // Delete vendor
  const deleteVendor = useCallback(async (vendorName) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('vendor_assessments')
        .delete()
        .eq('session_id', currentSessionId)
        .eq('vendor_name', vendorName);

      if (error) throw error;

      await logToolUsage('Vendor Security Scorecard', 'vendor_deleted', currentSessionId, vendorName);
      await loadVendors();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [currentSessionId, loadVendors]);

  // Get vendor risk summary
  const getVendorRiskSummary = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('vendor_risk_summary')
        .select('*')
        .eq('session_id', currentSessionId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data;
    } catch (err) {
      return null;
    }
  }, [currentSessionId]);

  useEffect(() => {
    loadVendors();
  }, [loadVendors]);

  return {
    sessionId: currentSessionId,
    vendors,
    loading,
    error,
    saveVendorAssessment,
    deleteVendor,
    loadVendors,
    getVendorRiskSummary
  };
};

// =====================================================
// BUSINESS IMPACT CALCULATOR HOOK
// =====================================================
export const useBusinessImpactCalculator = (sessionId = null) => {
  const [currentSessionId] = useState(sessionId || generateSessionId());
  const [scenarios, setScenarios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Load all scenarios for session
  const loadScenarios = useCallback(async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('business_impact_scenarios')
        .select('*')
        .eq('session_id', currentSessionId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setScenarios(data || []);
      return data;
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  }, [currentSessionId]);

  // Save impact scenario
  const saveScenario = useCallback(async (scenarioData) => {
    try {
      setLoading(true);
      setError(null);

      const payload = {
        session_id: currentSessionId,
        scenario_name: scenarioData.scenarioName,
        company_info: scenarioData.companyInfo || {},
        incident_parameters: scenarioData.incidentParameters || {},
        financial_inputs: scenarioData.financialInputs || {},
        recovery_costs: scenarioData.recoveryCosts || {},
        business_metrics: scenarioData.businessMetrics || {},
        calculation_results: scenarioData.calculationResults || {},
        total_impact: scenarioData.totalImpact || 0,
        incident_type: scenarioData.incidentType,
        incident_duration: scenarioData.incidentDuration,
        customers_affected: scenarioData.customersAffected,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('business_impact_scenarios')
        .upsert(payload, { 
          onConflict: 'session_id,scenario_name',
          returning: 'minimal'
        });

      if (error) throw error;

      // Log analytics
      await logToolUsage('Business Impact Calculator', 'scenario_saved', currentSessionId, scenarioData.scenarioName);

      // Refresh scenarios list
      await loadScenarios();
      return { success: true, data };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [currentSessionId, loadScenarios]);

  // Delete scenario
  const deleteScenario = useCallback(async (scenarioName) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from('business_impact_scenarios')
        .delete()
        .eq('session_id', currentSessionId)
        .eq('scenario_name', scenarioName);

      if (error) throw error;

      await logToolUsage('Business Impact Calculator', 'scenario_deleted', currentSessionId, scenarioName);
      await loadScenarios();
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  }, [currentSessionId, loadScenarios]);

  useEffect(() => {
    loadScenarios();
  }, [loadScenarios]);

  return {
    sessionId: currentSessionId,
    scenarios,
    loading,
    error,
    saveScenario,
    deleteScenario,
    loadScenarios
  };
};

// =====================================================
// ANALYTICS HELPER
// =====================================================
const logToolUsage = async (toolName, action, sessionId, organizationName = null, metadata = {}) => {
  try {
    const { error } = await supabase
      .from('toolkit_usage_analytics')
      .insert({
        tool_name: toolName,
        action: action,
        session_id: sessionId,
        organization_name: organizationName,
        metadata: metadata,
        timestamp: new Date().toISOString()
      });

    if (error) console.warn('Analytics logging failed:', error);
  } catch (err) {
    console.warn('Analytics logging failed:', err);
  }
};

// =====================================================
// DASHBOARD ANALYTICS HOOK
// =====================================================
export const useToolkitAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadAnalytics = useCallback(async () => {
    try {
      setLoading(true);
      
      // Get dashboard stats
      const { data: dashboardStats, error: dashboardError } = await supabase
        .from('toolkit_dashboard_stats')
        .select('*');

      if (dashboardError) throw dashboardError;

      // Get recent activity
      const { data: recentActivity, error: activityError } = await supabase
        .from('toolkit_usage_analytics')
        .select('*')
        .order('timestamp', { ascending: false })
        .limit(50);

      if (activityError) throw activityError;

      setAnalytics({
        dashboardStats: dashboardStats || [],
        recentActivity: recentActivity || []
      });

      return { dashboardStats, recentActivity };
    } catch (err) {
      console.error('Failed to load analytics:', err);
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAnalytics();
  }, [loadAnalytics]);

  return {
    analytics,
    loading,
    loadAnalytics
  };
};

// =====================================================
// QUERY HELPERS
// =====================================================
export const useSupabaseQuery = (table, query = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const executeQuery = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      let queryBuilder = supabase.from(table).select('*');

      // Apply filters
      Object.entries(query).forEach(([key, value]) => {
        if (key === 'limit') {
          queryBuilder = queryBuilder.limit(value);
        } else if (key === 'order') {
          queryBuilder = queryBuilder.order(value.column, { ascending: value.ascending || false });
        } else {
          queryBuilder = queryBuilder.eq(key, value);
        }
      });

      const { data: result, error: queryError } = await queryBuilder;

      if (queryError) throw queryError;

      setData(result);
      return result;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [table, query]);

  useEffect(() => {
    executeQuery();
  }, [executeQuery]);

  return { data, loading, error, refetch: executeQuery };
};

export default {
  useNistCsfAssessment,
  useVendorScorecard,
  useBusinessImpactCalculator,
  useToolkitAnalytics,
  useSupabaseQuery,
  supabase
};