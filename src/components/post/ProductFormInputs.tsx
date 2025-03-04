
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductFormInputsProps {
  title: string;
  setTitle: (title: string) => void;
  price: string;
  setPrice: (price: string) => void;
  currency: string;
  setCurrency: (currency: string) => void;
  description: string;
  setDescription: (description: string) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  condition: string;
  setCondition: (condition: string) => void;
  error: string;
}

export function ProductFormInputs({
  title,
  setTitle,
  price,
  setPrice,
  currency,
  setCurrency,
  description,
  setDescription,
  selectedCategory,
  setSelectedCategory,
  selectedRegion,
  setSelectedRegion,
  condition,
  setCondition,
  error
}: ProductFormInputsProps) {
  const { language } = useLanguage();

  const categories = [
    { value: "cars", label: language === 'ar' ? 'سيارات' : 'Cars' },
    { value: "houses", label: language === 'ar' ? 'عقارات' : 'Houses' },
    { value: "electronics", label: language === 'ar' ? 'إلكترونيات' : 'Electronics' },
    { value: "furniture", label: language === 'ar' ? 'أثاث' : 'Furniture' },
    { value: "jobs", label: language === 'ar' ? 'وظائف' : 'Jobs' },
    { value: "services", label: language === 'ar' ? 'خدمات' : 'Services' },
    { value: "fashion", label: language === 'ar' ? 'أزياء' : 'Fashion' },
    { value: "games", label: language === 'ar' ? 'ألعاب' : 'Games' },
    { value: "food", label: language === 'ar' ? 'طعام' : 'Food' },
    { value: "other", label: language === 'ar' ? 'أخرى' : 'Other' },
  ];

  const regions = [
    { value: "damascus", label: language === 'ar' ? 'دمشق' : 'Damascus' },
    { value: "aleppo", label: language === 'ar' ? 'حلب' : 'Aleppo' },
    { value: "homs", label: language === 'ar' ? 'حمص' : 'Homs' },
    { value: "latakia", label: language === 'ar' ? 'اللاذقية' : 'Latakia' },
    { value: "tartus", label: language === 'ar' ? 'طرطوس' : 'Tartus' },
    { value: "idlib", label: language === 'ar' ? 'إدلب' : 'Idlib' },
    { value: "hama", label: language === 'ar' ? 'حماة' : 'Hama' },
    { value: "daraa", label: language === 'ar' ? 'درعا' : 'Daraa' },
    { value: "deir-ez-zor", label: language === 'ar' ? 'دير الزور' : 'Deir ez-Zor' },
    { value: "raqqa", label: language === 'ar' ? 'الرقة' : 'Raqqa' },
    { value: "other", label: language === 'ar' ? 'أخرى' : 'Other' },
  ];

  const currencies = [
    { value: "SYP", label: language === 'ar' ? 'ليرة سورية' : 'Syrian Pound' },
    { value: "TRY", label: language === 'ar' ? 'ليرة تركية' : 'Turkish Lira' },
    { value: "USD", label: language === 'ar' ? 'دولار أمريكي' : 'US Dollar' },
  ];

  return (
    <>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <div>
        <Label htmlFor="title">{language === 'ar' ? 'عنوان الإعلان' : 'Ad Title'}</Label>
        <Input
          type="text"
          id="title"
          placeholder={language === 'ar' ? 'مثال: أيفون 14 برو للبيع' : 'e.g., iPhone 14 Pro for sale'}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="price">{language === 'ar' ? 'السعر' : 'Price'}</Label>
          <Input
            type="number"
            id="price"
            placeholder={language === 'ar' ? 'أدخل السعر' : 'Enter price'}
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="currency">{language === 'ar' ? 'العملة' : 'Currency'}</Label>
          <Select value={currency} onValueChange={setCurrency}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={language === 'ar' ? 'اختر العملة' : 'Select currency'} />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((curr) => (
                <SelectItem key={curr.value} value={curr.value}>
                  {curr.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="description">{language === 'ar' ? 'الوصف' : 'Description'}</Label>
        <Textarea
          id="description"
          placeholder={language === 'ar' ? 'أدخل وصفاً مفصلاً للإعلان' : 'Enter a detailed description of the ad'}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
        />
      </div>
      
      <div>
        <Label>{language === 'ar' ? 'الحالة' : 'Condition'}</Label>
        <RadioGroup 
          value={condition} 
          className="flex gap-4" 
          onValueChange={setCondition}
          defaultValue={condition}
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="new" id="r1" />
            <Label htmlFor="r1">{language === 'ar' ? 'جديد' : 'New'}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="used" id="r2" />
            <Label htmlFor="r2">{language === 'ar' ? 'مستعمل' : 'Used'}</Label>
          </div>
        </RadioGroup>
      </div>
      
      <div>
        <Label htmlFor="category">{language === 'ar' ? 'الفئة' : 'Category'}</Label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={language === 'ar' ? 'اختر فئة' : 'Select a category'} />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="region">{language === 'ar' ? 'المنطقة' : 'Region'}</Label>
        <Select value={selectedRegion} onValueChange={setSelectedRegion}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={language === 'ar' ? 'اختر منطقة' : 'Select a region'} />
          </SelectTrigger>
          <SelectContent>
            {regions.map((region) => (
              <SelectItem key={region.value} value={region.value}>
                {region.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  );
}
