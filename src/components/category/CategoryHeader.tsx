
import { useParams } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function CategoryHeader() {
  const { categoryId } = useParams();
  const { language, translateCategory } = useLanguage();
  
  return (
    <div className="mb-4">
      <h1 className="text-2xl font-bold">
        {language === 'ar' ? 'فئة:' : 'Category:'} {translateCategory(categoryId || '')}
      </h1>
      <p className="text-muted-foreground">
        {language === 'ar' 
          ? 'تصفح الإعلانات المتاحة في هذه الفئة' 
          : 'Browse available listings in this category'}
      </p>
    </div>
  );
}
