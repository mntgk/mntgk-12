
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { PersistentSearchBar } from "@/components/search/PersistentSearchBar";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Post from "./pages/Post";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Notifications from "./pages/Notifications";
import Category from "./pages/Category";
import Region from "./pages/Region";
import Search from "./pages/Search";
import ProductDetail from "./pages/ProductDetail";
import Featured from "./pages/Featured";
import Latest from "./pages/Latest";
import Login from "./pages/Login";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <LanguageProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <div className="pt-14"> {/* Add padding to accommodate the fixed search bar */}
              <PersistentSearchBar />
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/post" element={<Post />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/category/:categoryId" element={<Category />} />
                <Route path="/region/:regionName" element={<Region />} />
                <Route path="/search" element={<Search />} />
                <Route path="/product/:productId" element={<ProductDetail />} />
                <Route path="/featured" element={<Featured />} />
                <Route path="/latest" element={<Latest />} />
                <Route path="/login" element={<Login />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </TooltipProvider>
        </AuthProvider>
      </LanguageProvider>
    </BrowserRouter>
  </QueryClientProvider>
);

export default App;
