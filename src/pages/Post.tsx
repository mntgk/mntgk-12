
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ImagePlus, X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useLanguage } from "@/contexts/LanguageContext";

const categories = [
  "سيارات ومركبات",
  "عقارات",
  "تقنية",
  "خدمات",
  "أثاث",
  "ملابس",
  "أجهزة منزلية",
  "أخرى"
];

const regions = [
  "دمشق",
  "حلب",
  "حمص",
  "حماه",
  "اللاذقية",
  "طرطوس",
  "درعا",
  "السويداء",
  "القنيطرة",
  "الرقة",
  "دير الزور",
  "الحسكة",
  "إدلب",
  "ريف دمشق"
];

const Post = () => {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    // Convert Files to URLs for preview
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title) {
      toast.error(language === 'ar' ? "الرجاء إدخال عنوان الإعلان" : "Please enter ad title");
      return;
    }
    
    if (!price) {
      toast.error(language === 'ar' ? "الرجاء إدخال السعر" : "Please enter price");
      return;
    }
    
    if (!description) {
      toast.error(language === 'ar' ? "الرجاء إدخال وصف الإعلان" : "Please enter ad description");
      return;
    }
    
    if (!category) {
      toast.error(language === 'ar' ? "الرجاء اختيار الفئة" : "Please select a category");
      return;
    }
    
    if (!location) {
      toast.error(language === 'ar' ? "الرجاء اختيار المنطقة" : "Please select a location");
      return;
    }
    
    if (images.length === 0) {
      toast.error(language === 'ar' ? "الرجاء إضافة صورة واحدة على الأقل" : "Please add at least one image");
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(
        language === 'ar' 
          ? "تم إضافة إعلانك بنجاح!" 
          : "Your ad has been added successfully!"
      );
      
      // Redirect to home page
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mr-2" 
            onClick={() => navigate(-1)}
          >
            <ArrowRight className="h-4 w-4 mr-1" />
            <span>{language === 'ar' ? 'عودة' : 'Back'}</span>
          </Button>
          <h1 className="text-xl font-bold">
            {language === 'ar' ? 'إضافة إعلان جديد' : 'Add New Listing'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Images Upload */}
          <div className="space-y-4">
            <label className="block font-medium">
              {language === 'ar' ? 'صور المنتج' : 'Product Images'}
            </label>
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div key={index} className="relative aspect-square rounded-lg overflow-hidden">
                  <img src={image} alt="" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-1 left-1 p-1 bg-white/80 rounded-full hover:bg-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {images.length < 8 && (
                <label className="aspect-square rounded-lg border-2 border-dashed border-gray-200 hover:border-primary transition-colors cursor-pointer flex items-center justify-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                  <ImagePlus className="w-8 h-8 text-gray-400" />
                </label>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {language === 'ar' ? 'يمكنك إضافة حتى 8 صور' : 'You can add up to 8 images'}
            </p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block font-medium">
              {language === 'ar' ? 'عنوان الإعلان' : 'Listing Title'}
            </label>
            <Input
              placeholder={language === 'ar' ? 'مثال: آيفون 13 برو ماكس مستعمل' : 'Example: Used iPhone 13 Pro Max'}
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block font-medium">
              {language === 'ar' ? 'الفئة' : 'Category'}
            </label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">
                {language === 'ar' ? 'اختر الفئة' : 'Select category'}
              </option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block font-medium">
              {language === 'ar' ? 'السعر' : 'Price'}
            </label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="pl-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                {language === 'ar' ? 'ل.س' : 'SYP'}
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="block font-medium">
              {language === 'ar' ? 'المنطقة' : 'Location'}
            </label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={location}
              onChange={e => setLocation(e.target.value)}
            >
              <option value="">
                {language === 'ar' ? 'اختر المنطقة' : 'Select location'}
              </option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block font-medium">
              {language === 'ar' ? 'وصف الإعلان' : 'Listing Description'}
            </label>
            <Textarea
              placeholder={
                language === 'ar' 
                  ? 'اكتب وصفاً تفصيلياً عن المنتج...' 
                  : 'Write a detailed description about the product...'
              }
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            size="lg" 
            disabled={isSubmitting}
          >
            {isSubmitting 
              ? (language === 'ar' ? 'جاري النشر...' : 'Publishing...') 
              : (language === 'ar' ? 'نشر الإعلان' : 'Publish Listing')}
          </Button>
        </form>
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Post;
