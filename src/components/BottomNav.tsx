
import { Link, useLocation } from "react-router-dom";
import { Home, Search, PlusCircle, Heart, User } from "lucide-react";

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 glass-effect border-t md:hidden">
      <div className="grid grid-cols-5 h-16">
        <Link to="/" className={`bottom-nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <Home className="h-6 w-6" />
          <span className="text-xs font-medium">الرئيسية</span>
        </Link>
        <Link to="/search" className={`bottom-nav-item ${location.pathname === '/search' ? 'active' : ''}`}>
          <Search className="h-6 w-6" />
          <span className="text-xs font-medium">البحث</span>
        </Link>
        <Link to="/post" className={`bottom-nav-item ${location.pathname === '/post' ? 'active' : ''}`}>
          <div className="relative -top-5">
            <div className="flex items-center justify-center h-14 w-14 rounded-full bg-primary">
              <PlusCircle className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
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
