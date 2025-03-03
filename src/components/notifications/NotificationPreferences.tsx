
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { Switch } from "@/components/ui/switch";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface NotificationPreferencesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  preferences: Record<string, boolean>;
  onTogglePreference: (key: string) => void;
}

export function NotificationPreferences({ 
  open, 
  onOpenChange, 
  preferences, 
  onTogglePreference 
}: NotificationPreferencesProps) {
  const { language } = useLanguage();

  const getPreferenceName = (key: string, lang: 'ar' | 'en') => {
    const names: Record<string, {ar: string, en: string}> = {
      messages: {ar: "الرسائل", en: "Messages"},
      likes: {ar: "الإعجابات", en: "Likes"},
      system: {ar: "تحديثات النظام", en: "System Updates"},
      orders: {ar: "طلبات التواصل", en: "Contact Requests"},
      newListings: {ar: "الإعلانات الجديدة", en: "New Listings"},
      events: {ar: "العروض والفعاليات", en: "Offers & Events"},
      comments: {ar: "التعليقات", en: "Comments"},
      adsMatching: {ar: "الإعلانات المطابقة للاهتمامات", en: "Ads Matching Interests"}
    };
    return names[key]?.[lang] || key;
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side={language === 'ar' ? "right" : "left"}>
        <SheetHeader>
          <SheetTitle>{language === 'ar' ? 'تفضيلات الإشعارات' : 'Notification Preferences'}</SheetTitle>
          <SheetDescription>
            {language === 'ar' 
              ? 'قم بتخصيص نوع الإشعارات التي ترغب في تلقيها' 
              : 'Customize the types of notifications you want to receive'}
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="flex items-center justify-between">
            <span>{language === 'ar' ? 'الرسائل' : 'Messages'}</span>
            <Switch 
              checked={preferences.messages} 
              onCheckedChange={() => onTogglePreference('messages')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <span>{language === 'ar' ? 'الإعجابات' : 'Likes'}</span>
            <Switch 
              checked={preferences.likes} 
              onCheckedChange={() => onTogglePreference('likes')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <span>{language === 'ar' ? 'تحديثات النظام' : 'System Updates'}</span>
            <Switch 
              checked={preferences.system} 
              onCheckedChange={() => onTogglePreference('system')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <span>{language === 'ar' ? 'طلبات التواصل' : 'Contact Requests'}</span>
            <Switch 
              checked={preferences.orders} 
              onCheckedChange={() => onTogglePreference('orders')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <span>{language === 'ar' ? 'الإعلانات الجديدة' : 'New Listings'}</span>
            <Switch 
              checked={preferences.newListings} 
              onCheckedChange={() => onTogglePreference('newListings')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <span>{language === 'ar' ? 'العروض والفعاليات' : 'Offers & Events'}</span>
            <Switch 
              checked={preferences.events} 
              onCheckedChange={() => onTogglePreference('events')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <span>{language === 'ar' ? 'التعليقات' : 'Comments'}</span>
            <Switch 
              checked={preferences.comments} 
              onCheckedChange={() => onTogglePreference('comments')} 
            />
          </div>
          <div className="flex items-center justify-between">
            <span>{language === 'ar' ? 'الإعلانات المطابقة للاهتمامات' : 'Ads Matching Interests'}</span>
            <Switch 
              checked={preferences.adsMatching} 
              onCheckedChange={() => onTogglePreference('adsMatching')} 
            />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
