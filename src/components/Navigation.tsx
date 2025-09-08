import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { MessageCircle, Menu, X, Home, BookOpen, Tag, PenTool, User, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface NavigationProps {
  onChatOpen?: () => void;
}

const Navigation = ({ onChatOpen }: NavigationProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Blog Tunisia
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Home className="w-4 h-4" />
              Accueil
            </Link>
            <Link to="/articles" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Articles
            </Link>
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Tag className="w-4 h-4" />
              Catégories
            </Link>
            {user ? (
              <Link to="/write" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <PenTool className="w-4 h-4" />
                Écrire
              </Link>
            ) : (
              <Link to="/auth" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
                <User className="w-4 h-4" />
                Connexion
              </Link>
            )}
            <Link to="/about" className="text-foreground hover:text-primary transition-colors flex items-center gap-2">
              <User className="w-4 h-4" />
              À propos
            </Link>
          </div>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Déconnexion
              </Button>
            ) : (
              <Button variant="tunisia" asChild>
                <Link to="/auth">Se connecter</Link>
              </Button>
            )}
          </div>

          {/* Chat Assistant Button */}
          <Button
            variant="chat"
            size="icon"
            onClick={onChatOpen}
            className="fixed bottom-6 right-6 z-50"
            title="Assistant IA"
          >
            <MessageCircle className="w-5 h-5" />
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Home className="w-4 h-4" />
                Accueil
              </Link>
              <Link to="/articles" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                <BookOpen className="w-4 h-4" />
                Articles
              </Link>
              <Link to="/categories" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                <Tag className="w-4 h-4" />
                Catégories
              </Link>
              {user ? (
                <Link to="/write" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <PenTool className="w-4 h-4" />
                  Écrire
                </Link>
              ) : (
                <Link to="/auth" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-4 h-4" />
                  Connexion
                </Link>
              )}
              <Link to="/about" className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2" onClick={() => setIsMobileMenuOpen(false)}>
                <User className="w-4 h-4" />
                À propos
              </Link>
              
              {/* Mobile Auth Actions */}
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="text-foreground hover:text-primary transition-colors flex items-center gap-2 py-2 w-full text-left"
                >
                  <LogOut className="w-4 h-4" />
                  Déconnexion
                </button>
              ) : (
                <Link to="/auth" className="text-tunisia-red hover:text-tunisia-orange transition-colors flex items-center gap-2 py-2 font-medium" onClick={() => setIsMobileMenuOpen(false)}>
                  <User className="w-4 h-4" />
                  Se connecter
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;