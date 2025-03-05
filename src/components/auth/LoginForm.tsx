
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export function LoginForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { language } = useLanguage();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Get the return URL from query parameters if available
  const getReturnUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('returnUrl') || '/';
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error(language === 'ar' ? 'الرجاء إدخال البريد الإلكتروني وكلمة المرور' : 'Please enter email and password');
      return;
    }
    
    setIsLoggingIn(true);
    try {
      const success = await login(email, password);
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

  return (
    <form onSubmit={handleLogin} className="space-y-4 mt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
        </label>
        <Input
          type="email"
          placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {language === 'ar' ? 'كلمة المرور' : 'Password'}
        </label>
        <div className="relative">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={language === 'ar' ? 'أدخل كلمة المرور' : 'Enter your password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button 
            type="button"
            className="absolute inset-y-0 left-0 px-3 flex items-center" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
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
    </form>
  );
}
