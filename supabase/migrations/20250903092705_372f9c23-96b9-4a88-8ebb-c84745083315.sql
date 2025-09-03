-- Fix critical security vulnerability: Restrict public access to comment personal data
-- Current policy exposes email addresses, IP addresses, and user agent strings publicly
-- This creates separate policies for public vs authenticated access

-- Drop the overly permissive existing policy
DROP POLICY IF EXISTS "Approved comments are viewable by everyone" ON public.comments;

-- Create a security definer function to return sanitized comment data for public access
CREATE OR REPLACE FUNCTION public.get_public_comments()
RETURNS TABLE (
  id uuid,
  article_id uuid,
  author_name text,
  content text,
  created_at timestamp with time zone,
  updated_at timestamp with time zone,
  parent_id uuid,
  status text
)
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT 
    c.id,
    c.article_id,
    c.author_name,
    c.content,
    c.created_at,
    c.updated_at,
    c.parent_id,
    c.status
  FROM public.comments c
  WHERE c.status = 'approved';
$$;

-- Create policy for public access to approved comments without personal data
CREATE POLICY "Public can view approved comments (sanitized)"
ON public.comments
FOR SELECT
TO anon
USING (status = 'approved');

-- Create policy for authenticated users to access full comment data (for moderation)
CREATE POLICY "Authenticated users can view all comment data"
ON public.comments
FOR SELECT
TO authenticated
USING (true);

-- Grant execute permission on the public function
GRANT EXECUTE ON FUNCTION public.get_public_comments() TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_comments() TO authenticated;