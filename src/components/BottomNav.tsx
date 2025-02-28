
import { Link, useLocation } from "react-router-dom";
import { Home, Search, Heart, User, PlusCircle } from "lucide-react";

export function BottomNav() {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-background border-t glass-effect">
      <div className="container">
        <div className="flex items-center justify-between">
          <Link to="/" className={`bottom-nav-item ${pathname === '/' ? 'active' : ''}`}>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">الرئيسية</span>
          </Link>
          
          <Link to="/search" className={`bottom-nav-item ${pathname === '/search' ? 'active' : ''}`}>
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">البحث</span>
          </Link>
          
          <Link to="/post" className={`bottom-nav-item ${pathname === '/post' ? 'active' : ''}`}>
            <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center -mt-3">
              <PlusCircle className="h-8 w-8" />
            </div>
            <span className="text-xs mt-1">إضافة</span>
          </Link>
          
          <Link to="/favorites" className={`bottom-nav-item ${pathname === '/favorites' ? 'active' : ''}`}>
            <Heart className="h-6 w-6" />
            <span className="text-xs mt-1">المفضلة</span>
          </Link>
          
          <Link to="/profile" className={`bottom-nav-item ${pathname === '/profile' ? 'active' : ''}`}>
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">حسابي</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
