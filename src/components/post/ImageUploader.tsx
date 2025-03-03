
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { X, Camera } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogFooter, DialogTitle } from "@/components/ui/dialog";

interface ImageUploaderProps {
  images: string[];
  setImages: (images: string[]) => void;
}

export function ImageUploader({ images, setImages }: ImageUploaderProps) {
  const { language } = useLanguage();
  const [isImageDialogOpen, setIsImageDialogOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      setImages([...images, previewImage]);
      setPreviewImage(null);
      setIsImageDialogOpen(false);
      
      // Reset the file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <>
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
    </>
  );
}
