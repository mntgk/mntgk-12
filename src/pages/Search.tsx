
import { useState, useEffect } from "react";
import { Mic, X, FilterX, Search as SearchIcon } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ProductCard } from "@/components/ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "sonner";
import { useNavigate, useLocation } from "react-router-dom";

// بيانات مثالية للمنتجات المميزة
const featuredProducts = [
  {
    id: "1",
    title: "شقة حديثة في وسط المدينة",
    price: 250000,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
    category: "عقارات",
    location: "وسط المدينة"
  },
  {
    id: "2",
    title: "ماك بوك برو 16 انش",
    price: 2499,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    category: "تقنية",
    location: "مركز المدينة"
  },
  {
    id: "3",
    title: "خدمات تطوير مواقع",
    price: 500,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "خدمات",
    location: "عن بعد"
  },
  {
    id: "4",
    title: "سيارة مستعملة بحالة ممتازة",
    price: 35000,
    image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
    category: "سيارات",
    location: "الشمال"
  },
  {
    id: "5",
    title: "أريكة جلدية فاخرة",
    price: 1200,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
    category: "أثاث",
    location: "حي الميدان"
  },
  {
    id: "6",
    title: "سماعات Apple AirPods Pro",
    price: 400,
    image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5",
    category: "تقنية",
    location: "المزة"
  }
];

// بحوث شائعة
const popularSearches = [
  "آيفون", "سامسونج", "لابتوب", "شقق للإيجار", "سيارات", "أثاث مستعمل", 
  "كاميرا", "دراجة", "تلفزيون", "مكيف", "PlayStation", "عمل عن بعد"
];

// بحوث حديثة
const recentSearches = [
  "شقة في دمشق", "سيارة مستعملة", "لابتوب ماك", "ثلاجة", "موبايل سامسونج"
];

