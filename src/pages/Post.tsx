
import { useState, useEffect, useRef } from "react";
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
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";
import { X, Camera, Upload } from "lucide-react";

const Post = () => {
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
  const [productId, setProductId] = useState<string | null>(null);
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  
  const navigate = useNavigate();

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error(language === 'ar' ? 'يجب تسجيل الدخول لنشر إعلان' : 'You must be logged in to post an ad');
      navigate('/login');
    }
  }, [isAuthenticated, navigate, language]);

  // If productId is set, load product data for editing
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('edit');
    if (id) {
      setProductId(id);
      
      // Get products from localStorage
      const products = JSON.parse(localStorage.getItem('montajak_products') || '[]');
      const product = products.find((p: any) => p.id === id && p.userId === user?.id);
      
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
  }, [user?.id]);

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

  const openImageDialog = () => {
    setIsImageDialogOpen(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    const reader = new FileReader();
    
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewImage(e.target.result.toString());
      }
    };
    
    reader.readAsDataURL(file);
  };

  const addImage = () => {
    if (previewImage) {
      setImages((prev) => [...prev, previewImage]);
      setPreviewImage(null);
      setIsImageDialogOpen(false);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
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
        userName: user?.name,
        userAvatar: user?.avatar,
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
    <div className="min-h-screen bg-background pb-20">
      <Navbar />

      <main className="container py-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {productId 
              ? (language === 'ar' ? 'تعديل الإعلان' : 'Edit Ad')
              : (language === 'ar' ? 'نشر إعلان جديد' : 'Post a New Ad')
            }
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
            <div>
              <Label>{language === 'ar' ? 'صور الإعلان' : 'Ad Images'}</Label>
              <div className="mt-2">
                <div className="flex flex-wrap gap-3 mb-3">
                  {images.map((img, index) => (
                    <div key={index} className="relative w-24 h-24 border rounded overflow-hidden">
                      <img src={img} alt="product" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  
                  <button 
                    type="button"
                    onClick={openImageDialog}
                    className="w-24 h-24 border-2 border-dashed border-muted-foreground/25 rounded flex flex-col items-center justify-center gap-1 hover:bg-muted/50 transition-colors"
                  >
                    <Camera className="h-8 w-8 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {language === 'ar' ? 'إضافة صورة' : 'Add Image'}
                    </span>
                  </button>
                </div>
              </div>
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
        </div>
      </main>

      <Dialog open={isImageDialogOpen} onOpenChange={setIsImageDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>
            {language === 'ar' ? 'إضافة صورة' : 'Add Image'}
          </DialogTitle>
          
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 h-48">
              {previewImage ? (
                <div className="relative w-full h-full">
                  <img 
                    src={previewImage} 
                    alt="Preview" 
                    className="w-full h-full object-contain rounded"
                  />
                  <Button 
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setPreviewImage(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mt-2">
                    <label 
                      htmlFor="product-image" 
                      className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      {language === 'ar' ? 'اختر صورة' : 'Choose Image'}
                    </label>
                    <input 
                      id="product-image" 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleFileChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {language === 'ar' ? 'PNG، JPG حتى 10MB' : 'PNG, JPG up to 10MB'}
                  </p>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsImageDialogOpen(false)}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button 
              onClick={addImage} 
              disabled={!previewImage}
            >
              {language === 'ar' ? 'إضافة' : 'Add'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <BottomNav />
    </div>
  );
};

export default Post;
