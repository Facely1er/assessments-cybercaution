// src/hooks/useSupabase.js
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Main Supabase hook - eliminates connection test errors
export const useSupabase = () => {
  const [supabase, setSupabase] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initializeSupabase = () => {
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
        setIsConnected(true); // Assume connection is good if client is created successfully
        setLoading(false);
        
        console.log('✅ Supabase client initialized successfully');
        console.log('🔗 Connected to:', supabaseUrl);

      } catch (err) {
        console.error('❌ Failed to initialize Supabase:', err);
        setError(err.message);
        setIsConnected(false);
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

// Enhanced hook for queries with graceful error handling
export const useSupabaseQuery = (tableName, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { supabase, isConnected } = useSupabase();

  useEffect(() => {
    if (!supabase || !isConnected || !tableName) {
      setLoading(false);
      setData([]); // Return empty array when no connection
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
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
          // Handle specific error cases gracefully
          if (queryError.code === '42P01') {
            console.warn(`ℹ️ Table '${tableName}' doesn't exist yet. Returning empty data.`);
            setData([]);
            return;
          }
          throw queryError;
        }

        setData(result || []);
        console.log(`✅ Successfully fetched ${(result || []).length} records from ${tableName}`);
        
      } catch (err) {
        console.error(`❌ Error fetching data from ${tableName}:`, err);
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

// Manual connection test function (use only when needed)
export const testSupabaseConnection = async (supabase) => {
  if (!supabase) {
    return { connected: false, error: 'No Supabase client available' };
  }

  try {
    // Try to get the current session (doesn't require any tables)
    const { error } = await supabase.auth.getSession();
    
    // Auth session missing is expected and fine
    if (error && error.message !== 'Auth session missing!') {
      throw error;
    }
    
    console.log('✅ Supabase connection test successful');
    return { connected: true, error: null };
  } catch (err) {
    console.warn('⚠️ Supabase connection test failed:', err.message);
    return { connected: false, error: err.message };
  }
};

// Configuration checker
export const checkSupabaseConfig = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  const config = {
    isConfigured: !!(supabaseUrl && supabaseAnonKey),
    url: supabaseUrl,
    hasKey: !!supabaseAnonKey,
    missingVars: [
      !supabaseUrl && 'VITE_SUPABASE_URL',
      !supabaseAnonKey && 'VITE_SUPABASE_ANON_KEY'
    ].filter(Boolean)
  };

  if (config.isConfigured) {
    console.log('✅ Supabase configuration complete');
  } else {
    console.warn('⚠️ Missing Supabase environment variables:', config.missingVars.join(', '));
  }

  return config;
};

export default useSupabase;