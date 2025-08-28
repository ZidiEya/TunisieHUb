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

  const getIntelligentResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('أفكار') || message.includes('موضوع') || message.includes('عصف')) {
      return `إليك بعض الأفكار الإبداعية للمواضيع:\n\n🧠 **الذكاء الاصطناعي:**\n• تأثير ChatGPT على التعليم\n• أخلاقيات الذكاء الاصطناعي\n• مستقبل الوظائف مع AI\n\n💼 **ريادة الأعمال:**\n• قصص نجاح الشركات الناشئة التونسية\n• التمويل والاستثمار في تونس\n• التسويق الرقمي للمشاريع الصغيرة\n\nأي مجال يثير اهتمامك أكثر؟`;
    }
    
    if (message.includes('تخطيط') || message.includes('هيكل') || message.includes('مخطط')) {
      return `📝 **هيكل المقال المثالي:**\n\n1. **المقدمة الجذابة** (10%)\n   • خطاف لجذب الانتباه\n   • تحديد المشكلة\n   • معاينة المحتوى\n\n2. **النقاط الرئيسية** (70%)\n   • 3-5 نقاط أساسية\n   • أدلة وأمثلة\n   • انتقالات سلسة\n\n3. **الخاتمة القوية** (20%)\n   • تلخيص النقاط\n   • دعوة للعمل\n\nهل تريد تفصيل أي جزء؟`;
    }
    
    if (message.includes('تحسين') || message.includes('جودة') || message.includes('أسلوب')) {
      return `✨ **نصائح لتحسين الكتابة:**\n\n📖 **الوضوح:**\n• استخدم جمل قصيرة ومفهومة\n• تجنب المصطلحات المعقدة\n• اكتب كما تتحدث\n\n🎯 **التفاعل:**\n• اطرح أسئلة على القارئ\n• استخدم القصص والأمثلة\n• أضف عناصر بصرية\n\n⚡ **القوة:**\n• ابدأ بفعل قوي\n• استخدم الأرقام والإحصائيات\n• اختتم بدعوة واضحة للعمل`;
    }
    
    if (message.includes('عنوان') || message.includes('عناوين')) {
      return `🎯 **صيغ العناوين الجذابة:**\n\n📊 **بالأرقام:**\n• "7 طرق لتحسين إنتاجيتك"\n• "أفضل 5 أدوات للتسويق الرقمي"\n\n❓ **بالأسئلة:**\n• "هل تعلم كيف تضاعف دخلك؟"\n• "ما السر وراء نجاح الشركات الناشئة؟"\n\n⚡ **بالفوائد:**\n• "كيف توفر 3 ساعات يومياً بهذه الطريقة"\n• "الدليل الشامل لبناء علامة تجارية قوية"\n\nجرب هذه الصيغ مع موضوعك!`;
    }
    
    if (message.includes('seo') || message.includes('محركات البحث')) {
      return `🔍 **تحسين SEO للمقالات:**\n\n🎯 **الكلمات المفتاحية:**\n• ابحث عن كلمات ذات حجم بحث عالي\n• استخدمها في العنوان والمقدمة\n• اكتب محتوى طبيعي وقيم\n\n📱 **التجربة:**\n• سرعة تحميل الصفحة\n• تصميم متجاوب\n• سهولة القراءة\n\n🔗 **الروابط:**\n• روابط داخلية لمقالات أخرى\n• روابط خارجية موثوقة\n• نص الرابط وصفي\n\nتريد نصائح أكثر تفصيلاً؟`;
    }
    
    return `شكراً لك على رسالتك! 😊\n\nأفهم أنك تسأل عن: "${userMessage}"\n\nكمساعد كتابة ذكي، يمكنني مساعدتك في:\n• توليد أفكار إبداعية\n• تخطيط وهيكلة المحتوى\n• تحسين الأسلوب والوضوح\n• تحسين SEO\n• كتابة عناوين جذابة\n\nهل يمكنك توضيح طلبك أكثر لأقدم لك مساعدة أكثر تخصصاً؟`;
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