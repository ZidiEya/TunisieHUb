/**
 * Index.tsx - Main landing page component  
 * Composant de page d'accueil principal
 * 
 * Combines navigation, hero section, blog articles, and footer
 * Combine navigation, section héros, articles de blog et pied de page
 */

// Component imports / Importations de composants
import Navigation from "@/components/Navigation";
import HeroSection from "@/components/HeroSection";
import BlogArticles from "@/components/BlogArticles";

/**
 * Props interface for Index page
 * Interface des props pour la page Index
 */
interface IndexProps {
  onChatOpen: () => void; // Function to open chat widget / Fonction pour ouvrir le widget de chat
}

/**
 * Index Component - Main landing page layout
 * Composant Index - Mise en page principale de la page d'accueil
 * 
 * @param onChatOpen - Function to open chat widget / Fonction pour ouvrir le widget de chat
 */
const Index = ({ onChatOpen }: IndexProps) => {
  return (
    <>
      {/* Main Navigation */}
      {/* Navigation Principale */}
      <Navigation onChatOpen={onChatOpen} />
      
      {/* Main Content Area */}
      {/* Zone de Contenu Principal */}
      <main>
        {/* Hero Section with call-to-actions */}
        {/* Section Héros avec appels à l'action */}
        <HeroSection onChatOpen={onChatOpen} />
        
        {/* Blog Articles Showcase */}
        {/* Vitrine des Articles de Blog */}
        <BlogArticles />
      </main>
      
      {/* Site Footer with links and contact info */}
      {/* Pied de page du site avec liens et informations de contact */}
      <footer className="bg-gradient-hero text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Company Information / Informations de l'Entreprise */}
            <div>
              <h3 className="text-xl font-bold mb-4">مركز تونس للمحتوى الذكي</h3>
              <p className="text-white/80">
                منصة المدونين التونسيين مع مساعد ذكي يساعدك في العصف الذهني، التخطيط، والكتابة
              </p>
            </div>
            
            {/* Quick Links / Liens Rapides */}
            <div>
              <h4 className="font-semibold mb-4">روابط سريعة</h4>
              <ul className="space-y-2 text-white/80">
                <li><a href="/blog" className="hover:text-white transition-colors">المقالات</a></li>
                <li><a href="/categories" className="hover:text-white transition-colors">الفئات</a></li>
                <li><a href="/writers" className="hover:text-white transition-colors">الكتّاب</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">حول الموقع</a></li>
              </ul>
            </div>
            
            {/* Contact Information / Informations de Contact */}
            <div>
              <h4 className="font-semibold mb-4">تواصل معنا</h4>
              <ul className="space-y-2 text-white/80">
                <li>البريد الإلكتروني: info@tunisiehub.com</li>
                <li>هاتف: +216 70 123 456</li>
                <li>العنوان: تونس، تونس</li>
              </ul>
            </div>
          </div>
          
          {/* Copyright / Droits d'auteur */}
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-white/80">
            <p>&copy; 2024 مركز تونس للمحتوى الذكي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Index;