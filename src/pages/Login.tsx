
import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, loading } = useAuth();
  const { language } = useLanguage();
  
  // Password reset state
  const [showResetForm, setShowResetForm] = useState(false);

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
            <ResetPasswordForm onCancel={() => setShowResetForm(false)} />
          ) : (
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login" className="flex items-center gap-2">
                  <span>{language === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
                </TabsTrigger>
                <TabsTrigger value="register" className="flex items-center gap-2">
                  <span>{language === 'ar' ? 'إنشاء حساب' : 'Register'}</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <LoginForm />
                <div className="text-center text-sm mt-4">
                  <button 
                    type="button"
                    onClick={() => setShowResetForm(true)}
                    className="text-primary hover:underline"
                  >
                    {language === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
                  </button>
                </div>
              </TabsContent>
              
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
    </div>
  );
};

export default Login;
