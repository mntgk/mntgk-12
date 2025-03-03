
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Settings, LogOut, Heart, Clock, Tag, MapPin, Edit, Camera, Save } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { User, LogOut as LogOutIcon } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("listings");
  const { user, logout, updateProfile, isAuthenticated } = useAuth();
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  
  // Profile edit state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(user?.profile?.full_name || "");
  const [editUsername, setEditUsername] = useState(user?.profile?.username || "");
  const [editLocation, setEditLocation] = useState(user?.profile?.location || "");
  const [editAvatar, setEditAvatar] = useState(user?.profile?.avatar || "");
  
  // Redirect if not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <img 
          src="/lovable-uploads/9c7d94b9-c841-4c9a-bb51-db6df6b25b36.png" 
          alt={language === 'ar' ? 'منتجك' : 'Montajak'} 
          className="h-16 mb-6"
        />
        <h1 className="text-2xl font-bold mb-4">
          {language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Login Required'}
        </h1>
        <p className="text-muted-foreground mb-6 text-center">
          {language === 'ar' 
            ? 'يرجى تسجيل الدخول للوصول إلى الملف الشخصي' 
            : 'Please log in to access your profile'}
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate('/login')}>
            <LogOutIcon className="h-4 w-4 ml-2" />
            {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
          </Button>
          <Button variant="outline" onClick={() => navigate('/')}>
            {language === 'ar' ? 'العودة للرئيسية' : 'Back to Home'}
          </Button>
        </div>
      </div>
    );
  }
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const handleSaveProfile = () => {
    updateProfile({
      full_name: editName,
      username: editUsername,
      location: editLocation,
      avatar: editAvatar
    });
    setIsEditDialogOpen(false);
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">{language === 'ar' ? 'حسابي' : 'My Account'}</h1>
          <div className="flex space-x-2 space-x-reverse">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleLogout}>
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Profile Card */}
        <div className="bg-card rounded-xl p-4 border mb-6">
          <div className="flex space-x-4 space-x-reverse">
            <div className="h-20 w-20 rounded-full overflow-hidden">
              <img 
                src={user?.profile?.avatar} 
                alt={user?.profile?.full_name || "User"} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{user?.profile?.full_name}</h2>
                <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
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
              </div>
              <p className="text-muted-foreground">{user?.profile?.username}</p>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 ml-1" />
                <span>{user?.profile?.location}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{user?.profile?.join_date}</p>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b overflow-x-auto scrollbar-none">
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'listings' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('listings')}
          >
            <div className="flex items-center">
              <Tag className="h-4 w-4 ml-2" />
              <span>{language === 'ar' ? 'إعلاناتي' : 'My Listings'}</span>
            </div>
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'favorites' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('favorites')}
          >
            <div className="flex items-center">
              <Heart className="h-4 w-4 ml-2" />
              <span>{language === 'ar' ? 'المفضلة' : 'Favorites'}</span>
            </div>
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'history' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('history')}
          >
            <div className="flex items-center">
              <Clock className="h-4 w-4 ml-2" />
              <span>{language === 'ar' ? 'سجل التصفح' : 'Browsing History'}</span>
            </div>
          </button>
        </div>
        
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
              <Button className="mt-4" onClick={() => navigate('/post')}>
                {language === 'ar' ? 'إضافة إعلان جديد' : 'Add New Listing'}
              </Button>
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
              <Button className="mt-4" variant="outline" onClick={() => navigate('/')}>
                {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
              </Button>
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
              <Button className="mt-4" variant="outline" onClick={() => navigate('/')}>
                {language === 'ar' ? 'تصفح المنتجات' : 'Browse Products'}
              </Button>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
