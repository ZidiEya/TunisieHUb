import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import Articles from "./pages/Articles";
import ArticleDetail from "./pages/ArticleDetail";
import Categories from "./pages/Categories";
import WriteArticle from "./pages/WriteArticle";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import ChatWidget from "@/components/ChatWidget";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const openChat = () => setIsChatOpen(true);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <div className="min-h-screen bg-background">
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index onChatOpen={openChat} />} />
                <Route path="/about" element={<About onChatOpen={openChat} />} />
                <Route path="/articles" element={<Articles onChatOpen={openChat} />} />
                <Route path="/blog" element={<Articles onChatOpen={openChat} />} />
                <Route path="/article/:slug" element={<ArticleDetail onChatOpen={openChat} />} />
                <Route path="/categories" element={<Categories onChatOpen={openChat} />} />
                <Route path="/auth" element={<Auth onChatOpen={openChat} />} />
                <Route 
                  path="/write" 
                  element={
                    <ProtectedRoute>
                      <WriteArticle onChatOpen={openChat} />
                    </ProtectedRoute>
                  } 
                />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
              <ChatWidget isOpen={isChatOpen} onOpenChange={setIsChatOpen} />
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
