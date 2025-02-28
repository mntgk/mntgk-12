
import { useState } from "react";
import { ChevronLeft, Settings, LogOut, Heart, Clock, Tag, MapPin, Edit } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("listings");
  
  // هذه بيانات مثالية - يمكن تخزينها في حالة الحقيقية
  const user = {
    name: "أحمد السوري",
    username: "@ahmed",
    location: "دمشق، سوريا",
    joinDate: "انضم في يناير 2023",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop"
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">حسابي</h1>
          <div className="flex space-x-2 space-x-reverse">
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Profile Card */}
        <div className="bg-card rounded-xl p-4 border mb-6">
          <div className="flex space-x-4 space-x-reverse">
            <div className="h-20 w-20 rounded-full overflow-hidden">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{user.name}</h2>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-muted-foreground">{user.username}</p>
              <div className="mt-2 flex items-center text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 ml-1" />
                <span>{user.location}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">{user.joinDate}</p>
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
              <span>إعلاناتي</span>
            </div>
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'favorites' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('favorites')}
          >
            <div className="flex items-center">
              <Heart className="h-4 w-4 ml-2" />
              <span>المفضلة</span>
            </div>
          </button>
          <button 
            className={`px-4 py-2 font-medium ${activeTab === 'history' ? 'text-primary border-b-2 border-primary' : 'text-muted-foreground'}`}
            onClick={() => setActiveTab('history')}
          >
            <div className="flex items-center">
              <Clock className="h-4 w-4 ml-2" />
              <span>سجل التصفح</span>
            </div>
          </button>
        </div>
        
        {/* Tab Content */}
        <div className="py-4">
          {activeTab === 'listings' && (
            <div className="text-center py-8">
              <Tag className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-semibold text-lg">لا توجد إعلانات</h3>
              <p className="text-muted-foreground">قم بإضافة إعلانك الأول</p>
              <Button className="mt-4">إضافة إعلان جديد</Button>
            </div>
          )}
          
          {activeTab === 'favorites' && (
            <div className="text-center py-8">
              <Heart className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-semibold text-lg">لا توجد مفضلات</h3>
              <p className="text-muted-foreground">المنتجات التي تضيفها للمفضلة ستظهر هنا</p>
              <Button className="mt-4" variant="outline">تصفح المنتجات</Button>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="text-center py-8">
              <Clock className="h-12 w-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 font-semibold text-lg">لا يوجد سجل تصفح</h3>
              <p className="text-muted-foreground">المنتجات التي قمت بتصفحها ستظهر هنا</p>
              <Button className="mt-4" variant="outline">تصفح المنتجات</Button>
            </div>
          )}
        </div>
      </main>

      <BottomNav />
    </div>
  );
};

export default Profile;
