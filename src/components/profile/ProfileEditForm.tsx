
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileEditFormProps {
  editName: string;
  setEditName: (name: string) => void;
  editUsername: string;
  setEditUsername: (username: string) => void;
  editLocation: string;
  setEditLocation: (location: string) => void;
  onSave: () => Promise<void>;
}

const ProfileEditForm = ({
  editName,
  setEditName,
  editUsername,
  setEditUsername,
  editLocation,
  setEditLocation,
  onSave,
}: ProfileEditFormProps) => {
  const { language } = useLanguage();
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave();
    setSaving(false);
  };

  return (
    <div className="space-y-4">
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
      
      <Button onClick={handleSave} className="w-full mt-4" disabled={saving}>
        <Save className="h-4 w-4 mr-2" />
        {saving 
          ? (language === 'ar' ? 'جاري الحفظ...' : 'Saving...') 
          : (language === 'ar' ? 'حفظ التغييرات' : 'Save Changes')}
      </Button>
    </div>
  );
};

export default ProfileEditForm;