const Search = () => {
  const { language, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [speechTranscript, setSpeechTranscript] = useState("");
  const [searchResults, setSearchResults] = useState<typeof featuredProducts>([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Parse search query from URL if present
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('q');
    if (query) {
      setSearchTerm(query);
      handleSearch(query);
    }
  }, [location.search]);

  // Speech recognition setup
  useEffect(() => {
    let recognition: any = null;
    
    // Check if speech recognition is available in the browser
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'ar' ? 'ar-SA' : 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('');
        
        setSpeechTranscript(transcript);
        // Update search term immediately when speech recognition provides a result
        setSearchTerm(transcript);
      };
      
      recognition.onend = () => {
        setIsListening(false);
        if (speechTranscript) {
          // Perform search with the transcript once speech recognition is complete
          handleSearch(speechTranscript);
        }
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
        toast.error(
          language === 'ar' 
            ? "حدث خطأ أثناء التعرف على الكلام" 
            : "Error during speech recognition"
        );
      };
    }
    
    return () => {
      if (recognition) {
        recognition.abort();
      }
    };
  }, [language, speechTranscript]);

  const handleSearch = (term: string = searchTerm) => {
    if (!term.trim()) return;
    
    // محاكاة نتائج البحث - في التطبيق الحقيقي ستأتي من API
    const results = featuredProducts.filter(product => 
      product.title.includes(term) || 
      product.category.includes(term) ||
      product.location.includes(term)
    );
    
    setSearchResults(results);
    setHasSearched(true);
    
    // Update URL with search term
    navigate(`/search?q=${encodeURIComponent(term)}`, { replace: true });
    
    // Add to recent searches (in a real app, save to localStorage or backend)
    console.log(`Adding "${term}" to recent searches`);
  };

  const handleMicSearch = () => {
    if (isListening) {
      // If already listening, stop listening
      // The web speech API will handle this with onend event
      window.speechSynthesis?.cancel();
      setIsListening(false);
      return;
    }
    
    // Check if speech recognition is available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      setIsListening(true);
      setSpeechTranscript("");
      
      try {
        // @ts-ignore - Start listening
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = language === 'ar' ? 'ar-SA' : 'en-US';
        recognition.start();
        
        recognition.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result: any) => result.transcript)
            .join('');
          
          setSpeechTranscript(transcript);
          setSearchTerm(transcript); // Update search box immediately with transcript
        };
        
        recognition.onend = () => {
          setIsListening(false);
          if (speechTranscript) {
            handleSearch(speechTranscript);
          }
        };
      } catch (error) {
        console.error('Speech recognition error', error);
        setIsListening(false);
        toast.error(
          language === 'ar' 
            ? "لم نتمكن من تشغيل ميزة البحث الصوتي" 
            : "Couldn't start voice search feature"
        );
      }
    } else {
      toast.error(
        language === 'ar' 
          ? "البحث الصوتي غير مدعوم في متصفحك" 
          : "Voice search is not supported in your browser"
      );
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
    setSpeechTranscript("");
    setSearchResults([]);
    setHasSearched(false);
    navigate('/search', { replace: true });
  };

  const searchPlaceholder = language === 'ar' ? "ابحث عن منتجات..." : "Search for products...";

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <SearchIcon className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                className="w-full pr-10 pl-10 py-6 text-lg rounded-xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              {searchTerm && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute left-2 top-1/2 -translate-y-1/2"
                  onClick={clearSearch}
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
            </div>
            <Button 
              className={`h-12 w-12 rounded-full ${isListening ? 'animate-pulse bg-red-500 hover:bg-red-600' : ''}`}
              onClick={handleMicSearch}
              showFeedback={!isListening}
              feedbackMessage={language === 'ar' ? "انقر واتحدث للبحث الصوتي" : "Tap and speak for voice search"}
            >
              <Mic className="h-5 w-5" />
            </Button>
          </div>
          
          {isListening && (
            <div className="absolute top-16 left-0 right-0 bg-background border rounded-lg p-4 text-center shadow-lg z-10">
              <p className="text-lg">
                {language === 'ar' ? 'جاري الاستماع...' : 'Listening...'}
              </p>
              <p className="text-muted-foreground mt-1">
                {speechTranscript || (language === 'ar' ? 'تحدث الآن' : 'Speak now')}
              </p>
            </div>
          )}
        </div>
        
        {/* Search Content */}
        {hasSearched ? (
          <>
            {/* Search Results */}
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {language === 'ar' 
                  ? `نتائج البحث: ${searchTerm}` 
                  : `Search results: ${searchTerm}`}
              </h2>
              <Button variant="ghost" size="sm" onClick={clearSearch}>
                <FilterX className="h-4 w-4 ml-2" />
                <span>{language === 'ar' ? 'مسح البحث' : 'Clear search'}</span>
              </Button>
            </div>
            
            {searchResults.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {searchResults.map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground" />
                <h2 className="mt-4 text-xl font-bold">
                  {language === 'ar' 
                    ? 'لم يتم العثور على نتائج' 
                    : 'No results found'}
                </h2>
                <p className="mt-2 text-muted-foreground">
                  {language === 'ar' 
                    ? 'حاول البحث باستخدام كلمات مختلفة' 
                    : 'Try searching with different keywords'}
                </p>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold">
                    {language === 'ar' ? 'عمليات البحث الأخيرة' : 'Recent Searches'}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    showFeedback
                    feedbackMessage={language === 'ar' ? "تم مسح عمليات البحث الأخيرة" : "Recent searches cleared"}
                  >
                    {language === 'ar' ? 'مسح' : 'Clear'}
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search) => (
                    <button 
                      key={search} 
                      className="category-chip"
                      onClick={() => {
                        setSearchTerm(search);
                        handleSearch(search);
                      }}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Popular Searches */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">
                {language === 'ar' ? 'عمليات البحث الشائعة' : 'Popular Searches'}
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularSearches.map((search) => (
                  <button 
                    key={search} 
                    className="category-chip"
                    onClick={() => {
                      setSearchTerm(search);
                      handleSearch(search);
                    }}
                  >
                    {search}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Featured Products */}
            <div>
              <h3 className="text-lg font-semibold mb-3">
                {language === 'ar' ? 'منتجات مميزة' : 'Featured Products'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {featuredProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            </div>
          </>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Search;
