-- Fix security vulnerability: restrict comment updates to comment owners only
-- The current policy allows any authenticated user to update any comment
-- This fixes it to only allow users to update their own comments

DROP POLICY IF EXISTS "Users can update their own comments" ON public.comments;

CREATE POLICY "Users can update their own comments" 
ON public.comments 
FOR UPDATE 
USING (auth.uid() = user_id);