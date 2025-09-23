import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Linkedin, MessageCircle, Link2, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SocialShareProps {
  title: string;
  excerpt: string;
  url?: string;
  className?: string;
}

const SocialShare = ({ title, excerpt, url, className = "" }: SocialShareProps) => {
  const { toast } = useToast();
  const shareUrl = url || window.location.href;
  const encodedTitle = encodeURIComponent(title);
  const encodedExcerpt = encodeURIComponent(excerpt);
  const encodedUrl = encodeURIComponent(shareUrl);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedTitle}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}&title=${encodedTitle}&summary=${encodedExcerpt}`,
    whatsapp: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
  };

  const handleSocialShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], '_blank', 'width=600,height=400');
    toast({
      title: "تم فتح نافذة المشاركة",
      description: `جاري المشاركة على ${platform === 'facebook' ? 'فيسبوك' : platform === 'twitter' ? 'تويتر' : platform === 'linkedin' ? 'لينكد إن' : 'واتساب'}`,
    });
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast({
      title: "تم النسخ",
      description: "تم نسخ رابط المقال إلى الحافظة",
    });
  };

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