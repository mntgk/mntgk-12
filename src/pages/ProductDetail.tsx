
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Heart, Share2, Flag, MapPin, MessageCircle, 
  Phone, WhatsApp, Star, ChevronLeft
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

// بيانات وهمية للعرض
// في التطبيق الحقيقي، هذه البيانات ستأتي من API أو قاعدة بيانات
const productData = {
  id: "1",
  title: {
    ar: "شقة حديثة في وسط المدينة",
    en: "Modern Apartment in City Center"
  },
  description: {
    ar: "شقة مفروشة حديثة بمساحة 120 متر مربع، تتألف من 3 غرف نوم وصالون واسع ومطبخ مفتوح. تقع في قلب المدينة قريبة من جميع الخدمات والمواصلات. الشقة مجهزة بالكامل وجاهزة للسكن الفوري.",
    en: "Furnished modern apartment with an area of 120 square meters, consisting of 3 bedrooms, a spacious living room, and an open kitchen. Located in the heart of the city, close to all services and transportation. The apartment is fully equipped and ready for immediate occupancy."
  },
  price: 250000,
  images: [
    "https://images.unsplash.com/photo-1527576539890-dfa815648363",
    "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
    "https://images.unsplash.com/photo-1560448204-603b3fc33ddc"
  ],
  category: {
    ar: "عقارات",
    en: "Real Estate"
  },
  location: {
    ar: "وسط المدينة",
    en: "City Center"
  },
  region: {
    ar: "دمشق",
    en: "Damascus"
  },
  createdAt: "2023-11-15",
  likes: 42,
  views: 156,
  seller: {
    id: "user123",
    name: {
      ar: "أحمد محمد",
      en: "Ahmed Mohammed"
    },
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    memberSince: "2022-05-10",
    rating: 4.7,
    numRatings: 28,
    phone: "+963 912 345 678",
    whatsapp: "+963 912 345 678"
  }
};

const ProductDetail = () => {
  const [mainImage, setMainImage] = useState(productData.images[0]);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(productData.likes);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const { productId } = useParams();
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const toggleLike = () => {
    if (liked) {
      setLikesCount(likesCount - 1);
    } else {
      setLikesCount(likesCount + 1);
    }
    setLiked(!liked);
    
    toast({
      title: liked ? "تم إزالة المنتج من المفضلة" : "تمت إضافة المنتج إلى المفضلة",
      description: liked ? "يمكنك إضافته مرة أخرى في أي وقت" : "يمكنك مشاهدة المفضلة في صفحة المفضلة",
    });
  };

  const handleReport = () => {
    toast({
      title: "تم إرسال البلاغ",
      description: "شكراً لمساعدتنا في الحفاظ على جودة المنصة",
    });
    setIsReportDialogOpen(false);
  };

  const handleShare = () => {
    // Simulating share action
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "تم نسخ الرابط",
      description: "يمكنك مشاركته مع أصدقائك الآن",
    });
    setIsShareDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4 space-y-6">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/" className="flex items-center">
              <ChevronLeft className="h-4 w-4 ml-1" />
              <span>{t('home')}</span>
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* صور المنتج */}
          <div className="space-y-3">
            <div className="rounded-xl overflow-hidden aspect-video bg-muted">
              <img 
                src={mainImage} 
                alt={productData.title[language]} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-3 gap-2">
              {productData.images.map((image, index) => (
                <button 
                  key={index} 
                  className={`rounded-lg overflow-hidden border-2 ${mainImage === image ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setMainImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`صورة ${index + 1}`} 
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* تفاصيل المنتج */}
          <div className="space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-2xl font-bold">{productData.title[language]}</h1>
              <div className="flex space-x-2 space-x-reverse">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={toggleLike}
                  className={liked ? "text-red-500" : ""}
                >
                  <Heart className={`h-5 w-5 ${liked ? "fill-red-500" : ""}`} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setIsShareDialogOpen(true)}
                >
                  <Share2 className="h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => setIsReportDialogOpen(true)}
                >
                  <Flag className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="text-2xl font-bold text-primary">
              {productData.price.toLocaleString()} ل.س
            </div>

            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 ml-1" />
              <span>{productData.region[language]}, {productData.location[language]}</span>
              <span className="mx-2">•</span>
              <span>{productData.category[language]}</span>
            </div>

            <Separator />
            
            <div>
              <h2 className="text-lg font-semibold mb-2">{t('description')}</h2>
              <p className="text-muted-foreground">
                {productData.description[language]}
              </p>
            </div>

            <Separator />

            <div>
              <h2 className="text-lg font-semibold mb-3">{t('sellerInfo')}</h2>
              <div className="flex items-center space-x-3 space-x-reverse">
                <img 
                  src={productData.seller.avatar} 
                  alt={productData.seller.name[language]} 
                  className="w-12 h-12 rounded-full border"
                />
                <div>
                  <p className="font-medium">{productData.seller.name[language]}</p>
                  <div className="flex items-center mt-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < Math.floor(productData.seller.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground mr-1">
                      ({productData.seller.rating}) - {productData.seller.numRatings} {t('sellerRating')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-green-600 hover:bg-green-700">
                <WhatsApp className="ml-2 h-5 w-5" />
                <span>واتساب</span>
              </Button>
              <Button>
                <Phone className="ml-2 h-5 w-5" />
                <span>اتصال</span>
              </Button>
              <Button variant="outline" className="col-span-2">
                <MessageCircle className="ml-2 h-5 w-5" />
                <span>رسالة</span>
              </Button>
            </div>
            
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg mt-4 text-sm text-yellow-800 dark:text-yellow-300">
              <p className="font-semibold mb-1">⚠️ {t('warningMessage')}</p>
            </div>
          </div>
        </div>
      </main>

      {/* نافذة الإبلاغ */}
      <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('report')}</DialogTitle>
            <DialogDescription>
              ساعدنا في الحفاظ على جودة المنصة من خلال الإبلاغ عن المحتوى غير المناسب
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-2 py-4">
            {["منتج مزيف", "محتوى غير لائق", "سعر غير واقعي", "إعلان مكرر", "سبب آخر"].map((reason) => (
              <div key={reason} className="flex items-center">
                <input 
                  type="radio" 
                  id={reason} 
                  name="reportReason" 
                  value={reason}
                  checked={reportReason === reason}
                  onChange={(e) => setReportReason(e.target.value)}
                  className="ml-2"
                />
                <label htmlFor={reason}>{reason}</label>
              </div>
            ))}
            <textarea 
              placeholder="تفاصيل إضافية (اختياري)" 
              className="w-full border rounded-md p-2 mt-2 h-24"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReportDialogOpen(false)}>إلغاء</Button>
            <Button onClick={handleReport}>إرسال البلاغ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* نافذة المشاركة */}
      <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('share')}</DialogTitle>
            <DialogDescription>
              شارك هذا المنتج مع أصدقائك
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-center space-x-4 space-x-reverse py-4">
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
              <WhatsApp className="h-6 w-6 text-green-600" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-blue-600">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-sky-500">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Button>
            <Button variant="outline" size="icon" className="rounded-full w-12 h-12">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-red-600">
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
                <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
              </svg>
            </Button>
          </div>
          <div className="relative">
            <input 
              type="text" 
              value={window.location.href} 
              readOnly
              className="w-full border rounded-md p-2 pr-2 pl-24"
            />
            <Button 
              className="absolute left-1 top-1/2 -translate-y-1/2 h-8"
              onClick={handleShare}
            >
              نسخ الرابط
            </Button>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsShareDialogOpen(false)}>إغلاق</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default ProductDetail;
