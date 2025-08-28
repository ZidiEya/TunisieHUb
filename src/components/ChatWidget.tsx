import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageCircle, Send, X, Bot, User, Lightbulb, PenTool, BookOpen } from "lucide-react";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'مرحباً! أنا مساعدك الذكي للكتابة. كيف يمكنني مساعدتك اليوم؟',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickActions = [
    { icon: Lightbulb, text: 'أفكار للمواضيع', action: 'brainstorm' },
    { icon: PenTool, text: 'تخطيط المقال', action: 'outline' },
    { icon: BookOpen, text: 'تحسين النص', action: 'improve' }
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: 'شكراً لك على رسالتك! هذا مثال لرد المساعد الذكي. سيتم ربط ChatGPT هنا لمساعدتك في الكتابة والعصف الذهني وتخطيط المحتوى.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  const handleQuickAction = (action: string) => {
    let message = '';
    switch (action) {
      case 'brainstorm':
        message = 'أريد أفكاراً جديدة لمواضيع المقالات';
        break;
      case 'outline':
        message = 'ساعدني في تخطيط مقال حول التكنولوجيا';
        break;
      case 'improve':
        message = 'كيف يمكنني تحسين كتابتي؟';
        break;
    }
    setInputMessage(message);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          variant="chat"
          size="lg"
          className="fixed bottom-6 right-6 z-50 shadow-glow w-16 h-16"
          onClick={() => setIsOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      )}

      {/* Chat Widget */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 z-50 w-96 h-[500px] shadow-warm flex flex-col">
          <CardHeader className="bg-gradient-hero text-white rounded-t-lg flex-shrink-0">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Bot className="w-5 h-5" />
                <span>مساعد الكتابة الذكي</span>
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0">
            {/* Quick Actions */}
            <div className="p-4 border-b border-border">
              <p className="text-sm text-muted-foreground mb-3">أفعال سريعة:</p>
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => handleQuickAction(action.action)}
                  >
                    <action.icon className="w-3 h-3 ml-1" />
                    {action.text}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-tunisia-orange text-white'
                        : 'bg-secondary text-secondary-foreground'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      {message.type === 'bot' && <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                      {message.type === 'user' && <User className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex space-x-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="اكتب رسالتك هنا..."
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                />
                <Button variant="tunisia" size="icon" onClick={handleSendMessage}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default ChatWidget;