/**
 * BlogArticles.tsx - Blog articles listing component
 * Composant de liste des articles de blog
 * 
 * Displays featured and regular articles with metadata and navigation
 * Affiche les articles vedettes et réguliers avec métadonnées et navigation
 */

// React hooks / Hooks React
import { useState, useEffect } from "react";

// UI Components / Composants UI
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// Icons / Icônes  
import { Calendar, User, Tag, ArrowRight, Loader2 } from "lucide-react";

// Routing / Routage
import { Link } from "react-router-dom";

// Supabase client / Client Supabase
import { supabase } from "@/integrations/supabase/client";

/**
 * Article type definition / Définition du type d'article
 */
interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  featured: boolean;
}

/**
 * BlogArticles Component - Displays categorized articles with different layouts
 * Composant BlogArticles - Affiche les articles catégorisés avec différentes mises en page
 * 
 * Features separate sections for featured articles and regular articles
 * Comprend des sections séparées pour les articles vedettes et les articles réguliers
 */
const BlogArticles = () => {
  // State management for articles and pagination / Gestion d'état pour les articles et la pagination
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const articlesPerPage = 6;

  /**
   * Fetch articles from Supabase database
   * Récupérer les articles de la base de données Supabase
   */
  const fetchArticles = async (pageNum = 0, append = false) => {
    try {
      if (!append) setLoading(true);
      else setLoadingMore(true);

      const from = pageNum * articlesPerPage;
      const to = from + articlesPerPage - 1;

      const { data, error } = await supabase
        .from('articles')
        .select('*')
        .eq('status', 'published')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      // Transform database data to match our interface
      // Transformer les données de la base de données pour correspondre à notre interface
      const transformedArticles: Article[] = (data || []).map(article => ({
        id: article.id,
        title: article.title,
        excerpt: article.excerpt || 'اقرأ المقال للمزيد من التفاصيل',
        category: 'عام', // Default category if none exists / Catégorie par défaut si aucune n'existe
        author: 'كاتب مجهول', // Default author if none exists / Auteur par défaut si aucun n'existe
        date: new Date(article.created_at).toLocaleDateString('ar-SA'),
        readTime: `${article.reading_time || 5} دقائق`,
        slug: article.slug,
        featured: article.is_featured || false
      }));

      if (append) {
        setArticles(prev => [...prev, ...transformedArticles]);
      } else {
        setArticles(transformedArticles);
      }

      // Check if there are more articles / Vérifier s'il y a plus d'articles
      setHasMore(transformedArticles.length === articlesPerPage);
      
    } catch (error) {
      console.error('Error fetching articles:', error);
      // Add some static fallback articles / Ajouter des articles de secours statiques
      if (!append && articles.length === 0) {
        setArticles([
          {
            id: '1',
            title: "دليل المبتدئين لاستخدام ChatGPT في إنشاء المحتوى",
            excerpt: "تعلم كيفية الاستفادة من قوة الذكاء الاصطناعي لإنشاء محتوى إبداعي ومؤثر باللغة العربية",
            category: "ذكاء اصطناعي",
            author: "أحمد التكنولوجي",
            date: "20 ديسمبر 2024",
            readTime: "7 دقائق",
            slug: "guide-chatgpt-content-creation",
            featured: true
          },
          {
            id: '2',
            title: "كيف تكتب مقالاً مؤثراً يجذب القراء",
            excerpt: "تعلم الطرق الفعالة لكتابة محتوى يثير اهتمام جمهورك ويحقق انتشاراً واسعاً على وسائل التواصل الاجتماعي",
            category: "الكتابة",
            author: "أحمد بن سالم",
            date: "15 ديسمبر 2024",
            readTime: "5 دقائق",
            slug: "how-to-write-engaging-articles",
            featured: false
          }
        ]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  /**
   * Load more articles / Charger plus d'articles
   */
  const loadMoreArticles = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchArticles(nextPage, true);
  };

  /**
   * Initialize component by fetching initial articles
   * Initialiser le composant en récupérant les articles initiaux
   */
  useEffect(() => {
    fetchArticles();
  }, []);

  /**
   * Filter articles by featured status for different display sections
   * Filtrer les articles par statut vedette pour différentes sections d'affichage
   */
  const featuredArticles = articles.filter(article => article.featured);
  const regularArticles = articles.filter(article => !article.featured);

  // Loading state / État de chargement
  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-background to-desert-sand/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-tunisia-orange" />
            <span className="mr-3 text-lg">جاري تحميل المقالات...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-background to-desert-sand/20">
      <div className="container mx-auto px-4">
        
        {/* Featured Articles Section */}
        {/* Section des Articles Vedettes */}
        <div className="mb-16">
          <h2 className="text-4xl font-bold text-center mb-2">المقالات المميزة</h2>
          <p className="text-muted-foreground text-center mb-12">أحدث وأهم المقالات من كتّابنا المتميزين</p>
          
          {/* Featured Articles Grid - 2 columns on desktop */}
          {/* Grille d'Articles Vedettes - 2 colonnes sur desktop */}
          <div className="grid md:grid-cols-2 gap-8">
            {featuredArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-warm transition-all duration-300 hover:-translate-y-1 bg-gradient-card">
                <CardHeader className="pb-4">
                  {/* Article metadata header / En-tête de métadonnées d'article */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-tunisia-orange text-white">
                      <Tag className="w-3 h-3 ml-1" />
                      {article.category}
                    </span>
                    <span className="text-sm text-muted-foreground">{article.readTime}</span>
                  </div>
                  {/* Article title with hover effect / Titre d'article avec effet de survol */}
                  <h3 className="text-2xl font-bold hover:text-tunisia-orange transition-colors cursor-pointer">
                    {article.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  {/* Article excerpt / Extrait d'article */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {article.excerpt}
                  </p>
                  
                  {/* Author and date info with read more button */}
                  {/* Informations auteur et date avec bouton lire la suite */}
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
                    <Button variant="tunisia" size="sm" asChild>
                      <Link to={`/article/${article.slug}`}>
                        اقرأ المزيد
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Regular Articles Section */}
        {/* Section des Articles Réguliers */}
        <div>
          <h2 className="text-3xl font-bold text-center mb-12">أحدث المقالات</h2>
          
          {/* Regular Articles Grid - 3 columns on large screens */}
          {/* Grille d'Articles Réguliers - 3 colonnes sur grands écrans */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularArticles.map((article) => (
              <Card key={article.id} className="overflow-hidden hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  {/* Compact metadata for regular articles */}
                  {/* Métadonnées compactes pour les articles réguliers */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground">
                      {article.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                  </div>
                  
                  {/* Article title with line clamping for consistent layout */}
                  {/* Titre d'article avec limitation de lignes pour une mise en page cohérente */}
                  <h3 className="text-lg font-semibold hover:text-tunisia-orange transition-colors cursor-pointer line-clamp-2">
                    {article.title}
                  </h3>
                </CardHeader>
                <CardContent>
                  {/* Truncated excerpt with line clamping */}
                  {/* Extrait tronqué avec limitation de lignes */}
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  {/* Compact author info and read button */}
                  {/* Informations auteur compactes et bouton de lecture */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                    </div>
                    <Button variant="ghost" size="sm" className="text-tunisia-orange hover:text-tunisia-red" asChild>
                      <Link to={`/article/${article.slug}`}>
                        اقرأ
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Load More Articles Button */}
        {/* Bouton Charger Plus d'Articles */}
        {hasMore && (
          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg" 
              onClick={loadMoreArticles}
              disabled={loadingMore}
            >
              {loadingMore ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin ml-2" />
                  جاري التحميل...
                </>
              ) : (
                <>
                  عرض مقالات أخرى
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        )}

        {/* View All Articles Button */}
        {/* Bouton Voir Tous les Articles */}
        <div className="text-center mt-8">
          <Button variant="ghost" size="lg" asChild>
            <Link to="/articles">
              عرض جميع المقالات
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BlogArticles;