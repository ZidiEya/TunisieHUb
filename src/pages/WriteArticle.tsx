import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Eye } from "lucide-react";

const articleSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200, "Le titre ne peut pas dépasser 200 caractères"),
  content: z.string().min(1, "Le contenu est requis"),
  excerpt: z.string().optional(),
  categoryId: z.string().optional(),
  featuredImageUrl: z.string().url("URL invalide").optional().or(z.literal("")),
  isFeatured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
});

type ArticleFormData = z.infer<typeof articleSchema>;

interface Category {
  id: string;
  name: string;
}

const WriteArticle = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const form = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      content: "",
      excerpt: "",
      categoryId: "",
      featuredImageUrl: "",
      isFeatured: false,
      status: "draft",
    },
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name")
      .order("name");

    if (error) {
      console.error("Error fetching categories:", error);
      return;
    }

    setCategories(data || []);
  };

  const generateSlug = (title: string): string => {
    return title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
  };

  const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const words = content.trim().split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const onSubmit = async (data: ArticleFormData) => {
    try {
      setIsLoading(true);

      // Get current user session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session?.user) {
        toast({
          title: "Erreur",
          description: "Vous devez être connecté pour créer un article",
          variant: "destructive",
        });
        return;
      }

      // Get or create author profile
      let { data: author } = await supabase
        .from("authors")
        .select("id")
        .eq("user_id", session.user.id)
        .single();

      if (!author) {
        const { data: newAuthor, error: authorError } = await supabase
          .from("authors")
          .insert({
            user_id: session.user.id,
            display_name: session.user.email?.split("@")[0] || "Auteur",
            bio: "Nouvel auteur",
          })
          .select("id")
          .single();

        if (authorError) {
          console.error("Error creating author:", authorError);
          toast({
            title: "Erreur",
            description: "Erreur lors de la création du profil auteur",
            variant: "destructive",
          });
          return;
        }

        author = newAuthor;
      }

      const slug = generateSlug(data.title);
      const readingTime = calculateReadingTime(data.content);

      const articleData = {
        title: data.title,
        content: data.content,
        excerpt: data.excerpt || data.content.substring(0, 200) + "...",
        slug,
        author_id: author.id,
        category_id: data.categoryId || null,
        featured_image_url: data.featuredImageUrl || null,
        is_featured: data.isFeatured,
        reading_time: readingTime,
        status: data.status,
        published_at: data.status === "published" ? new Date().toISOString() : null,
      };

      const { error } = await supabase
        .from("articles")
        .insert(articleData);

      if (error) {
        console.error("Error creating article:", error);
        toast({
          title: "Erreur",
          description: "Erreur lors de la création de l'article",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Succès",
        description: `Article ${data.status === "published" ? "publié" : "sauvegardé"} avec succès`,
      });

      navigate("/articles");

    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const saveDraft = () => {
    form.setValue("status", "draft");
    form.handleSubmit(onSubmit)();
  };

  const publish = () => {
    form.setValue("status", "published");
    form.handleSubmit(onSubmit)();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold text-foreground">Écrire un article</h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={saveDraft}
              disabled={isLoading}
            >
              <Save className="w-4 h-4 mr-2" />
              Brouillon
            </Button>
            <Button
              variant="tunisia"
              onClick={publish}
              disabled={isLoading}
            >
              <Eye className="w-4 h-4 mr-2" />
              Publier
            </Button>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form className="space-y-8">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Titre de l'article</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Saisissez le titre de votre article..."
                      className="text-lg py-3"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Excerpt */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Résumé (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Rédigez un court résumé de votre article..."
                      className="resize-none"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Un résumé attrayant aidera les lecteurs à découvrir votre article
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-lg font-semibold">Contenu de l'article</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Rédigez le contenu de votre article..."
                      className="min-h-[400px] resize-y"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Metadata Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Category */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catégorie</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Sélectionnez une catégorie" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Featured Image */}
              <FormField
                control={form.control}
                name="featuredImageUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image à la une (URL)</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Featured Article Toggle */}
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border border-input bg-card p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base font-medium">
                      Article à la une
                    </FormLabel>
                    <FormDescription>
                      Cet article apparaîtra en vedette sur la page d'accueil
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default WriteArticle;