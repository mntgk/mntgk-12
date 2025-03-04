
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useLanguage } from "@/contexts/LanguageContext";

interface SearchFiltersProps {
  onApplyFilters: (filters: any) => void;
}

export function SearchFilters({ onApplyFilters }: SearchFiltersProps) {
  const [searchParams] = useSearchParams();
  const { language } = useLanguage();
  const [sortBy, setSortBy] = useState('recent');
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  
  const applyFilters = () => {
    onApplyFilters({
      sortBy,
      priceRange
    });
  };
  
  return (
    <div className="bg-card border rounded-lg p-4 mb-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            {language === 'ar' ? 'الترتيب حسب' : 'Sort by'}
          </label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">
                {language === 'ar' ? 'الأحدث' : 'Most Recent'}
              </SelectItem>
              <SelectItem value="price_asc">
                {language === 'ar' ? 'السعر: من الأقل للأعلى' : 'Price: Low to High'}
              </SelectItem>
              <SelectItem value="price_desc">
                {language === 'ar' ? 'السعر: من الأعلى للأقل' : 'Price: High to Low'}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-2">
            {language === 'ar' ? 'نطاق السعر' : 'Price Range'}
          </label>
          <div className="px-2">
            <Slider 
              defaultValue={[0, 1000000]} 
              max={1000000} 
              step={1000}
              onValueChange={setPriceRange}
            />
            <div className="flex justify-between text-sm mt-2">
              <span>{priceRange[0].toLocaleString()}</span>
              <span>{priceRange[1].toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <Button onClick={applyFilters} className="w-full mt-4">
        {language === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
      </Button>
    </div>
  );
}
