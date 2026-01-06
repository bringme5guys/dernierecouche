-- Add INSERT policy for user_roles (admins only)
-- This prevents unauthorized users from assigning themselves admin privileges
CREATE POLICY "Only admins can create roles"
ON public.user_roles
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'::app_role));