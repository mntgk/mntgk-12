
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toggleLanguage: () => void;
}

export function MobileMenu({ isOpen, setIsOpen, toggleLanguage }: MobileMenuProps) {
  const { language } = useLanguage();
  const { isAuthenticated } = useAuth();

  if (!isOpen) return null;

  return (
    <div className="border-t p-4 space-y-4 bg-background">
      <div className="flex flex-col space-y-3">
        <Button variant="outline" asChild>
          <Link to="/" onClick={() => setIsOpen(false)}>
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/categories" onClick={() => setIsOpen(false)}>
            {language === 'ar' ? 'الفئات' : 'Categories'}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/featured" onClick={() => setIsOpen(false)}>
            {language === 'ar' ? 'مميز' : 'Featured'}
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/latest" onClick={() => setIsOpen(false)}>
            {language === 'ar' ? 'أحدث المنتجات' : 'Latest'}
          </Link>
        </Button>
        {isAuthenticated ? (
          <>
            <Button variant="outline" asChild>
              <Link to="/post" onClick={() => setIsOpen(false)}>
                {language === 'ar' ? 'نشر إعلان' : 'Post Ad'}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/profile" onClick={() => setIsOpen(false)}>
                {language === 'ar' ? 'حسابي' : 'My Profile'}
              </Link>
            </Button>
          </>
        ) : (
          <Button variant="outline" asChild>
            <Link to="/login" onClick={() => setIsOpen(false)}>
              {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
            </Link>
          </Button>
        )}
        <Button variant="outline" onClick={toggleLanguage}>
          {language === 'ar' ? 'English' : 'العربية'}
        </Button>
      </div>
    </div>
  );
}
