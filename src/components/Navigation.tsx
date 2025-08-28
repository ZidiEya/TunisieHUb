import { Button } from "@/components/ui/button";
import { Menu, MessageCircle, BookOpen, Users, Home } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-hero rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              Tunisie Hub
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="flex items-center space-x-2 text-foreground hover:text-tunisia-orange transition-smooth">
              <Home className="w-4 h-4" />
              <span>الرئيسية</span>
            </a>
            <a href="/blog" className="flex items-center space-x-2 text-foreground hover:text-tunisia-orange transition-smooth">
              <BookOpen className="w-4 h-4" />
              <span>المقالات</span>
            </a>
            <a href="/categories" className="flex items-center space-x-2 text-foreground hover:text-tunisia-orange transition-smooth">
              <Users className="w-4 h-4" />
              <span>الفئات</span>
            </a>
            <a href="/about" className="text-foreground hover:text-tunisia-orange transition-smooth">
              حول الموقع
            </a>
          </div>

          {/* Chat Button */}
          <div className="hidden md:block">
            <Button variant="chat" size="sm">
              <MessageCircle className="w-4 h-4" />
              مساعد الكتابة
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="w-5 h-5" />
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <a href="/" className="flex items-center space-x-2 text-foreground hover:text-tunisia-orange transition-smooth">
                <Home className="w-4 h-4" />
                <span>الرئيسية</span>
              </a>
              <a href="/blog" className="flex items-center space-x-2 text-foreground hover:text-tunisia-orange transition-smooth">
                <BookOpen className="w-4 h-4" />
                <span>المقالات</span>
              </a>
              <a href="/categories" className="flex items-center space-x-2 text-foreground hover:text-tunisia-orange transition-smooth">
                <Users className="w-4 h-4" />
                <span>الفئات</span>
              </a>
              <a href="/about" className="text-foreground hover:text-tunisia-orange transition-smooth">
                حول الموقع
              </a>
              <Button variant="chat" size="sm" className="self-start">
                <MessageCircle className="w-4 h-4" />
                مساعد الكتابة
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;