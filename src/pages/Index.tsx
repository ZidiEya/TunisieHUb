import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import BlogArticles from "@/components/BlogArticles";
import ChatWidget from "@/components/ChatWidget";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection />
        <BlogArticles />
      </main>
      <ChatWidget />
      
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
                <li><a href="/blog" className="hover:text-white transition-colors">المقالات</a></li>
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
    </div>
  );
};

export default Index;