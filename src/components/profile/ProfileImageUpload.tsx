
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Camera, Upload } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface ProfileImageUploadProps {
  userId: string;
  editAvatar: string;
  setEditAvatar: (avatar: string) => void;
}

const ProfileImageUpload = ({
  userId,
  editAvatar,
  setEditAvatar
}: ProfileImageUploadProps) => {
  const { language } = useLanguage();
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const file = files[0];
    if (!file) return;
    
    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast.error(language === 'ar' 
        ? 'حجم الملف كبير جدًا. الحد الأقصى هو 2 ميجابايت' 
        : 'File is too large. Maximum size is 2MB');
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error(language === 'ar'
        ? 'يرجى تحميل صورة فقط'
        : 'Please upload only image files');
      return;
    }
    
    setUploading(true);
    
    try {
      // Generate a unique file name
      const fileExt = file.name.split('.').pop();
      const fileName = `${userId}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `avatars/${fileName}`;
      
      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);
        
      if (uploadError) throw uploadError;
      
      // Get public URL
      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);
        
      if (data) {
        setEditAvatar(data.publicUrl);
        toast.success(language === 'ar' 
          ? 'تم رفع الصورة بنجاح' 
          : 'Image uploaded successfully');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(language === 'ar'
        ? 'فشل في تحميل الصورة'
        : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center mb-4">
      <div className="h-20 w-20 rounded-full overflow-hidden mb-2 relative">
        <img 
          src={editAvatar || '/placeholder.svg'} 
          alt="Profile" 
          className="w-full h-full object-cover"
        />
        <label className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
          <Camera className="h-6 w-6 text-white" />
          <input 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileUpload}
            disabled={uploading}
          />
        </label>
      </div>
      <Button 
        variant="outline" 
        size="sm" 
        className="mb-2" 
        disabled={uploading}
        onClick={() => document.getElementById('avatar-upload')?.click()}
      >
        <Upload className="h-4 w-4 mr-2" />
        {uploading 
          ? (language === 'ar' ? 'جاري التحميل...' : 'Uploading...') 
          : (language === 'ar' ? 'تحميل صورة' : 'Upload Image')}
        <input 
          id="avatar-upload"
          type="file" 
          accept="image/*" 
          className="hidden" 
          onChange={handleFileUpload}
        />
      </Button>
      <p className="text-xs text-muted-foreground">
        {language === 'ar' 
          ? 'أو استخدم رابط صورة' 
          : 'Or use an image URL'}
      </p>
      <Input 
        type="text" 
        placeholder={language === 'ar' ? 'رابط الصورة' : 'Avatar URL'} 
        value={editAvatar} 
        onChange={(e) => setEditAvatar(e.target.value)}
        className="w-full mt-2"
      />
    </div>
  );
};

export default ProfileImageUpload;
