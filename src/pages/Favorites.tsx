
import { Trash2, Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";

const favoriteProducts = [
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
  }
];

const Favorites = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">المفضلة</h1>
          {favoriteProducts.length > 0 && (
            <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20">
              <Trash2 className="h-4 w-4 ml-2" />
              <span>حذف الكل</span>
            </Button>
          )}
        </div>
        
        {/* Content */}
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="mt-4 text-xl font-bold">لا توجد منتجات في المفضلة</h2>
            <p className="mt-2 text-muted-foreground">قم بإضافة منتجات إلى المفضلة لتظهر هنا</p>
            <Button className="mt-6" size="lg">
              تصفح المنتجات
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Favorites;
