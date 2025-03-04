
import { Bell } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function EmptyState() {
  const { language } = useLanguage();
  
  return (
    <div className="text-center py-16">
      <Bell className="h-16 w-16 mx-auto text-muted-foreground" />
      <h2 className="mt-4 text-xl font-bold">
        {language === 'ar' ? 'لا توجد إشعارات' : 'No notifications'}
      </h2>
      <p className="mt-2 text-muted-foreground">
        {language === 'ar' 
          ? 'سيتم إعلامك هنا عند وجود إشعارات جديدة' 
          : 'You will be notified here when there are new notifications'}
      </p>
      <Link to="/">
        <Button className="mt-6">
          {language === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to Home'}
        </Button>
      </Link>
    </div>
  );
}
