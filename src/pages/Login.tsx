
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { language, t } = useLanguage();
  
  // حالة تسجيل الدخول
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // حالة التسجيل
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) return;
    
    setIsLoggingIn(true);
    const success = await login(loginEmail, loginPassword);
    setIsLoggingIn(false);
    
    if (success) {
      navigate('/');
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) return;
    
    setIsRegistering(true);
    const success = await register(registerName, registerEmail, registerPassword, registerPhone);
    setIsRegistering(false);
    
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b py-4">
        <div className="container flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <ArrowRight className="h-5 w-5 ml-2" />
            <span>{language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}</span>
          </Link>
          <img 
            src="/lovable-uploads/9c7d94b9-c841-4c9a-bb51-db6df6b25b36.png" 
            alt="Logo" 
            className="h-8" 
          />
        </div>
      </header>
      
      <main className="flex-1 container py-8 flex items-center justify-center">
        <div className="w-full max-w-md space-y-8 bg-card p-6 rounded-xl border shadow-sm">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              {language === 'ar' ? 'مرحباً بك في منتجك' : 'Welcome to Montajak'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {language === 'ar' 
                ? 'منصة التسوق والإعلانات المبوبة في سوريا' 
                : 'Shopping and classified ads platform in Syria'}
            </p>
          </div>
          
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" className="flex items-center gap-2">
                <LogIn className="h-4 w-4" />
                <span>{language === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <UserPlus className="h-4 w-4" />
                <span>{language === 'ar' ? 'إنشاء حساب' : 'Register'}</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <Input
                    type="email"
                    placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {language === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <Input
                      type={showLoginPassword ? "text" : "password"}
                      placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 left-0 px-3 flex items-center" 
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                    >
                      {showLoginPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoggingIn}
                >
                  {isLoggingIn 
                    ? (language === 'ar' ? 'جاري تسجيل الدخول...' : 'Logging in...') 
                    : (language === 'ar' ? 'تسجيل الدخول' : 'Login')}
                </Button>
                
                <div className="text-center text-sm">
                  <Link to="#" className="text-primary hover:underline">
                    {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                  </Link>
                </div>
                
                <div className="text-center text-xs text-muted-foreground">
                  {language === 'ar' 
                    ? 'تجربة عملية: استخدم admin@example.com وكلمة المرور: password' 
                    : 'Demo: Use admin@example.com and password: password'}
                </div>
              </form>
            </TabsContent>
            
            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4 mt-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
                  </label>
                  <Input
                    type="text"
                    placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                    value={registerName}
                    onChange={(e) => setRegisterName(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <Input
                    type="email"
                    placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    value={registerEmail}
                    onChange={(e) => setRegisterEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {language === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                  </label>
                  <Input
                    type="tel"
                    placeholder={language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number'}
                    value={registerPhone}
                    onChange={(e) => setRegisterPhone(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {language === 'ar' ? 'كلمة المرور' : 'Password'}
                  </label>
                  <div className="relative">
                    <Input
                      type={showRegisterPassword ? "text" : "password"}
                      placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
                      value={registerPassword}
                      onChange={(e) => setRegisterPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button 
                      type="button"
                      className="absolute inset-y-0 left-0 px-3 flex items-center" 
                      onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                    >
                      {showRegisterPassword ? (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>
                  </div>
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isRegistering}
                >
                  {isRegistering 
                    ? (language === 'ar' ? 'جاري إنشاء الحساب...' : 'Creating account...') 
                    : (language === 'ar' ? 'إنشاء حساب' : 'Register')}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Login;
