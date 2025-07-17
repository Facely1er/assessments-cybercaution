// Update your existing CyberCaution configuration
window.CyberCautionConfig = {
    supabase: {
        url: 'https://YOUR_PROJECT_REF.supabase.co',
        anonKey: 'YOUR_ANON_KEY_HERE',
        tables: {
            // Existing tables
            riskAssessments: 'risk_assessments',
            mfaChecklists: 'mfa_checklists',
            assetInventories: 'asset_inventories',
            darkWebFindings: 'dark_web_findings',
            incidentResponseSessions: 'incident_response_sessions',
            
            // New Recovery Time Calculator tables
            recoveryTimeSessions: 'recovery_time_sessions',
            recoveryTimeBusinessData: 'recovery_time_business_data',
            recoveryTimeSystems: 'recovery_time_systems',
            recoveryTimeRequirements: 'recovery_time_requirements',
            recoveryTimeAnalysis: 'recovery_time_analysis',
            recoveryTimeAnalytics: 'recovery_time_analytics',
            recoveryTimeScenarios: 'recovery_time_scenarios'
        }
    },
    
    // Add Recovery Time Calculator specific settings
    tools: {
        // Existing tool configs...
        
        recoveryTimeCalculator: {
            version: '1.0',
            autoSaveInterval: 30000, // 30 seconds
            maxAnalyses: 50,
            defaultCurrency: 'USD',
            frameworks: ['NIST SP 800-34', 'NIST CSF', 'ISO 22301'],
            exportFormats: ['json', 'pdf', 'xlsx'],
            calculationMethods: ['business_impact', 'system_complexity', 'data_size']
        }
    }
};