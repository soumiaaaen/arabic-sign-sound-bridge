
import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Camera className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">كاشف الإشارة</h1>
              <p className="text-sm text-gray-600">Arabic Sign Language</p>
            </div>
          </Link>
          
          <nav className="flex items-center gap-4">
            <Link to="/login">
              <Button variant="outline" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                تسجيل الدخول
              </Button>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
