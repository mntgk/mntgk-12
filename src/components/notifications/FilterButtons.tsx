
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { MessageCircle, Heart, ShoppingBag, Bell } from "lucide-react";

interface FilterButtonsProps {
  filters: string[];
  onFilterChange: (type: string) => void;
}

export function FilterButtons({ filters, onFilterChange }: FilterButtonsProps) {
  const { language } = useLanguage();
  
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <Button 
        variant={filters.length === 0 ? "default" : "outline"} 
        size="sm"
        onClick={() => onFilterChange('all')}
      >
        {language === 'ar' ? 'الكل' : 'All'}
      </Button>
      <Button 
        variant={filters.includes('message') ? "default" : "outline"} 
        size="sm"
        onClick={() => onFilterChange('message')}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        {language === 'ar' ? 'رسائل' : 'Messages'}
      </Button>
      <Button 
        variant={filters.includes('like') ? "default" : "outline"} 
        size="sm"
        onClick={() => onFilterChange('like')}
      >
        <Heart className="h-4 w-4 mr-2" />
        {language === 'ar' ? 'إعجابات' : 'Likes'}
      </Button>
      <Button 
        variant={filters.includes('order') ? "default" : "outline"} 
        size="sm"
        onClick={() => onFilterChange('order')}
      >
        <ShoppingBag className="h-4 w-4 mr-2" />
        {language === 'ar' ? 'طلبات' : 'Requests'}
      </Button>
      <Button 
        variant={filters.includes('system') ? "default" : "outline"} 
        size="sm"
        onClick={() => onFilterChange('system')}
      >
        <Bell className="h-4 w-4 mr-2" />
        {language === 'ar' ? 'النظام' : 'System'}
      </Button>
      <Button 
        variant={filters.includes('comment') ? "default" : "outline"} 
        size="sm"
        onClick={() => onFilterChange('comment')}
      >
        <MessageCircle className="h-4 w-4 mr-2" />
        {language === 'ar' ? 'تعليقات' : 'Comments'}
      </Button>
      <Button 
        variant={filters.includes('ads') ? "default" : "outline"} 
        size="sm"
        onClick={() => onFilterChange('ads')}
      >
        <Bell className="h-4 w-4 mr-2" />
        {language === 'ar' ? 'إعلانات مطابقة' : 'Matching Ads'}
      </Button>
    </div>
  );
}
