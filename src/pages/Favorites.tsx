
import { useState } from "react";
import { Trash2, Heart } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const initialFavoriteProducts = [
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
  const { language, t } = useLanguage();
  const [favoriteProducts, setFavoriteProducts] = useState(initialFavoriteProducts);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const handleDeleteAll = () => {
    setFavoriteProducts([]);
    toast.success(language === 'ar' ? "تم حذف جميع المفضلة" : "All favorites deleted");
    setConfirmDeleteOpen(false);
  };

  const removeFavorite = (id: string) => {
    setFavoriteProducts(favoriteProducts.filter(product => product.id !== id));
    toast.success(language === 'ar' ? "تم إزالة المنتج من المفضلة" : "Item removed from favorites");
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{language === 'ar' ? 'المفضلة' : 'Favorites'}</h1>
          {favoriteProducts.length > 0 && (
            <AlertDialog open={confirmDeleteOpen} onOpenChange={setConfirmDeleteOpen}>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-red-500 hover:text-red-700 hover:bg-red-100 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4 ml-2" />
                  <span>{language === 'ar' ? 'حذف الكل' : 'Delete All'}</span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    {language === 'ar' ? 'حذف جميع المفضلة' : 'Delete all favorites'}
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    {language === 'ar' 
                      ? 'هل أنت متأكد من رغبتك في حذف جميع المنتجات من المفضلة؟ هذا الإجراء لا يمكن التراجع عنه.' 
                      : 'Are you sure you want to delete all items from favorites? This action cannot be undone.'}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>
                    {language === 'ar' ? 'إلغاء' : 'Cancel'}
                  </AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleDeleteAll}
                    className="bg-red-500 hover:bg-red-600"
                  >
                    {language === 'ar' ? 'حذف' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
        
        {/* Content */}
        {favoriteProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {favoriteProducts.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard key={product.id} {...product} />
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 h-8 w-8 rounded-full opacity-70 hover:opacity-100"
                  onClick={() => removeFavorite(product.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 mx-auto text-muted-foreground" />
            <h2 className="mt-4 text-xl font-bold">
              {language === 'ar' ? 'لا توجد منتجات في المفضلة' : 'No products in favorites'}
            </h2>
            <p className="mt-2 text-muted-foreground">
              {language === 'ar' 
                ? 'قم بإضافة منتجات إلى المفضلة لتظهر هنا' 
                : 'Add products to favorites to show here'}
            </p>
            <Button className="mt-6" size="lg">
              {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
            </Button>
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default Favorites;
