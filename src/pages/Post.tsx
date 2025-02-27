
import { useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

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
  "الرياض",
  "جدة",
  "مكة المكرمة",
  "المدينة المنورة",
  "الدمام",
  "الخبر",
  "تبوك",
  "أبها"
];

export default function Post() {
  const [images, setImages] = useState<string[]>([]);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");

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
    
    if (!title || !price || !description || !category || !location || images.length === 0) {
      toast.error("الرجاء إكمال جميع الحقول المطلوبة");
      return;
    }

    // Here you would typically send the data to your backend
    toast.success("تم إضافة إعلانك بنجاح!");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="bg-white border-b py-4">
        <div className="container">
          <h1 className="text-xl font-bold">إضافة إعلان جديد</h1>
        </div>
      </div>

      <div className="container py-6">
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
          {/* Images Upload */}
          <div className="space-y-4">
            <label className="block font-medium">صور المنتج</label>
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
            <p className="text-sm text-muted-foreground">يمكنك إضافة حتى 8 صور</p>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label className="block font-medium">عنوان الإعلان</label>
            <Input
              placeholder="مثال: آيفون 13 برو ماكس مستعمل"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="block font-medium">الفئة</label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              <option value="">اختر الفئة</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <label className="block font-medium">السعر</label>
            <div className="relative">
              <Input
                type="number"
                placeholder="0"
                value={price}
                onChange={e => setPrice(e.target.value)}
                className="pl-12"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                ر.س
              </span>
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <label className="block font-medium">المنطقة</label>
            <select
              className="w-full rounded-md border border-input bg-background px-3 py-2"
              value={location}
              onChange={e => setLocation(e.target.value)}
            >
              <option value="">اختر المنطقة</option>
              {regions.map(region => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block font-medium">وصف الإعلان</label>
            <Textarea
              placeholder="اكتب وصفاً تفصيلياً عن المنتج..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              className="min-h-[150px]"
            />
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" size="lg">
            نشر الإعلان
          </Button>
        </form>
      </div>
    </div>
  );
}
