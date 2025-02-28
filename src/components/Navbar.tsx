
import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Menu, MapPin, Filter, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

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
                <SheetTitle className="text-xl font-bold text-primary">منتجك</SheetTitle>
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
                  <button key={city} className="flex justify-start px-2 py-1 text-md hover:text-primary">
                    {city}
                  </button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          
          <Link to="/" className="text-xl font-bold text-primary">
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
                </div>
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

              <div className="relative hidden md:block md:w-64">
                <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="ابحث عن منتجات..."
                  className="w-full rounded-full border bg-background pr-10 pl-4 py-2 text-sm"
                  onClick={() => setIsSearchOpen(true)}
                />
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="hidden items-center md:flex">
                    <MapPin className="ml-2 h-4 w-4" />
                    <span>اختر المنطقة</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>دمشق</DropdownMenuItem>
                  <DropdownMenuItem>حلب</DropdownMenuItem>
                  <DropdownMenuItem>حمص</DropdownMenuItem>
                  <DropdownMenuItem>حماه</DropdownMenuItem>
                  <DropdownMenuItem>اللاذقية</DropdownMenuItem>
                  <DropdownMenuItem>طرطوس</DropdownMenuItem>
                  <DropdownMenuItem>درعا</DropdownMenuItem>
                  <DropdownMenuItem>السويداء</DropdownMenuItem>
                  <DropdownMenuItem>القنيطرة</DropdownMenuItem>
                  <DropdownMenuItem>ريف دمشق</DropdownMenuItem>
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
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
