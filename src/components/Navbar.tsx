
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, MapPin, Filter, X, Bell, Mic, Globe, Facebook, Instagram, Twitter, YouTube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('ar');

  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === 'ar' ? 'en' : 'ar');
    // في التطبيق الحقيقي، هنا سنقوم بتغيير اللغة عبر مكتبة i18n
  };

  const handleVoiceSearch = () => {
    setIsListening(true);
    // محاكاة البحث الصوتي
    setTimeout(() => {
      setIsListening(false);
      // هنا سنقوم بمعالجة البحث الصوتي
    }, 2000);
  };

  return (
    <nav className="sticky top-0 z-40 border-b glass-effect">
      <div className="container flex h-14 items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <SheetHeader className="text-right">
                <SheetTitle className="text-xl font-bold flex items-center justify-end">
                  <img src="/lovable-uploads/3919b86a-5f8e-4952-a304-aa5d961cfd10.png" 
                       alt="منتجك" 
                       className="h-8 ml-2" />
                  <span className="text-primary">منتجك</span>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-3">
                <Link to="/" className="px-2 py-2 text-lg font-medium hover:text-primary">الرئيسية</Link>
                <Link to="/profile" className="px-2 py-2 text-lg font-medium hover:text-primary">حسابي</Link>
                <Link to="/favorites" className="px-2 py-2 text-lg font-medium hover:text-primary">المفضلة</Link>
                <Link to="/post" className="px-2 py-2 text-lg font-medium hover:text-primary">إضافة إعلان</Link>
                <Link to="/notifications" className="px-2 py-2 text-lg font-medium hover:text-primary">الإشعارات</Link>
                <hr className="my-2" />
                <p className="px-2 py-1 text-md font-semibold">اختر المنطقة</p>
                {["دمشق", "حلب", "حمص", "حماه", "اللاذقية", "طرطوس", "درعا", "السويداء", "القنيطرة", "ريف دمشق"].map((city) => (
                  <Link to={`/region/${city}`} key={city} className="flex justify-start px-2 py-1 text-md hover:text-primary">
                    {city}
                  </Link>
                ))}
                <hr className="my-2" />
                <p className="px-2 py-1 text-md font-semibold">الفئات</p>
                <Link to="/category/vehicles" className="px-2 py-1 text-md hover:text-primary">سيارات</Link>
                <Link to="/category/real-estate" className="px-2 py-1 text-md hover:text-primary">عقارات</Link>
                <Link to="/category/technology" className="px-2 py-1 text-md hover:text-primary">تقنية</Link>
                <Link to="/category/food" className="px-2 py-1 text-md hover:text-primary">طعام</Link>
                <Link to="/category/games" className="px-2 py-1 text-md hover:text-primary">ألعاب</Link>
                <Link to="/category/jobs" className="px-2 py-1 text-md hover:text-primary">وظائف</Link>
                <Link to="/category/handmade" className="px-2 py-1 text-md hover:text-primary">مصنوعات يدوية</Link>
                <hr className="my-2" />
                <div className="flex justify-center space-x-4 space-x-reverse">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href="https://instagram.com/montajak" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                          <Instagram className="h-6 w-6" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>انستجرام</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href="https://facebook.com/montajak" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                          <Facebook className="h-6 w-6" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>فيسبوك</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href="https://twitter.com/montajak" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                          <Twitter className="h-6 w-6" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>تويتر</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <a href="https://youtube.com/montajak" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                          <YouTube className="h-6 w-6" />
                        </a>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>يوتيوب</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <img src="/lovable-uploads/3919b86a-5f8e-4952-a304-aa5d961cfd10.png" alt="منتجك" className="h-8" />
            منتجك
          </Link>
        </div>
        
        <div className="flex items-center space-x-3 space-x-reverse">
          {isSearchOpen ? (
            <div className="fixed inset-0 z-50 flex items-start justify-center bg-background/95 pt-16 dark:bg-background/90">
              <div className="container max-w-2xl px-4">
                <div className="relative">
                  <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="search"
                    placeholder="ابحث عن منتجات..."
                    autoFocus
                    className="w-full rounded-xl border bg-background py-3 pr-10 pl-10 text-lg"
                  />
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute left-2 top-1/2 -translate-y-1/2"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  
                  <Button 
                    variant={isListening ? "destructive" : "ghost"}
                    size="icon" 
                    className="absolute left-12 top-1/2 -translate-y-1/2"
                    onClick={handleVoiceSearch}
                  >
                    <Mic className="h-5 w-5" />
                  </Button>
                </div>
                
                {isListening && (
                  <div className="mt-4 rounded-lg bg-muted p-4 text-center">
                    <p className="text-lg">جاري الاستماع...</p>
                    <p className="mt-1 text-sm text-muted-foreground">تحدث الآن</p>
                  </div>
                )}
                
                <div className="mt-6">
                  <h3 className="mb-2 text-lg font-semibold">البحث السريع</h3>
                  <div className="flex flex-wrap gap-2">
                    <button className="category-chip">آيفون</button>
                    <button className="category-chip">سامسونج</button>
                    <button className="category-chip">شقق للإيجار</button>
                    <button className="category-chip">سيارات مستعملة</button>
                    <button className="category-chip">كمبيوتر</button>
                    <button className="category-chip">أثاث منزلي</button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)} className="md:hidden">
                <Search className="h-5 w-5" />
              </Button>
              
              <Link to="/notifications" className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </Link>
              
              <ThemeToggle />

              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleLanguage} 
                title={currentLanguage === 'ar' ? 'English' : 'العربية'}
              >
                <Globe className="h-5 w-5" />
              </Button>

              <div className="relative hidden md:block md:w-64">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="ابحث عن منتجات..."
                  className="w-full rounded-full border bg-background pr-10 pl-10 py-2 text-sm"
                  onClick={() => setIsSearchOpen(true)}
                />
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-1 top-1/2 -translate-y-1/2"
                  onClick={handleVoiceSearch}
                >
                  <Mic className="h-4 w-4" />
                </Button>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden items-center md:flex">
                    <MapPin className="ml-2 h-4 w-4" />
                    <span>اختر المنطقة</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {["دمشق", "حلب", "حمص", "حماه", "اللاذقية", "طرطوس", "درعا", "السويداء", "القنيطرة", "ريف دمشق"].map((city) => (
                    <DropdownMenuItem key={city} asChild>
                      <Link to={`/region/${city}`}>{city}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon" className="hidden md:flex">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem>السعر: من الأعلى إلى الأقل</DropdownMenuItem>
                  <DropdownMenuItem>السعر: من الأقل إلى الأعلى</DropdownMenuItem>
                  <DropdownMenuItem>الأحدث</DropdownMenuItem>
                  <DropdownMenuItem>الأقرب إليك</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="hidden md:flex items-center gap-3">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://instagram.com/montajak" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                        <Instagram className="h-5 w-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>انستجرام</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <a href="https://facebook.com/montajak" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-primary">
                        <Facebook className="h-5 w-5" />
                      </a>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>فيسبوك</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
