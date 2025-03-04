
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, ArrowRight, LogIn, UserPlus, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register, isAuthenticated, loading } = useAuth();
  const { language } = useLanguage();
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  // Registration state
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Password reset state
  const [resetEmail, setResetEmail] = useState("");
  const [showResetForm, setShowResetForm] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Get the return URL from query parameters if available
  const getReturnUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('returnUrl') || '/';
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !loading) {
      const returnUrl = getReturnUrl();
      navigate(returnUrl);
    }
  }, [isAuthenticated, loading, navigate, location.search]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) {
      toast.error(language === 'ar' ? 'الرجاء إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter email and password');
      return;
    }
    
    setIsLoggingIn(true);
    try {
      const success = await login(loginEmail, loginPassword);
      if (success) {
        const returnUrl = getReturnUrl();
        navigate(returnUrl);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(language === 'ar' ? 'حدث خطأ أثناء تسجيل الدخول' : 'An error occurred during login');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerName || !registerEmail || !registerPassword) {
      toast.error(language === 'ar' ? 'الرجاء إدخال جميع الحقول المطلوبة' : 'Please enter all required fields');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(registerEmail)) {
      toast.error(language === 'ar' ? 'الرجاء إدخال بريد إلكتروني صحيح' : 'Please enter a valid email');
      return;
    }
    
    // Basic password validation
    if (registerPassword.length < 6) {
      toast.error(language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }
    
    setIsRegistering(true);
    try {
      const success = await register(registerName, registerEmail, registerPassword, registerPhone);
      if (success) {
        toast.success(language === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully');
        const returnUrl = getReturnUrl();
        navigate(returnUrl);
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error(language === 'ar' ? 'حدث خطأ أثناء إنشاء الحساب' : 'An error occurred during registration');
    } finally {
      setIsRegistering(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail) {
      toast.error(language === 'ar' ? 'الرجاء إدخال البريد الإلكتروني' : 'Please enter your email');
      return;
    }
    
    setIsResetting(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(resetEmail, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      
      toast.success(
        language === 'ar'
          ? 'تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك الإلكتروني'
          : 'Password reset link sent to your email'
      );
      setShowResetForm(false);
    } catch (error) {
      console.error("Password reset error:", error);
      toast.error(
        language === 'ar'
          ? 'حدث خطأ أثناء إرسال رابط إعادة تعيين كلمة المرور'
          : 'Error sending password reset link'
      );
    } finally {
      setIsResetting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

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
              {language === 'ar' ? 'مرحباً بك في منتجك' : 'Welcome to Mntgk'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {language === 'ar' 
                ? 'منصة التسوق والإعلانات المبوبة في سوريا' 
                : 'Shopping and classified ads platform in Syria'}
            </p>
          </div>
          
          {showResetForm ? (
            <div className="space-y-4">
              <button 
                onClick={() => setShowResetForm(false)} 
                className="text-primary flex items-center gap-2"
              >
                <ArrowRight className="h-4 w-4" />
                <span>{language === 'ar' ? 'العودة لتسجيل الدخول' : 'Back to login'}</span>
              </button>
              
              <h2 className="text-xl font-semibold">
                {language === 'ar' ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}
              </h2>
              
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                  </label>
                  <Input
                    type="email"
                    placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isResetting}
                >
                  {isResetting 
                    ? (language === 'ar' ? 'جاري إرسال الرابط...' : 'Sending link...') 
                    : (language === 'ar' ? 'إرسال رابط إعادة التعيين' : 'Send Reset Link')}
                </Button>
              </form>
            </div>
          ) : (
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
                    <button 
                      type="button"
                      onClick={() => setShowResetForm(true)}
                      className="text-primary hover:underline"
                    >
                      {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                    </button>
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
                    <p className="text-xs text-muted-foreground">
                      {language === 'ar' 
                        ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' 
                        : 'Password must be at least 6 characters'}
                    </p>
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
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;
