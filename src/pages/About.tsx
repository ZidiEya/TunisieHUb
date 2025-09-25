import Navigation from "@/components/Navigation";
import ChatWidget from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { MessageCircle, PenTool, Lightbulb, Target, Users, Award } from "lucide-react";

interface AboutProps {
  onChatOpen: () => void;
}

const About = ({ onChatOpen }: AboutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation onChatOpen={onChatOpen} />
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-hero text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              حول مركز تونس للمحتوى الذكي
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              منصة رائدة تجمع بين قوة الكتابة التقليدية وإمكانيات الذكاء الاصطناعي لخدمة المدونين والكتّاب التونسيين
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8">
                رسالتنا
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                نهدف إلى تمكين الكتّاب والمدونين التونسيين من إنتاج محتوى عالي الجودة باستخدام أحدث تقنيات الذكاء الاصطناعي. نوفر بيئة إبداعية تساعد على العصف الذهني، التخطيط، والكتابة بطريقة احترافية ومبتكرة.
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 rounded-lg bg-card border border-border">
                <div className="w-16 h-16 bg-tunisia-orange/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Lightbulb className="w-8 h-8 text-tunisia-orange" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">العصف الذهني الذكي</h3>
                <p className="text-muted-foreground">
                  استخدم قوة الذكاء الاصطناعي للحصول على أفكار مبتكرة ومواضيع جذابة لمقالاتك ومدوناتك
                </p>
              </div>

              <div className="text-center p-8 rounded-lg bg-card border border-border">
                <div className="w-16 h-16 bg-tunisia-red/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PenTool className="w-8 h-8 text-tunisia-red" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">تخطيط المحتوى</h3>
                <p className="text-muted-foreground">
                  نظم أفكارك وخطط لمحتواك بطريقة منهجية واحترافية مع أدوات التخطيط المتقدمة
                </p>
              </div>

              <div className="text-center p-8 rounded-lg bg-card border border-border">
                <div className="w-16 h-16 bg-warm-sunset/30 rounded-full flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-warm-sunset" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-foreground">مساعد الكتابة</h3>
                <p className="text-muted-foreground">
                  احصل على مساعدة فورية في كتابة المحتوى وتحسين الأسلوب والجودة الإجمالية لنصوصك
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-center text-foreground mb-16">
                قيمنا الأساسية
              </h2>
              
              <div className="grid md:grid-cols-2 gap-12">
                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-tunisia-orange/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-tunisia-orange" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">الجودة والإبداع</h3>
                    <p className="text-muted-foreground">
                      نسعى دائماً لتقديم أعلى مستوى من الجودة في المحتوى والخدمات، مع التركيز على الإبداع والابتكار في كل ما نقدمه.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-tunisia-red/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-tunisia-red" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">المجتمع والتعاون</h3>
                    <p className="text-muted-foreground">
                      نؤمن بقوة المجتمع والتعاون بين الكتّاب والمدونين لتبادل الخبرات والمعرفة وتطوير المحتوى العربي.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-warm-sunset/30 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-warm-sunset" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">التميز والاحترافية</h3>
                    <p className="text-muted-foreground">
                      نلتزم بمعايير عالية من التميز والاحترافية في جميع خدماتنا ومنتجاتنا لضمان تجربة مميزة لمستخدمينا.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-gradient-hero rounded-lg flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-foreground">التطوير المستمر</h3>
                    <p className="text-muted-foreground">
                      نواكب أحدث التطورات في مجال الذكاء الاصطناعي والتقنيات الحديثة لتقديم أفضل الأدوات والحلول لكتّابنا.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-8">
                ابدأ رحلتك في الكتابة الذكية
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                انضم إلى مجتمع الكتّاب التونسيين واستفد من قوة الذكاء الاصطناعي في إنتاج محتوى مميز وإبداعي
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="hero" size="lg" className="text-lg px-8 py-4">
                  <PenTool className="w-5 h-5" />
                  ابدأ الكتابة الآن
                </Button>
                <Button variant="sunset" size="lg" className="text-lg px-8 py-4">
                  <MessageCircle className="w-5 h-5" />
                  جرب المساعد الذكي
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
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

export default About;