
import { useSearchParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function SearchHeader() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { language } = useLanguage();
  
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">
        {language === 'ar' ? 'نتائج البحث:' : 'Search Results:'} "{query}"
      </h1>
      <p className="text-muted-foreground">
        {language === 'ar' 
          ? 'تصفح النتائج المطابقة لبحثك' 
          : 'Browse listings matching your search'}
      </p>
    </div>
  );
}
