-- CyberCaution Platform - Initial Database Schema
-- This migration creates the complete database structure for production

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create custom types
CREATE TYPE user_role AS ENUM ('admin', 'security_analyst', 'compliance_officer', 'viewer');
CREATE TYPE assessment_status AS ENUM ('draft', 'in_progress', 'completed', 'archived');
CREATE TYPE integration_status AS ENUM ('connected', 'disconnected', 'error', 'pending', 'configuring');
CREATE TYPE workflow_status AS ENUM ('active', 'inactive', 'paused', 'error');
CREATE TYPE policy_status AS ENUM ('draft', 'review', 'approved', 'archived');
CREATE TYPE incident_severity AS ENUM ('low', 'medium', 'high', 'critical');

-- Organizations table
CREATE TABLE organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    domain VARCHAR(255) UNIQUE,
    industry VARCHAR(100),
    size_category VARCHAR(50), -- 'startup', 'small', 'medium', 'enterprise'
    compliance_frameworks TEXT[], -- Array of frameworks like ['NIST', 'ISO27001', 'SOC2']
    settings JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Users table (extends Supabase auth.users)
CREATE TABLE user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE SET NULL,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role user_role DEFAULT 'viewer',
    department VARCHAR(100),
    job_title VARCHAR(100),
    phone VARCHAR(20),
    avatar_url TEXT,
    preferences JSONB DEFAULT '{}',
    last_login TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment submissions table
CREATE TABLE assessment_submissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    assessment_type VARCHAR(100) NOT NULL, -- 'ransomware', 'supply_chain', 'zero_trust', etc.
    framework_name VARCHAR(100), -- 'NIST', 'ISO27001', etc.
    title VARCHAR(255) NOT NULL,
    status assessment_status DEFAULT 'draft',
    overall_score INTEGER CHECK (overall_score >= 0 AND overall_score <= 100),
    section_scores JSONB DEFAULT '[]', -- Array of section scores
    answers JSONB DEFAULT '{}', -- All assessment answers
    recommendations JSONB DEFAULT '[]', -- Generated recommendations
    metadata JSONB DEFAULT '{}', -- Additional assessment metadata
    completed_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Integrations table
CREATE TABLE integrations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'SIEM', 'EDR', 'SOAR', etc.
    vendor VARCHAR(100) NOT NULL,
    description TEXT,
    status integration_status DEFAULT 'pending',
    config JSONB DEFAULT '{}', -- Encrypted configuration
    version VARCHAR(50),
    supported_features TEXT[] DEFAULT '{}',
    required_permissions TEXT[] DEFAULT '{}',
    data_flow_direction VARCHAR(20) DEFAULT 'bidirectional',
    last_sync TIMESTAMP WITH TIME ZONE,
    last_error TEXT,
    health_score INTEGER CHECK (health_score >= 0 AND health_score <= 100),
    is_active BOOLEAN DEFAULT true,
    created_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workflows table
CREATE TABLE workflows (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100), -- 'incident_response', 'threat_detection', 'compliance', etc.
    status workflow_status DEFAULT 'inactive',
    definition JSONB NOT NULL, -- Workflow steps and logic
    triggers JSONB DEFAULT '[]', -- Event triggers
    actions JSONB DEFAULT '[]', -- Automated actions
    conditions JSONB DEFAULT '[]', -- Conditional logic
    execution_count INTEGER DEFAULT 0,
    success_count INTEGER DEFAULT 0,
    failure_count INTEGER DEFAULT 0,
    last_executed TIMESTAMP WITH TIME ZONE,
    is_template BOOLEAN DEFAULT false,
    created_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Workflow executions table
CREATE TABLE workflow_executions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    workflow_id UUID REFERENCES workflows(id) ON DELETE CASCADE,
    trigger_event JSONB NOT NULL,
    status VARCHAR(50) DEFAULT 'running', -- 'running', 'completed', 'failed', 'cancelled'
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    execution_log JSONB DEFAULT '[]',
    error_message TEXT,
    context JSONB DEFAULT '{}'
);

