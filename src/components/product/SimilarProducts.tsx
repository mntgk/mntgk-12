
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SimilarProduct {
  id: string;
  title: string;
  enTitle?: string;
  price: number;
  images: string[];
  category: string;
  location: string;
  enLocation?: string;
}

interface SimilarProductsProps {
  products: SimilarProduct[];
  currentProductId: string;
}

export function SimilarProducts({ products, currentProductId }: SimilarProductsProps) {
  const { language } = useLanguage();
  
  const filteredProducts = products
    .filter(p => p.id !== currentProductId)
    .slice(0, 2);
  
  if (filteredProducts.length === 0) {
    return null;
  }
  
  return (
    <div className="border rounded-xl p-6">
      <h3 className="text-lg font-semibold mb-4">
        {language === 'ar' ? 'إعلانات مشابهة' : 'Similar Ads'}
      </h3>
      <div className="space-y-4">
        {filteredProducts.map(product => (
          <Link 
            key={product.id} 
            to={`/product/${product.id}`} 
            className="block"
          >
            <div className="flex border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
              <div className="w-1/3">
                <img 
                  src={product.images[0]} 
                  alt={product.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-3 flex-1">
                <h4 className="font-medium text-sm line-clamp-2">
                  {language === 'ar' ? product.title : (product.enTitle || product.title)}
                </h4>
                <p className="text-primary font-semibold mt-1">
                  {product.price.toLocaleString()} {language === 'ar' ? 'ل.س' : 'SYP'}
                </p>
                <div className="flex items-center mt-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3 mr-1" />
                  <span>
                    {language === 'ar' ? product.location : (product.enLocation || product.location)}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
