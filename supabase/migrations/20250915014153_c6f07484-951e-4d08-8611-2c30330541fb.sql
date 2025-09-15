-- Create storage buckets for article images
INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);

-- Create RLS policies for article images bucket
CREATE POLICY "Article images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'article-images');

CREATE POLICY "Authenticated users can upload article images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'article-images' AND auth.uid() IS NOT NULL);

CREATE POLICY "Users can update their own article images" 
ON storage.objects 
FOR UPDATE 
USING (bucket_id = 'article-images' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete their own article images" 
ON storage.objects 
FOR DELETE 
USING (bucket_id = 'article-images' AND auth.uid()::text = (storage.foldername(name))[1]);