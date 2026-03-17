
-- Allow authenticated users to insert their own role as 'intern'
CREATE POLICY "Users can insert own intern role"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id AND role = 'intern');

-- Allow authenticated users to insert their own application
CREATE POLICY "Users can insert own application"
ON public.applications
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);
