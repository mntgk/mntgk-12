
import { Link } from "react-router-dom";
import { Search, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="text-xl font-semibold">
          Marketplace
        </Link>
        
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search items..."
              className="w-full rounded-full border bg-background pl-10 pr-4 py-2 text-sm"
            />
          </div>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Post Ad
          </Button>
        </div>
      </div>
    </nav>
  );
}
