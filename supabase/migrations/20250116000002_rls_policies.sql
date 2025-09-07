-- CyberCaution Platform - Row Level Security Policies
-- This migration sets up RLS policies for secure multi-tenant access

-- Enable RLS on all tables
ALTER TABLE organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE assessment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE workflow_executions ENABLE ROW LEVEL SECURITY;
ALTER TABLE policies ENABLE ROW LEVEL SECURITY;
ALTER TABLE policy_acknowledgments ENABLE ROW LEVEL SECURITY;
ALTER TABLE incidents ENABLE ROW LEVEL SECURITY;
ALTER TABLE compliance_mappings ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE integration_events ENABLE ROW LEVEL SECURITY;

-- Organizations policies
CREATE POLICY "Users can view their organization" ON organizations
    FOR SELECT USING (
        id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "Admins can update their organization" ON organizations
    FOR UPDATE USING (
        id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- User profiles policies
CREATE POLICY "Users can view their own profile" ON user_profiles
    FOR SELECT USING (id = auth.uid());

CREATE POLICY "Users can update their own profile" ON user_profiles
    FOR UPDATE USING (id = auth.uid());

CREATE POLICY "Users can view profiles in their organization" ON user_profiles
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "Admins can manage user profiles" ON user_profiles
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Assessment submissions policies
CREATE POLICY "Users can view their own assessments" ON assessment_submissions
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create assessments" ON assessment_submissions
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own assessments" ON assessment_submissions
    FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Security analysts can view org assessments" ON assessment_submissions
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'security_analyst')
        )
    );

-- Integrations policies
CREATE POLICY "Users can view org integrations" ON integrations
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "Security analysts can manage integrations" ON integrations
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'security_analyst')
        )
    );

-- Workflows policies
CREATE POLICY "Users can view org workflows" ON workflows
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "Security analysts can manage workflows" ON workflows
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'security_analyst')
        )
    );

-- Workflow executions policies
CREATE POLICY "Users can view org workflow executions" ON workflow_executions
    FOR SELECT USING (
        workflow_id IN (
            SELECT id FROM workflows WHERE organization_id IN (
                SELECT organization_id FROM user_profiles 
                WHERE id = auth.uid()
            )
        )
    );

-- Policies policies
CREATE POLICY "Users can view org policies" ON policies
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "Compliance officers can manage policies" ON policies
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'compliance_officer')
        )
    );

-- Policy acknowledgments policies
CREATE POLICY "Users can view their acknowledgments" ON policy_acknowledgments
    FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can acknowledge policies" ON policy_acknowledgments
    FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Compliance officers can view all acknowledgments" ON policy_acknowledgments
    FOR SELECT USING (
        policy_id IN (
            SELECT id FROM policies WHERE organization_id IN (
                SELECT organization_id FROM user_profiles 
                WHERE id = auth.uid() AND role IN ('admin', 'compliance_officer')
            )
        )
    );

-- Incidents policies
CREATE POLICY "Users can view org incidents" ON incidents
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "Security analysts can manage incidents" ON incidents
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'security_analyst')
        )
    );

-- Compliance mappings policies
CREATE POLICY "Users can view org compliance mappings" ON compliance_mappings
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "Compliance officers can manage mappings" ON compliance_mappings
    FOR ALL USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'compliance_officer')
        )
    );

-- Audit logs policies
CREATE POLICY "Users can view org audit logs" ON audit_logs
    FOR SELECT USING (
        organization_id IN (
            SELECT organization_id FROM user_profiles 
            WHERE id = auth.uid()
        )
    );

CREATE POLICY "System can insert audit logs" ON audit_logs
    FOR INSERT WITH CHECK (true);

-- Integration events policies
CREATE POLICY "Users can view org integration events" ON integration_events
    FOR SELECT USING (
        integration_id IN (
            SELECT id FROM integrations WHERE organization_id IN (
                SELECT organization_id FROM user_profiles 
                WHERE id = auth.uid()
            )
        )
    );

CREATE POLICY "System can insert integration events" ON integration_events
    FOR INSERT WITH CHECK (true);

-- Create a function to get user's organization
CREATE OR REPLACE FUNCTION get_user_organization()
RETURNS UUID AS $$
BEGIN
    RETURN (
        SELECT organization_id FROM user_profiles 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if user has role
CREATE OR REPLACE FUNCTION user_has_role(required_role user_role)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role = required_role FROM user_profiles 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a function to check if user has any of the roles
CREATE OR REPLACE FUNCTION user_has_any_role(required_roles user_role[])
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (
        SELECT role = ANY(required_roles) FROM user_profiles 
        WHERE id = auth.uid()
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;