-- Policies table
CREATE TABLE policies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    status policy_status DEFAULT 'draft',
    version VARCHAR(20) DEFAULT '1.0',
    review_date DATE,
    approval_date DATE,
    owner_id UUID REFERENCES user_profiles(id),
    acknowledgments JSONB DEFAULT '[]', -- User acknowledgments
    compliance_frameworks TEXT[] DEFAULT '{}',
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Policy acknowledgments table
CREATE TABLE policy_acknowledgments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    policy_id UUID REFERENCES policies(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE CASCADE,
    acknowledged_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT,
    UNIQUE(policy_id, user_id)
);

-- Incidents table
CREATE TABLE incidents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    severity incident_severity DEFAULT 'medium',
    status VARCHAR(50) DEFAULT 'open', -- 'open', 'investigating', 'contained', 'resolved', 'closed'
    category VARCHAR(100), -- 'malware', 'phishing', 'data_breach', etc.
    source VARCHAR(100), -- 'SIEM', 'EDR', 'manual', etc.
    affected_assets TEXT[] DEFAULT '{}',
    assigned_to UUID REFERENCES user_profiles(id),
    workflow_id UUID REFERENCES workflows(id),
    timeline JSONB DEFAULT '[]',
    evidence JSONB DEFAULT '[]',
    resolution TEXT,
    lessons_learned TEXT,
    created_by UUID REFERENCES user_profiles(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    resolved_at TIMESTAMP WITH TIME ZONE
);

-- Compliance mappings table
CREATE TABLE compliance_mappings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    control_id VARCHAR(100) NOT NULL,
    control_name VARCHAR(255) NOT NULL,
    framework VARCHAR(100) NOT NULL, -- 'NIST', 'ISO27001', 'SOC2', etc.
    implementation_status VARCHAR(50) DEFAULT 'not_implemented', -- 'not_implemented', 'partial', 'implemented', 'not_applicable'
    evidence JSONB DEFAULT '[]',
    responsible_party UUID REFERENCES user_profiles(id),
    last_reviewed TIMESTAMP WITH TIME ZONE,
    next_review_due DATE,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Audit logs table
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization_id UUID REFERENCES organizations(id) ON DELETE CASCADE,
    user_id UUID REFERENCES user_profiles(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(100) NOT NULL,
    resource_id UUID,
    details JSONB DEFAULT '{}',
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Integration events table
CREATE TABLE integration_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    integration_id UUID REFERENCES integrations(id) ON DELETE CASCADE,
    event_type VARCHAR(50) NOT NULL, -- 'sync', 'error', 'warning', 'info'
    message TEXT NOT NULL,
    details JSONB DEFAULT '{}',
    severity VARCHAR(20) DEFAULT 'info', -- 'low', 'medium', 'high', 'critical'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_user_profiles_organization ON user_profiles(organization_id);
CREATE INDEX idx_user_profiles_email ON user_profiles(email);
CREATE INDEX idx_assessment_submissions_user ON assessment_submissions(user_id);
CREATE INDEX idx_assessment_submissions_org ON assessment_submissions(organization_id);
CREATE INDEX idx_assessment_submissions_type ON assessment_submissions(assessment_type);
CREATE INDEX idx_integrations_org ON integrations(organization_id);
CREATE INDEX idx_integrations_status ON integrations(status);
CREATE INDEX idx_workflows_org ON workflows(organization_id);
CREATE INDEX idx_workflows_status ON workflows(status);
CREATE INDEX idx_policies_org ON policies(organization_id);
CREATE INDEX idx_policies_status ON policies(status);
CREATE INDEX idx_incidents_org ON incidents(organization_id);
CREATE INDEX idx_incidents_severity ON incidents(severity);
CREATE INDEX idx_incidents_status ON incidents(status);
CREATE INDEX idx_compliance_mappings_org ON compliance_mappings(organization_id);
CREATE INDEX idx_compliance_mappings_framework ON compliance_mappings(framework);
CREATE INDEX idx_audit_logs_org ON audit_logs(organization_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX idx_integration_events_integration ON integration_events(integration_id);
CREATE INDEX idx_integration_events_created_at ON integration_events(created_at);

-- Create updated_at triggers
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_organizations_updated_at BEFORE UPDATE ON organizations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assessment_submissions_updated_at BEFORE UPDATE ON assessment_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_integrations_updated_at BEFORE UPDATE ON integrations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON workflows FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_policies_updated_at BEFORE UPDATE ON policies FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_compliance_mappings_updated_at BEFORE UPDATE ON compliance_mappings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_incidents_updated_at BEFORE UPDATE ON incidents FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();