
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export function useProductDetail(productId: string | undefined) {
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!productId) return;

    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        // Get the product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', productId)
          .single();

        if (productError) {
          console.error("Error fetching product details:", productError);
          setLoading(false);
          return;
        }

        if (productData) {
          setProduct(productData);
          
          // Get the seller profile
          const { data: sellerData, error: sellerError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', productData.user_id)
            .single();

          if (sellerError) {
            console.error("Error fetching seller details:", sellerError);
          } else {
            setSeller(sellerData);
          }
          
          // Get similar products
          const { data: similarData, error: similarError } = await supabase
            .from('products')
            .select('*')
            .eq('category', productData.category)
            .neq('id', productId)
            .limit(3);

          if (similarError) {
            console.error("Error fetching similar products:", similarError);
          } else {
            setSimilarProducts(similarData || []);
          }
        }
      } catch (error) {
        console.error("Error in product detail fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  // Record view count
  useEffect(() => {
    if (productId && product && user?.id !== product.user_id) {
      // We would log view analytically here
      console.log("View recorded for product:", productId);
    }
  }, [product, productId, user]);

  return { product, seller, loading, similarProducts };
}

export function ProductDetailSkeleton() {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-80 bg-muted rounded-lg"></div>
      <div className="h-10 bg-muted rounded w-3/4"></div>
      <div className="h-6 bg-muted rounded w-1/4"></div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="h-40 bg-muted rounded"></div>
        </div>
        <div>
          <div className="h-60 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
}

export function ProductNotFound({ language }: { language: string }) {
  return (
    <div className="py-12 text-center">
      <h1 className="text-2xl font-bold mb-4">
        {language === 'ar' ? 'المنتج غير موجود' : 'Product not found'}
      </h1>
      <p className="mb-6 text-muted-foreground">
        {language === 'ar' 
          ? 'عذراً، لم يتم العثور على المنتج المطلوب' 
          : 'Sorry, the requested product could not be found'}
      </p>
      <Link to="/">
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90">
          <ChevronLeft className="h-4 w-4" />
          {language === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to home'}
        </button>
      </Link>
    </div>
  );
}
