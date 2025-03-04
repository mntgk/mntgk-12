
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { ProductForm } from "@/components/post/ProductForm";
import { supabase } from "@/integrations/supabase/client";

const Post = () => {
  const [productId, setProductId] = useState<string | null>(null);
  const { language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error(language === 'ar' ? 'يجب تسجيل الدخول لنشر إعلان' : 'You must be logged in to post an ad');
      navigate('/login');
    }
  }, [isAuthenticated, navigate, language]);

  // If productId is set, load product data for editing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('edit');
    if (id) {
      setProductId(id);
      
      // Load product data from Supabase
      const fetchProductData = async () => {
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', id)
            .eq('user_id', user?.id)
            .single();
            
          if (error) {
            toast.error(language === 'ar' ? 'لم يتم العثور على المنتج' : 'Product not found');
            navigate('/profile');
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error(language === 'ar' ? 'حدث خطأ أثناء تحميل بيانات المنتج' : 'Error loading product data');
        }
      };
      
      fetchProductData();
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />

      <main className="container py-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {productId 
              ? (language === 'ar' ? 'تعديل الإعلان' : 'Edit Ad')
              : (language === 'ar' ? 'نشر إعلان جديد' : 'Post a New Ad')
            }
          </h1>
          <ProductForm productId={productId} />
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Post;
