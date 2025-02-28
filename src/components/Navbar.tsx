
import { Link } from "react-router-dom";
import { Search, Menu, MapPin, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="text-xl font-bold text-primary">
            منتجك
          </Link>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center">
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
              <Button variant="outline" size="icon">
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

          <div className="relative w-64">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="ابحث عن منتجات..."
              className="w-full rounded-full border bg-background pr-10 pl-4 py-2 text-sm font-medium"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
