
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Mic, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";

export function PersistentSearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleVoiceSearch = () => {
    if (isListening) {
      setIsListening(false);
      return;
    }

    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error(language === 'ar' 
        ? "البحث الصوتي غير متوفر في متصفحك" 
        : "Voice search is not available in your browser");
      return;
    }

    try {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      recognition.continuous = false;
      
      setIsListening(true);
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchTerm(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
      };
      
      recognition.onerror = () => {
        setIsListening(false);
        toast.error(language === 'ar' 
          ? "حدث خطأ في البحث الصوتي" 
          : "Error in voice search");
      };
      
      recognition.start();
    } catch (error) {
      console.error(error);
      setIsListening(false);
      toast.error(language === 'ar' 
        ? "فشل في تشغيل البحث الصوتي" 
        : "Failed to start voice search");
    }
  };

  return (
    <form onSubmit={handleSearch} className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="container mx-auto py-2 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={language === 'ar' ? "ابحث عن منتجات..." : "Search for products..."}
            className="w-full pl-8 pr-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full px-2"
              onClick={clearSearch}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
        <Button 
          type="button"
          variant={isListening ? "default" : "outline"} 
          size="icon"
          onClick={handleVoiceSearch}
          className={isListening ? "animate-pulse" : ""}
        >
          <Mic className="h-4 w-4" />
        </Button>
        <Button type="submit">
          {language === 'ar' ? "بحث" : "Search"}
        </Button>
      </div>
    </form>
  );
}
