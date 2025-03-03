
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchFormProps {
  isOpen?: boolean;
  onSearch?: () => void;
}

export function SearchForm({ isOpen, onSearch }: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      if (onSearch) onSearch();
    }
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`${
        isOpen ? 'flex absolute left-0 right-0 top-16 p-4 border-b bg-background z-50' : 'hidden md:flex'
      } w-full max-w-sm items-center justify-center`}
    >
      <div className="relative w-full">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={language === 'ar' ? 'ابحث عن منتجات...' : 'Search products...'}
          className="w-full pl-8 pr-4"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <Button type="submit" size="sm" className="ml-2">
        {language === 'ar' ? 'بحث' : 'Search'}
      </Button>
    </form>
  );
}
