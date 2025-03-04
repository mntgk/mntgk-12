
import { Link, useNavigate } from "react-router-dom";
import { 
  User, ShoppingBag, Heart, Upload, 
  Settings, LogOut 
} from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export function UserMenu() {
  const { user, logout } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    if (path === '/profile' || path === '/my-products' || path === '/post') {
      if (!user) {
        toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'You must be logged in first');
        navigate('/login');
        return;
      }
    }
    navigate(path);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          {user?.profile?.avatar ? (
            <img 
              src={user.profile.avatar} 
              alt={user.profile?.full_name || 'User'} 
              className="h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <User className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          {user?.profile?.full_name || 'User'}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => handleNavigation('/profile')}>
          <User className="mr-2 h-4 w-4" />
          <span>{language === 'ar' ? 'حسابي' : 'My Profile'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/my-products')}>
          <ShoppingBag className="mr-2 h-4 w-4" />
          <span>{language === 'ar' ? 'منتجاتي' : 'My Products'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/favorites')}>
          <Heart className="mr-2 h-4 w-4" />
          <span>{language === 'ar' ? 'المفضلة' : 'Favorites'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/post')}>
          <Upload className="mr-2 h-4 w-4" />
          <span>{language === 'ar' ? 'نشر إعلان' : 'Post Ad'}</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleNavigation('/settings')}>
          <Settings className="mr-2 h-4 w-4" />
          <span>{language === 'ar' ? 'الإعدادات' : 'Settings'}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {user ? (
          <DropdownMenuItem onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => navigate('/login')}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>{language === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
