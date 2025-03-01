
import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Filter } from "lucide-react";

// بيانات مثالية للمنتجات الأحدث
const latestProducts = [
  {
    id: "11",
    title: "سماعات واقع افتراضي",
    price: 1200,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac",
    category: "تقنية",
    location: "وسط المدينة"
  },
  {
    id: "12",
    title: "كرسي مكتبي مريح",
    price: 350,
    image: "https://images.unsplash.com/photo-1505843490701-5be5d1b31f8f",
    category: "أثاث",
    location: "مركز المدينة"
  },
  {
    id: "13",
    title: "خدمات تصميم جرافيك",
    price: 200,
    image: "https://images.unsplash.com/photo-1611532736597-8bc092cda874",
    category: "خدمات",
    location: "عن بعد"
  },
  {
    id: "14",
    title: "دراجة نارية هوندا",
    price: 8000,
    image: "https://images.unsplash.com/photo-1558979158-65a1eaa08691",
    category: "سيارات",
    location: "الشمال"
  },
  {
    id: "15",
    title: "طاولة قهوة زجاجية",
    price: 180,
    image: "https://images.unsplash.com/photo-1534183802368-a3fc40b46444",
    category: "أثاث",
    location: "حي الميدان"
  },
  {
    id: "16",
    title: "ساعة ذكية أبل",
    price: 700,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a",
    category: "تقنية",
    location: "المزة"
  },
  {
    id: "17",
    title: "كاميرا كانون احترافية",
    price: 1500,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    category: "تقنية",
    location: "ركن الدين"
  },
  {
    id: "18",
    title: "كتب تعليمية للأطفال",
    price: 50,
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794",
    category: "تعليم",
    location: "المالكي"
  }
];

const Latest = () => {
  const { language, t } = useLanguage();
  const [sortOption, setSortOption] = useState<string>("newest");

  const sortedProducts = [...latestProducts].sort((a, b) => {
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
            {language === 'ar' ? 'أحدث الإعلانات' : 'Latest Listings'}
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

export default Latest;
