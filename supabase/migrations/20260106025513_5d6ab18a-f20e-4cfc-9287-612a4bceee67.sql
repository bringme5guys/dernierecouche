-- Add UPDATE and DELETE policies for quote_requests (admins only)
CREATE POLICY "Only admins can update quote requests"
ON public.quote_requests
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete quote requests"
ON public.quote_requests
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'::app_role));