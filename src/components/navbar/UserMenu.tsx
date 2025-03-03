
import { Link } from "react-router-dom";
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

export function UserMenu() {
  const { user, logout } = useAuth();
  const { language } = useLanguage();

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
        <DropdownMenuItem asChild>
          <Link to="/profile">
            <User className="mr-2 h-4 w-4" />
            <span>{language === 'ar' ? 'حسابي' : 'My Profile'}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/my-products">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <span>{language === 'ar' ? 'منتجاتي' : 'My Products'}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/favorites">
            <Heart className="mr-2 h-4 w-4" />
            <span>{language === 'ar' ? 'المفضلة' : 'Favorites'}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/post">
            <Upload className="mr-2 h-4 w-4" />
            <span>{language === 'ar' ? 'نشر إعلان' : 'Post Ad'}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link to="/settings">
            <Settings className="mr-2 h-4 w-4" />
            <span>{language === 'ar' ? 'الإعدادات' : 'Settings'}</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{language === 'ar' ? 'تسجيل الخروج' : 'Logout'}</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
