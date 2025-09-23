/**
 * SocialShare.tsx - Social Media Sharing Component
 * Composant de partage sur les réseaux sociaux
 * 
 * This component provides social media sharing functionality for articles
 * Ce composant fournit la fonctionnalité de partage sur les réseaux sociaux pour les articles
 */

// UI and icon imports / Importations UI et icônes
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, MessageCircle, Link2, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

/**
 * Props interface for SocialShare component
 * Interface des props pour le composant SocialShare
 */
interface SocialShareProps {
  title: string; // Article title / Titre de l'article
  excerpt: string; // Article excerpt / Extrait de l'article
  url?: string; // Custom URL to share / URL personnalisée à partager
  className?: string; // Additional CSS classes / Classes CSS supplémentaires
}

/**
 * SocialShare Component - Provides social sharing functionality for articles
 * Composant SocialShare - Fournit la fonctionnalité de partage social pour les articles
 * 
 * @param title - Article title to share / Titre de l'article à partager
 * @param excerpt - Article excerpt for sharing / Extrait de l'article pour le partage
 * @param url - Custom URL to share (defaults to current page) / URL personnalisée à partager (par défaut page actuelle)
 * @param className - Additional CSS classes / Classes CSS supplémentaires
 */
const SocialShare = ({ title, excerpt, url, className = "" }: SocialShareProps) => {
  // Toast notifications hook / Hook pour les notifications toast
  const { toast } = useToast();
  
  // URL encoding for social media sharing / Encodage URL pour le partage sur les réseaux sociaux
  const shareUrl = url || window.location.href;
  const encodedTitle = encodeURIComponent(title);
  const encodedExcerpt = encodeURIComponent(excerpt);
  const encodedUrl = encodeURIComponent(shareUrl);

  // Social media platform sharing URLs / URLs de partage des plateformes de réseaux sociaux
  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedExcerpt}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  /**
   * Handles sharing to social media platforms
   * Gère le partage vers les plateformes de réseaux sociaux
   * 
   * @param platform - Social media platform to share to / Plateforme de réseau social vers laquelle partager
   */
  const handleSocialShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    toast({
      title: "تم فتح نافذة المشاركة",
      description: `جاري المشاركة على ${platform === 'facebook' ? 'فيسبوك' : platform === 'twitter' ? 'تويتر' : platform === 'linkedin' ? 'لينكد إن' : 'واتساب'}`,
    });
  };

  /**
   * Copies the article URL to clipboard
   * Copie l'URL de l'article dans le presse-papiers
   */
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط المقال إلى الحافظة",
    });
  };

  /**
   * Uses native sharing API if available, falls back to copy link
   * Utilise l'API de partage native si disponible, sinon copie le lien
   */
  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title,
        text: excerpt,
        url: shareUrl,
      });
    } else {
      handleCopyLink();
    }
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Native Share Button (for mobile) */}
      <Button 
        className="w-full" 
        variant="tunisia"
        onClick={handleNativeShare}
      >
        <Share2 className="w-4 h-4 ml-2" />
        مشاركة المقال
      </Button>
      
      {/* Social Media Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleSocialShare('facebook')}
          className="hover:bg-blue-50 hover:border-blue-500"
        >
          <Facebook className="w-4 h-4 ml-2 text-blue-600" />
          فيسبوك
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleSocialShare('twitter')}
          className="hover:bg-sky-50 hover:border-sky-500"
        >
          <Twitter className="w-4 h-4 ml-2 text-sky-500" />
          تويتر
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleSocialShare('linkedin')}
          className="hover:bg-blue-50 hover:border-blue-700"
        >
          <Linkedin className="w-4 h-4 ml-2 text-blue-700" />
          لينكد إن
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => handleSocialShare('whatsapp')}
          className="hover:bg-green-50 hover:border-green-500"
        >
          <MessageCircle className="w-4 h-4 ml-2 text-green-500" />
          واتساب
        </Button>
      </div>
      
      {/* Copy Link Button */}
      <Button 
        variant="ghost" 
        size="sm"
        onClick={handleCopyLink}
        className="w-full"
      >
        <Link2 className="w-4 h-4 ml-2" />
        نسخ الرابط
      </Button>
    </div>
  );
};

export default SocialShare;