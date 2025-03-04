
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "next-themes";

export function LogoLink() {
  const { language } = useLanguage();
  const { theme } = useTheme();
  
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/9c7d94b9-c841-4c9a-bb51-db6df6b25b36.png" 
        alt="Logo" 
        className={`h-8 ${theme === 'dark' ? 'brightness-150 contrast-150 invert' : ''}`}
      />
      <span className="text-xl font-bold hidden md:inline-block">
        {language === 'ar' ? 'منتجك' : 'Montajak'}
      </span>
    </Link>
  );
}
