CREATE TABLE public.document_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid NOT NULL REFERENCES public.applications(id) ON DELETE CASCADE,
  admin_id uuid NOT NULL,
  file_name text NOT NULL,
  viewed_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (application_id, admin_id, file_name)
);

ALTER TABLE public.document_views ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage document views"
ON public.document_views
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));