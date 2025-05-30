
import React, { useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Send, Trash2, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface TextInputProps {
  onTextChange: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ onTextChange }) => {
  const [text, setText] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (text.trim()) {
      onTextChange(text);
      toast({
        title: "تم الإرسال",
        description: "تم ترجمة النص بنجاح",
      });
    }
  };

  const handleClear = () => {
    setText('');
    onTextChange('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    toast({
      title: "تم النسخ",
      description: "تم نسخ النص إلى الحافظة",
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit();
    }
  };

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="اكتب النص العربي هنا للترجمة إلى لغة الإشارة..."
        className="min-h-[120px] text-right resize-none border-2 border-gray-200 focus:border-blue-500 transition-colors"
        dir="rtl"
      />
      
      <div className="flex gap-2 justify-end">
        <Button
          onClick={handleCopy}
          variant="outline"
          size="sm"
          disabled={!text.trim()}
        >
          <Copy className="h-4 w-4 mr-2" />
          نسخ
        </Button>
        <Button
          onClick={handleClear}
          variant="outline"
          size="sm"
          disabled={!text.trim()}
        >
          <Trash2 className="h-4 w-4 mr-2" />
          مسح
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!text.trim()}
          className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
        >
          <Send className="h-4 w-4 mr-2" />
          ترجم
        </Button>
      </div>
      
      <div className="text-xs text-gray-500 text-right">
        اضغط Ctrl + Enter للترجمة السريعة
      </div>
    </div>
  );
};

export default TextInput;
