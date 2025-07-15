import { supabase } from '../lib/supabase';

// Constants for Supabase Storage
const BUCKET_NAME = 'app-assets';
const STORAGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public`;

/**
 * Get the public URL for a file in Supabase Storage
 * @param path Path to the file within the bucket
 * @param bucket Optional bucket name, defaults to app-assets
 * @returns Full public URL to the asset
 */
export const getStorageUrl = (path: string, bucket: string = BUCKET_NAME): string => {
  return `${STORAGE_URL}/${bucket}/${path}`;
};

/**
 * Upload a file to Supabase Storage
 * @param file File to upload
 * @param path Path where the file should be stored in the bucket
 * @param bucket Optional bucket name, defaults to app-assets
 * @returns Public URL of the uploaded file if successful
 */
export const uploadFile = async (
  file: File,
  path: string,
  bucket: string = BUCKET_NAME
): Promise<string | null> => {
  try {
    const { data, error } = await supabase.storage.from(bucket).upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });

    if (error) {
      console.error('Error uploading file:', error);
      return null;
    }

    // Return the public URL
    return getStorageUrl(data.path, bucket);
  } catch (error) {
    console.error('Unexpected error during upload:', error);
    return null;
  }
};

/**
 * Helper to get common app assets
 */
export const appAssets = {
  logo: getStorageUrl('images/logos/cybercaution.png'),
  favicon: getStorageUrl('images/icons/favicon.png'),
  heroBackground: getStorageUrl('images/backgrounds/hero-bg.jpeg'),
  mobileDashboard: getStorageUrl('images/screenshots/mobile-dashboard.jpeg'),
  // Add more common assets here
};