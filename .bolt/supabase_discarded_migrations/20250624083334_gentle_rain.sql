/*
  # Create assessment submissions table

  1. New Tables
    - `assessment_submissions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to users)
      - `assessment_type` (text, type of assessment)
      - `framework_name` (text, name of the framework used)
      - `overall_score` (integer, overall assessment score)
      - `section_scores` (jsonb, detailed section scores)
      - `recommendations` (jsonb, generated recommendations)
      - `answers` (jsonb, raw assessment answers)
      - `completed_at` (timestamptz, when assessment was completed)
      - `created_at` (timestamptz, record creation time)
      - `updated_at` (timestamptz, last update time)

  2. Security
    - Enable RLS on `assessment_submissions` table
    - Add policies for authenticated users to manage their own submissions
*/

CREATE TABLE IF NOT EXISTS public.assessment_submissions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
    assessment_type text NOT NULL,
    framework_name text NOT NULL,
    overall_score integer NOT NULL CHECK (overall_score >= 0 AND overall_score <= 100),
    section_scores jsonb NOT NULL DEFAULT '[]'::jsonb,
    recommendations jsonb DEFAULT '[]'::jsonb,
    answers jsonb NOT NULL DEFAULT '{}'::jsonb,
    completed_at timestamp with time zone DEFAULT now(),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.assessment_submissions ENABLE ROW LEVEL SECURITY;

-- Policies for assessment submissions
CREATE POLICY "Users can insert their own assessment submissions"
    ON public.assessment_submissions
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own assessment submissions"
    ON public.assessment_submissions
    FOR SELECT
    TO authenticated
    USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own assessment submissions"
    ON public.assessment_submissions
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own assessment submissions"
    ON public.assessment_submissions
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Trigger to update updated_at column
CREATE TRIGGER update_assessment_submissions_updated_at
    BEFORE UPDATE ON public.assessment_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Index for better query performance
CREATE INDEX IF NOT EXISTS idx_assessment_submissions_user_id 
    ON public.assessment_submissions(user_id);

CREATE INDEX IF NOT EXISTS idx_assessment_submissions_type 
    ON public.assessment_submissions(assessment_type);

CREATE INDEX IF NOT EXISTS idx_assessment_submissions_completed_at 
    ON public.assessment_submissions(completed_at DESC);