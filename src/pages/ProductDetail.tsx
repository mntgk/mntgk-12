
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { CommentSection } from "@/components/CommentSection";
import { ProductImages } from "@/components/product/ProductImages";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductTabs } from "@/components/product/ProductTabs";
import { SellerInfo } from "@/components/product/SellerInfo";
import { SafetyTips } from "@/components/product/SafetyTips";
import { SimilarProducts } from "@/components/product/SimilarProducts";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { language } = useLanguage();
  const { user } = useAuth();
  const [product, setProduct] = useState<any>(null);
  const [seller, setSeller] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [similarProducts, setSimilarProducts] = useState<any[]>([]);

  // Fetch the product details
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

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Navbar />
        <main className="container py-4">
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
        </main>
        <BottomNav />
      </div>
    );
  }

  // If productId doesn't exist or product not found
  if (!productId || !product) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Navbar />
        <main className="container py-4 text-center">
          <div className="py-12">
            <h1 className="text-2xl font-bold mb-4">
              {language === 'ar' ? 'المنتج غير موجود' : 'Product not found'}
            </h1>
            <p className="mb-6 text-muted-foreground">
              {language === 'ar' 
                ? 'عذراً، لم يتم العثور على المنتج المطلوب' 
                : 'Sorry, the requested product could not be found'}
            </p>
            <Link to="/">
              <Button>
                <ChevronLeft className="ml-2 h-4 w-4" />
                {language === 'ar' ? 'العودة للصفحة الرئيسية' : 'Back to home'}
              </Button>
            </Link>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }
  
  // Format date
  const listedDate = new Date(product.created_at);
  const formattedDate = new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(listedDate);

  // Prepare seller info for display
  const sellerInfo = {
    id: product.user_id,
    name: seller?.full_name || "المستخدم",
    image: seller?.avatar || "https://ui-avatars.com/api/?name=User&background=random&color=fff",
    isVerified: true,
    memberSince: seller?.join_date || "2023",
    responseRate: 95
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Back button */}
        <div className="mb-4">
          <Link to="/" className="inline-flex items-center text-muted-foreground hover:text-foreground">
            <ChevronLeft className="mr-1 h-4 w-4" />
            <span>{language === 'ar' ? 'العودة للرئيسية' : 'Back to home'}</span>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product images and details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product images gallery */}
            <ProductImages images={product.images || []} title={product.title} />
            
            {/* Product main info */}
            <ProductHeader 
              title={product.title}
              price={product.price}
              location={product.location}
              category={product.category}
              formattedDate={formattedDate}
            />
            
            {/* Tabs for Description and Specifications */}
            <ProductTabs 
              description={product.description}
              specifications={[
                { name: language === 'ar' ? 'الفئة' : 'Category', value: product.category },
                { name: language === 'ar' ? 'الموقع' : 'Location', value: product.location },
                { name: language === 'ar' ? 'الحالة' : 'Condition', value: product.condition === 'new' ? 
                                 (language === 'ar' ? 'جديد' : 'New') : 
                                 (language === 'ar' ? 'مستعمل' : 'Used') }
              ]}
            />
            
            {/* Comments section */}
            <div className="mt-8 border-t pt-6">
              <CommentSection productId={productId} />
            </div>
          </div>
          
          {/* Seller info and contact */}
          <div className="space-y-6">
            <SellerInfo 
              seller={sellerInfo}
              views={Math.floor(Math.random() * 1000) + 100} // Placeholder for view count
              status="available"
            />
            
            {/* Safety tips */}
            <SafetyTips />
            
            {/* Similar ads */}
            <SimilarProducts 
              products={similarProducts.map(p => ({
                id: p.id,
                title: p.title,
                price: p.price,
                images: p.images,
                category: p.category,
                location: p.location
              }))}
              currentProductId={productId}
            />
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default ProductDetail;
