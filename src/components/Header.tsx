
import React from 'react';
import { Button } from '@/components/ui/button';
import { Languages, Volume2, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-200/50 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 rounded-lg">
              <Languages className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">ASL Translator</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              الرئيسية
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              حول التطبيق
            </a>
            <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
              المساعدة
            </a>
          </nav>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Volume2 className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
