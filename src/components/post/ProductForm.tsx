
import { useState, useEffect, FormEvent } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ImageUploader } from "./ImageUploader";
import { ProductFormInputs } from "./ProductFormInputs";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface ProductFormProps {
  productId: string | null;
  initialData?: any;
  onSuccess?: (id: string) => void;
}

export function ProductForm({ productId, initialData, onSuccess }: ProductFormProps) {
  const { language } = useLanguage();
  const { user, isAuthenticated } = useAuth();
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

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error(language === 'ar' ? 'يجب تسجيل الدخول لنشر إعلان' : 'You must be logged in to post an ad');
      navigate('/login');
    }
  }, [isAuthenticated, navigate, language]);

  // Load initial data if provided or existing product data if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setPrice(initialData.price?.toString() || "");
      setCurrency(initialData.currency || 'SYP');
      setDescription(initialData.description || "");
      setSelectedCategory(initialData.category || "");
      setSelectedRegion(initialData.location || "");
      setCondition(initialData.condition || "new");
      setImages(initialData.images || []);
    } else if (productId && user?.id) {
      // If initialData wasn't provided but productId exists, fetch the data
      const fetchProductData = async () => {
        try {
          const { data, error } = await supabase
            .from('products')
            .select('*')
            .eq('id', productId)
            .eq('user_id', user.id)
            .single();
            
          if (error) {
            throw error;
          }
          
          if (data) {
            setTitle(data.title || "");
            setPrice(data.price?.toString() || "");
            setCurrency(data.currency || 'SYP');
            setDescription(data.description || "");
            setSelectedCategory(data.category || "");
            setSelectedRegion(data.location || "");
            setCondition(data.condition || "new");
            setImages(data.images || []);
          }
        } catch (error) {
          console.error("Error fetching product:", error);
          toast.error(language === 'ar' ? 'حدث خطأ أثناء تحميل بيانات المنتج' : 'Error loading product data');
        }
      };
      
      fetchProductData();
    }
  }, [productId, initialData, user?.id, language]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    // Validation
    if (!title || !price || !selectedCategory || !selectedRegion || !description) {
      setError(language === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill all required fields');
      return;
    }

    if (!isAuthenticated || !user?.id) {
      toast.error(language === 'ar' ? 'يجب تسجيل الدخول لنشر إعلان' : 'You must be logged in to post an ad');
      navigate('/login');
      return;
    }

    setIsLoading(true);
    setError('');

    // Get a random image if none provided
    const productImages = images.length > 0 
      ? images 
      : [`https://source.unsplash.com/random/300x300?product&sig=${Date.now()}`];

    try {
      let productResult;
      
      if (productId) {
        // Update existing product in Supabase
        const { data, error } = await supabase
          .from('products')
          .update({
            title,
            price: Number(price),
            currency,
            description,
            category: selectedCategory,
            location: selectedRegion,
            condition,
            images: productImages,
            is_active: true
          })
          .eq('id', productId)
          .eq('user_id', user.id)
          .select('id')
          .single();
          
        if (error) throw error;
        
        productResult = data;
      } else {
        // Insert new product in Supabase
        const { data, error } = await supabase
          .from('products')
          .insert({
            title,
            price: Number(price),
            currency,
            description,
            category: selectedCategory,
            location: selectedRegion,
            condition,
            images: productImages,
            user_id: user.id,
            is_active: true
          })
          .select('id')
          .single();
          
        if (error) throw error;
        
        productResult = data;
      }
      
      if (onSuccess && productResult) {
        onSuccess(productResult.id);
      }
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error(language === 'ar' ? 'حدث خطأ أثناء حفظ المنتج' : 'Error saving product');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ProductFormInputs
        title={title}
        setTitle={setTitle}
        price={price}
        setPrice={setPrice}
        currency={currency}
        setCurrency={setCurrency}
        description={description}
        setDescription={setDescription}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
        condition={condition}
        setCondition={setCondition}
        error={error}
      />
      
      {/* Images Upload */}
      <ImageUploader images={images} setImages={setImages} />
      
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
