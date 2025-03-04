import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CommentSection } from "@/components/CommentSection";
import { ProductImages } from "@/components/product/ProductImages";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductTabs } from "@/components/product/ProductTabs";
import { SellerInfo } from "@/components/product/SellerInfo";
import { SafetyTips } from "@/components/product/SafetyTips";
import { SimilarProducts } from "@/components/product/SimilarProducts";

// Example product data
const productData = {
  "v1": {
    id: "v1",
    title: "مرسيدس E200 موديل 2020",
    price: 120000,
    images: [
      "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
      "https://images.unsplash.com/photo-1533106418989-88406c7cc8ca"
    ],
    description: "سيارة مرسيدس E200 موديل 2020 بحالة ممتازة، ماشية 30 ألف كم فقط، صيانة وكالة، جميع الإضافات متوفرة، لون أسود، فرش جلد بيج، كاميرات 360 درجة، شاشة كبيرة، فتحة سقف، جنوط 19 انش.",
    category: "سيارات",
    location: "دمشق",
    seller: {
      id: "s1",
      name: "أحمد محمد",
      image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
      isVerified: true,
      memberSince: "2019-06-20",
      responseRate: 95
    },
    specifications: [
      { name: "الماركة", value: "مرسيدس" },
      { name: "الموديل", value: "E200" },
      { name: "سنة الصنع", value: "2020" },
      { name: "عدد الكيلومترات", value: "30,000 كم" },
      { name: "نوع الوقود", value: "بنزين" },
      { name: "نوع ناقل الحركة", value: "أوتوماتيك" },
      { name: "اللون الخارجي", value: "أسود" },
      { name: "اللون الداخلي", value: "بيج" }
    ],
    listedDate: "2023-05-10T10:30:00Z",
    views: 1250,
    status: "available",
    enTitle: "Mercedes E200 Model 2020",
    enDescription: "Mercedes E200 Model 2020 in excellent condition, only 30,000 km, dealer maintenance, all features available, black color, beige leather interior, 360-degree cameras, large screen, sunroof, 19-inch rims.",
    enCategory: "Vehicles",
    enLocation: "Damascus",
    enSpecifications: [
      { name: "Brand", value: "Mercedes" },
      { name: "Model", value: "E200" },
      { name: "Year", value: "2020" },
      { name: "Mileage", value: "30,000 km" },
      { name: "Fuel Type", value: "Gasoline" },
      { name: "Transmission", value: "Automatic" },
      { name: "Exterior Color", value: "Black" },
      { name: "Interior Color", value: "Beige" }
    ],
  },
  "r1": {
    id: "r1",
    title: "شقة فاخرة 3 غرف وصالة",
    price: 250000,
    images: [
      "https://images.unsplash.com/photo-1527576539890-dfa815648363",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      "https://images.unsplash.com/photo-1560185893-a55cbc8c57e8"
    ],
    description: "شقة فاخرة في منطقة المزة، 3 غرف نوم وصالون كبير، مساحة 180 متر مربع، طابق 4، إطلالة رائعة، مطبخ مجهز بالكامل، حمامين، تدفئة مركزية، مصعد، موقف سيارة خاص، بناء حديث.",
    category: "عقارات",
    location: "دمشق",
    seller: {
      id: "s2",
      name: "سمير خالد",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
      isVerified: true,
      memberSince: "2018-11-15",
      responseRate: 98
    },
    specifications: [
      { name: "المساحة", value: "180 متر مربع" },
      { name: "عدد الغرف", value: "3 غرف" },
      { name: "عدد الحمامات", value: "2" },
      { name: "الطابق", value: "الرابع" },
      { name: "عمر البناء", value: "3 سنوات" },
      { name: "التدفئة", value: "مركزية" },
      { name: "المصعد", value: "متوفر" },
      { name: "موقف سيارة", value: "متوفر" }
    ],
    listedDate: "2023-06-05T09:15:00Z",
    views: 875,
    status: "available",
    enTitle: "Luxury Apartment 3 Bedrooms and Living Room",
    enDescription: "Luxury apartment in Al Mazzeh area, 3 bedrooms and large living room, area 180 square meters, 4th floor, wonderful view, fully equipped kitchen, 2 bathrooms, central heating, elevator, private parking, modern building.",
    enCategory: "Real Estate",
    enLocation: "Damascus",
    enSpecifications: [
      { name: "Area", value: "180 square meters" },
      { name: "Rooms", value: "3 bedrooms" },
      { name: "Bathrooms", value: "2" },
      { name: "Floor", value: "4th" },
      { name: "Building Age", value: "3 years" },
      { name: "Heating", value: "Central" },
      { name: "Elevator", value: "Available" },
      { name: "Parking", value: "Available" }
    ],
  },
  "t1": {
    id: "t1",
    title: "ماك بوك برو M2 2023",
    price: 3500,
    images: [
      "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9",
      "https://images.unsplash.com/photo-1629131726692-7acaf5ffe9a9"
    ],
    description: "جهاز ماك بوك برو بمعالج M2، موديل 2023، مقاس الشاشة 14 بوصة، ذاكرة 16 جيجابايت، تخزين 512 جيجابايت SSD، لون رمادي داكن، البطارية تدوم حتى 18 ساعة، مستخدم لمدة شهرين فقط، حالة ممتازة، مع الضمان.",
    category: "تقنية",
    location: "دمشق",
    seller: {
      id: "s3",
      name: "نورا أحمد",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
      isVerified: true,
      memberSince: "2021-02-10",
      responseRate: 92
    },
    specifications: [
      { name: "الموديل", value: "ماك بوك برو 2023" },
      { name: "المعالج", value: "Apple M2" },
      { name: "الذاكرة", value: "16 جيجابايت" },
      { name: "التخزين", value: "512 جيجابايت SSD" },
      { name: "حجم الشاشة", value: "14 بوصة" },
      { name: "نظام التشغيل", value: "macOS Ventura" },
      { name: "عمر البطارية", value: "حتى 18 ساعة" },
      { name: "الضمان", value: "متبقي 10 أشهر" }
    ],
    listedDate: "2023-07-20T14:45:00Z",
    views: 650,
    status: "available",
    enTitle: "MacBook Pro M2 2023",
    enDescription: "MacBook Pro with M2 processor, 2023 model, 14-inch screen, 16GB RAM, 512GB SSD storage, space gray color, battery lasts up to 18 hours, used for only two months, excellent condition, with warranty.",
    enCategory: "Technology",
    enLocation: "Damascus",
    enSpecifications: [
      { name: "Model", value: "MacBook Pro 2023" },
      { name: "Processor", value: "Apple M2" },
      { name: "Memory", value: "16GB" },
      { name: "Storage", value: "512GB SSD" },
      { name: "Screen Size", value: "14 inches" },
      { name: "Operating System", value: "macOS Ventura" },
      { name: "Battery Life", value: "Up to 18 hours" },
      { name: "Warranty", value: "10 months remaining" }
    ],
  }
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { language } = useLanguage();

  // If productId doesn't exist in our data
  if (!productId || !productData[productId as keyof typeof productData]) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Navbar />
        <main className="container py-4 text-center">
          <div className="py-12">
            <h1 className="text-2xl font-bold mb-4">
              {language === 'ar' ? 'المنتج غير موجود' : 'Product not found'}
            </h1>
            <p className="mb-6 text-muted-foreground">
              {language === 'ar' 
                ? 'عذراً، لم يتم العثور على المنتج المطلوب' 
                : 'Sorry, the requested product could not be found'}
            </p>
            <Link to="/">
              <Button>
                <ChevronLeft className="ml-2 h-4 w-4" />
                {language === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to home'}
              </Button>
            </Link>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  const product = productData[productId as keyof typeof productData];
  
  // Select the right language data
  const title = language === 'ar' ? product.title : product.enTitle || product.title;
  const description = language === 'ar' ? product.description : product.enDescription || product.description;
  const category = language === 'ar' ? product.category : product.enCategory || product.category;
  const location = language === 'ar' ? product.location : product.enLocation || product.location;
  const specifications = language === 'ar' ? product.specifications : product.enSpecifications || product.specifications;

  // Format date
  const listedDate = new Date(product.listedDate);
  const formattedDate = new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(listedDate);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Back button */}
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="mr-1 h-4 w-4" />
            <span>{language === 'ar' ? 'العودة للرئيسية' : 'Back to home'}</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product images and details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product images gallery */}
            <ProductImages images={product.images} title={title} />
            
            {/* Product main info */}
            <ProductHeader 
              title={title}
              price={product.price}
              location={location}
              category={category}
              formattedDate={formattedDate}
            />
            
            {/* Tabs for Description and Specifications */}
            <ProductTabs 
              description={description}
              specifications={specifications}
            />
            
            {/* Comments section */}
            <div className="mt-8 border-t pt-6">
              <CommentSection productId={productId} />
            </div>
          </div>
          
          {/* Seller info and contact */}
          <div className="space-y-6">
            <SellerInfo 
              seller={product.seller}
              views={product.views}
              status={product.status}
            />
            
            {/* Safety tips */}
            <SafetyTips />
            
            {/* Similar ads */}
            <SimilarProducts 
              products={Object.values(productData)}
              currentProductId={productId}
            />
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default ProductDetail;
