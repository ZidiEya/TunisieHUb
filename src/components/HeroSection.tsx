import { Button } from "@/components/ui/button";
import { MessageCircle, PenTool, Lightbulb } from "lucide-react";
import heroImage from "@/assets/hero-tunisia-blog.jpg";

interface HeroSectionProps {
  onChatOpen?: () => void;
}

const HeroSection = ({ onChatOpen }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            مركز تونس
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              للمحتوى الذكي
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            منصة المدونين التونسيين مع مساعد ذكي يساعدك في العصف الذهني، التخطيط، والكتابة
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button variant="hero" size="lg" className="text-lg px-8 py-4" onClick={onChatOpen}>
              <PenTool className="w-5 h-5" />
              ابدأ الكتابة الآن
            </Button>
            <Button variant="sunset" size="lg" className="text-lg px-8 py-4" onClick={onChatOpen}>
              <MessageCircle className="w-5 h-5" />
              جرب المساعد الذكي
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 text-white">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-tunisia-orange/20 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-tunisia-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">عصف ذهني</h3>
              <p className="text-white/80">احصل على أفكار مبتكرة لمواضيع مقالاتك</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-tunisia-red/20 rounded-full flex items-center justify-center mb-4">
                <PenTool className="w-8 h-8 text-tunisia-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">تخطيط المحتوى</h3>
              <p className="text-white/80">نظم أفكارك وخطط لمقالاتك بطريقة احترافية</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-warm-sunset/30 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="w-8 h-8 text-warm-sunset" />
              </div>
              <h3 className="text-xl font-semibold mb-2">مساعد الكتابة</h3>
              <p className="text-white/80">احصل على مساعدة في كتابة محتوى عالي الجودة</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;