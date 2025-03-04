
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { CategoryHeader } from "@/components/category/CategoryHeader";
import { CategoryFilters } from "@/components/category/CategoryFilters";
import { CategoryResults } from "@/components/category/CategoryResults";

const Category = () => {
  const [filters, setFilters] = useState({});

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        <CategoryHeader />
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <CategoryFilters onFilterChange={setFilters} />
          </div>
          
          <div className="lg:col-span-3">
            <CategoryResults filters={filters} />
          </div>
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Category;
