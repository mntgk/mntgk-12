import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search as SearchIcon, Menu, X, ChevronDown, User, Bell, MessageSquare, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface NavbarProps {
  className?: string;
}

const Navbar = ({ className }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { language, setLanguage } = useLanguage();
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
    }
  }, [location.search]);

  const handleSearch = (term: string) => {
    if (term.trim()) {
      navigate(`/search?q=${encodeURIComponent(term)}`);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      
      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsMenuOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-3/4 max-w-sm bg-background p-6 shadow-xl">
            <div className="mb-8 flex items-center justify-between">
              <Link to="/" className="flex items-center space-x-2 space-x-reverse">
                <span className="font-bold text-xl">منتجك</span>
              </Link>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            
            <div className="mb-6">
              <Input
                placeholder={language === 'ar' ? "ابحث عن منتجات" : "Search products"}
                className="w-full"
                prefix={<SearchIcon className="mr-2 h-4 w-4 text-muted-foreground" />}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-sm font-medium">
                  {language === 'ar' ? 'الفئات' : 'Categories'}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/category/vehicles" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                    <span className="text-sm">
                      {language === 'ar' ? 'سيارات' : 'Vehicles'}
                    </span>
                  </Link>
                  <Link to="/category/real-estate" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                    <span className="text-sm">
                      {language === 'ar' ? 'عقارات' : 'Real Estate'}
                    </span>
                  </Link>
                  <Link to="/category/technology" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                    <span className="text-sm">
                      {language === 'ar' ? 'تقنية' : 'Technology'}
                    </span>
                  </Link>
                  <Link to="/category/services" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                    <span className="text-sm">
                      {language === 'ar' ? 'خدمات' : 'Services'}
                    </span>
                  </Link>
                  <Link to="/category/furniture" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                    <span className="text-sm">
                      {language === 'ar' ? 'أثاث' : 'Furniture'}
                    </span>
                  </Link>
                  <Link to="/category/clothes" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                    <span className="text-sm">
                      {language === 'ar' ? 'ملابس' : 'Clothes'}
                    </span>
                  </Link>
                </div>
              </div>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium">
                  {language === 'ar' ? 'المناطق' : 'Regions'}
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <Link to="/region/damascus" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                    <span className="text-sm">
                      {language === 'ar' ? 'دمشق' : 'Damascus'}
                    </span>
                  </Link>
                  <Link to="/region/aleppo" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                    <span className="text-sm">
                      {language === 'ar' ? 'حلب' : 'Aleppo'}
                    </span>
                  </Link>
                  <Link to="/region/homs" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                    <span className="text-sm">
                      {language === 'ar' ? 'حمص' : 'Homs'}
                    </span>
                  </Link>
                  <Link to="/region/latakia" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                    <span className="text-sm">
                      {language === 'ar' ? 'اللاذقية' : 'Latakia'}
                    </span>
                  </Link>
                </div>
              </div>
              
              <div className="space-y-3">
                {isAuthenticated ? (
                  <>
                    <Link to="/profile" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                      <User className="h-5 w-5" />
                      <span className="text-sm">
                        {language === 'ar' ? 'حسابي' : 'My Account'}
                      </span>
                    </Link>
                    <Link to="/favorites" className="flex items-center space-x-2 space-x-reverse rounded-md p-2 hover:bg-accent">
                      <Bookmark className="h-5 w-5" />
                      <span className="text-sm">
                        {language === 'ar' ? 'المفضلة' : 'Favorites'}
                      </span>
                    </Link>
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      onClick={logout}
                    >
                      {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                    </Button>
                  </>
                ) : (
                  <Link to="/login">
                    <Button className="w-full">
                      {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <img 
              src="/lovable-uploads/9c7d94b9-c841-4c9a-bb51-db6df6b25b36.png" 
              alt="Logo" 
              className="h-8 w-8"
            />
            <span className="font-bold hidden sm:inline-block text-xl">منتجك</span>
          </Link>
          
          <div className="ml-4 mr-4 hidden lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm font-medium">
                  <span>{language === 'ar' ? 'الفئات' : 'Categories'}</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/category/vehicles">
                    {language === 'ar' ? 'سيارات' : 'Vehicles'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/real-estate">
                    {language === 'ar' ? 'عقارات' : 'Real Estate'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/technology">
                    {language === 'ar' ? 'تقنية' : 'Technology'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/services">
                    {language === 'ar' ? 'خدمات' : 'Services'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/furniture">
                    {language === 'ar' ? 'أثاث' : 'Furniture'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/clothes">
                    {language === 'ar' ? 'ملابس' : 'Clothes'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/appliances">
                    {language === 'ar' ? 'أجهزة منزلية' : 'Appliances'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/category/food">
                    {language === 'ar' ? 'طعام' : 'Food'}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="ml-4 hidden lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center text-sm font-medium">
                  <span>{language === 'ar' ? 'المناطق' : 'Regions'}</span>
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 max-h-[50vh] overflow-y-auto">
                <DropdownMenuItem asChild>
                  <Link to="/region/damascus">
                    {language === 'ar' ? 'دمشق' : 'Damascus'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/region/aleppo">
                    {language === 'ar' ? 'حلب' : 'Aleppo'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/region/homs">
                    {language === 'ar' ? 'حمص' : 'Homs'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/region/latakia">
                    {language === 'ar' ? 'اللاذقية' : 'Latakia'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/region/tartus">
                    {language === 'ar' ? 'طرطوس' : 'Tartus'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/region/daraa">
                    {language === 'ar' ? 'درعا' : 'Daraa'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/region/sweida">
                    {language === 'ar' ? 'السويداء' : 'Sweida'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/region/quneitra">
                    {language === 'ar' ? 'القنيطرة' : 'Quneitra'}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/region/damascus-countryside">
                    {language === 'ar' ? 'ريف دمشق' : 'Damascus Countryside'}
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        
        <div className="flex-1 mx-6 max-w-md hidden md:block">
          <div className="relative">
            <SearchIcon className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={language === 'ar' ? "ابحث عن منتجات" : "Search products"}
              className="w-full pr-10"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchTerm)}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          {isAuthenticated ? (
            <>
              <Link to="/notifications" className="p-1 relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
              </Link>
              <Link to="/favorites" className="p-1 hidden sm:block">
                <Bookmark className="h-5 w-5" />
              </Link>
              <Link to="/post" className="hidden sm:block">
                <Button size="sm">
                  {language === 'ar' ? 'نشر إعلان' : 'Post Ad'}
                </Button>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center text-sm font-medium">
                    <User className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    {language === 'ar' ? 'حسابي' : 'My Account'}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      {language === 'ar' ? 'الملف الشخصي' : 'Profile'}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/favorites">
                      {language === 'ar' ? 'المفضلة' : 'Favorites'}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/post">
                      {language === 'ar' ? 'نشر إعلان' : 'Post Ad'}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout}>
                    {language === 'ar' ? 'تسجيل الخروج' : 'Logout'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Link to="/login">
              <Button size="sm">
                {language === 'ar' ? 'تسجيل الدخول' : 'Login'}
              </Button>
            </Link>
          )}
          <div className="flex items-center space-x-1 space-x-reverse border-r pr-3 mr-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => setLanguage(language === 'ar' ? 'en' : 'ar')}
            >
              <span className="text-sm font-medium">
                {language === 'ar' ? 'EN' : 'AR'}
              </span>
            </Button>
            <ThemeToggle />
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Menu"
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export { Navbar };
