
import { useState } from "react";
import { Link } from "react-router-dom";
import { Building, Car, Computer, Wrench, Sofa, Shirt, Home as HomeIcon, ChevronLeft, Book, Utensils, Gamepad, Briefcase, Scissors } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { UserStory } from "@/components/UserStory";
import { Button } from "@/components/ui/button";

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

const categories = [
  {
    title: "سيارات",
    icon: <Car className="h-6 w-6" />,
    href: "/category/vehicles"
  },
  {
    title: "عقارات",
    icon: <Building className="h-6 w-6" />,
    href: "/category/real-estate"
  },
  {
    title: "تقنية",
    icon: <Computer className="h-6 w-6" />,
    href: "/category/technology"
  },
  {
    title: "خدمات",
    icon: <Wrench className="h-6 w-6" />,
    href: "/category/services"
  },
  {
    title: "أثاث",
    icon: <Sofa className="h-6 w-6" />,
    href: "/category/furniture"
  },
  {
    title: "ملابس",
    icon: <Shirt className="h-6 w-6" />,
    href: "/category/clothes"
  },
  {
    title: "أجهزة منزلية",
    icon: <HomeIcon className="h-6 w-6" />,
    href: "/category/appliances"
  },
  {
    title: "طعام",
    icon: <Utensils className="h-6 w-6" />,
    href: "/category/food"
  },
  {
    title: "ألعاب",
    icon: <Gamepad className="h-6 w-6" />,
    href: "/category/games"
  },
  {
    title: "وظائف",
    icon: <Briefcase className="h-6 w-6" />,
    href: "/category/jobs"
  },
  {
    title: "يدويات",
    icon: <Scissors className="h-6 w-6" />,
    href: "/category/handmade"
  }
];

const popularSearches = [
  "آيفون", "سامسونج", "لابتوب", "شقق للإيجار", "سيارات", "أثاث مستعمل"
];

// بيانات مثالية للقصص
const stories = [
  {
    id: 1,
    username: "أحمد",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
    image: "https://images.unsplash.com/photo-1571867424488-4565932edb41",
    title: "سيارات فاخرة"
  },
  {
    id: 2,
    username: "سارة",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7",
    title: "تقنية حديثة"
  },
  {
    id: 3,
    username: "محمد",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    title: "أجهزة منزلية"
  },
  {
    id: 4,
    username: "نور",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    image: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914",
    title: "عقارات مميزة"
  },
  {
    id: 5,
    username: "خالد",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    image: "https://images.unsplash.com/photo-1492681290082-e932832941e6",
    title: "أثاث منزلي"
  },
  {
    id: 6,
    username: "ليلى",
    avatar: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    title: "أحذية رياضية"
  }
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4 space-y-6">
        {/* Stories */}
        <section className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          <div className="flex space-x-3 space-x-reverse mb-2">
            {stories.map((story) => (
              <UserStory key={story.id} story={story} />
            ))}
          </div>
        </section>

        {/* Categories Scroller */}
        <section className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          <div className="flex space-x-2 space-x-reverse">
            {categories.map((category) => (
              <button
                key={category.title}
                className={`category-chip ${activeCategory === category.title ? 'active' : ''}`}
                onClick={() => setActiveCategory(
                  activeCategory === category.title ? null : category.title
                )}
              >
                <div className="flex items-center space-x-2 space-x-reverse">
                  {category.icon}
                  <span>{category.title}</span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Popular Searches */}
        <section>
          <h3 className="text-lg font-semibold mb-3">عمليات البحث الشائعة</h3>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((search) => (
              <Link key={search} to={`/search?q=${search}`} className="category-chip">
                {search}
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">الإعلانات المميزة</h3>
            <div className="flex items-center">
              <Link to="/featured" className="text-primary flex items-center text-sm font-medium ml-4">
                <span>عرض الكل</span>
                <ChevronLeft className="h-4 w-4" />
              </Link>
              
              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("grid")}
                >
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                    <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                    <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                    <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                  </div>
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setViewMode("list")}
                >
                  <div className="flex flex-col gap-0.5">
                    <div className="h-1 w-4 rounded-sm bg-current"></div>
                    <div className="h-1 w-4 rounded-sm bg-current"></div>
                    <div className="h-1 w-4 rounded-sm bg-current"></div>
                  </div>
                </Button>
              </div>
            </div>
          </div>
          
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {featuredProducts.slice(0, 4).map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {featuredProducts.slice(0, 4).map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="block animate-fade-up">
                  <div className="border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-all flex">
                    <div className="w-1/3 sm:w-1/4">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 flex-1">
                      <h3 className="font-medium">{product.title}</h3>
                      <p className="text-lg font-semibold text-primary mt-1">{product.price.toLocaleString()} ل.س</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">{product.location}</span>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">{product.category}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Recent Listings */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">أحدث الإعلانات</h3>
            <Link to="/latest" className="text-primary flex items-center text-sm font-medium">
              <span>عرض الكل</span>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </div>
          {viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {featuredProducts.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="block animate-fade-up">
                  <div className="border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-all flex">
                    <div className="w-1/3 sm:w-1/4">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 flex-1">
                      <h3 className="font-medium">{product.title}</h3>
                      <p className="text-lg font-semibold text-primary mt-1">{product.price.toLocaleString()} ل.س</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">{product.location}</span>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">{product.category}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
