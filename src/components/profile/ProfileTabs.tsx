
import { Tag, Heart, Clock } from "lucide-react";

interface ProfileTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  language: string;
}

const ProfileTabs = ({ activeTab, setActiveTab, language }: ProfileTabsProps) => {
  return (
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
  );
};

export default ProfileTabs;
