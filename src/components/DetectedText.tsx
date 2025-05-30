
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Trash2, Volume2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface DetectedTextProps {
  detectedTexts: string[];
  onClear: () => void;
  onPlayAudio: (text: string) => void;
}

const DetectedText: React.FC<DetectedTextProps> = ({ 
  detectedTexts, 
  onClear, 
  onPlayAudio 
}) => {
  const { toast } = useToast();

  const handleCopyAll = () => {
    const allText = detectedTexts.join(' ');
    navigator.clipboard.writeText(allText);
    toast({
      title: "تم النسخ",
      description: "تم نسخ جميع النصوص المكتشفة",
    });
  };

  const handlePlayAll = () => {
    const allText = detectedTexts.join(' ');
    onPlayAudio(allText);
  };

  if (detectedTexts.length === 0) {
    return (
      <Card className="p-6 text-center">
        <div className="text-gray-400 mb-4">
          <Volume2 className="h-16 w-16 mx-auto mb-4" />
          <p className="text-lg">لم يتم كشف أي إشارات بعد</p>
          <p className="text-sm mt-2">استخدم الكاميرا لبدء كشف إشارات لغة الإشارة</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-xl font-bold text-gray-800">النصوص المكتشفة</h3>
          <Badge variant="secondary">{detectedTexts.length} إشارة</Badge>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={handleCopyAll}
            variant="outline"
            size="sm"
          >
            <Copy className="h-4 w-4 mr-1" />
            نسخ الكل
          </Button>
          <Button
            onClick={handlePlayAll}
            variant="outline"
            size="sm"
            className="bg-green-50 hover:bg-green-100"
          >
            <Volume2 className="h-4 w-4 mr-1" />
            تشغيل الكل
          </Button>
          <Button
            onClick={onClear}
            variant="outline"
            size="sm"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            مسح
          </Button>
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {detectedTexts.map((text, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border"
          >
            <div className="flex items-center gap-3">
              <Badge className="bg-blue-500">{index + 1}</Badge>
              <span className="text-lg font-medium text-gray-800" dir="rtl">
                {text}
              </span>
            </div>
            <Button
              onClick={() => onPlayAudio(text)}
              variant="ghost"
              size="sm"
              className="hover:bg-green-100"
            >
              <Volume2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-sm text-blue-700 text-center">
          📝 النص المدمج: {detectedTexts.join(' ')}
        </p>
      </div>
    </Card>
  );
};

export default DetectedText;
