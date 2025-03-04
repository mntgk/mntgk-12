
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

interface SearchResultsProps {
  filters: any;
}

export function SearchResults({ filters }: SearchResultsProps) {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const { language } = useLanguage();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true);
      
      try {
        // Build base query
        let queryBuilder = supabase
          .from('products')
          .select('*')
          .eq('is_active', true)
          .or(`title.ilike.%${query}%,description.ilike.%${query}%`);
        
        // Apply price filter if set
        if (filters?.priceRange) {
          queryBuilder = queryBuilder
            .gte('price', filters.priceRange[0])
            .lte('price', filters.priceRange[1]);
        }
        
        // Apply sorting
        if (filters?.sortBy) {
          switch (filters.sortBy) {
            case 'recent':
              queryBuilder = queryBuilder.order('created_at', { ascending: false });
              break;
            case 'price_asc':
              queryBuilder = queryBuilder.order('price', { ascending: true });
              break;
            case 'price_desc':
              queryBuilder = queryBuilder.order('price', { ascending: false });
              break;
            default:
              queryBuilder = queryBuilder.order('created_at', { ascending: false });
          }
        } else {
          queryBuilder = queryBuilder.order('created_at', { ascending: false });
        }
        
        const { data, error } = await queryBuilder;
        
        if (error) {
          throw error;
        }
        
        if (data) {
          setProducts(data);
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSearchResults();
  }, [query, filters]);
  
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
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
            ? 'لا توجد نتائج مطابقة لبحثك' 
            : 'No results match your search'}
        </h3>
        <p className="text-muted-foreground">
          {language === 'ar'
            ? 'حاول استخدام كلمات بحث مختلفة أو تصفح الفئات'
            : 'Try using different search terms or browse categories'}
        </p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          currency={product.currency || "SYP"}
          image={product.images?.[0] || "https://placehold.co/400x400?text=No+Image"}
          category={product.category}
          location={product.location || product.region}
          likes={product.likes || 0}
        />
      ))}
    </div>
  );
}
