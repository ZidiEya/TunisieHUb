import { useState, useRef } from "react";
import { Upload, X, Image } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface FileUploadProps {
  onUpload: (url: string) => void;
  currentImageUrl?: string;
  accept?: string;
  maxSize?: number; // in MB
}

export const FileUpload = ({ 
  onUpload, 
  currentImageUrl, 
  accept = "image/*", 
  maxSize = 5 
}: FileUploadProps) => {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(currentImageUrl || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      toast({
        title: "Erreur",
        description: `Le fichier est trop volumineux. Taille maximale : ${maxSize}MB`,
        variant: "destructive",
      });
      return;
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Erreur",
        description: "Seuls les fichiers image sont acceptés",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploading(true);

      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour télécharger des fichiers",
          variant: "destructive",
        });
        return;
      }

      // Create unique filename with user ID and timestamp
      const fileExt = file.name.split('.').pop();
      const fileName = `${session.user.id}/${Date.now()}.${fileExt}`;

      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from('article-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        toast({
          title: "Erreur",
          description: "Erreur lors du téléchargement du fichier",
          variant: "destructive",
        });
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('article-images')
        .getPublicUrl(data.path);

      setPreview(publicUrl);
      onUpload(publicUrl);

      toast({
        title: "Succès",
        description: "Fichier téléchargé avec succès",
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du téléchargement",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview("");
    onUpload("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
      />

      {preview ? (
        <div className="relative group">
          <div className="relative w-full h-48 rounded-lg overflow-hidden border border-border bg-muted">
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={handleClick}
                  disabled={uploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Remplacer
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={handleRemove}
                  disabled={uploading}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="w-full h-48 border-2 border-dashed border-border rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-colors duration-200"
        >
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Téléchargement...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Image className="w-8 h-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Cliquez pour télécharger une image
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF jusqu'à {maxSize}MB
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};