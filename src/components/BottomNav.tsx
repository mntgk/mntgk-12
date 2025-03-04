
import { Home, Search, Plus, Heart, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const path = location.pathname;

  const handleAuthRequiredClick = (e: React.MouseEvent, targetPath: string) => {
    if (!isAuthenticated) {
      e.preventDefault();
      toast.error(t('auth_required_message'));
      navigate('/login');
    } else {
      navigate(targetPath);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t bg-background z-30">
      <div className="container flex h-14 items-center">
        <Link to="/" className={`bottom-nav-item ${path === '/' ? 'active' : ''}`}>
          <Home className="h-5 w-5" />
          <span className="text-xs mt-1">{t('home')}</span>
        </Link>
        <Link to="/search" className={`bottom-nav-item ${path.startsWith('/search') ? 'active' : ''}`}>
          <Search className="h-5 w-5" />
          <span className="text-xs mt-1">{t('search')}</span>
        </Link>
        <Link 
          to="/post" 
          className="relative flex-1 -mt-5" 
          onClick={(e) => handleAuthRequiredClick(e, '/post')}
        >
          <div className="absolute left-1/2 -translate-x-1/2 h-12 w-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg">
            <Plus className="h-6 w-6" />
          </div>
        </Link>
        <Link to="/favorites" className={`bottom-nav-item ${path.startsWith('/favorites') ? 'active' : ''}`}>
          <Heart className="h-5 w-5" />
          <span className="text-xs mt-1">{t('favorites')}</span>
        </Link>
        <Link 
          to="/profile" 
          className={`bottom-nav-item ${path.startsWith('/profile') ? 'active' : ''}`}
          onClick={(e) => handleAuthRequiredClick(e, '/profile')}
        >
          <User className="h-5 w-5" />
          <span className="text-xs mt-1">{t('profile')}</span>
        </Link>
      </div>
    </div>
  );
}
