/*
  # Set up Storage for app assets
  
  1. Storage Configuration
    - Create app-assets bucket for public assets
    - Configure RLS policies for public access

  2. Security
    - Enable secure access to app assets
*/

-- Create the app-assets bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('app-assets', 'app-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Set up public access policy for the app-assets bucket
CREATE POLICY "Allow public viewing of app assets"
ON storage.objects FOR SELECT
USING (bucket_id = 'app-assets');

-- Allow authenticated users to upload and update assets
CREATE POLICY "Allow authenticated users to upload assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'app-assets');

CREATE POLICY "Allow authenticated users to update assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'app-assets');

-- Allow authenticated users to delete assets
CREATE POLICY "Allow authenticated users to delete assets"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'app-assets');