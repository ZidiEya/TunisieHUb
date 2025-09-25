import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  Users, 
  Brain, 
  Briefcase, 
  BookOpen, 
  Target,
  BarChart3,
  PieChart,
  ArrowUp,
  ArrowDown,
  MessageSquare
} from "lucide-react";
import Navigation from "@/components/Navigation";

interface CategoriesProps {
  onChatOpen: () => void;
}

const Categories = ({ onChatOpen }: CategoriesProps) => {
  const categoryStats = [
    {
      id: 1,
      name: "ذكاء اصطناعي",
      icon: Brain,
      articlesCount: 8,
      readersCount: 12500,
      engagementRate: 87,
      trend: "up",
      trendPercentage: 23,
      description: "تحليل تأثير الذكاء الاصطناعي على المجتمع التونسي",
      topics: ["ChatGPT", "تعلم الآلة", "أتمتة العمل", "خصوصية البيانات"],
      socialImpact: {
        employment: 75,
        education: 82,
        healthcare: 68,
        economy: 71
      }
    },
    {
      id: 2,
      name: "ريادة الأعمال",
      icon: Briefcase,
      articlesCount: 5,
      readersCount: 8300,
      engagementRate: 74,
      trend: "up",
      trendPercentage: 15,
      description: "تتبع نمو الشركات الناشئة وتأثيرها الاقتصادي",
      topics: ["التمويل", "الابتكار", "التوسع", "قصص النجاح"],
      socialImpact: {
        employment: 85,
        education: 70,
        healthcare: 45,
        economy: 90
      }
    },
    {
      id: 3,
      name: "التسويق الرقمي",
      icon: Target,
      articlesCount: 3,
      readersCount: 6700,
      engagementRate: 69,
      trend: "stable",
      trendPercentage: 3,
      description: "تطور استراتيجيات التسويق وتأثيرها على السلوك الاستهلاكي",
      topics: ["وسائل التواصل", "التجارة الإلكترونية", "المحتوى", "التحليلات"],
      socialImpact: {
        employment: 65,
        education: 78,
        healthcare: 35,
        economy: 82
      }
    },
    {
      id: 4,
      name: "الكتابة والمحتوى",
      icon: BookOpen,
      articlesCount: 4,
      readersCount: 5200,
      engagementRate: 81,
      trend: "up",
      trendPercentage: 12,
      description: "تأثير المحتوى الرقمي على الثقافة والتعليم",
      topics: ["الكتابة الإبداعية", "المحتوى التعليمي", "الترجمة", "النشر الرقمي"],
      socialImpact: {
        employment: 60,
        education: 95,
        healthcare: 40,
        economy: 55
      }
    }
  ];

  const overallStats = {
    totalArticles: 20,
    totalReaders: 32700,
    averageEngagement: 78,
    monthlyGrowth: 18
  };

  const societalTrends = [
    {
      trend: "التحول الرقمي",
      impact: 92,
      articles: 12,
      keywords: ["رقمنة", "تكنولوجيا", "أتمتة"]
    },
    {
      trend: "العمل عن بُعد",
      impact: 78,
      articles: 8,
      keywords: ["عمل مرن", "إنتاجية", "توازن"]
    },
    {
      trend: "التعليم الإلكتروني",
      impact: 85,
      articles: 10,
      keywords: ["تعليم رقمي", "مهارات", "تدريب"]
    },
    {
      trend: "الاستدامة البيئية",
      impact: 67,
      articles: 5,
      keywords: ["بيئة", "طاقة متجددة", "استدامة"]
    }
  ];

  return (
    <>
      <Navigation onChatOpen={onChatOpen} />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">الفئات والإحصائيات</h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            تحليل شامل لتأثير المواضيع المختلفة على المجتمع التونسي من خلال إحصائيات المحتوى والقراء
          </p>
        </div>
      </section>

      {/* Overall Statistics */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-tunisia-orange mb-2">
                  {overallStats.totalArticles}
                </div>
                <p className="text-muted-foreground">إجمالي المقالات</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-tunisia-orange mb-2">
                  {overallStats.totalReaders.toLocaleString()}
                </div>
                <p className="text-muted-foreground">إجمالي القراء</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-tunisia-orange mb-2">
                  {overallStats.averageEngagement}%
                </div>
                <p className="text-muted-foreground">متوسط التفاعل</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-tunisia-green mb-2 flex items-center justify-center">
                  <ArrowUp className="w-6 h-6 ml-1" />
                  {overallStats.monthlyGrowth}%
                </div>
                <p className="text-muted-foreground">النمو الشهري</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Categories with Social Impact */}
      <section className="py-16 bg-gradient-to-b from-background to-desert-sand/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">تحليل الفئات والتأثير المجتمعي</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
            قياس تأثير كل فئة على جوانب مختلفة من المجتمع التونسي
          </p>

          <div className="grid lg:grid-cols-2 gap-8">
            {categoryStats.map((category) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-tunisia-orange/10 rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-tunisia-orange" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">{category.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">
                            {category.articlesCount} مقالات • {category.readersCount.toLocaleString()} قارئ
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {category.trend === "up" ? (
                          <ArrowUp className="w-4 h-4 text-tunisia-green" />
                        ) : category.trend === "down" ? (
                          <ArrowDown className="w-4 h-4 text-tunisia-red" />
                        ) : null}
                        <Badge variant={category.trend === "up" ? "default" : "secondary"}>
                          {category.trendPercentage}%
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{category.description}</p>
                    
                    {/* Engagement */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-2">
                        <span>معدل التفاعل</span>
                        <span>{category.engagementRate}%</span>
                      </div>
                      <Progress value={category.engagementRate} className="h-2" />
                    </div>

                    {/* Social Impact Metrics */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-3 flex items-center">
                        <BarChart3 className="w-4 h-4 ml-1" />
                        التأثير المجتمعي
                      </h4>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>التوظيف</span>
                            <span>{category.socialImpact.employment}%</span>
                          </div>
                          <Progress value={category.socialImpact.employment} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>التعليم</span>
                            <span>{category.socialImpact.education}%</span>
                          </div>
                          <Progress value={category.socialImpact.education} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>الصحة</span>
                            <span>{category.socialImpact.healthcare}%</span>
                          </div>
                          <Progress value={category.socialImpact.healthcare} className="h-1" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>الاقتصاد</span>
                            <span>{category.socialImpact.economy}%</span>
                          </div>
                          <Progress value={category.socialImpact.economy} className="h-1" />
                        </div>
                      </div>
                    </div>

                    {/* Topics */}
                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">المواضيع الرئيسية</h4>
                      <div className="flex flex-wrap gap-2">
                        {category.topics.map((topic, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button variant="outline" className="w-full">
                      <MessageSquare className="w-4 h-4 ml-2" />
                      عرض المقالات
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Societal Trends */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4">التوجهات المجتمعية</h2>
          <p className="text-muted-foreground text-center mb-12">
            أهم التوجهات التي تشكل المجتمع التونسي حسب تحليل المحتوى
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {societalTrends.map((trend, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{trend.trend}</CardTitle>
                    <Badge className="bg-tunisia-orange text-white">
                      {trend.articles} مقالات
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>مستوى التأثير</span>
                      <span className="font-semibold">{trend.impact}%</span>
                    </div>
                    <Progress value={trend.impact} className="h-3" />
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-2">الكلمات المفتاحية</h4>
                    <div className="flex flex-wrap gap-2">
                      {trend.keywords.map((keyword, keyIndex) => (
                        <Badge key={keyIndex} variant="secondary" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">شارك في تشكيل المستقبل</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            ساهم بكتابة مقالات تؤثر على المجتمع وتساعد في بناء مستقبل أفضل لتونس
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary" size="lg">
              <BookOpen className="w-5 h-5 ml-2" />
              ابدأ الكتابة
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-primary">
              <Users className="w-5 h-5 ml-2" />
              انضم للمجتمع
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-hero text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">مركز تونس للمحتوى الذكي</h3>
              <p className="text-white/80">
                منصة المدونين التونسيين مع مساعد ذكي يساعدك في العصف الذهني، التخطيط، والكتابة
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="/articles" className="hover:text-white transition-colors">المقالات</a></li>
                <li><a href="/categories" className="hover:text-white transition-colors">الفئات</a></li>
                <li><a href="/writers" className="hover:text-white transition-colors">الكتّاب</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">حول الموقع</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-white/80">
                <li>البريد الإلكتروني: info@tunisiehub.com</li>
                <li>العنوان: تونس، تونس</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
            <p>&copy; 2024 مركز تونس للمحتوى الذكي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Categories;