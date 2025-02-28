
import { useState } from "react";
import { Link } from "react-router-dom";
import { Building, Car, Computer, Wrench, Sofa, Shirt, Home as HomeIcon, ChevronLeft } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";

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
  }
];

const popularSearches = [
  "آيفون", "سامسونج", "لابتوب", "شقق للإيجار", "سيارات", "أثاث مستعمل"
];

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4 space-y-6">
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
            <Link to="/featured" className="text-primary flex items-center text-sm font-medium">
              <span>عرض الكل</span>
              <ChevronLeft className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
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
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
