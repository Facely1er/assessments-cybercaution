cybercaution.com

## Supabase Storage Setup

### Setup Instructions

1. In your Supabase project dashboard, navigate to Storage.
2. Create a new bucket named `app-assets`.
3. Set the RLS policies to allow public access for viewing:

```sql
CREATE POLICY "Allow public viewing of app assets" ON storage.objects
FOR SELECT
USING (bucket_id = 'app-assets');
```

### Asset Organization

Organize assets in the following structure:

- `/images/` - General images
  - `/images/backgrounds/` - Background images
  - `/images/icons/` - Icon images
  - `/images/logos/` - Logo images
  - `/images/screenshots/` - Application screenshots
  - `/images/videos/` - Video thumbnails

### Asset Migration Checklist

- [ ] Upload `cybercaution.png` to `/images/logos/`
- [ ] Upload `favicon.png` to `/images/icons/`
- [ ] Download and upload hero background from Pexels to `/images/backgrounds/hero-bg.jpeg`
- [ ] Download and upload mobile dashboard from Pexels to `/images/screenshots/mobile-dashboard.jpeg`
- [ ] Download and upload video thumbnails from Pexels to `/images/videos/`

After migration, update the paths in `src/utils/supabaseAssets.ts` if necessary.