-- CyberCaution Platform - Row Level Security Policies (Non-conflicting)
-- This migration sets up RLS policies with cc_ prefix for secure multi-tenant access

-- Enable RLS on all cc_ tables
ALTER TABLE cc_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_assessment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_policy_acknowledgments ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_compliance_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE cc_integration_events ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to avoid conflicts)
DROP POLICY IF EXISTS "Users can view their organization" ON cc_organizations;
DROP POLICY IF EXISTS "Admins can update their organization" ON cc_organizations;
DROP POLICY IF EXISTS "Users can view their own profile" ON cc_user_profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON cc_user_profiles;
DROP POLICY IF EXISTS "Users can view profiles in their organization" ON cc_user_profiles;
DROP POLICY IF EXISTS "Admins can manage user profiles" ON cc_user_profiles;

-- Organizations policies
CREATE POLICY "cc_users_can_view_their_organization" ON cc_organizations
    FOR SELECT USING (
        id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "cc_admins_can_update_their_organization" ON cc_organizations
    FOR UPDATE USING (
        id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- User profiles policies
CREATE POLICY "cc_users_can_view_their_own_profile" ON cc_user_profiles
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "cc_users_can_update_their_own_profile" ON cc_user_profiles
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "cc_users_can_view_profiles_in_their_organization" ON cc_user_profiles
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "cc_admins_can_manage_user_profiles" ON cc_user_profiles
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Assessment submissions policies
CREATE POLICY "cc_users_can_view_their_own_assessments" ON cc_assessment_submissions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "cc_users_can_create_assessments" ON cc_assessment_submissions
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "cc_users_can_update_their_own_assessments" ON cc_assessment_submissions
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "cc_security_analysts_can_view_org_assessments" ON cc_assessment_submissions
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'security_analyst')
        )
    );

-- Integrations policies
CREATE POLICY "cc_users_can_view_org_integrations" ON cc_integrations
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "cc_security_analysts_can_manage_integrations" ON cc_integrations
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'security_analyst')
        )
    );

-- Workflows policies
CREATE POLICY "cc_users_can_view_org_workflows" ON cc_workflows
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "cc_security_analysts_can_manage_workflows" ON cc_workflows
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'security_analyst')
        )
    );

-- Workflow executions policies
CREATE POLICY "cc_users_can_view_org_workflow_executions" ON cc_workflow_executions
    FOR SELECT USING (
        workflow_id IN (
            SELECT id FROM cc_workflows WHERE organization_id IN (
                SELECT organization_id FROM cc_user_profiles 
                WHERE id = auth.uid()
            )
        )
    );

-- Policies policies
CREATE POLICY "cc_users_can_view_org_policies" ON cc_policies
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "cc_compliance_officers_can_manage_policies" ON cc_policies
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'compliance_officer')
        )
    );

-- Policy acknowledgments policies
CREATE POLICY "cc_users_can_view_their_acknowledgments" ON cc_policy_acknowledgments
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "cc_users_can_acknowledge_policies" ON cc_policy_acknowledgments
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "cc_compliance_officers_can_view_all_acknowledgments" ON cc_policy_acknowledgments
    FOR SELECT USING (
        policy_id IN (
            SELECT id FROM cc_policies WHERE organization_id IN (
                SELECT organization_id FROM cc_user_profiles 
                WHERE id = auth.uid() AND role IN ('admin', 'compliance_officer')
            )
        )
    );

-- Incidents policies
CREATE POLICY "cc_users_can_view_org_incidents" ON cc_incidents
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "cc_security_analysts_can_manage_incidents" ON cc_incidents
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'security_analyst')
        )
    );

-- Compliance mappings policies
CREATE POLICY "cc_users_can_view_org_compliance_mappings" ON cc_compliance_mappings
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "cc_compliance_officers_can_manage_mappings" ON cc_compliance_mappings
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'compliance_officer')
        )
    );

-- Audit logs policies
CREATE POLICY "cc_users_can_view_org_audit_logs" ON cc_audit_logs
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM cc_user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "cc_system_can_insert_audit_logs" ON cc_audit_logs
    FOR INSERT WITH CHECK (true);

-- Integration events policies
CREATE POLICY "cc_users_can_view_org_integration_events" ON cc_integration_events
    FOR SELECT USING (
        integration_id IN (
            SELECT id FROM cc_integrations WHERE organization_id IN (
                SELECT organization_id FROM cc_user_profiles 
                WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "cc_system_can_insert_integration_events" ON cc_integration_events
    FOR INSERT WITH CHECK (true);

-- Create helper functions with cc_ prefix
CREATE OR REPLACE FUNCTION cc_get_user_organization()
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT organization_id FROM cc_user_profiles 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION cc_user_has_role(required_role cc_user_role)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role = required_role FROM cc_user_profiles 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION cc_user_has_any_role(required_roles cc_user_role[])
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role = ANY(required_roles) FROM cc_user_profiles 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;