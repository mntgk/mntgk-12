
import { useParams, Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";
import { CommentSection } from "@/components/comments/CommentSection";
import { ProductImages } from "@/components/product/ProductImages";
import { ProductHeader } from "@/components/product/ProductHeader";
import { ProductTabs } from "@/components/product/ProductTabs";
import { SellerInfo } from "@/components/product/SellerInfo";
import { SafetyTips } from "@/components/product/SafetyTips";
import { SimilarProducts } from "@/components/product/SimilarProducts";
import { useProductDetail, ProductDetailSkeleton, ProductNotFound } from "@/components/product/ProductDetail";

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const { language } = useLanguage();
  const { product, seller, loading, similarProducts } = useProductDetail(productId);

  if (loading) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Navbar />
        <main className="container py-4">
          <ProductDetailSkeleton />
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
          <ProductNotFound language={language} />
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
            
            {/* Similar products */}
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
