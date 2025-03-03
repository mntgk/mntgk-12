
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const LoginRequired = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <img 
        src="/lovable-uploads/9c7d94b9-c841-4c9a-bb51-db6df6b25b36.png" 
        alt={language === 'ar' ? 'منتجك' : 'Montajak'} 
        className="h-16 mb-6"
      />
      <h1 className="text-2xl font-bold mb-4">
        {language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Login Required'}
      </h1>
      <p className="text-muted-foreground mb-6 text-center">
        {language === 'ar' 
          ? 'يرجى تسجيل الدخول للوصول إلى الملف الشخصي' 
          : 'Please log in to access your profile'}
      </p>
      <div className="flex gap-4">
        <Button onClick={() => navigate('/login')}>
          <LogOut className="h-4 w-4 ml-2" />
          {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
        </Button>
        <Button variant="outline" onClick={() => navigate('/')}>
          {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
        </Button>
      </div>
    </div>
  );
};

export default LoginRequired;
