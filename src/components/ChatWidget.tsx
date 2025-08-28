import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { 
  MessageCircle, 
  Send, 
  X, 
  Bot, 
  User, 
  Lightbulb, 
  PenTool, 
  BookOpen,
  Copy,
  ThumbsUp,
  ThumbsDown,
  Mic,
  FileText,
  Search,
  Zap,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Sparkles
} from "lucide-react";

interface ChatWidgetProps {
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ChatWidget = ({ isOpen: externalIsOpen, onOpenChange }: ChatWidgetProps = {}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = externalIsOpen !== undefined ? externalIsOpen : internalIsOpen;
  const [isTyping, setIsTyping] = useState(false);
  const [activeTab, setActiveTab] = useState('chat'); // 'chat', 'templates', 'stats'
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'مرحباً! أنا مساعدك الذكي للكتابة 🤖\n\nيمكنني مساعدتك في:\n• العصف الذهني للأفكار\n• تخطيط وهيكلة المقالات\n• تحسين الأسلوب والنحو\n• اقتراح عناوين جذابة\n• تحسين SEO\n\nكيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date(),
      rating: null
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const quickActions = [
    { icon: Lightbulb, text: 'أفكار للمواضيع', action: 'brainstorm', color: 'bg-yellow-500' },
    { icon: PenTool, text: 'تخطيط المقال', action: 'outline', color: 'bg-blue-500' },
    { icon: BookOpen, text: 'تحسين النص', action: 'improve', color: 'bg-green-500' },
    { icon: Target, text: 'عناوين جذابة', action: 'headlines', color: 'bg-purple-500' },
    { icon: Search, text: 'تحسين SEO', action: 'seo', color: 'bg-orange-500' },
    { icon: Zap, text: 'تلخيص المحتوى', action: 'summarize', color: 'bg-pink-500' }
  ];

  const writingTemplates = [
    {
      title: 'مقال إعلامي',
      description: 'قالب لكتابة مقال إعلامي متوازن',
      structure: ['مقدمة', 'خلفية الموضوع', 'النقاط الرئيسية', 'آراء الخبراء', 'خاتمة']
    },
    {
      title: 'مراجعة المنتج',
      description: 'قالب لمراجعة شاملة للمنتجات',
      structure: ['نظرة عامة', 'المميزات', 'العيوب', 'المقارنة', 'التوصية']
    },
    {
      title: 'دليل تعليمي',
      description: 'قالب لكتابة دليل خطوة بخطوة',
      structure: ['المتطلبات', 'الخطوات', 'النصائح', 'حل المشاكل', 'الخلاصة']
    }
  ];

  const suggestedPrompts = [
    'اكتب مقالاً عن تأثير الذكاء الاصطناعي على المجتمع',
    'ساعدني في إنشاء خطة محتوى لمدونة تقنية',
    'اقترح عناوين جذابة لمقال عن ريادة الأعمال',
    'كيف أحسن من استخدام الكلمات المفتاحية؟',
    'ما هي أفضل طريقة لكتابة مقدمة مؤثرة؟'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    // Handle commands
    if (inputMessage.startsWith('/')) {
      handleCommand(inputMessage);
      return;
    }

    // Handle editing existing message
    if (editingMessageId !== null) {
      setMessages(messages.map(msg => 
        msg.id === editingMessageId 
          ? { ...msg, content: inputMessage, timestamp: new Date() }
          : msg
      ));
      setEditingMessageId(null);
      setInputMessage('');
      return;
    }

    const newMessage = {
      id: Date.now(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
      rating: null
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate more intelligent bot responses
    setTimeout(() => {
      const responses = getIntelligentResponse(inputMessage);
      const botResponse = {
        id: Date.now() + 1,
        type: 'bot',
        content: responses,
        timestamp: new Date(),
        rating: null
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCommand = (command: string) => {
    const parts = command.split(' ');
    const cmd = parts[0].toLowerCase();
    
    switch (cmd) {
      case '/delete':
        if (parts[1] === 'all') {
          // Keep only the initial bot message
          setMessages(messages.slice(0, 1));
          const botResponse = {
            id: Date.now(),
            type: 'bot',
            content: '✅ تم حذف جميع الرسائل بنجاح!',
            timestamp: new Date(),
            rating: null
          };
          setMessages(prev => [...prev.slice(0, 1), botResponse]);
        } else if (parts[1]) {
          const messageId = parseInt(parts[1]);
          const messageToDelete = messages.find(msg => msg.id === messageId);
          if (messageToDelete) {
            setMessages(messages.filter(msg => msg.id !== messageId));
            const botResponse = {
              id: Date.now(),
              type: 'bot',
              content: '✅ تم حذف الرسالة بنجاح!',
              timestamp: new Date(),
              rating: null
            };
            setMessages(prev => [...prev.filter(msg => msg.id !== messageId), botResponse]);
          } else {
            const botResponse = {
              id: Date.now(),
              type: 'bot',
              content: '❌ لم يتم العثور على الرسالة المطلوبة.',
              timestamp: new Date(),
              rating: null
            };
            setMessages(prev => [...prev, botResponse]);
          }
        } else {
          const botResponse = {
            id: Date.now(),
            type: 'bot',
            content: '💡 **أوامر الحذف المتاحة:**\n\n• `/delete all` - حذف جميع الرسائل\n• `/delete [ID]` - حذف رسالة محددة\n\nيمكنك رؤية ID الرسالة بالضغط على الرسالة.',
            timestamp: new Date(),
            rating: null
          };
          setMessages(prev => [...prev, botResponse]);
        }
        break;
        
      case '/update':
        if (parts[1]) {
          const messageId = parseInt(parts[1]);
          const messageToEdit = messages.find(msg => msg.id === messageId && msg.type === 'user');
          if (messageToEdit) {
            setEditingMessageId(messageId);
            setInputMessage(messageToEdit.content);
            const botResponse = {
              id: Date.now(),
              type: 'bot',
              content: `✏️ جاري تعديل الرسالة. اكتب المحتوى الجديد واضغط إرسال.`,
              timestamp: new Date(),
              rating: null
            };
            setMessages(prev => [...prev, botResponse]);
          } else {
            const botResponse = {
              id: Date.now(),
              type: 'bot',
              content: '❌ لم يتم العثور على الرسالة أو لا يمكن تعديلها.',
              timestamp: new Date(),
              rating: null
            };
            setMessages(prev => [...prev, botResponse]);
          }
        } else {
          const botResponse = {
            id: Date.now(),
            type: 'bot',
            content: '💡 **أمر التعديل:**\n\n• `/update [ID]` - تعديل رسالة محددة\n\nيمكنك رؤية ID الرسالة بالضغط على الرسالة.',
            timestamp: new Date(),
            rating: null
          };
          setMessages(prev => [...prev, botResponse]);
        }
        break;
        
      case '/help':
        const botResponse = {
          id: Date.now(),
          type: 'bot',
          content: '🤖 **الأوامر المتاحة:**\n\n• `/delete all` - حذف جميع الرسائل\n• `/delete [ID]` - حذف رسالة محددة\n• `/update [ID]` - تعديل رسالة محددة\n• `/help` - عرض هذه القائمة\n\nيمكنك الضغط على أي رسالة لرؤية ID الخاص بها.',
          timestamp: new Date(),
          rating: null
        };
        setMessages(prev => [...prev, botResponse]);
        break;
        
      default:
        const errorResponse = {
          id: Date.now(),
          type: 'bot',
          content: `❌ أمر غير معروف: ${cmd}\n\nاكتب \`/help\` لرؤية الأوامر المتاحة.`,
          timestamp: new Date(),
          rating: null
        };
        setMessages(prev => [...prev, errorResponse]);
    }
    
    setInputMessage('');
  };

  const getIntelligentResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Advanced text analysis for writing assistance
    const analyzeText = (text: string) => {
      const words = text.trim().split(/\s+/).length;
      const sentences = text.split(/[.!?]+/).length - 1;
      const avgWordsPerSentence = words / Math.max(sentences, 1);
      const readabilityScore = avgWordsPerSentence > 20 ? 'صعب' : avgWordsPerSentence > 15 ? 'متوسط' : 'سهل';
      
      return { words, sentences, avgWordsPerSentence: Math.round(avgWordsPerSentence), readabilityScore };
    };
    
    // Generate full article function
    const generateFullArticle = (topic: string): string => {
      // Sample article structure for different topics
      const articleTemplates = {
        'الذكاء الاصطناعي': {
          title: 'الذكاء الاصطناعي: ثورة تقنية تعيد تشكيل مستقبلنا',
          intro: 'يشهد العالم اليوم تطوراً مذهلاً في مجال الذكاء الاصطناعي، حيث تتسارع وتيرة الابتكارات التقنية لتفتح آفاقاً جديدة أمام البشرية. من المساعدات الصوتية إلى السيارات ذاتية القيادة، يعيد الذكاء الاصطناعي تعريف طريقة عيشنا وعملنا.',
          points: [
            '**ما هو الذكاء الاصطناعي؟**\nالذكاء الاصطناعي هو قدرة الآلات على محاكاة الذكاء البشري، من خلال التعلم والتحليل واتخاذ القرارات. يشمل ذلك التعلم الآلي، والشبكات العصبية، ومعالجة اللغات الطبيعية.',
            '**التطبيقات الحالية**\n• الطب: تشخيص الأمراض بدقة عالية\n• التعليم: منصات تعلم تكيفية\n• النقل: السيارات ذاتية القيادة\n• التجارة: أنظمة التوصية الذكية',
            '**التحديات والمخاوف**\nرغم الفوائد العظيمة، يثير الذكاء الاصطناعي تساؤلات حول الخصوصية، أمان البيانات، وتأثيره على سوق العمل. من المهم وضع أطر أخلاقية تضمن الاستخدام المسؤول لهذه التقنية.',
            '**مستقبل الذكاء الاصطناعي**\nنتوقع أن نشهد تطورات أكثر في السنوات القادمة، مع دمج أعمق للذكاء الاصطناعي في حياتنا اليومية. الهدف هو تحقيق توازن بين الابتكار التقني والقيم الإنسانية.'
          ],
          conclusion: 'الذكاء الاصطناعي ليس مجرد تقنية مستقبلية، بل واقع يعيش معنا اليوم. النجاح في التعامل معه يتطلب فهماً عميقاً وتطبيقاً حكيماً يخدم مصلحة البشرية جمعاء.'
        },
        'ريادة الأعمال': {
          title: 'ريادة الأعمال في تونس: فرص وتحديات العصر الرقمي',
          intro: 'تشهد تونس نهضة حقيقية في مجال ريادة الأعمال، حيث يبرز جيل جديد من الشباب المبدع الذي يسعى لتحويل أفكاره المبتكرة إلى مشاريع ناجحة تساهم في التنمية الاقتصادية.',
          points: [
            '**البيئة الريادية في تونس**\nتتميز تونس بموقع جغرافي استراتيجي ومستوى تعليمي متقدم، مما يخلق بيئة خصبة للأفكار الريادية. توفر الدولة برامج دعم ومحاضن أعمال لرواد الأعمال الشباب.',
            '**القطاعات الواعدة**\n• التكنولوجيا المالية (Fintech)\n• التجارة الإلكترونية\n• التعليم الرقمي\n• الزراعة الذكية والسياحة البيئية',
            '**التحديات الرئيسية**\nيواجه رواد الأعمال تحديات في الحصول على التمويل، والتعامل مع البيروقراطية، وتطوير المهارات التقنية. كما تحتاج الشركات الناشئة إلى دعم في التسويق والوصول للأسواق العالمية.',
            '**قصص نجاح ملهمة**\nشهدت تونس ظهور شركات ناشئة ناجحة في مختلف المجالات، مثل منصات التعليم الإلكتروني والتطبيقات المالية، والتي تمكنت من جذب استثمارات دولية وتوسيع نشاطها إقليمياً.'
          ],
          conclusion: 'المستقبل مشرق لريادة الأعمال في تونس، بشرط توفير البيئة المناسبة والدعم اللازم. الاستثمار في الشباب والأفكار المبتكرة هو المفتاح لبناء اقتصاد قوي ومستدام.'
        }
      };
      
      // Check if we have a specific template, otherwise generate generic structure
      const template = Object.keys(articleTemplates).find(key => 
        topic.toLowerCase().includes(key.toLowerCase())
      );
      
      if (template) {
        const article = articleTemplates[template];
        return `📰 **${article.title}**\n\n**المقدمة:**\n${article.intro}\n\n${article.points.map((point, index) => `**${index + 1}. ${point}**`).join('\n\n')}\n\n**الخاتمة:**\n${article.conclusion}\n\n---\n💡 **هذا مقال كامل جاهز للنشر! يمكنك تعديله أو طلب تحسينات محددة.**`;
      } else {
        // Generic article structure
        return `📝 **مقال حول: ${topic}**\n\n**العنوان المقترح:** \n"${topic}: دليل شامل للمبتدئين والمتخصصين"\n\n**الهيكل المقترح:**\n\n**1. مقدمة جذابة (150 كلمة)**\n• تعريف بالموضوع وأهميته\n• إحصائية أو معلومة مثيرة\n• ما سيتعلمه القارئ\n\n**2. النقاط الرئيسية:**\n• **أساسيات ${topic}**: المفاهيم الأساسية والمصطلحات\n• **الوضع الحالي**: آخر التطورات والاتجاهات\n• **الفوائد والتحديات**: النقاط الإيجابية والسلبية\n• **التطبيقات العملية**: أمثلة واقعية ونصائح مفيدة\n• **المستقبل**: التوقعات والاتجاهات القادمة\n\n**3. خاتمة قوية (100 كلمة)**\n• تلخيص النقاط الرئيسية\n• دعوة للعمل أو التفكير\n• سؤال للتفاعل مع القراء\n\n💡 **تريد مني كتابة أي قسم بالتفصيل؟ أو تفضل مقالاً كاملاً؟**`;
      }
    };
    
    // Check if user is asking for text analysis/improvement
    if (message.includes('حلل هذا النص') || message.includes('راجع النص') || (message.length > 100 && !message.includes('اكتب') && !message.includes('ساعدني'))) {
      const analysis = analyzeText(userMessage);
      const suggestions = [];
      
      if (analysis.avgWordsPerSentence > 20) {
        suggestions.push('• قسم الجمل الطويلة إلى جمل أقصر (15-20 كلمة)');
      }
      if (analysis.words < 50) {
        suggestions.push('• أضف المزيد من التفاصيل والأمثلة');
      }
      if (!userMessage.includes('؟') && !userMessage.includes('!')) {
        suggestions.push('• استخدم علامات الاستفهام والتعجب لزيادة التفاعل');
      }
      
      return `📊 **تحليل النص:**\n\n• عدد الكلمات: ${analysis.words}\n• عدد الجمل: ${analysis.sentences}\n• متوسط الكلمات لكل جملة: ${analysis.avgWordsPerSentence}\n• مستوى القراءة: ${analysis.readabilityScore}\n\n✨ **اقتراحات التحسين:**\n${suggestions.length > 0 ? suggestions.join('\n') : '• النص جيد ومتوازن!'}\n\n💡 **هل تريد مساعدة في تحسين نقطة معينة؟**`;
    }
    
    // Greeting responses
    if (message.includes('مرحبا') || message.includes('سلام') || message.includes('هلا')) {
      return `مرحباً وأهلاً بك! 🌟\n\nأنا مساعدك الذكي للكتابة، جاهز لمساعدتك في كل ما يتعلق بالكتابة والمحتوى.\n\nيمكنني:\n• تحليل النصوص وتقديم اقتراحات تحسين\n• كتابة مقالات كاملة حول أي موضوع\n• إنشاء عناوين جذابة\n• تطوير خطط المحتوى\n• مساعدتك في العصف الذهني\n\n💡 **جرب قول:** "اكتب مقالاً عن [موضوعك]" أو أرسل نصاً لأحلله وأحسنه!`;
    }

    // Content ideas and brainstorming
    if (message.includes('أفكار') || message.includes('موضوع') || message.includes('عصف')) {
      const topics = [
        '🧠 **الذكاء الاصطناعي:** تأثير ChatGPT على التعليم، أخلاقيات الذكاء الاصطناعي، مستقبل الوظائف مع AI',
        '💼 **ريادة الأعمال:** قصص نجاح الشركات الناشئة التونسية، التمويل والاستثمار في تونس، التسويق الرقمي للمشاريع الصغيرة',
        '🌍 **البيئة والاستدامة:** الطاقة المتجددة في تونس، التغير المناخي، الاقتصاد الأخضر',
        '📱 **التكنولوجيا:** أحدث التطبيقات، الأمن السيبراني، إنترنت الأشياء',
        '🏥 **الصحة:** الطب الرقمي، الصحة النفسية، التغذية الصحية'
      ];
      return `إليك أفكار إبداعية ومتنوعة للمواضيع:\n\n${topics.join('\n\n')}\n\n🎯 **أي مجال يثير اهتمامك؟** أخبرني لأقترح عليك مواضيع أكثر تخصصاً!`;
    }
    
    // Article writing - Full article generation
    if (message.includes('اكتب مقال') || message.includes('اكتب مقالا') || message.includes('مقال عن')) {
      const topic = message.replace(/اكتب مقال[اً]*\s*(عن\s*)?/gi, '').trim();
      if (topic) {
        return generateFullArticle(topic);
      } else {
        return `📝 **مولد المقالات الذكي**\n\nلكتابة مقال كامل، استخدم الصيغة:\n"اكتب مقالاً عن [الموضوع]"\n\n**أمثلة:**\n• اكتب مقالاً عن الذكاء الاصطناعي\n• اكتب مقالاً عن ريادة الأعمال في تونس\n• اكتب مقالاً عن التسويق الرقمي\n\n✨ **أو اختر من هذه المواضيع الرائجة:**\n• تأثير وسائل التواصل على الشباب\n• مستقبل العملات الرقمية\n• الأمن السيبراني في العصر الرقمي\n• التعليم الإلكتروني والتعلم عن بعد`;
      }
    }
    
    // Article planning and structure
    if (message.includes('تخطيط') || message.includes('هيكل') || message.includes('مخطط')) {
      return `📝 **الهيكل المثالي للمقال:**\n\n**1. المقدمة الجذابة (100-150 كلمة)**\n• خطاف قوي لجذب الانتباه\n• تحديد المشكلة أو السؤال\n• معاينة سريعة للمحتوى\n\n**2. النقاط الرئيسية (70% من المقال)**\n• 3-5 نقاط أساسية مع أدلة\n• أمثلة عملية وقصص\n• انتقالات سلسة بين الأقسام\n\n**3. الخاتمة القوية (100-120 كلمة)**\n• تلخيص النقاط الرئيسية\n• دعوة واضحة للعمل\n• سؤال للتفاعل\n\n💡 **تريد مساعدة في تخطيط موضوع محدد؟**`;
    }
    
    // Writing improvement and style
    if (message.includes('تحسين') || message.includes('جودة') || message.includes('أسلوب')) {
      return `✨ **دليل تحسين الكتابة:**\n\n**📖 الوضوح والبساطة:**\n• استخدم جمل قصيرة (15-20 كلمة)\n• تجنب المصطلحات المعقدة\n• اكتب كما تتحدث بطبيعية\n\n**🎯 التفاعل والمشاركة:**\n• اطرح أسئلة على القارئ\n• استخدم القصص الشخصية\n• أضف إحصائيات مذهلة\n\n**⚡ القوة والتأثير:**\n• ابدأ بفعل قوي\n• استخدم الأرقام والنسب\n• اختتم بدعوة عمل محددة\n\n🔥 **أرسل لي نصاً لأراجعه وأحسنه!**`;
    }
    
    // Headline and title creation
    if (message.includes('عنوان') || message.includes('عناوين')) {
      return `🎯 **صيغ العناوين التي تجذب القراء:**\n\n**📊 العناوين الرقمية:**\n• "7 أسرار لتحسين إنتاجيتك"\n• "أفضل 10 أدوات للتسويق الرقمي"\n\n**❓ العناوين الاستفهامية:**\n• "هل تعلم كيف تضاعف دخلك؟"\n• "ما السر وراء نجاح أثرياء العالم؟"\n\n**⚡ عناوين الفوائد:**\n• "كيف توفر 3 ساعات يومياً بهذه الطريقة"\n• "الدليل الكامل لبناء علامة تجارية قوية"\n\n**🔥 العناوين العاطفية:**\n• "الخطأ الذي يدمر مشروعك"\n• "النصيحة التي غيرت حياتي"\n\n📝 **أخبرني بموضوعك وسأقترح عناوين مخصصة!**`;
    }
    
    // SEO optimization
    if (message.includes('seo') || message.includes('محركات البحث') || message.includes('جوجل')) {
      return `🔍 **دليل SEO الشامل للمقالات:**\n\n**🎯 الكلمات المفتاحية:**\n• ابحث بأدوات مثل Google Keyword Planner\n• استخدم الكلمة الرئيسية في العنوان\n• وزعها طبيعياً في النص (2-3%)\n\n**📱 تحسين التجربة:**\n• سرعة تحميل أقل من 3 ثوان\n• تصميم متجاوب للجوال\n• تنسيق سهل القراءة\n\n**🔗 استراتيجية الروابط:**\n• روابط داخلية لمقالات ذات صلة\n• روابط خارجية موثوقة ومفيدة\n• نصوص ربط وصفية ومفيدة\n\n**📊 عناصر أخرى مهمة:**\n• وصف meta جذاب (155 حرف)\n• عناوين فرعية منظمة (H2, H3)\n• صور محسنة مع Alt Text\n\n🚀 **أرسل لي مقالك لأحسن SEO له!**`;
    }

    // Writing tools and resources
    if (message.includes('أدوات') || message.includes('برامج') || message.includes('مساعدة')) {
      return `🛠️ **أفضل أدوات الكتابة والمحتوى:**\n\n**✍️ للكتابة:**\n• Grammarly - تصحيح نحوي\n• Hemingway - تبسيط النص\n• Google Docs - كتابة تشاركية\n\n**📊 للبحث:**\n• Google Trends - اتجاهات البحث\n• Answer The Public - أسئلة الجمهور\n• BuzzSumo - المحتوى الرائج\n\n**🎨 للتصميم:**\n• Canva - تصميم بصري\n• Unsplash - صور مجانية\n• Pexels - فيديوهات ترويجية\n\n**📈 للتحليل:**\n• Google Analytics - تحليل الزوار\n• Hotjar - سلوك المستخدمين\n\n💡 **تريد نصائح حول أداة معينة؟**`;
    }

    // Content strategy
    if (message.includes('استراتيجية') || message.includes('خطة') || message.includes('محتوى')) {
      return `📋 **استراتيجية المحتوى الفعالة:**\n\n**🎯 تحديد الهدف:**\n• من هو جمهورك المستهدف؟\n• ما الهدف من المحتوى؟\n• كيف تقيس النجاح؟\n\n**📅 التخطيط الزمني:**\n• تقويم محتوى شهري\n• توقيت النشر الأمثل\n• تنويع أنواع المحتوى\n\n**📊 أنواع المحتوى:**\n• مقالات تعليمية (40%)\n• قصص ملهمة (20%)\n• نصائح سريعة (20%)\n• محتوى ترفيهي (20%)\n\n**🔄 إعادة الاستخدام:**\n• حول المقال لفيديو\n• اصنع انفوجرافيك\n• قسم لمنشورات وسائل التواصل\n\n📈 **تريد خطة محتوى مخصصة لمجالك؟**`;
    }

    // Social media content
    if (message.includes('وسائل التواصل') || message.includes('فيسبوك') || message.includes('انستقرام') || message.includes('تويتر')) {
      return `📱 **المحتوى المثالي لوسائل التواصل:**\n\n**📘 فيسبوك:**\n• منشورات طويلة (200-300 كلمة)\n• قصص شخصية وتفاعلية\n• صور ومقاطع فيديو جذابة\n\n**📸 انستقرام:**\n• صور عالية الجودة\n• نصوص ملهمة قصيرة\n• استخدم الهاشتاجات (5-10)\n\n**🐦 تويتر:**\n• نصوص قصيرة وذكية\n• خيوط للمواضيع المعقدة\n• تفاعل مع التريندات\n\n**💼 لينكد إن:**\n• محتوى مهني وتعليمي\n• مقالات متخصصة\n• شبكة علاقات مهنية\n\n🎯 **أخبرني بمنصتك المفضلة لنصائح أكثر تخصصاً!**`;
    }

    // Motivation and inspiration
    if (message.includes('تحفيز') || message.includes('إلهام') || message.includes('صعوبة')) {
      return `💪 **تحفيز الكاتب وتجاوز العقبات:**\n\n**🚀 لتجاوز حاجز الكاتب:**\n• ابدأ بكتابة أي شيء لـ10 دقائق\n• استخدم تقنية Pomodoro (25 دقيقة كتابة)\n• غير مكان الكتابة\n\n**🎯 للحفاظ على الدافعية:**\n• ضع أهدافاً صغيرة يومية\n• احتفل بكل إنجاز صغير\n• انضم لمجتمعات الكتاب\n\n**⚡ نصائح للإنتاجية:**\n• اكتب في أفضل أوقاتك\n• تخلص من المشتتات\n• راجع بعد الانتهاء وليس أثناء الكتابة\n\n**🌟 تذكر:**\n"أول مسودة لا تحتاج للكمال، تحتاج للوجود"\n\n💖 **أنت كاتب رائع، فقط استمر!**`;
    }

    // Default response with conversation starters
    const conversationStarters = [
      "أخبرني عن المجال الذي تكتب فيه",
      "ما التحدي الأكبر في كتابتك؟",
      "هل تريد مساعدة في موضوع معين؟",
      "ما نوع المحتوى الذي تفضل كتابته؟"
    ];
    
    const randomStarter = conversationStarters[Math.floor(Math.random() * conversationStarters.length)];
    
    return `شكراً لك على تواصلك معي! 😊\n\n💭 **فهمت أنك تقول:** "${userMessage}"\n\nكمساعد كتابة ذكي، أنا هنا لمساعدتك في جميع جوانب الكتابة:\n\n📝 **خدماتي الأساسية:**\n• توليد أفكار مبتكرة\n• تخطيط وهيكلة المحتوى\n• تحسين الأسلوب والوضوح\n• تحسين SEO ومحركات البحث\n• كتابة عناوين جذابة\n• استراتيجيات المحتوى\n\n💡 **سؤال لك:** ${randomStarter}\n\n🚀 **أو جرب هذه الأوامر السريعة:**\n• "أفكار" للمواضيع الجديدة\n• "تخطيط" لهيكلة المقال\n• "تحسين" لنصائح الكتابة\n• "عناوين" للعناوين الجذابة`;
  };

  const handleQuickAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'brainstorm':
        message = 'أريد أفكاراً جديدة ومبتكرة لمواضيع المقالات في مجال الذكاء الاصطناعي والتكنولوجيا';
        break;
      case 'outline':
        message = 'ساعدني في إنشاء مخطط تفصيلي لمقال حول تأثير الذكاء الاصطناعي على سوق العمل';
        break;
      case 'improve':
        message = 'كيف يمكنني تحسين أسلوب كتابتي وجعل المحتوى أكثر تفاعلاً وجاذبية للقراء؟';
        break;
      case 'headlines':
        message = 'اقترح عليّ عناوين جذابة ومؤثرة لمقال عن ريادة الأعمال في تونس';
        break;
      case 'seo':
        message = 'كيف أحسن من تحسين محركات البحث (SEO) للمقالات التي أكتبها؟';
        break;
      case 'summarize':
        message = 'علمني كيفية تلخيص المحتوى الطويل بطريقة فعالة ومفيدة';
        break;
    }
    setInputMessage(message);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const handleRateMessage = (messageId: number, rating: 'up' | 'down') => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, rating: msg.rating === rating ? null : rating }
        : msg
    ));
  };

  const copyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const showMessageId = (messageId: number) => {
    const botResponse = {
      id: Date.now(),
      type: 'bot',
      content: `📋 **معرف الرسالة:** ${messageId}\n\nيمكنك استخدام هذا المعرف مع الأوامر:\n• \`/delete ${messageId}\` - لحذف الرسالة\n• \`/update ${messageId}\` - لتعديل الرسالة`,
      timestamp: new Date(),
      rating: null
    };
    setMessages(prev => [...prev, botResponse]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          variant="chat"
          size="lg"
          className="fixed bottom-6 right-6 z-50 shadow-glow w-16 h-16"
          onClick={() => {
            if (onOpenChange) {
              onOpenChange(true);
            } else {
              setInternalIsOpen(true);
            }
          }}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Enhanced Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-[420px] h-[600px] shadow-warm flex flex-col animate-in slide-in-from-bottom-4 duration-300">
          <CardHeader className="bg-gradient-hero text-white rounded-t-lg flex-shrink-0 pb-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <CardTitle className="text-lg">مساعد الكتابة الذكي</CardTitle>
                  <p className="text-xs text-white/80">متصل • يكتب بذكاء</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => {
                  if (onOpenChange) {
                    onOpenChange(false);
                  } else {
                    setInternalIsOpen(false);
                  }
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            {/* Tab Navigation */}
            <div className="flex space-x-1 mt-3">
              <Button
                variant={activeTab === 'chat' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-xs h-7 text-white"
                onClick={() => setActiveTab('chat')}
              >
                <MessageCircle className="w-3 h-3 ml-1" />
                محادثة
              </Button>
              <Button
                variant={activeTab === 'templates' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-xs h-7 text-white"
                onClick={() => setActiveTab('templates')}
              >
                <FileText className="w-3 h-3 ml-1" />
                قوالب
              </Button>
              <Button
                variant={activeTab === 'stats' ? 'secondary' : 'ghost'}
                size="sm"
                className="text-xs h-7 text-white"
                onClick={() => setActiveTab('stats')}
              >
                <TrendingUp className="w-3 h-3 ml-1" />
                إحصائيات
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {activeTab === 'chat' && (
              <>
                {/* Enhanced Quick Actions */}
                <div className="p-4 border-b border-border">
                  <p className="text-sm text-muted-foreground mb-3 flex items-center">
                    <Zap className="w-4 h-4 ml-1" />
                    أفعال سريعة:
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {quickActions.map((action, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs justify-start h-8"
                        onClick={() => handleQuickAction(action.action)}
                      >
                        <div className={`w-2 h-2 rounded-full ${action.color} ml-2`} />
                        <action.icon className="w-3 h-3 ml-1" />
                        {action.text}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Enhanced Messages */}
                <ScrollArea className="flex-1 p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[85%] group ${
                            message.type === 'user' ? 'order-2' : 'order-1'
                          }`}
                        >
                           <div
                             className={`p-3 rounded-2xl cursor-pointer ${
                               message.type === 'user'
                                 ? 'bg-tunisia-orange text-white rounded-br-md'
                                 : 'bg-muted text-foreground rounded-bl-md shadow-sm'
                             }`}
                             onClick={() => showMessageId(message.id)}
                           >
                            <div className="flex items-start space-x-2">
                              {message.type === 'bot' && (
                                <div className="w-6 h-6 bg-tunisia-orange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                  <Bot className="w-3 h-3 text-tunisia-orange" />
                                </div>
                              )}
                              <div className="flex-1">
                                <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed">
                                  {message.content}
                                </pre>
                                <div className="flex items-center justify-between mt-2">
                                  <span className={`text-xs ${
                                    message.type === 'user' ? 'text-white/70' : 'text-muted-foreground'
                                  }`}>
                                    {message.timestamp.toLocaleTimeString('ar-TN', { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </span>
                                  {message.type === 'bot' && (
                                    <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-6 w-6"
                                        onClick={() => copyMessage(message.content)}
                                      >
                                        <Copy className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`h-6 w-6 ${message.rating === 'up' ? 'text-green-500' : ''}`}
                                        onClick={() => handleRateMessage(message.id, 'up')}
                                      >
                                        <ThumbsUp className="w-3 h-3" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        className={`h-6 w-6 ${message.rating === 'down' ? 'text-red-500' : ''}`}
                                        onClick={() => handleRateMessage(message.id, 'down')}
                                      >
                                        <ThumbsDown className="w-3 h-3" />
                                      </Button>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-muted p-3 rounded-2xl rounded-bl-md max-w-[85%]">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-tunisia-orange/10 rounded-full flex items-center justify-center">
                              <Bot className="w-3 h-3 text-tunisia-orange" />
                            </div>
                            <div className="flex space-x-1">
                              <div className="w-2 h-2 bg-tunisia-orange rounded-full animate-bounce" />
                              <div className="w-2 h-2 bg-tunisia-orange rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                              <div className="w-2 h-2 bg-tunisia-orange rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                {/* Suggested Prompts */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-muted-foreground mb-2">اقتراحات للبدء:</p>
                    <div className="flex flex-wrap gap-1">
                      {suggestedPrompts.slice(0, 2).map((prompt, index) => (
                        <Button
                          key={index}
                          variant="ghost"
                          size="sm"
                          className="text-xs h-6 text-tunisia-orange hover:bg-tunisia-orange/10"
                          onClick={() => setInputMessage(prompt)}
                        >
                          {prompt.substring(0, 30)}...
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Enhanced Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex space-x-2">
                    <div className="flex-1 relative">
                      <Textarea
                        ref={inputRef}
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={editingMessageId !== null ? "اكتب المحتوى الجديد..." : "اكتب رسالتك هنا... (اضغط Enter للإرسال)"}
                        onKeyDown={handleKeyPress}
                        className="min-h-[40px] max-h-[100px] resize-none pr-10"
                        rows={1}
                      />
                      <div className="absolute left-2 bottom-2 flex items-center space-x-1">
                        <Badge variant="secondary" className="text-xs">
                          {inputMessage.length}/1000
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <Button 
                        variant="tunisia" 
                        size="icon" 
                        className="h-10 w-10"
                        onClick={handleSendMessage}
                        disabled={!inputMessage.trim()}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className={`h-8 w-8 ${isListening ? 'bg-red-500 text-white' : ''}`}
                        onClick={() => setIsListening(!isListening)}
                      >
                        <Mic className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {activeTab === 'templates' && (
              <div className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <FileText className="w-12 h-12 text-tunisia-orange mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">قوالب الكتابة</h3>
                    <p className="text-sm text-muted-foreground">قوالب جاهزة لأنواع مختلفة من المقالات</p>
                  </div>
                  
                  {writingTemplates.map((template, index) => (
                    <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                      <h4 className="font-semibold mb-2">{template.title}</h4>
                      <p className="text-sm text-muted-foreground mb-3">{template.description}</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {template.structure.map((step, stepIndex) => (
                          <Badge key={stepIndex} variant="outline" className="text-xs">
                            {step}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          setActiveTab('chat');
                          setInputMessage(`استخدم قالب "${template.title}" لمساعدتي في كتابة مقال`);
                        }}
                      >
                        استخدم هذا القالب
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'stats' && (
              <div className="flex-1 p-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <TrendingUp className="w-12 h-12 text-tunisia-orange mx-auto mb-2" />
                    <h3 className="font-semibold mb-1">إحصائيات الكتابة</h3>
                    <p className="text-sm text-muted-foreground">تتبع تقدمك وأداء المحادثات</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-3 text-center">
                      <div className="text-2xl font-bold text-tunisia-orange">{messages.length - 1}</div>
                      <div className="text-xs text-muted-foreground">الرسائل اليوم</div>
                    </Card>
                    <Card className="p-3 text-center">
                      <div className="text-2xl font-bold text-tunisia-orange">
                        {messages.filter(m => m.type === 'user').reduce((acc, m) => acc + m.content.split(' ').length, 0)}
                      </div>
                      <div className="text-xs text-muted-foreground">الكلمات المكتوبة</div>
                    </Card>
                    <Card className="p-3 text-center">
                      <div className="text-2xl font-bold text-tunisia-orange">
                        {messages.filter(m => m.rating === 'up').length}
                      </div>
                      <div className="text-xs text-muted-foreground">تقييم إيجابي</div>
                    </Card>
                    <Card className="p-3 text-center">
                      <div className="text-2xl font-bold text-tunisia-orange flex items-center justify-center">
                        <Clock className="w-4 h-4 ml-1" />
                        5د
                      </div>
                      <div className="text-xs text-muted-foreground">متوسط الاستخدام</div>
                    </Card>
                  </div>

                  <Card className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center">
                      <CheckCircle className="w-4 h-4 ml-1 text-green-500" />
                      إنجازات هذا الأسبوع
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>مقالات مخططة</span>
                        <Badge variant="secondary">3</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>أفكار مولدة</span>
                        <Badge variant="secondary">12</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>عناوين محسنة</span>
                        <Badge variant="secondary">8</Badge>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;