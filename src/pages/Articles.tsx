import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, User, Tag, ArrowRight, Search, Filter } from "lucide-react";
import Navigation from "@/components/Navigation";

interface ArticlesProps {
  onChatOpen: () => void;
}

const Articles = ({ onChatOpen }: ArticlesProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const articles = [
    {
      id: 1,
      title: "دليل المبتدئين لاستخدام ChatGPT في إنشاء المحتوى",
      excerpt: "تعلم كيفية الاستفادة من قوة الذكاء الاصطناعي لإنشاء محتوى إبداعي ومؤثر باللغة العربية",
      category: "ذكاء اصطناعي",
      author: "أحمد التكنولوجي",
      date: "20 ديسمبر 2024",
      readTime: "7 دقائق",
      featured: true
    },
    {
      id: 2,
      title: "أدوات الذكاء الاصطناعي التي تحتاجها كل شركة ناشئة",
      excerpt: "استكشف أفضل أدوات الذكاء الاصطناعي المجانية والمدفوعة لتطوير أعمالك وزيادة الإنتاجية",
      category: "ذكاء اصطناعي",
      author: "فاطمة الذكية",
      date: "18 ديسمبر 2024",
      readTime: "10 دقائق",
      featured: true
    },
    {
      id: 3,
      title: "كيف تكتب مقالاً مؤثراً يجذب القراء",
      excerpt: "تعلم الطرق الفعالة لكتابة محتوى يثير اهتمام جمهورك ويحقق انتشاراً واسعاً على وسائل التواصل الاجتماعي",
      category: "الكتابة",
      author: "أحمد بن سالم",
      date: "15 ديسمبر 2024",
      readTime: "5 دقائق",
      slug: "how-to-write-engaging-articles",
      featured: false
    },
    {
      id: 4,
      title: "تعلم الآلة: مقدمة للمطورين العرب",
      excerpt: "دليل شامل لفهم أساسيات تعلم الآلة وكيفية البدء في هذا المجال المتنامي",
      category: "ذكاء اصطناعي",
      author: "محمد المطور",
      date: "13 ديسمبر 2024",
      readTime: "12 دقائق",
      featured: false
    },
    {
      id: 5,
      title: "استراتيجيات التسويق الرقمي للمشاريع الصغيرة",
      excerpt: "دليل شامل للمشاريع الناشئة في تونس لبناء حضور رقمي قوي وزيادة المبيعات",
      category: "تسويق",
      author: "فاطمة الزهراء",
      date: "12 ديسمبر 2024",
      readTime: "8 دقائق",
      featured: false
    },
    {
      id: 6,
      title: "الذكاء الاصطناعي في التعليم: ثورة حقيقية أم مجرد ضجيج؟",
      excerpt: "نظرة عميقة على تطبيقات الذكاء الاصطناعي في التعليم وتأثيرها على المستقبل",
      category: "ذكاء اصطناعي",
      author: "د. سارة التعليمية",
      date: "10 ديسمبر 2024",
      readTime: "8 دقائق",
      featured: false
    },
    {
      id: 7,
      title: "كيف تحمي بياناتك من مخاطر الذكاء الاصطناعي",
      excerpt: "نصائح عملية لحماية خصوصيتك وبياناتك الشخصية في عصر الذكاء الاصطناعي",
      category: "ذكاء اصطناعي",
      author: "خالد الأمني",
      date: "8 ديسمبر 2024",
      readTime: "6 دقائق",
      featured: false
    },
    {
      id: 8,
      title: "ريادة الأعمال في تونس: قصص نجاح ملهمة",
      excerpt: "تجارب رواد أعمال تونسيين حققوا نجاحاً باهراً في مختلف المجالات",
      category: "ريادة أعمال",
      author: "سارة بوجعفر",
      date: "7 ديسمبر 2024",
      readTime: "7 دقائق",
      featured: false
    },
    {
      id: 9,
      title: "الذكاء الاصطناعي وتأثيره على سوق العمل",
      excerpt: "كيف يمكن للمهنيين التونسيين التكيف مع التطورات الجديدة في عالم التكنولوجيا",
      category: "ذكاء اصطناعي",
      author: "ياسين الكريم",
      date: "5 ديسمبر 2024",
      readTime: "9 دقائق",
      featured: false
    },
    {
      id: 10,
      title: "بناء روبوت دردشة ذكي باستخدام تقنيات الذكاء الاصطناعي",
      excerpt: "دليل عملي لإنشاء روبوت دردشة متطور يفهم اللغة العربية ويقدم إجابات مفيدة",
      category: "ذكاء اصطناعي",
      author: "عمر المبرمج",
      date: "3 ديسمبر 2024",
      readTime: "15 دقائق",
      featured: false
    },
    {
      id: 11,
      title: "مستقبل الذكاء الاصطناعي في الشرق الأوسط",
      excerpt: "توقعات وتحليلات حول اتجاهات الذكاء الاصطناعي في المنطقة العربية والفرص المتاحة",
      category: "ذكاء اصطناعي",
      author: "د. ليلى المستقبلية",
      date: "1 ديسمبر 2024",
      readTime: "11 دقائق",
      featured: false
    }
  ];

  const categories = ["الكل", "ذكاء اصطناعي", "الكتابة", "تسويق", "ريادة أعمال"];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "الكل" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <Navigation onChatOpen={onChatOpen} />
      
      {/* Hero Section */}
      <section className="py-16 bg-gradient-hero text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">المقالات</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            اكتشف أحدث المقالات في مجال الذكاء الاصطناعي والتكنولوجيا من كتّابنا المتميزين
          </p>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-8 bg-background border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="ابحث في المقالات..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pr-10"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "tunisia" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      article.featured 
                        ? 'bg-tunisia-orange text-white' 
                        : 'bg-secondary text-secondary-foreground'
                    }`}>
                      <Tag className="w-3 h-3 ml-1" />
                      {article.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  <h3 className={`font-bold hover:text-tunisia-orange transition-colors cursor-pointer ${
                    article.featured ? 'text-xl' : 'text-lg'
                  }`}>
                    {article.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 leading-relaxed line-clamp-3">
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

          {filteredArticles.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">لم يتم العثور على مقالات تطابق بحثك</p>
            </div>
          )}
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
                <li>هاتف: +216 70 123 456</li>
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

export default Articles;