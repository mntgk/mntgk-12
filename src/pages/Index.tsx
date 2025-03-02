
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";
import { CategoriesSection } from "@/components/home/CategoriesSection";
import { PopularSearchesSection } from "@/components/home/PopularSearchesSection";
import { ProductsSection } from "@/components/home/ProductsSection";
import { featuredProducts } from "@/data/featuredProducts";

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4 space-y-6">
        {/* Stories section - empty but kept for layout consistency */}
        <section className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
          <div className="flex space-x-3 space-x-reverse mb-2">
          </div>
        </section>

        {/* Categories Scroller */}
        <CategoriesSection 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
        />

        {/* Popular Searches */}
        <PopularSearchesSection />

        {/* Featured Listings */}
        <ProductsSection
          title={t('featuredListings')}
          viewAllLink="/featured"
          products={featuredProducts.slice(0, 4)}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />

        {/* Recent Listings */}
        <ProductsSection
          title={t('recentListings')}
          viewAllLink="/latest"
          products={featuredProducts}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
      </main>

      <BottomNav />
    </div>
  );
};

export default Index;
