import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our assessment submissions (updated for cc_ schema)
export interface AssessmentSubmission {
  id: string;
  user_id: string;
  organization_id: string;
  assessment_type: string;
  framework_name: string;
  title: string;
  status: 'draft' | 'in_progress' | 'completed' | 'archived';
  overall_score: number;
  section_scores: Array<{
    title: string;
    percentage: number;
    completed: boolean;
  }>;
  recommendations?: any[];
  answers: Record<string, string>;
  metadata?: Record<string, any>;
  completed_at?: string;
  expires_at?: string;
  created_at: string;
  updated_at: string;
}

// User profile interface
export interface UserProfile {
  id: string;
  organization_id?: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: 'admin' | 'security_analyst' | 'compliance_officer' | 'viewer';
  department?: string;
  job_title?: string;
  phone?: string;
  avatar_url?: string;
  preferences?: Record<string, any>;
  last_login?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Organization interface
export interface Organization {
  id: string;
  name: string;
  domain?: string;
  industry?: string;
  size_category?: string;
  compliance_frameworks?: string[];
  settings?: Record<string, any>;
  created_at: string;
  updated_at: string;
}

// Helper functions for assessment submissions (updated for cc_ schema)
export const assessmentSubmissions = {
  // Save a new assessment submission
  async create(submission: Omit<AssessmentSubmission, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('cc_assessment_submissions')
      .insert([submission])
      .select()
      .single();

    if (error) {
      console.error('Error creating assessment submission:', error);
      throw error;
    }

    return data;
  },

  // Get all assessment submissions for a user
  async getByUser(userId: string) {
    const { data, error } = await supabase
      .from('cc_assessment_submissions')
      .select('*')
      .eq('user_id', userId)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching user assessment submissions:', error);
      throw error;
    }

    return data;
  },

  // Get assessment submissions by type for a user
  async getByUserAndType(userId: string, assessmentType: string) {
    const { data, error } = await supabase
      .from('cc_assessment_submissions')
      .select('*')
      .eq('user_id', userId)
      .eq('assessment_type', assessmentType)
      .order('completed_at', { ascending: false });

    if (error) {
      console.error('Error fetching assessment submissions by type:', error);
      throw error;
    }

    return data;
  },

  // Get a specific assessment submission
  async getById(id: string) {
    const { data, error } = await supabase
      .from('cc_assessment_submissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching assessment submission:', error);
      throw error;
    }

    return data;
  },

  // Update an assessment submission
  async update(id: string, updates: Partial<AssessmentSubmission>) {
    const { data, error } = await supabase
      .from('cc_assessment_submissions')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating assessment submission:', error);
      throw error;
    }

    return data;
  },

  // Delete an assessment submission
  async delete(id: string) {
    const { error } = await supabase
      .from('cc_assessment_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting assessment submission:', error);
      throw error;
    }

    return true;
  }
};

// Helper functions for user profiles
export const userProfiles = {
  // Get user profile by ID
  async getById(id: string): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('cc_user_profiles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }

    return data;
  },

  // Update user profile
  async update(id: string, updates: Partial<UserProfile>): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('cc_user_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user profile:', error);
      return null;
    }

    return data;
  },

  // Create user profile (called after auth signup)
  async create(profile: Omit<UserProfile, 'created_at' | 'updated_at'>): Promise<UserProfile | null> {
    const { data, error } = await supabase
      .from('cc_user_profiles')
      .insert([profile])
      .select()
      .single();

    if (error) {
      console.error('Error creating user profile:', error);
      return null;
    }

    return data;
  }
};

// Helper functions for organizations
export const organizations = {
  // Get organization by ID
  async getById(id: string): Promise<Organization | null> {
    const { data, error } = await supabase
      .from('cc_organizations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error fetching organization:', error);
      return null;
    }

    return data;
  },

  // Create organization
  async create(org: Omit<Organization, 'created_at' | 'updated_at'>): Promise<Organization | null> {
    const { data, error } = await supabase
      .from('cc_organizations')
      .insert([org])
      .select()
      .single();

    if (error) {
      console.error('Error creating organization:', error);
      return null;
    }

    return data;
  },

  // Update organization
  async update(id: string, updates: Partial<Organization>): Promise<Organization | null> {
    const { data, error } = await supabase
      .from('cc_organizations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating organization:', error);
      return null;
    }

    return data;
  }
};