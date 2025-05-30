
import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, CameraOff, RotateCcw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CameraDetectionProps {
  onDetection: (detectedText: string) => void;
}

const CameraDetection: React.FC<CameraDetectionProps> = ({ onDetection }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isActive, setIsActive] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [detectedSign, setDetectedSign] = useState('');
  const { toast } = useToast();

  // Simulated Arabic sign language dictionary
  const signDictionary = {
    'thumbs_up': 'ممتاز',
    'peace': 'سلام',
    'ok': 'موافق',
    'pointing': 'هذا',
    'open_hand': 'مرحبا',
    'fist': 'قوة',
    'heart': 'حب',
    'victory': 'نصر'
  };

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user'
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsActive(true);
        
        toast({
          title: "تم تشغيل الكاميرا",
          description: "ابدأ بعمل إشارات لغة الإشارة العربية",
        });
      }
    } catch (error) {
      toast({
        title: "خطأ في الكاميرا",
        description: "لا يمكن الوصول إلى الكاميرا",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsActive(false);
      setDetectedSign('');
      
      toast({
        title: "تم إيقاف الكاميرا",
        description: "تم إيقاف كشف لغة الإشارة",
      });
    }
  };

  // Simulate sign detection (in a real app, this would use ML models)
  const simulateDetection = () => {
    const signs = Object.keys(signDictionary);
    const randomSign = signs[Math.floor(Math.random() * signs.length)];
    const arabicText = signDictionary[randomSign as keyof typeof signDictionary];
    
    setDetectedSign(arabicText);
    onDetection(arabicText);
    
    toast({
      title: "تم كشف الإشارة",
      description: `تم كشف: ${arabicText}`,
    });
  };

  // Auto-detect every 3 seconds when camera is active (simulation)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive) {
      interval = setInterval(() => {
        simulateDetection();
      }, 3000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive]);

  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
      <div className="text-center mb-4">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          كشف لغة الإشارة العربية
        </h3>
        <p className="text-gray-600 text-sm">
          استخدم الكاميرا لكشف إشارات لغة الإشارة العربية
        </p>
      </div>

      <div className="relative mb-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className={`w-full h-64 object-cover rounded-lg border-2 ${
            isActive ? 'border-green-400' : 'border-gray-300'
          }`}
          style={{ transform: 'scaleX(-1)' }} // Mirror effect
        />
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          style={{ transform: 'scaleX(-1)' }}
        />
        
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
            <div className="text-center">
              <Camera className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">اضغط لتشغيل الكاميرا</p>
            </div>
          </div>
        )}

        {detectedSign && (
          <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-2 rounded text-center">
            <span className="text-lg font-bold">{detectedSign}</span>
          </div>
        )}
      </div>

      <div className="flex gap-2 justify-center">
        {!isActive ? (
          <Button
            onClick={startCamera}
            className="bg-green-500 hover:bg-green-600"
          >
            <Camera className="h-4 w-4 mr-2" />
            تشغيل الكاميرا
          </Button>
        ) : (
          <>
            <Button
              onClick={stopCamera}
              variant="destructive"
            >
              <CameraOff className="h-4 w-4 mr-2" />
              إيقاف الكاميرا
            </Button>
            <Button
              onClick={simulateDetection}
              variant="outline"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              كشف يدوي
            </Button>
          </>
        )}
      </div>

      <div className="mt-4 text-xs text-gray-500 text-center bg-white/50 p-2 rounded">
        {isActive ? (
          <span className="text-green-600">🟢 الكاميرا نشطة - جاري البحث عن الإشارات</span>
        ) : (
          <span>💡 نصيحة: تأكد من وجود إضاءة جيدة لأفضل نتائج الكشف</span>
        )}
      </div>
    </Card>
  );
};

export default CameraDetection;
