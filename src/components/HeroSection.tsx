/**
 * HeroSection.tsx - Landing page hero component
 * Composant héros de la page d'accueil
 * 
 * Features a background image, multilingual content, and call-to-action buttons
 * Présente une image de fond, un contenu multilingue et des boutons d'appel à l'action
 */

// UI Components / Composants UI
import { Button } from "@/components/ui/button";

// Icons / Icônes
import { MessageCircle, PenTool, Lightbulb } from "lucide-react";

// Assets / Ressources
import heroImage from "@/assets/hero-tunisia-blog.jpg";

/**
 * Props interface for HeroSection component
 * Interface des props pour le composant HeroSection
 */
interface HeroSectionProps {
  onChatOpen?: () => void; // Optional callback to open chat widget / Callback optionnel pour ouvrir le widget de chat
}

/**
 * HeroSection Component - Main landing page hero with CTA
 * Composant HeroSection - Héros principal de la page d'accueil avec CTA
 * 
 * Displays the main value proposition with background image and feature highlights
 * Affiche la proposition de valeur principale avec image de fond et points forts
 * 
 * @param onChatOpen - Function to open chat widget / Fonction pour ouvrir le widget de chat
 */
const HeroSection = ({ onChatOpen }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      
      {/* Background Image with Overlay */}
      {/* Image de fond avec superposition */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* Gradient overlay for text readability / Superposition de dégradé pour la lisibilité du texte */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent"></div>
      </div>

      {/* Main Content Container */}
      {/* Conteneur du contenu principal */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          
          {/* Main Heading - Bilingual (Arabic/French) */}
          {/* Titre principal - Bilingue (Arabe/Français) */}
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            مركز تونس
            <span className="block bg-gradient-hero bg-clip-text text-transparent">
              للمحتوى الذكي
            </span>
          </h1>
          
          {/* Subtitle - Arabic description */}
          {/* Sous-titre - Description en arabe */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            منصة المدونين التونسيين مع مساعد ذكي يساعدك في العصف الذهني، التخطيط، والكتابة
          </p>

          {/* Call-to-Action Buttons */}
          {/* Boutons d'appel à l'action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            {/* Primary CTA - Start Writing */}
            {/* CTA Principal - Commencer l'écriture */}
            <Button variant="hero" size="lg" className="text-lg px-8 py-4" onClick={onChatOpen}>
              <PenTool className="w-5 h-5" />
              ابدأ الكتابة الآن
            </Button>
            
            {/* Secondary CTA - Try AI Assistant */}
            {/* CTA Secondaire - Essayer l'assistant IA */}
            <Button variant="sunset" size="lg" className="text-lg px-8 py-4" onClick={onChatOpen}>
              <MessageCircle className="w-5 h-5" />
              جرب المساعد الذكي
            </Button>
          </div>

          {/* Feature Highlights Grid */}
          {/* Grille des points forts des fonctionnalités */}
          <div className="grid md:grid-cols-3 gap-8 text-white">
            
            {/* Feature 1: Brainstorming */}
            {/* Fonctionnalité 1 : Brainstorming */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-tunisia-orange/20 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-tunisia-orange" />
              </div>
              <h3 className="text-xl font-semibold mb-2">عصف ذهني</h3>
              <p className="text-white/80">احصل على أفكار مبتكرة لمواضيع مقالاتك</p>
            </div>
            
            {/* Feature 2: Content Planning */}
            {/* Fonctionnalité 2 : Planification de contenu */}
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-tunisia-red/20 rounded-full flex items-center justify-center mb-4">
                <PenTool className="w-8 h-8 text-tunisia-red" />
              </div>
              <h3 className="text-xl font-semibold mb-2">تخطيط المحتوى</h3>
              <p className="text-white/80">نظم أفكارك وخطط لمقالاتك بطريقة احترافية</p>
            </div>
            
            {/* Feature 3: Writing Assistant */}
            {/* Fonctionnalité 3 : Assistant d'écriture */}
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