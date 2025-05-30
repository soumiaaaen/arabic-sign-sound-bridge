
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, Volume2, Download, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AudioPlayerProps {
  text: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ text }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([80]);
  const [speed, setSpeed] = useState([1]);
  const { toast } = useToast();

  const handlePlay = () => {
    if (!text.trim()) {
      toast({
        title: "تنبيه",
        description: "لا يوجد نص للتحويل إلى صوت",
        variant: "destructive",
      });
      return;
    }

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.volume = volume[0] / 100;
      utterance.rate = speed[0];
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => {
        setIsPlaying(false);
        toast({
          title: "خطأ",
          description: "حدث خطأ أثناء تشغيل الصوت",
          variant: "destructive",
        });
      };

      speechSynthesis.speak(utterance);
      
      toast({
        title: "تم التشغيل",
        description: "بدأ تشغيل النص الصوتي",
      });
    } else {
      toast({
        title: "غير مدعوم",
        description: "المتصفح لا يدعم تحويل النص إلى صوت",
        variant: "destructive",
      });
    }
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setIsPlaying(false);
  };

  const handleDownload = () => {
    toast({
      title: "قريباً",
      description: "ميزة التحميل ستكون متاحة قريباً",
    });
  };

  return (
    <Card className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-800">التحويل الصوتي</h3>
        <Volume2 className="h-5 w-5 text-green-600" />
      </div>

      <div className="space-y-4">
        {/* Play Controls */}
        <div className="flex items-center gap-2">
          <Button
            onClick={isPlaying ? handleStop : handlePlay}
            disabled={!text.trim()}
            className={`${
              isPlaying 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 mr-2" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            {isPlaying ? 'إيقاف' : 'تشغيل'}
          </Button>
          
          <Button
            onClick={handleDownload}
            variant="outline"
            size="sm"
            disabled={!text.trim()}
          >
            <Download className="h-4 w-4 mr-2" />
            تحميل
          </Button>
        </div>

        {/* Volume Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>الصوت</span>
            <span>{volume[0]}%</span>
          </div>
          <Slider
            value={volume}
            onValueChange={setVolume}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Speed Control */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>السرعة</span>
            <span>{speed[0]}x</span>
          </div>
          <Slider
            value={speed}
            onValueChange={setSpeed}
            min={0.5}
            max={2}
            step={0.1}
            className="w-full"
          />
        </div>

        {/* Status */}
        <div className="text-xs text-gray-600 bg-white/50 p-2 rounded text-center">
          {isPlaying ? (
            <span className="text-green-600">🔊 جاري التشغيل...</span>
          ) : text.trim() ? (
            <span>جاهز للتشغيل</span>
          ) : (
            <span>في انتظار النص</span>
          )}
        </div>
      </div>
    </Card>
  );
};

export default AudioPlayer;
