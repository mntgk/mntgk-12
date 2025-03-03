
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tag, Heart, Clock } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCard from "@/components/profile/ProfileCard";
import ProfileTabs from "@/components/profile/ProfileTabs";
import ProfileEditDialog from "@/components/profile/ProfileEditDialog";
import LoginRequired from "@/components/profile/LoginRequired";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("listings");
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Profile edit state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(user?.profile?.full_name || "");
  const [editUsername, setEditUsername] = useState(user?.profile?.username || "");
  const [editLocation, setEditLocation] = useState(user?.profile?.location || "");
  const [editAvatar, setEditAvatar] = useState(user?.profile?.avatar || "");
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return <LoginRequired />;
  }
  
  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Header */}
        <ProfileHeader />
        
        {/* Profile Card */}
        <ProfileCard 
          user={user} 
          onEditClick={() => setIsEditDialogOpen(true)} 
        />
        
        {/* Tabs */}
        <ProfileTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          language={language}
        />
        
        {/* Tab Content */}
        <div className="py-4">
          {activeTab === 'listings' && (
            <div className="text-center py-8">
              <Tag className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-semibold text-lg">
                {language === 'ar' ? 'لا توجد إعلانات' : 'No Listings'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' ? 'قم بإضافة إعلانك الأول' : 'Add your first listing'}
              </p>
              <button 
                className="mt-4 bg-primary text-primary-foreground px-4 py-2 rounded"
                onClick={() => navigate('/post')}
              >
                {language === 'ar' ? 'إضافة إعلان جديد' : 'Add New Listing'}
              </button>
            </div>
          )}
          
          {activeTab === 'favorites' && (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-semibold text-lg">
                {language === 'ar' ? 'لا توجد مفضلات' : 'No Favorites'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? 'المنتجات التي تضيفها للمفضلة ستظهر هنا' 
                  : 'Products you add to favorites will appear here'}
              </p>
              <button 
                className="mt-4 border border-input bg-background hover:bg-accent px-4 py-2 rounded"
                onClick={() => navigate('/')}
              >
                {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
              </button>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-semibold text-lg">
                {language === 'ar' ? 'لا يوجد سجل تصفح' : 'No Browsing History'}
              </h3>
              <p className="text-muted-foreground">
                {language === 'ar' 
                  ? 'المنتجات التي قمت بتصفحها ستظهر هنا' 
                  : 'Products you have browsed will appear here'}
              </p>
              <button 
                className="mt-4 border border-input bg-background hover:bg-accent px-4 py-2 rounded"
                onClick={() => navigate('/')}
              >
                {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
              </button>
            </div>
          )}
        </div>
      </main>

      <ProfileEditDialog 
        isOpen={isEditDialogOpen}
        setIsOpen={setIsEditDialogOpen}
        editName={editName}
        setEditName={setEditName}
        editUsername={editUsername}
        setEditUsername={setEditUsername}
        editLocation={editLocation}
        setEditLocation={setEditLocation}
        editAvatar={editAvatar}
        setEditAvatar={setEditAvatar}
      />

      <BottomNav />
    </div>
  );
};

export default Profile;
