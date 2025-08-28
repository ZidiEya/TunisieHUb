import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";

const BlogArticles = () => {
  const articles = [
    {
      id: 1,
      title: "كيف تكتب مقالاً مؤثراً يجذب القراء",
      excerpt: "تعلم الطرق الفعالة لكتابة محتوى يثير اهتمام جمهورك ويحقق انتشاراً واسعاً على وسائل التواصل الاجتماعي",
      category: "الكتابة",
      author: "أحمد بن سالم",
      date: "15 ديسمبر 2024",
      readTime: "5 دقائق",
      featured: true
    },
    {
      id: 2,
      title: "استراتيجيات التسويق الرقمي للمشاريع الصغيرة",
      excerpt: "دليل شامل للمشاريع الناشئة في تونس لبناء حضور رقمي قوي وزيادة المبيعات",
      category: "تسويق",
      author: "فاطمة الزهراء",
      date: "12 ديسمبر 2024",
      readTime: "8 دقائق",
      featured: true
    },
    {
      id: 3,
      title: "التكنولوجيا في التعليم: التحديات والفرص",
      excerpt: "نظرة على واقع دمج التكنولوجيا في التعليم التونسي والحلول المبتكرة",
      category: "تعليم",
      author: "محمد الناصر",
      date: "10 ديسمبر 2024",
      readTime: "6 دقائق",
      featured: false
    },
    {
      id: 4,
      title: "ريادة الأعمال في تونس: قصص نجاح ملهمة",
      excerpt: "تجارب رواد أعمال تونسيين حققوا نجاحاً باهراً في مختلف المجالات",
      category: "ريادة أعمال",
      author: "سارة بوجعفر",
      date: "8 ديسمبر 2024",
      readTime: "7 دقائق",
      featured: false
    },
    {
      id: 5,
      title: "الذكاء الاصطناعي وتأثيره على سوق العمل",
      excerpt: "كيف يمكن للمهنيين التونسيين التكيف مع التطورات الجديدة في عالم التكنولوجيا",
      category: "تكنولوجيا",
      author: "ياسين الكريم",
      date: "5 ديسمبر 2024",
      readTime: "9 دقائق",
      featured: false
    },
    {
      id: 6,
      title: "السياحة البيئية في تونس: استثمار المستقبل",
      excerpt: "فرص الاستثمار في السياحة المستدامة والحفاظ على البيئة التونسية",
      category: "بيئة",
      author: "لينا الهادي",
      date: "3 ديسمبر 2024",
      readTime: "4 دقائق",
      featured: false
    }
  ];

  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  return (
    <section className="py-16 bg-gradient-to-b from-background to-desert-sand/20">
      <div className="container mx-auto px-4">
        {/* Featured Articles */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-2">المقالات المميزة</h2>
          <p className="text-muted-foreground text-center mb-12">أحدث وأهم المقالات من كتّابنا المتميزين</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-tunisia-orange text-white">
                      <Tag className="w-3 h-3 ml-1" />
                      {article.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="text-2xl font-bold hover:text-tunisia-orange transition-colors cursor-pointer">
                    {article.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <User className="w-4 h-4 ml-1" />
                        {article.author}
                      </div>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 ml-1" />
                        {article.date}
                      </div>
                    </div>
                    <Button variant="tunisia" size="sm">
                      اقرأ المزيد
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Regular Articles */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">أحدث المقالات</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold hover:text-tunisia-orange transition-colors cursor-pointer line-clamp-2">
                    {article.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-tunisia-orange hover:text-tunisia-red">
                      اقرأ
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            عرض جميع المقالات
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogArticles;