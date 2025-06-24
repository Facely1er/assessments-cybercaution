import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types for our assessment submissions
export interface AssessmentSubmission {
  id: string;
  user_id: string;
  assessment_type: string;
  framework_name: string;
  overall_score: number;
  section_scores: Array<{
    title: string;
    percentage: number;
    completed: boolean;
  }>;
  recommendations?: any[];
  answers: Record<string, string>;
  completed_at: string;
  created_at: string;
  updated_at: string;
}

// Helper functions for assessment submissions
export const assessmentSubmissions = {
  // Save a new assessment submission
  async create(submission: Omit<AssessmentSubmission, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('assessment_submissions')
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
      .from('assessment_submissions')
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
      .from('assessment_submissions')
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
      .from('assessment_submissions')
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
      .from('assessment_submissions')
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
      .from('assessment_submissions')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting assessment submission:', error);
      throw error;
    }

    return true;
  }
};