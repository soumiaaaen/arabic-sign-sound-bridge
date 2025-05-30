
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Hand, Play } from 'lucide-react';

interface SignDisplayProps {
  signs: string[];
}

const SignDisplay: React.FC<SignDisplayProps> = ({ signs }) => {
  // Simulation des signes - en réalité, ceci serait connecté à une base de données de signes
  const signImages = [
    '🤝', '👋', '✋', '👍', '👎', '🤲', '👐', '🙏', '👏', '🤞',
    '✌️', '🤟', '🤘', '🤙', '👌', '🤏', '✊', '👊', '🤛', '🤜'
  ];

  const getRandomSign = () => {
    return signImages[Math.floor(Math.random() * signImages.length)];
  };

  if (signs.length === 0) {
    return (
      <div className="text-center py-12">
        <Hand className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500 text-lg">
          لم يتم إدخال أي نص للترجمة بعد
        </p>
        <p className="text-gray-400 text-sm mt-2">
          اكتب النص في المربع المجاور لرؤية لغة الإشارة
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Badge variant="secondary" className="text-sm">
          {signs.length} كلمة
        </Badge>
        <div className="text-sm text-gray-500">
          لغة الإشارة العربية
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
        {signs.map((sign, index) => (
          <Card 
            key={index} 
            className="p-4 text-center hover:shadow-md transition-shadow cursor-pointer group"
          >
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
              {getRandomSign()}
            </div>
            <div className="text-sm font-medium text-gray-700 mb-2" dir="rtl">
              {sign}
            </div>
            <button className="opacity-0 group-hover:opacity-100 transition-opacity">
              <Play className="h-4 w-4 text-blue-500" />
            </button>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-xs text-blue-600 text-center">
          💡 نصيحة: انقر على أي إشارة لمشاهدة العرض التوضيحي
        </p>
      </div>
    </div>
  );
};

export default SignDisplay;
