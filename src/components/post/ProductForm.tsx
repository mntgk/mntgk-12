
import { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ImageUploader } from "./ImageUploader";

interface ProductFormProps {
  productId: string | null;
}

export function ProductForm({ productId }: ProductFormProps) {
  const { language } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [currency, setCurrency] = useState("SYP");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [condition, setCondition] = useState("new");
  const [images, setImages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Load existing product data if editing
  useState(() => {
    if (productId && user?.id) {
      // Get products from localStorage
      const products = JSON.parse(localStorage.getItem('montajak_products') || '[]');
      const product = products.find((p: any) => p.id === productId && p.userId === user?.id);
      
      if (product) {
        setTitle(product.title);
        setPrice(product.price.toString());
        setCurrency(product.currency || 'SYP');
        setDescription(product.description);
        setSelectedCategory(product.category);
        setSelectedRegion(product.region);
        setCondition(product.condition);
        setImages(product.images || []);
      }
    }
  });

  const categories = [
    { value: "vehicles", label: language === 'ar' ? 'سيارات' : 'Vehicles' },
    { value: "real-estate", label: language === 'ar' ? 'عقارات' : 'Real Estate' },
    { value: "technology", label: language === 'ar' ? 'تقنية' : 'Technology' },
    { value: "furniture", label: language === 'ar' ? 'أثاث' : 'Furniture' },
    { value: "clothes", label: language === 'ar' ? 'ملابس' : 'Clothes' },
    { value: "services", label: language === 'ar' ? 'خدمات' : 'Services' },
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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Validation
    if (!title || !price || !selectedCategory || !selectedRegion || !description) {
      setError(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsLoading(true);

    // Get a random image if none provided
    const productImages = images.length > 0 
      ? images 
      : [`https://source.unsplash.com/random/300x300?product&sig=${Date.now()}`];

    // Create or update product
    let product;
    
    if (productId) {
      // Update existing product
      const products = JSON.parse(localStorage.getItem('montajak_products') || '[]');
      const updatedProducts = products.map((p: any) => {
        if (p.id === productId && p.userId === user?.id) {
          return {
            ...p,
            title,
            price: Number(price),
            currency,
            description,
            category: selectedCategory,
            region: selectedRegion,
            condition,
            images: productImages,
            updatedAt: new Date().toISOString(),
          };
        }
        return p;
      });
      
      localStorage.setItem('montajak_products', JSON.stringify(updatedProducts));
      product = updatedProducts.find((p: any) => p.id === productId);
      
    } else {
      // Create a new product
      product = {
        id: Math.random().toString(36).substr(2, 9),
        title,
        price: Number(price),
        currency,
        description,
        category: selectedCategory,
        region: selectedRegion,
        condition,
        images: productImages,
        userId: user?.id,
        userName: user?.profile?.full_name,
        userAvatar: user?.profile?.avatar,
        createdAt: new Date().toISOString(),
        likes: 0,
        views: 0,
      };

      // Get existing products or initialize an empty array
      const existingProducts = JSON.parse(localStorage.getItem('montajak_products') || '[]');
      
      // Add new product to array
      existingProducts.push(product);
      
      // Save updated products array back to localStorage
      localStorage.setItem('montajak_products', JSON.stringify(existingProducts));
    }
    
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        productId
          ? (language === 'ar' ? 'تم تحديث الإعلان بنجاح' : 'Ad updated successfully')
          : (language === 'ar' ? 'تم نشر الإعلان بنجاح' : 'Ad posted successfully')
      );
      
      // Redirect to product detail page
      navigate(`/product/${product.id}`);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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
        <RadioGroup defaultValue={condition} className="flex gap-4" onValueChange={setCondition}>
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
      
      {/* Images Upload */}
      <ImageUploader images={images} setImages={setImages} />
      
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
      <Button disabled={isLoading} className="w-full">
        {isLoading
          ? language === 'ar'
            ? 'جارٍ النشر...'
            : 'Posting...'
          : productId
            ? language === 'ar'
              ? 'تحديث الإعلان'
              : 'Update Ad'
            : language === 'ar'
              ? 'نشر الإعلان'
              : 'Post Ad'}
      </Button>
    </form>
  );
}
