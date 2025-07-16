import { useState, useEffect } from 'react';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';

interface UseSupabaseQueryOptions {
  filter?: (query: PostgrestFilterBuilder<any, any, any>) => PostgrestFilterBuilder<any, any, any>;
  orderBy?: {
    column: string;
    ascending?: boolean;
  };
  limit?: number;
}

export const useSupabaseQuery = (
  table: string,
  options: UseSupabaseQueryOptions = {}
) => {
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Start with the base query
        let query = supabase.from(table).select('*');

        // Apply any filters
        if (options.filter) {
          query = options.filter(query);
        }

        // Apply ordering
        if (options.orderBy) {
          query = query.order(
            options.orderBy.column, 
            { ascending: options.orderBy.ascending ?? true }
          );
        }

        // Apply limit
        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data: result, error: supabaseError } = await query;

        if (supabaseError) {
          console.error('Error fetching from Supabase:', supabaseError);
          setError(supabaseError.message);
          return;
        }

        setData(result);
      } catch (err) {
        console.error('Unexpected error in useSupabaseQuery:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, JSON.stringify(options)]);

  return {
    data,
    loading,
    error,
    refresh: () => {
      setLoading(true);
      // This will trigger the useEffect to run again
    },
  };
};

export const useSupabaseMutation = (table: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const insert = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      const { error: supabaseError } = await supabase.from(table).insert([data]);
      if (supabaseError) {
        console.error('Error inserting data:', supabaseError);
        setError(supabaseError.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Unexpected error in insert:', err);
      setError('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      const { error: supabaseError } = await supabase
        .from(table)
        .update(data)
        .eq('id', id);
      if (supabaseError) {
        console.error('Error updating data:', supabaseError);
        setError(supabaseError.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Unexpected error in update:', err);
      setError('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const { error: supabaseError } = await supabase
        .from(table)
        .delete()
        .eq('id', id);
      if (supabaseError) {
        console.error('Error deleting data:', supabaseError);
        setError(supabaseError.message);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Unexpected error in remove:', err);
      setError('An unexpected error occurred');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    insert,
    update,
    remove,
    loading,
    error,
  };
};

export const useNistCsfAssessment = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [assessmentData, setAssessmentData] = useState<any>(null);

  const saveAssessment = async (assessmentData: any) => {
    if (!user) {
      setError('User must be authenticated to save assessment');
      return false;
    }

    setLoading(true);
    setError(null);
    
    try {
      const submissionData = {
        user_id: user.id,
        assessment_type: 'nist_csf',
        framework_name: 'NIST Cybersecurity Framework',
        overall_score: assessmentData.overall_score || 0,
        section_scores: assessmentData.section_scores || [],
        recommendations: assessmentData.recommendations || null,
        answers: assessmentData.answers || {},
      };

      const { error: supabaseError } = await supabase
        .from('assessment_submissions')
        .insert([submissionData]);

      if (supabaseError) {
        console.error('Error saving NIST CSF assessment:', supabaseError);
        setError(supabaseError.message);
        return false;
      }

      return true;
    } catch (err) {
      console.error('Unexpected error saving assessment:', err);
      setError('An unexpected error occurred while saving assessment');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loadAssessments = async () => {
    if (!user) {
      setError('User must be authenticated to load assessments');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('assessment_submissions')
        .select('*')
        .eq('user_id', user.id)
        .eq('assessment_type', 'nist_csf')
        .order('created_at', { ascending: false });

      if (supabaseError) {
        console.error('Error loading NIST CSF assessments:', supabaseError);
        setError(supabaseError.message);
        return;
      }

      setAssessmentData(data);
    } catch (err) {
      console.error('Unexpected error loading assessments:', err);
      setError('An unexpected error occurred while loading assessments');
    } finally {
      setLoading(false);
    }
  };

  const getLatestAssessment = async () => {
    if (!user) {
      setError('User must be authenticated to get latest assessment');
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const { data, error: supabaseError } = await supabase
        .from('assessment_submissions')
        .select('*')
        .eq('user_id', user.id)
        .eq('assessment_type', 'nist_csf')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (supabaseError && supabaseError.code !== 'PGRST116') {
        console.error('Error getting latest NIST CSF assessment:', supabaseError);
        setError(supabaseError.message);
        return null;
      }

      return data;
    } catch (err) {
      console.error('Unexpected error getting latest assessment:', err);
      setError('An unexpected error occurred while getting latest assessment');
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    saveAssessment,
    loadAssessments,
    getLatestAssessment,
    assessmentData,
    loading,
    error,
  };
};