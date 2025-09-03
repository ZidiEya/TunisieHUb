import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Tag, ArrowLeft, Clock, Share2, Heart } from "lucide-react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

interface ArticleDetailProps {
  onChatOpen: () => void;
}

interface Article {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
}

const ArticleDetail = ({ onChatOpen }: ArticleDetailProps) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [isLiked, setIsLiked] = useState(false);

  // Sample articles data - in a real app, this would come from your database
  const articles = [
    {
      id: 1,
      title: "دليل المبتدئين لاستخدام ChatGPT في إنشاء المحتوى",
      excerpt: "تعلم كيفية الاستفادة من قوة الذكاء الاصطناعي لإنشاء محتوى إبداعي ومؤثر باللغة العربية",
      category: "ذكاء اصطناعي",
      author: "أحمد التكنولوجي",
      date: "20 ديسمبر 2024",
      readTime: "7 دقائق",
      slug: "guide-chatgpt-content-creation",
      content: `
        <p>في عصر الذكاء الاصطناعي المتسارع، أصبح ChatGPT أحد أهم الأدوات التي يمكن للكتّاب والمدونين الاستفادة منها لإنشاء محتوى عالي الجودة باللغة العربية.</p>
        
        <h2>لماذا ChatGPT؟</h2>
        <p>يتميز ChatGPT بقدرته على فهم السياق العربي وإنتاج نصوص متماسكة ومفيدة. كما أنه يساعد في:</p>
        <ul>
          <li>العصف الذهني للأفكار الجديدة</li>
          <li>تطوير هياكل المقالات</li>
          <li>تحسين الأسلوب والصياغة</li>
          <li>التدقيق اللغوي والإملائي</li>
        </ul>
        
        <h2>خطوات البدء</h2>
        <p>لبدء استخدام ChatGPT في إنشاء المحتوى، اتبع هذه الخطوات:</p>
        <ol>
          <li>حدد هدفك من المحتوى بوضوح</li>
          <li>اكتب استفسارك بطريقة واضحة ومحددة</li>
          <li>استخدم السياق العربي المناسب</li>
          <li>راجع وطور الإجابات المقترحة</li>
        </ol>
        
        <p>تذكر أن الذكاء الاصطناعي هو أداة مساعدة وليس بديلاً للإبداع البشري. استخدمه لتطوير أفكارك وتحسين جودة محتواك.</p>
      `
    },
    {
      id: 2,
      title: "أدوات الذكاء الاصطناعي التي تحتاجها كل شركة ناشئة",
      excerpt: "استكشف أفضل أدوات الذكاء الاصطناعي المجانية والمدفوعة لتطوير أعمالك وزيادة الإنتاجية",
      category: "ذكاء اصطناعي",
      author: "فاطمة الذكية",
      date: "18 ديسمبر 2024",
      readTime: "10 دقائق",
      slug: "ai-tools-for-startups",
      content: `
        <p>تواجه الشركات الناشئة تحديات عديدة في بداية رحلتها، من ضيق الميزانية إلى قلة الموارد البشرية. لكن مع أدوات الذكاء الاصطناعي المتاحة اليوم، يمكن لهذه الشركات تحقيق المزيد بأقل التكاليف.</p>
        
        <h2>أدوات المحتوى والتسويق</h2>
        <ul>
          <li><strong>ChatGPT:</strong> لإنشاء المحتوى والنصوص التسويقية</li>
          <li><strong>Canva AI:</strong> لتصميم الجرافيكس والمنشورات</li>
          <li><strong>Copy.ai:</strong> لكتابة النسخ التسويقية</li>
        </ul>
        
        <h2>أدوات خدمة العملاء</h2>
        <ul>
          <li><strong>Intercom:</strong> للدعم الفني المؤتمت</li>
          <li><strong>Zendesk AI:</strong> لإدارة استفسارات العملاء</li>
        </ul>
        
        <h2>أدوات التحليل والبيانات</h2>
        <ul>
          <li><strong>Google Analytics Intelligence:</strong> لتحليل زوار الموقع</li>
          <li><strong>Tableau:</strong> لتصور البيانات</li>
        </ul>
        
        <p>الاستثمار في أدوات الذكاء الاصطناعي المناسبة يمكن أن يحدث فرقاً كبيراً في نمو شركتك الناشئة وتحقيق أهدافها بسرعة أكبر.</p>
      `
    }
  ];

  useEffect(() => {
    const foundArticle = articles.find(a => a.slug === slug);
    if (foundArticle) {
      setArticle(foundArticle);
    } else {
      toast({
        title: "خطأ",
        description: "لم يتم العثور على المقال المطلوب",
        variant: "destructive",
      });
      navigate('/articles');
    }
    setLoading(false);
  }, [slug, navigate, toast]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "تم النسخ",
        description: "تم نسخ رابط المقال إلى الحافظة",
      });
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    toast({
      title: isLiked ? "تم إلغاء الإعجاب" : "تم الإعجاب بالمقال",
      description: isLiked ? "تم إزالة المقال من المفضلة" : "تم إضافة المقال إلى المفضلة",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation onChatOpen={onChatOpen} />
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-4 bg-muted rounded mb-8"></div>
              <div className="h-64 bg-muted rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
                <div className="h-4 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation onChatOpen={onChatOpen} />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">المقال غير موجود</h1>
          <p className="text-muted-foreground mb-8">لم يتم العثور على المقال المطلوب</p>
          <Button asChild>
            <Link to="/articles">العودة إلى المقالات</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation onChatOpen={onChatOpen} />
      
      {/* Article Header */}
      <div className="bg-gradient-hero text-white py-12">
        <div className="container mx-auto px-4">
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/10 mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 ml-2" />
            العودة
          </Button>
          
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-tunisia-orange text-white mb-4">
              <Tag className="w-3 h-3 ml-1" />
              {article.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {article.title}
            </h1>
            
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              {article.excerpt}
            </p>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-6 text-white/80">
                <div className="flex items-center">
                  <User className="w-5 h-5 ml-2" />
                  <span className="font-medium">{article.author}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 ml-2" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 ml-2" />
                  <span>{article.readTime}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                  onClick={toggleLike}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/10"
                  onClick={handleShare}
                >
                  <Share2 className="w-4 h-4" />
                  مشاركة
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              <Card className="bg-white shadow-elegant">
                <CardContent className="p-8">
                  <div 
                    className="prose prose-lg max-w-none prose-headings:text-primary prose-p:text-foreground prose-a:text-tunisia-orange"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-6">
                {/* Author Card */}
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-bold mb-4">عن الكاتب</h3>
                    <div className="flex items-start space-x-3">
                      <div className="w-12 h-12 bg-tunisia-orange rounded-full flex items-center justify-center text-white font-bold">
                        {article.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{article.author}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          كاتب متخصص في مجال التكنولوجيا والذكاء الاصطناعي
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <Button 
                        className="w-full" 
                        variant="tunisia"
                        onClick={handleShare}
                      >
                        <Share2 className="w-4 h-4 ml-2" />
                        مشاركة المقال
                      </Button>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={toggleLike}
                      >
                        <Heart className={`w-4 h-4 ml-2 ${isLiked ? 'fill-current' : ''}`} />
                        {isLiked ? 'مُعجب به' : 'أعجبني'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Articles CTA */}
      <section className="py-16 bg-gradient-to-b from-background to-desert-sand/20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">مقالات أخرى قد تهمك</h2>
          <p className="text-muted-foreground mb-8">
            اكتشف المزيد من المقالات المثيرة في مجال الذكاء الاصطناعي والتكنولوجيا
          </p>
          <Button asChild size="lg">
            <Link to="/articles">
              استكشف جميع المقالات
              <ArrowLeft className="w-4 h-4 mr-2" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ArticleDetail;