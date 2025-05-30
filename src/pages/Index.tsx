
import React, { useState } from 'react';
import Header from '../components/Header';
import TextInput from '../components/TextInput';
import SignDisplay from '../components/SignDisplay';
import AudioPlayer from '../components/AudioPlayer';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [arabicText, setArabicText] = useState('');
  const [translatedSigns, setTranslatedSigns] = useState<string[]>([]);

  const handleTextTranslation = (text: string) => {
    setArabicText(text);
    // Simulation de traduction - en réalité, ceci serait connecté à une API
    const words = text.split(' ').filter(word => word.trim() !== '');
    setTranslatedSigns(words);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            مترجم لغة الإشارة العربية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            تطبيق متقدم لترجمة النصوص العربية إلى لغة الإشارة مع إمكانية التحويل الصوتي
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
              إدخال النص العربي
            </h2>
            <TextInput onTextChange={handleTextTranslation} />
            
            <Separator className="my-6" />
            
            <AudioPlayer text={arabicText} />
          </Card>

          {/* Output Section */}
          <Card className="p-6 shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-right">
              عرض لغة الإشارة
            </h2>
            <SignDisplay signs={translatedSigns} />
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">المميزات</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-lg shadow-md">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold mb-2">ترجمة فورية</h3>
              <p className="text-gray-600">ترجمة النصوص العربية إلى لغة الإشارة بشكل فوري ودقيق</p>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔊</div>
              <h3 className="text-xl font-semibold mb-2">تحويل صوتي</h3>
              <p className="text-gray-600">استماع للنص المكتوب بصوت واضح ومفهوم</p>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-lg shadow-md">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">تصميم متجاوب</h3>
              <p className="text-gray-600">يعمل على جميع الأجهزة والشاشات بكفاءة عالية</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
