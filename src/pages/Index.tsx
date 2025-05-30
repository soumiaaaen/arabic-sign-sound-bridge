
import React, { useState } from 'react';
import Header from '../components/Header';
import CameraDetection from '../components/CameraDetection';
import DetectedText from '../components/DetectedText';
import AudioPlayer from '../components/AudioPlayer';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [detectedTexts, setDetectedTexts] = useState<string[]>([]);
  const [currentAudioText, setCurrentAudioText] = useState('');

  const handleDetection = (detectedText: string) => {
    setDetectedTexts(prev => [...prev, detectedText]);
    setCurrentAudioText(detectedText);
  };

  const handleClearTexts = () => {
    setDetectedTexts([]);
    setCurrentAudioText('');
  };

  const handlePlayAudio = (text: string) => {
    setCurrentAudioText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            كاشف لغة الإشارة العربية
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            تطبيق متقدم لكشف إشارات لغة الإشارة العربية وتحويلها إلى نص وصوت
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Camera Detection Section */}
          <div className="space-y-6">
            <CameraDetection onDetection={handleDetection} />
            
            <Card className="p-4">
              <AudioPlayer 
                text={currentAudioText} 
                autoPlay={true}
              />
            </Card>
          </div>

          {/* Detected Text Display Section */}
          <div>
            <DetectedText 
              detectedTexts={detectedTexts}
              onClear={handleClearTexts}
              onPlayAudio={handlePlayAudio}
            />
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">المميزات</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-lg shadow-md">
              <div className="text-4xl mb-4">📹</div>
              <h3 className="text-xl font-semibold mb-2">كشف فوري</h3>
              <p className="text-gray-600">كشف إشارات لغة الإشارة العربية باستخدام الكاميرا بشكل فوري</p>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-lg shadow-md">
              <div className="text-4xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">تحويل إلى نص</h3>
              <p className="text-gray-600">تحويل الإشارات المكتشفة إلى نص عربي مقروء</p>
            </div>
            <div className="p-6 bg-white/60 backdrop-blur-sm rounded-lg shadow-md">
              <div className="text-4xl mb-4">🔊</div>
              <h3 className="text-xl font-semibold mb-2">تحويل صوتي</h3>
              <p className="text-gray-600">تشغيل النص المكتشف صوتياً بصوت واضح ومفهوم</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
