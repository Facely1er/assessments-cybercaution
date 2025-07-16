import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Create a custom hook for Supabase integration
export const useSupabase = () => {
  const [supabase, setSupabase] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        // Use import.meta.env for Vite environment variables
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

        // Check if environment variables are configured
        if (!supabaseUrl || !supabaseAnonKey) {
          console.warn('Supabase configuration missing. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file');
          setError('Supabase configuration missing');
          setLoading(false);
          return;
        }

        // Create Supabase client
        const supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
          auth: {
            persistSession: false // Disable auth persistence for public tools
          }
        });

        setSupabase(supabaseClient);

        setIsConnected(true);
        console.log('Supabase connection established');

      } catch (err) {
        console.error('Failed to initialize Supabase:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    initializeSupabase();
  }, []);

  return {
    supabase,
    isConnected,
    loading,
    error
  };
};

// Alternative hook for specific queries
export const useSupabaseQuery = (tableName, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { supabase, isConnected } = useSupabase();

  useEffect(() => {
    if (!supabase || !isConnected || !tableName) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        
        let query = supabase.from(tableName).select(options.select || '*');
        
        // Apply filters if provided
        if (options.filters) {
          Object.entries(options.filters).forEach(([column, value]) => {
            query = query.eq(column, value);
          });
        }
        
        // Apply ordering if provided
        if (options.orderBy) {
          query = query.order(options.orderBy.column, { 
            ascending: options.orderBy.ascending !== false 
          });
        }
        
        // Apply limit if provided
        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data: result, error: queryError } = await query;

        if (queryError) {
          throw queryError;
        }

        setData(result || []);
      } catch (err) {
        console.error(`Error fetching data from ${tableName}:`, err);
        setError(err.message);
        setData([]); // Return empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [supabase, isConnected, tableName, JSON.stringify(options)]);

  return { data, loading, error };
};

// Simplified configuration checker
export const checkSupabaseConfig = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  return {
    isConfigured: !!(supabaseUrl && supabaseAnonKey),
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey,
    missingVars: [
      !supabaseUrl && 'VITE_SUPABASE_URL',
      !supabaseAnonKey && 'VITE_SUPABASE_ANON_KEY'
    ].filter(Boolean)
  };
};

export default useSupabase;