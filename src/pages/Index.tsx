
import { Building, Car, Computer, Wrench } from "lucide-react";
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
  }
];

const categories = [
  {
    title: "سيارات ومركبات",
    icon: <Car className="h-6 w-6" />,
    description: "تصفح السيارات والدراجات النارية والمزيد",
    href: "/category/vehicles"
  },
  {
    title: "عقارات",
    icon: <Building className="h-6 w-6" />,
    description: "ابحث عن عقارات للبيع والإيجار",
    href: "/category/real-estate"
  },
  {
    title: "تقنية",
    icon: <Computer className="h-6 w-6" />,
    description: "اكتشف أحدث الأجهزة والتقنيات",
    href: "/category/technology"
  },
  {
    title: "خدمات",
    icon: <Wrench className="h-6 w-6" />,
    description: "خدمات مهنية وخبرات متنوعة",
    href: "/category/services"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <Navbar />
      
      <main className="container py-8 space-y-12 animate-fade-in">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            سوقك الموثوق
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            بيع، شراء، وتبادل المنتجات في مجتمعك المحلي
          </p>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">تصفح الفئات</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">إعلانات مميزة</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
