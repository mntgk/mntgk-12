
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Bell, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { LogoLink } from "@/components/navbar/LogoLink";
import { SearchForm } from "@/components/navbar/SearchForm";
import { UserMenu } from "@/components/navbar/UserMenu";
import { MobileMenu } from "@/components/navbar/MobileMenu";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const { language, setLanguage } = useLanguage();
  const isMobile = useIsMobile();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleLanguage = () => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
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
          
          <LogoLink />
        </div>

        <SearchForm isOpen={isOpen} onSearch={() => setIsOpen(false)} />

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
            <UserMenu />
          ) : (
            <Button variant="ghost" size="icon" asChild>
              <Link to="/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
          )}
        </div>
      </div>

      <MobileMenu 
        isOpen={isMobile && isOpen} 
        setIsOpen={setIsOpen} 
        toggleLanguage={toggleLanguage} 
      />
    </header>
  );
}
