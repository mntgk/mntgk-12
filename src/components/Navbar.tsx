
import { Link } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center space-x-4 space-x-reverse">
          <Button variant="ghost" size="icon">
            <Menu className="h-5 w-5" />
          </Button>
          <Link to="/" className="text-xl font-semibold text-primary">
            سوق
          </Link>
        </div>
        
        <div className="flex items-center space-x-4 space-x-reverse">
          <div className="relative w-64">
            <Search className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="ابحث عن منتجات..."
              className="w-full rounded-full border bg-background pr-10 pl-4 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
