 // src/utils/supabaseAssets.js
// Utility functions for handling Supabase storage and assets
import { supabase } from '../lib/supabase';

// Default app assets configuration
export const appAssets = {
  images: {
    logo: '/images/cybercorrect-logo.png',
    hero: '/images/hero-security.jpg',
    dashboard: '/images/dashboard-preview.png',
    team: '/images/team-collaboration.jpg'
  },
  documents: {
    userGuide: '/docs/user-guide.pdf',
    whitepaper: '/docs/cybersecurity-whitepaper.pdf',
    compliance: '/docs/compliance-checklist.pdf'
  },
  icons: {
    shield: '/icons/shield.svg',
    lock: '/icons/lock.svg',
    chart: '/icons/chart.svg'
  }
};

// Get storage URL for Supabase assets
export const getStorageUrl = (path, bucket = 'assets') => {
  if (!path) return '';
  
  try {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  } catch (error) {
    console.error('Error getting storage URL:', error);
    return `/assets/${path}`; // Fallback to local path
  }
};

// Get asset URL from predefined assets
export const getAssetUrl = (category, asset) => {
  if (!appAssets[category] || !appAssets[category][asset]) {
    console.warn(`Asset not found: ${category}.${asset}`);
    return '';
  }
  return appAssets[category][asset];
};

// Get public URL for Supabase storage
export const getPublicUrl = (bucket, path) => {
  if (!bucket || !path) return '';
  
  try {
    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    return data.publicUrl;
  } catch (error) {
    console.error('Error getting public URL:', error);
    return `/storage/${bucket}/${path}`; // Fallback
  }
};

// Upload file to Supabase storage
export const uploadFile = async (bucket, path, file) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Upload error:', error);
    return { data: null, error: error.message };
  }
};

// Delete file from Supabase storage
export const deleteFile = async (bucket, path) => {
  try {
    const { error } = await supabase.storage
      .from(bucket)
      .remove([path]);

    if (error) {
      throw error;
    }

    return { error: null };
  } catch (error) {
    console.error('Delete error:', error);
    return { error: error.message };
  }
};

// List files in a storage bucket
export const listFiles = async (bucket, folder = '') => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(folder, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'name', order: 'asc' }
      });

    if (error) {
      throw error;
    }

    return { data: data || [], error: null };
  } catch (error) {
    console.error('List files error:', error);
    return { data: [], error: error.message };
  }
};

// Check if file exists in storage
export const fileExists = async (bucket, path) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path.split('/').slice(0, -1).join('/'), {
        search: path.split('/').pop()
      });

    if (error) {
      throw error;
    }

    return data && data.length > 0;
  } catch (error) {
    console.error('File exists check error:', error);
    return false;
  }
};

// Download file from storage
export const downloadFile = async (bucket, path) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .download(path);

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error('Download error:', error);
    return { data: null, error: error.message };
  }
};

// Get file metadata
export const getFileMetadata = async (bucket, path) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .list(path.split('/').slice(0, -1).join('/'), {
        search: path.split('/').pop()
      });

    if (error) {
      throw error;
    }

    return { data: data?.[0] || null, error: null };
  } catch (error) {
    console.error('Get metadata error:', error);
    return { data: null, error: error.message };
  }
};

export default appAssets;