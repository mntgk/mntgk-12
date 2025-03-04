
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryFiltersProps {
  onFilterChange: (filters: any) => void;
}

export function CategoryFilters({ onFilterChange }: CategoryFiltersProps) {
  const { language } = useLanguage();
  const [priceRange, setPriceRange] = useState([0, 1000000]);
  const [condition, setCondition] = useState<string[]>([]);
  
  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
  };

  const handleConditionChange = (value: string) => {
    setCondition(prev => 
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    );
  };

  const applyFilters = () => {
    onFilterChange({
      priceRange,
      condition
    });
  };

  return (
    <div className="bg-card border rounded-lg p-4 sticky top-20 max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h2 className="font-semibold mb-4">
        {language === 'ar' ? 'تصفية النتائج' : 'Filter Results'}
      </h2>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="price">
          <AccordionTrigger>
            {language === 'ar' ? 'السعر' : 'Price'}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <Slider 
                defaultValue={[0, 1000000]} 
                max={1000000} 
                step={1000}
                onValueChange={handlePriceChange}
              />
              <div className="flex justify-between text-sm">
                <span>{priceRange[0].toLocaleString()}</span>
                <span>{priceRange[1].toLocaleString()}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="condition">
          <AccordionTrigger>
            {language === 'ar' ? 'الحالة' : 'Condition'}
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="new" 
                  checked={condition.includes('new')}
                  onCheckedChange={() => handleConditionChange('new')}
                />
                <Label htmlFor="new">
                  {language === 'ar' ? 'جديد' : 'New'}
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="used" 
                  checked={condition.includes('used')}
                  onCheckedChange={() => handleConditionChange('used')}
                />
                <Label htmlFor="used">
                  {language === 'ar' ? 'مستعمل' : 'Used'}
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      
      <Button onClick={applyFilters} className="w-full mt-4">
        {language === 'ar' ? 'تطبيق الفلاتر' : 'Apply Filters'}
      </Button>
    </div>
  );
}
