
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// بيانات مثالية للمنتجات المميزة
const featuredProducts = [
  {
    id: "1",
    title: "شقة حديثة في وسط المدينة",
    price: 250000,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
    category: "عقارات",
    location: "وسط المدينة"
  },
  {
    id: "2",
    title: "ماك بوك برو 16 انش",
    price: 2499,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    category: "تقنية",
    location: "مركز المدينة"
  },
  {
    id: "3",
    title: "خدمات تطوير مواقع",
    price: 500,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "خدمات",
    location: "عن بعد"
  },
  {
    id: "4",
    title: "سيارة مستعملة بحالة ممتازة",
    price: 35000,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
    category: "سيارات",
    location: "الشمال"
  },
  {
    id: "5",
    title: "أريكة جلدية فاخرة",
    price: 1200,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    category: "أثاث",
    location: "حي الميدان"
  },
  {
    id: "6",
    title: "سماعات Apple AirPods Pro",
    price: 400,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5",
    category: "تقنية",
    location: "المزة"
  },
  {
    id: "7",
    title: "هاتف iPhone 13 Pro Max",
    price: 3500,
    image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a",
    category: "تقنية",
    location: "وسط المدينة"
  },
  {
    id: "8",
    title: "دراجة هوائية جبلية",
    price: 800,
    image: "https://images.unsplash.com/photo-1507035895480-2b3156c31fc8",
    category: "رياضة",
    location: "جبل قاسيون"
  },
  {
    id: "9",
    title: "طاولة طعام خشبية",
    price: 650,
    image: "https://images.unsplash.com/photo-1577140917170-285929fb55b7",
    category: "أثاث",
    location: "جرمانا"
  },
  {
    id: "10",
    title: "ثلاجة سامسونج ديجيتال",
    price: 1800,
    image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30",
    category: "أجهزة منزلية",
    location: "المهاجرين"
  }
];

const Featured = () => {
  const { language, t } = useLanguage();
  const [sortOption, setSortOption] = useState<string>("newest");

  const sortedProducts = [...featuredProducts].sort((a, b) => {
    if (sortOption === "price-high") {
      return b.price - a.price;
    } else if (sortOption === "price-low") {
      return a.price - b.price;
    }
    // Default: newest (we'll just use the array as is for this example)
    return 0;
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {language === 'ar' ? 'الإعلانات المميزة' : 'Featured Listings'}
          </h1>
          
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="gap-2"
              onClick={() => {
                document.getElementById('filter-options')?.classList.toggle('hidden');
              }}
            >
              <Filter className="h-4 w-4" />
              <span>{language === 'ar' ? 'فلترة' : 'Filter'}</span>
            </Button>
          </div>
        </div>
        
        <div id="filter-options" className="hidden mb-4 p-4 bg-muted rounded-lg">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={sortOption === "newest" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSortOption("newest")}
            >
              {language === 'ar' ? 'الأحدث' : 'Newest'}
            </Button>
            <Button 
              variant={sortOption === "price-high" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSortOption("price-high")}
            >
              {language === 'ar' ? 'السعر: من الأعلى إلى الأقل' : 'Price: High to Low'}
            </Button>
            <Button 
              variant={sortOption === "price-low" ? "default" : "outline"} 
              size="sm"
              onClick={() => setSortOption("price-low")}
            >
              {language === 'ar' ? 'السعر: من الأقل إلى الأعلى' : 'Price: Low to High'}
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {sortedProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              likes={Math.floor(Math.random() * 50)}
            />
          ))}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Featured;
