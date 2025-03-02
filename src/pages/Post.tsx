import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLanguage } from "@/contexts/LanguageContext";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";

const Post = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [condition, setCondition] = useState("new");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { language } = useLanguage();
  
  const navigate = useNavigate();

  const categories = [
    { value: "vehicles", label: language === 'ar' ? 'سيارات' : 'Vehicles' },
    { value: "real-estate", label: language === 'ar' ? 'عقارات' : 'Real Estate' },
    { value: "technology", label: language === 'ar' ? 'تقنية' : 'Technology' },
    { value: "furniture", label: language === 'ar' ? 'أثاث' : 'Furniture' },
    { value: "clothes", label: language === 'ar' ? 'ملابس' : 'Clothes' },
    { value: "services", label: language === 'ar' ? 'خدمات' : 'Services' },
  ];

  const regions = [
    { value: "damascus", label: language === 'ar' ? 'دمشق' : 'Damascus' },
    { value: "aleppo", label: language === 'ar' ? 'حلب' : 'Aleppo' },
    { value: "homs", label: language === 'ar' ? 'حمص' : 'Homs' },
    { value: "latakia", label: language === 'ar' ? 'اللاذقية' : 'Latakia' },
    { value: "tartus", label: language === 'ar' ? 'طرطوس' : 'Tartus' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation
    if (!title || !price || !selectedCategory || !selectedRegion || !description) {
      setError(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        language === 'ar' 
          ? 'تم نشر الإعلان بنجاح' 
          : 'Ad posted successfully'
      );
      
      // Redirect to home page after successful post
      navigate('/');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />

      <main className="container py-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {language === 'ar' ? 'نشر إعلان جديد' : 'Post a New Ad'}
          </h1>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-4">
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
            <div>
              <Label htmlFor="price">{language === 'ar' ? 'السعر' : 'Price'}</Label>
              <Input
                type="number"
                id="price"
                placeholder={language === 'ar' ? 'أدخل السعر بالليرة السورية' : 'Enter price in SYP'}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
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
              <RadioGroup defaultValue="new" className="flex gap-2" onValueChange={setCondition}>
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
              <Select onValueChange={setSelectedCategory}>
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
              <Select onValueChange={setSelectedRegion}>
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
                : language === 'ar'
                  ? 'نشر الإعلان'
                  : 'Post Ad'}
            </Button>
          </form>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Post;
