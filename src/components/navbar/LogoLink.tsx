
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function LogoLink() {
  const { language } = useLanguage();
  
  return (
    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/lovable-uploads/9c7d94b9-c841-4c9a-bb51-db6df6b25b36.png" 
        alt="Logo" 
        className="h-8" 
      />
      <span className="text-xl font-bold hidden md:inline-block">
        {language === 'ar' ? 'منتجك' : 'Montajak'}
      </span>
    </Link>
  );
}
