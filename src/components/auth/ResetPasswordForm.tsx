
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ResetPasswordFormProps {
  onCancel: () => void;
}

export function ResetPasswordForm({ onCancel }: ResetPasswordFormProps) {
  const { language } = useLanguage();
  const [email, setEmail] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error(language === 'ar' ? 'الرجاء إدخال البريد الإلكتروني' : 'Please enter your email');
      return;
    }
    
    setIsResetting(true);
    
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
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
      onCancel();
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

  return (
    <div className="space-y-4">
      <button 
        onClick={onCancel} 
        className="text-primary flex items-center gap-2"
      >
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
  );
}
