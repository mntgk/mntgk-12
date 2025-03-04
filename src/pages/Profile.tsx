
import { useState, useEffect } from "react";
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
import { supabase } from "@/integrations/supabase/client";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("listings");
  const { user, isAuthenticated } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [userProducts, setUserProducts] = useState<any[]>([]);
  const [userFavorites, setUserFavorites] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Profile edit state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editName, setEditName] = useState(user?.profile?.full_name || "");
  const [editUsername, setEditUsername] = useState(user?.profile?.username || "");
  const [editLocation, setEditLocation] = useState(user?.profile?.location || "");
  const [editAvatar, setEditAvatar] = useState(user?.profile?.avatar || "");
  
  // Update form data when user data changes
  useEffect(() => {
    if (user?.profile) {
      setEditName(user.profile.full_name || "");
      setEditUsername(user.profile.username || "");
      setEditLocation(user.profile.location || "");
      setEditAvatar(user.profile.avatar || "");
    }
  }, [user]);
  
  // Fetch user products and favorites
  useEffect(() => {
    if (!isAuthenticated || !user) return;
    
    const fetchUserData = async () => {
      setLoading(true);
      try {
        // Fetch user products
        const { data: products } = await supabase
          .from('products')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (products) {
          setUserProducts(products);
        }
        
        // Fetch user favorites
        const { data: favorites } = await supabase
          .from('favorites')
          .select(`
            product_id,
            products (*)
          `)
          .eq('user_id', user.id);
        
        if (favorites) {
          setUserFavorites(favorites);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserData();
  }, [isAuthenticated, user]);
  
  const handleProfileUpdate = () => {
    // Refresh user data after profile update
    if (user?.id) {
      supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          console.log("Updated profile data:", data);
        });
    }
  };
  
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
            <>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-card animate-pulse rounded-lg h-48"></div>
                  ))}
                </div>
              ) : userProducts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userProducts.map(product => (
                    <div key={product.id} className="bg-card border rounded-lg overflow-hidden">
                      <div 
                        className="aspect-video bg-cover bg-center cursor-pointer" 
                        style={{ backgroundImage: `url(${product.images?.[0] || '/placeholder.svg'})` }}
                        onClick={() => navigate(`/product/${product.id}`)}
                      ></div>
                      <div className="p-4">
                        <h3 
                          className="font-semibold truncate cursor-pointer" 
                          onClick={() => navigate(`/product/${product.id}`)}
                        >
                          {product.title}
                        </h3>
                        <p className="text-primary font-medium">
                          {Number(product.price).toLocaleString()} {product.currency || 'SYP'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
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
            </>
          )}
          
          {activeTab === 'favorites' && (
            <>
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[1, 2].map(i => (
                    <div key={i} className="bg-card animate-pulse rounded-lg h-48"></div>
                  ))}
                </div>
              ) : userFavorites.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userFavorites.map(favorite => (
                    <div key={favorite.product_id} className="bg-card border rounded-lg overflow-hidden">
                      <div 
                        className="aspect-video bg-cover bg-center cursor-pointer" 
                        style={{ backgroundImage: `url(${favorite.products?.images?.[0] || '/placeholder.svg'})` }}
                        onClick={() => navigate(`/product/${favorite.product_id}`)}
                      ></div>
                      <div className="p-4">
                        <h3 
                          className="font-semibold truncate cursor-pointer" 
                          onClick={() => navigate(`/product/${favorite.product_id}`)}
                        >
                          {favorite.products?.title}
                        </h3>
                        <p className="text-primary font-medium">
                          {Number(favorite.products?.price).toLocaleString()} {favorite.products?.currency || 'SYP'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
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
            </>
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
        onProfileUpdated={handleProfileUpdate}
      />

      <BottomNav />
    </div>
  );
};

export default Profile;
