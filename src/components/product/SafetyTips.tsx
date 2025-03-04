
import { useLanguage } from "@/contexts/LanguageContext";

export function SafetyTips() {
  const { language } = useLanguage();
  
  return (
    <div className="border rounded-xl p-6 bg-muted/50">
      <h3 className="text-lg font-semibold mb-4">
        {language === 'ar' ? 'نصائح للتسوق الآمن' : 'Safety Tips'}
      </h3>
      <ul className="space-y-2 text-sm">
        <li className="flex items-start">
          <span className="mr-2">•</span>
          {language === 'ar' 
            ? 'تفقد المنتج شخصياً قبل الشراء' 
            : 'Inspect the item in person before purchasing'}
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          {language === 'ar' 
            ? 'اطلب إيصالاً أو ضماناً للمنتج' 
            : 'Request a receipt or warranty for the product'}
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          {language === 'ar' 
            ? 'لا ترسل المال مقدماً دون التحقق' 
            : 'Do not send money in advance without verification'}
        </li>
        <li className="flex items-start">
          <span className="mr-2">•</span>
          {language === 'ar' 
            ? 'قابل البائع في مكان عام آمن' 
            : 'Meet the seller in a safe public place'}
        </li>
      </ul>
    </div>
  );
}
