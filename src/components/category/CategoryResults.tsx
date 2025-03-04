
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface CategoryResultsProps {
  filters: {
    priceRange?: number[];
    condition?: string[];
  };
}

export function CategoryResults({ filters }: CategoryResultsProps) {
  const { categoryId } = useParams();
  const { language } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      
      try {
        let query = supabase
          .from('products')
          .select('*')
          .eq('category', categoryId)
          .eq('is_active', true);
        
        // Apply price filter if set
        if (filters?.priceRange) {
          query = query
            .gte('price', filters.priceRange[0])
            .lte('price', filters.priceRange[1]);
        }
        
        // Apply condition filter if set
        if (filters?.condition && filters.condition.length > 0) {
          query = query.in('condition', filters.condition);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategoryProducts();
  }, [categoryId, filters]);
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="rounded-xl overflow-hidden bg-card animate-pulse">
            <div className="aspect-square bg-muted"></div>
            <div className="p-3 space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-4 bg-muted rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl font-semibold mb-2">
          {language === 'ar' 
            ? 'لا توجد منتجات في هذه الفئة حالياً' 
            : 'No products in this category yet'}
        </h3>
        <p className="text-muted-foreground">
          {language === 'ar'
            ? 'حاول البحث في فئة أخرى أو العودة لاحقاً'
            : 'Try another category or check back later'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          currency={product.currency || "SYP"}
          image={product.images?.[0] || "https://placehold.co/400x400?text=No+Image"}
          category={product.category}
          location={product.location}
          likes={product.likes || 0}
        />
      ))}
    </div>
  );
}
