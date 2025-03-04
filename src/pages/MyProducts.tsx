
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Trash, Edit, Plus } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import LoginRequired from "@/components/profile/LoginRequired";
import { supabase } from "@/integrations/supabase/client";

const MyProducts = () => {
  const { isAuthenticated, user } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch user's products
  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const fetchUserProducts = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error("Error fetching user products:", error);
        toast.error(language === 'ar' ? 'فشل في تحميل المنتجات' : 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProducts();
  }, [isAuthenticated, user]);

  const handleEditProduct = (productId: string) => {
    navigate(`/post?edit=${productId}`);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm(language === 'ar' ? 'هل أنت متأكد من حذف هذا المنتج؟' : 'Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('user_id', user?.id);

      if (error) throw error;

      // Update local state
      setProducts(products.filter(p => p.id !== productId));
      toast.success(language === 'ar' ? 'تم حذف المنتج بنجاح' : 'Product deleted successfully');
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error(language === 'ar' ? 'فشل في حذف المنتج' : 'Failed to delete product');
    }
  };

  // Redirect if not logged in
  if (!isAuthenticated) {
    return <LoginRequired />;
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />

      <main className="container py-4">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            {language === 'ar' ? 'منتجاتي' : 'My Listings'}
          </h1>
          <Button onClick={() => navigate('/post')}>
            <Plus className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'إضافة إعلان جديد' : 'Add New Ad'}
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-card animate-pulse rounded-lg h-48"></div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">
              {language === 'ar' ? 'لا توجد إعلانات' : 'No Listings Yet'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {language === 'ar' ? 'لم تقم بنشر أي إعلانات بعد' : 'You haven\'t posted any ads yet'}
            </p>
            <Button onClick={() => navigate('/post')}>
              {language === 'ar' ? 'نشر إعلان جديد' : 'Post a New Ad'}
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="bg-card border rounded-lg overflow-hidden">
                <div 
                  className="aspect-video bg-cover bg-center cursor-pointer" 
                  style={{ backgroundImage: `url(${product.images?.[0] || '/placeholder.svg'})` }}
                  onClick={() => navigate(`/product/${product.id}`)}
                ></div>
                <div className="p-4">
                  <h3 
                    className="font-semibold truncate cursor-pointer" 
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {product.title}
                  </h3>
                  <p className="text-primary font-medium">
                    {Number(product.price).toLocaleString()} {product.currency || 'SYP'}
                  </p>
                  <div className="mt-4 flex justify-between">
                    <Button size="sm" variant="outline" onClick={() => handleEditProduct(product.id)}>
                      <Edit className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'تعديل' : 'Edit'}
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDeleteProduct(product.id)}>
                      <Trash className="h-4 w-4 mr-2" />
                      {language === 'ar' ? 'حذف' : 'Delete'}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <BottomNav />
    </div>
  );
};

export default MyProducts;
