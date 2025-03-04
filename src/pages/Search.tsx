
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { SearchHeader } from "@/components/search/SearchHeader";
import { SearchFilters } from "@/components/search/SearchFilters";
import { SearchResults } from "@/components/search/SearchResults";

const Search = () => {
  const [filters, setFilters] = useState({});

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        <SearchHeader />
        <SearchFilters onApplyFilters={setFilters} />
        <SearchResults filters={filters} />
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Search;
