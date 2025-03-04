
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export function EmptyFavorites() {
  const { language } = useLanguage();
  
  return (
    <div className="text-center py-16">
      <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
      <h2 className="mt-4 text-xl font-bold">
        {language === 'ar' ? 'لا توجد عناصر في المفضلة' : 'No favorites yet'}
      </h2>
      <p className="mt-2 text-muted-foreground">
        {language === 'ar' 
          ? 'اضغط على رمز القلب لحفظ المنتجات المفضلة لديك'
          : 'Tap the heart icon to save your favorite items'}
      </p>
      <Link to="/">
        <Button className="mt-6">
          {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
        </Button>
      </Link>
    </div>
  );
}
