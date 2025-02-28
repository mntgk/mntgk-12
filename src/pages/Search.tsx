
import { useState } from "react";
import { Mic, X, FilterX, Search as SearchIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";

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
  }
];

// بحوث شائعة
const popularSearches = [
  "آيفون", "سامسونج", "لابتوب", "شقق للإيجار", "سيارات", "أثاث مستعمل", 
  "كاميرا", "دراجة", "تلفزيون", "مكيف", "PlayStation", "عمل عن بعد"
];

// بحوث حديثة
const recentSearches = [
  "شقة في دمشق", "سيارة مستعملة", "لابتوب ماك", "ثلاجة", "موبايل سامسونج"
];

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof featuredProducts>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    if (!searchTerm.trim()) return;
    
    // محاكاة نتائج البحث - في التطبيق الحقيقي ستأتي من API
    const results = featuredProducts.filter(product => 
      product.title.includes(searchTerm) || 
      product.category.includes(searchTerm) ||
      product.location.includes(searchTerm)
    );
    
    setSearchResults(results);
    setHasSearched(true);
  };

  const handleMicSearch = () => {
    setIsListening(true);
    
    // محاكاة البحث الصوتي - في التطبيق الحقيقي سيستخدم Web Speech API
    setTimeout(() => {
      setIsListening(false);
      setSearchTerm("سيارات مستعملة");
      
      // محاكاة نتائج البحث
      const results = featuredProducts.filter(product => 
        product.category === "سيارات"
      );
      
      setSearchResults(results);
      setHasSearched(true);
    }, 2000);
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="ابحث عن منتجات..."
                className="w-full pr-10 pl-10 py-6 text-lg rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {searchTerm && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={clearSearch}
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
            <Button 
              className={`h-12 w-12 rounded-full ${isListening ? 'animate-pulse bg-red-500 hover:bg-red-600' : ''}`}
              onClick={handleMicSearch}
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>
          
          {isListening && (
            <div className="absolute top-16 left-0 right-0 bg-background border rounded-lg p-4 text-center shadow-lg">
              <p className="text-lg">جاري الاستماع...</p>
              <p className="text-muted-foreground mt-1">تحدث الآن</p>
            </div>
          )}
        </div>
        
        {/* Search Content */}
        {hasSearched ? (
          <>
            {/* Search Results */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">نتائج البحث: {searchTerm}</h2>
              <Button variant="ghost" size="sm" onClick={clearSearch}>
                <FilterX className="h-4 w-4 ml-2" />
                <span>مسح البحث</span>
              </Button>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                <h2 className="mt-4 text-xl font-bold">لم يتم العثور على نتائج</h2>
                <p className="mt-2 text-muted-foreground">حاول البحث باستخدام كلمات مختلفة</p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">عمليات البحث الأخيرة</h3>
                  <Button variant="ghost" size="sm">مسح</Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <button 
                      key={search} 
                      className="category-chip"
                      onClick={() => {
                        setSearchTerm(search);
                        handleSearch();
                      }}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Popular Searches */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">عمليات البحث الشائعة</h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <button 
                    key={search} 
                    className="category-chip"
                    onClick={() => {
                      setSearchTerm(search);
                      handleSearch();
                    }}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Featured Products */}
            <div>
              <h3 className="text-lg font-semibold mb-3">منتجات مميزة</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Search;
