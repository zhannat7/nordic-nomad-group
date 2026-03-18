
-- Add profile fields to applications table
ALTER TABLE public.applications
  ADD COLUMN IF NOT EXISTS date_of_birth date,
  ADD COLUMN IF NOT EXISTS english_level text,
  ADD COLUMN IF NOT EXISTS animals text,
  ADD COLUMN IF NOT EXISTS agriculture_interest text;

-- Allow anonymous users to read approved applications (for public candidates page)
CREATE POLICY "Public can view approved applications"
  ON public.applications
  FOR SELECT
  TO anon
  USING (status = 'approved');
