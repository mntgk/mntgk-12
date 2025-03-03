import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Search, Menu, X, Bell, User, ShoppingBag,
  LogOut, Settings, Heart, Upload, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { isAuthenticated, user, logout } = useAuth();
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
    }
  };

  // Close mobile menu when screen size changes to desktop
  useEffect(() => {
    if (!isMobile && isOpen) {
      setIsOpen(false);
    }
  }, [isMobile, isOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/lovable-uploads/9c7d94b9-c841-4c9a-bb51-db6df6b25b36.png" 
              alt="Logo" 
              className="h-8" 
            />
            <span className="text-xl font-bold hidden md:inline-block">
              {language === 'ar' ? 'منتجك' : 'Montajak'}
            </span>
          </Link>
        </div>

        <form 
          onSubmit={handleSearch}
          className={`${
            isOpen ? 'flex absolute left-0 right-0 top-16 p-4 border-b bg-background z-50' : 'hidden md:flex'
          } w-full max-w-sm items-center justify-center`}
        >
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={language === 'ar' ? 'ابحث عن منتجات...' : 'Search products...'}
              className="w-full pl-8 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button type="submit" size="sm" className="ml-2">
            {language === 'ar' ? 'بحث' : 'Search'}
          </Button>
        </form>

        <div className="flex items-center gap-2">
          {!isMobile && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleLanguage}
              className="text-xs font-bold"
            >
              {language === 'ar' ? 'EN' : 'AR'}
            </Button>
          )}
          
          <ThemeToggle />
          
          {!isMobile && !isOpen && (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/search">
                <Search className="h-5 w-5" />
              </Link>
            </Button>
          )}
          
          <Button variant="ghost" size="icon" asChild>
            <Link to="/notifications">
              <Bell className="h-5 w-5" />
            </Link>
          </Button>

          {isAuthenticated ? (
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
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      {isMobile && isOpen && (
        <div className="border-t p-4 space-y-4 bg-background">
          <div className="flex flex-col space-y-3">
            <Button variant="outline" asChild>
              <Link to="/" onClick={() => setIsOpen(false)}>
                {language === 'ar' ? 'الرئيسية' : 'Home'}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/categories" onClick={() => setIsOpen(false)}>
                {language === 'ar' ? 'الفئات' : 'Categories'}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/featured" onClick={() => setIsOpen(false)}>
                {language === 'ar' ? 'مميز' : 'Featured'}
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/latest" onClick={() => setIsOpen(false)}>
                {language === 'ar' ? 'أحدث المنتجات' : 'Latest'}
              </Link>
            </Button>
            {isAuthenticated ? (
              <>
                <Button variant="outline" asChild>
                  <Link to="/post" onClick={() => setIsOpen(false)}>
                    {language === 'ar' ? 'نشر إعلان' : 'Post Ad'}
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/profile" onClick={() => setIsOpen(false)}>
                    {language === 'ar' ? 'حسابي' : 'My Profile'}
                  </Link>
                </Button>
              </>
            ) : (
              <Button variant="outline" asChild>
                <Link to="/login" onClick={() => setIsOpen(false)}>
                  {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                </Link>
              </Button>
            )}
            <Button variant="outline" onClick={toggleLanguage}>
              {language === 'ar' ? 'English' : 'العربية'}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
