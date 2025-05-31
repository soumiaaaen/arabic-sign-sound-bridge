
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeOff, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', { email, password });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            كاشف لغة الإشارة العربية
          </h1>
          <p className="text-gray-600">
            مرحباً بك مرة أخرى
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center text-xl font-semibold text-gray-800">
              تسجيل الدخول
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-right block">
                  البريد الإلكتروني
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="أدخل بريدك الإلكتروني"
                  className="text-right"
                  dir="rtl"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-right block">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="أدخل كلمة المرور"
                    className="text-right pr-10"
                    dir="rtl"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <Link to="/forgot-password" className="text-blue-600 hover:underline">
                  نسيت كلمة المرور؟
                </Link>
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-gray-600">تذكرني</span>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <LogIn className="h-4 w-4 ml-2" />
                تسجيل الدخول
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                ليس لديك حساب؟{' '}
                <Link to="/register" className="text-blue-600 hover:underline font-medium">
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link
                to="/"
                className="block text-center text-blue-600 hover:underline"
              >
                ← العودة إلى الصفحة الرئيسية
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
