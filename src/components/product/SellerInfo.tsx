
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

interface Seller {
  id: string;
  name: string;
  image: string;
  isVerified: boolean;
  memberSince: string;
  responseRate: number;
}

interface SellerInfoProps {
  seller: Seller;
  views: number;
  status: string;
}

export function SellerInfo({ seller, views, status }: SellerInfoProps) {
  const { language } = useLanguage();
  
  const handleContactSeller = () => {
    toast.success(language === 'ar'
      ? 'تم إرسال رسالة إلى البائع'
      : 'Message sent to seller');
  };
  
  return (
    <div className="border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        {language === 'ar' ? 'معلومات البائع' : 'Seller Information'}
      </h3>
      
      <div className="flex items-center mb-4">
        <img 
          src={seller.image} 
          alt={seller.name}
          className="w-12 h-12 rounded-full object-cover mr-3"
        />
        <div>
          <p className="font-medium flex items-center">
            {seller.name}
            {seller.isVerified && (
              <span className="ml-1 bg-primary/10 text-primary text-xs px-1.5 py-0.5 rounded-full">
                {language === 'ar' ? 'موثق' : 'Verified'}
              </span>
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            {language === 'ar' 
              ? `عضو منذ ${seller.memberSince}` 
              : `Member since ${seller.memberSince}`}
          </p>
        </div>
      </div>
      
      <div className="text-sm mb-4">
        <div className="flex justify-between py-2 border-b">
          <span className="text-muted-foreground">
            {language === 'ar' ? 'معدل الاستجابة' : 'Response Rate'}:
          </span>
          <span className="font-medium">{seller.responseRate}%</span>
        </div>
        <div className="flex justify-between py-2 border-b">
          <span className="text-muted-foreground">
            {language === 'ar' ? 'مشاهدات الإعلان' : 'Ad Views'}:
          </span>
          <span className="font-medium">{views}</span>
        </div>
        <div className="flex justify-between py-2">
          <span className="text-muted-foreground">
            {language === 'ar' ? 'الحالة' : 'Status'}:
          </span>
          <span className="font-medium text-green-600">
            {language === 'ar' ? 'متاح' : 'Available'}
          </span>
        </div>
      </div>
      
      <Button className="w-full" onClick={handleContactSeller}>
        <MessageSquare className="h-4 w-4 ml-2" />
        <span>{language === 'ar' ? 'تواصل مع البائع' : 'Contact Seller'}</span>
      </Button>
    </div>
  );
}
