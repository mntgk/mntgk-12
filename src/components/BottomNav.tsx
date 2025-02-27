
import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusCircle, Heart, User } from "lucide-react";

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background border-t">
      <div className="flex items-center justify-around">
        <Link to="/" className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Home className="h-6 w-6" />
          <span className="text-xs font-medium">الرئيسية</span>
        </Link>
        <Link to="/search" className={`bottom-nav-item ${location.pathname === '/search' ? 'active' : ''}`}>
          <Search className="h-6 w-6" />
          <span className="text-xs font-medium">البحث</span>
        </Link>
        <Link to="/post" className={`bottom-nav-item ${location.pathname === '/post' ? 'active' : ''}`}>
          <PlusCircle className="h-6 w-6" />
          <span className="text-xs font-medium">إضافة إعلان</span>
        </Link>
        <Link to="/favorites" className={`bottom-nav-item ${location.pathname === '/favorites' ? 'active' : ''}`}>
          <Heart className="h-6 w-6" />
          <span className="text-xs font-medium">المفضلة</span>
        </Link>
        <Link to="/profile" className={`bottom-nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
          <User className="h-6 w-6" />
          <span className="text-xs font-medium">حسابي</span>
        </Link>
      </div>
    </nav>
  );
}
