
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ProfileImageUpload from "./ProfileImageUpload";
import ProfileEditForm from "./ProfileEditForm";

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
  onProfileUpdated?: () => void;
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
  setEditAvatar,
  onProfileUpdated
}: ProfileEditDialogProps) => {
  const { language } = useLanguage();
  const { updateProfile, user } = useAuth();
  
  const handleSaveProfile = async () => {
    try {
      const success = await updateProfile({
        full_name: editName,
        username: editUsername,
        location: editLocation,
        avatar: editAvatar
      });
      
      if (success) {
        setIsOpen(false);
        if (onProfileUpdated) {
          onProfileUpdated();
        }
      }
    } catch (error) {
      console.error("Error saving profile:", error);
    }
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
          {user && (
            <ProfileImageUpload 
              userId={user.id} 
              editAvatar={editAvatar} 
              setEditAvatar={setEditAvatar} 
            />
          )}
          
          <ProfileEditForm
            editName={editName}
            setEditName={setEditName}
            editUsername={editUsername}
            setEditUsername={setEditUsername}
            editLocation={editLocation}
            setEditLocation={setEditLocation}
            onSave={handleSaveProfile}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileEditDialog;
