
import { useState } from "react";
import { Bookmark, Share2, Flag, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductHeaderProps {
  title: string;
  price: number;
  location: string;
  category: string;
  formattedDate: string;
}

export function ProductHeader({ title, price, location, category, formattedDate }: ProductHeaderProps) {
  const { language } = useLanguage();
  const [isSaved, setIsSaved] = useState(false);
  
  const handleSaveAd = () => {
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success(language === 'ar' 
        ? 'تم حفظ الإعلان في المفضلة' 
        : 'Ad saved to favorites');
    } else {
      toast.success(language === 'ar' 
        ? 'تم إزالة الإعلان من المفضلة' 
        : 'Ad removed from favorites');
    }
  };

  const handleShareAd = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(language === 'ar' 
      ? 'تم نسخ رابط الإعلان' 
      : 'Ad link copied to clipboard');
  };

  const handleReportAd = () => {
    toast.success(language === 'ar' 
      ? 'تم الإبلاغ عن الإعلان' 
      : 'Ad reported');
  };
  
  return (
    <div>
      <div className="flex justify-between items-start">
        <h1 className="text-2xl font-bold">{title}</h1>
        <span className="text-2xl font-bold text-primary">
          {price.toLocaleString()} {language === 'ar' ? 'ل.س' : 'SYP'}
        </span>
      </div>
      
      <div className="flex items-center text-muted-foreground mt-2 mb-4">
        <MapPin className="h-4 w-4 mr-1" />
        <span className="text-sm">{location}</span>
        <span className="mx-2">•</span>
        <span className="text-sm">{category}</span>
        <span className="mx-2">•</span>
        <Clock className="h-4 w-4 mr-1" />
        <span className="text-sm">{formattedDate}</span>
      </div>
      
      <div className="flex gap-2 mt-4">
        <Button 
          variant={isSaved ? "default" : "outline"} 
          size="sm"
          onClick={handleSaveAd}
        >
          <Bookmark className={`h-4 w-4 ml-1 ${isSaved ? 'fill-primary-foreground' : ''}`} />
          <span>
            {language === 'ar' 
              ? (isSaved ? 'محفوظ' : 'حفظ الإعلان') 
              : (isSaved ? 'Saved' : 'Save Ad')}
          </span>
        </Button>
        <Button variant="outline" size="sm" onClick={handleShareAd}>
          <Share2 className="h-4 w-4 ml-1" />
          <span>{language === 'ar' ? 'مشاركة' : 'Share'}</span>
        </Button>
        <Button variant="outline" size="sm" onClick={handleReportAd}>
          <Flag className="h-4 w-4 ml-1" />
          <span>{language === 'ar' ? 'إبلاغ' : 'Report'}</span>
        </Button>
      </div>
    </div>
  );
}
