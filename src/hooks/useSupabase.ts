import { useState, useEffect } from 'react';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js';
import { supabase } from '../lib/supabase';

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