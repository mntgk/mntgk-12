
import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface Product {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  location: string;
}

interface ProductsSectionProps {
  title: string;
  viewAllLink: string;
  products: Product[];
  viewMode: "grid" | "list";
  setViewMode: (mode: "grid" | "list") => void;
}

export const ProductsSection = ({ 
  title, 
  viewAllLink, 
  products, 
  viewMode, 
  setViewMode 
}: ProductsSectionProps) => {
  const { language, t } = useLanguage();

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <div className="flex items-center">
          <Link to={viewAllLink} className="text-primary flex items-center text-sm font-medium ml-4">
            <span>{t('viewAll')}</span>
            <ChevronLeft className="h-4 w-4" />
          </Link>
          
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("grid")}
            >
              <div className="grid grid-cols-2 gap-0.5">
                <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
                <div className="h-1.5 w-1.5 rounded-sm bg-current"></div>
              </div>
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="icon"
              className="h-8 w-8"
              onClick={() => setViewMode("list")}
            >
              <div className="flex flex-col gap-0.5">
                <div className="h-1 w-4 rounded-sm bg-current"></div>
                <div className="h-1 w-4 rounded-sm bg-current"></div>
                <div className="h-1 w-4 rounded-sm bg-current"></div>
              </div>
            </Button>
          </div>
        </div>
      </div>
      
      {viewMode === "grid" ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              likes={Math.floor(Math.random() * 50)}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-3">
          {products.map((product) => (
            <Link to={`/product/${product.id}`} key={product.id} className="block animate-fade-up">
              <div className="border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-all flex">
                <div className="w-1/3 sm:w-1/4">
                  <img 
                    src={product.image} 
                    alt={product.title}
                    className="object-cover w-full h-full"
                    loading="lazy"
                  />
                </div>
                <div className="p-3 flex-1">
                  <h3 className="font-medium">{product.title}</h3>
                  <p className="text-lg font-semibold text-primary mt-1">
                    {product.price.toLocaleString()} {language === 'ar' ? 'ل.س' : 'SYP'}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-muted-foreground">{product.location}</span>
                    <span className="text-xs px-2 py-1 bg-muted rounded-full">{product.category}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
};
