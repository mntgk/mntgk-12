
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Camera, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ProfileEditDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  editName: string;
  setEditName: (name: string) => void;
  editUsername: string;
  setEditUsername: (username: string) => void;
  editLocation: string;
  setEditLocation: (location: string) => void;
  editAvatar: string;
  setEditAvatar: (avatar: string) => void;
}

const ProfileEditDialog = ({
  isOpen,
  setIsOpen,
  editName,
  setEditName,
  editUsername,
  setEditUsername,
  editLocation,
  setEditLocation,
  editAvatar,
  setEditAvatar
}: ProfileEditDialogProps) => {
  const { language } = useLanguage();
  const { updateProfile } = useAuth();

  const handleSaveProfile = () => {
    updateProfile({
      full_name: editName,
      username: editUsername,
      location: editLocation,
      avatar: editAvatar
    });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{language === 'ar' ? 'تعديل الملف الشخصي' : 'Edit Profile'}</DialogTitle>
          <DialogDescription>
            {language === 'ar' 
              ? 'قم بتحديث معلومات ملفك الشخصي هنا.' 
              : 'Update your profile information here.'}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex flex-col items-center mb-4">
            <div className="h-20 w-20 rounded-full overflow-hidden mb-2 relative">
              <img 
                src={editAvatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <Input 
              type="text" 
              placeholder={language === 'ar' ? 'رابط الصورة' : 'Avatar URL'} 
              value={editAvatar} 
              onChange={(e) => setEditAvatar(e.target.value)}
              className="w-full mt-2"
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {language === 'ar' ? 'الاسم' : 'Name'}
            </label>
            <Input 
              value={editName} 
              onChange={(e) => setEditName(e.target.value)} 
              placeholder={language === 'ar' ? 'اسمك الكامل' : 'Your full name'}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {language === 'ar' ? 'اسم المستخدم' : 'Username'}
            </label>
            <Input 
              value={editUsername} 
              onChange={(e) => setEditUsername(e.target.value)} 
              placeholder={language === 'ar' ? '@اسم_المستخدم' : '@username'}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {language === 'ar' ? 'الموقع' : 'Location'}
            </label>
            <Input 
              value={editLocation} 
              onChange={(e) => setEditLocation(e.target.value)} 
              placeholder={language === 'ar' ? 'المدينة، الدولة' : 'City, Country'}
            />
          </div>
          
          <Button onClick={handleSaveProfile} className="w-full mt-4">
            <Save className="h-4 w-4 ml-2" />
            {language === 'ar' ? 'حفظ التغييرات' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
