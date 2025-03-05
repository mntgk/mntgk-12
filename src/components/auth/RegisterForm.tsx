
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export function RegisterForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register } = useAuth();
  const { language } = useLanguage();
  
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Get the return URL from query parameters if available
  const getReturnUrl = () => {
    const params = new URLSearchParams(location.search);
    return params.get('returnUrl') || '/';
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error(language === 'ar' ? 'الرجاء إدخال جميع الحقول المطلوبة' : 'Please enter all required fields');
      return;
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(language === 'ar' ? 'الرجاء إدخال بريد إلكتروني صحيح' : 'Please enter a valid email');
      return;
    }
    
    // Basic password validation
    if (password.length < 6) {
      toast.error(language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' : 'Password must be at least 6 characters');
      return;
    }
    
    setIsRegistering(true);
    try {
      const success = await register(name, email, password, phone);
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

  return (
    <form onSubmit={handleRegister} className="space-y-4 mt-4">
      <div className="space-y-2">
        <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
          {language === 'ar' ? 'الاسم الكامل' : 'Full Name'}
        </label>
        <Input
          type="text"
          placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Enter your full name'}
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
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
            minLength={6}
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
  );
}
