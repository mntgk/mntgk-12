
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Bookmark } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  location: string;
  likes?: number;
}

export function ProductCard({ id, title, price, image, category, location, likes = 0 }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(likes);
  const [isSaved, setIsSaved] = useState(false);
  const { language } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  
  // Check if product is saved in favorites
  useEffect(() => {
    if (isAuthenticated && user) {
      const savedProducts = JSON.parse(localStorage.getItem(`montajak_favorites_${user.id}`) || '[]');
      setIsSaved(savedProducts.includes(id));
      
      const likedProducts = JSON.parse(localStorage.getItem(`montajak_likes_${user.id}`) || '[]');
      setIsLiked(likedProducts.includes(id));
    }
  }, [id, isAuthenticated, user]);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
      return;
    }
    
    if (isLiked) {
      setLikesCount(likesCount - 1);
      toast.success(language === 'ar' ? 'تم إلغاء الإعجاب' : 'Like removed');
      
      // Update liked products in localStorage
      if (user) {
        const likedProducts = JSON.parse(localStorage.getItem(`montajak_likes_${user.id}`) || '[]');
        const updatedLikes = likedProducts.filter((productId: string) => productId !== id);
        localStorage.setItem(`montajak_likes_${user.id}`, JSON.stringify(updatedLikes));
      }
    } else {
      setLikesCount(likesCount + 1);
      toast.success(language === 'ar' ? 'تم الإعجاب' : 'Liked successfully');
      
      // Update liked products in localStorage
      if (user) {
        const likedProducts = JSON.parse(localStorage.getItem(`montajak_likes_${user.id}`) || '[]');
        likedProducts.push(id);
        localStorage.setItem(`montajak_likes_${user.id}`, JSON.stringify(likedProducts));
      }
    }
    setIsLiked(!isLiked);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'Please login first');
      return;
    }
    
    if (user) {
      const savedProducts = JSON.parse(localStorage.getItem(`montajak_favorites_${user.id}`) || '[]');
      
      if (isSaved) {
        // Remove from favorites
        const updatedSaved = savedProducts.filter((productId: string) => productId !== id);
        localStorage.setItem(`montajak_favorites_${user.id}`, JSON.stringify(updatedSaved));
        toast.success(language === 'ar' ? 'تم إزالة المنتج من المفضلة' : 'Removed from favorites');
      } else {
        // Add to favorites
        savedProducts.push(id);
        localStorage.setItem(`montajak_favorites_${user.id}`, JSON.stringify(savedProducts));
        toast.success(language === 'ar' ? 'تم حفظ المنتج في المفضلة' : 'Saved to favorites');
      }
      
      setIsSaved(!isSaved);
    }
  };

  return (
    <Link to={`/product/${id}`} className="block animate-fade-up">
      <div className="rounded-xl overflow-hidden bg-card shadow-sm card-hover h-full border">
        <div className="aspect-square relative overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 text-xs font-medium bg-black/50 text-white rounded-full backdrop-blur-sm">
              {category}
            </span>
          </div>
          <div className="absolute top-2 left-2 flex gap-1">
            <button 
              onClick={handleLike}
              className="p-1.5 bg-white/80 dark:bg-black/50 rounded-full backdrop-blur-sm"
            >
              <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
            </button>
            <button 
              onClick={handleSave}
              className="p-1.5 bg-white/80 dark:bg-black/50 rounded-full backdrop-blur-sm"
            >
              <Bookmark className={`h-4 w-4 ${isSaved ? 'fill-primary text-primary' : ''}`} />
            </button>
          </div>
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm truncate">{title}</h3>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-base font-semibold text-primary">
              {price.toLocaleString()} {language === 'ar' ? 'ل.س' : 'SYP'}
            </span>
            <span className="text-xs text-muted-foreground">
              {location}
            </span>
          </div>
          <div className="mt-1 text-xs text-muted-foreground flex items-center">
            <Heart className="h-3 w-3 mr-1" />
            <span>{likesCount} {language === 'ar' ? 'إعجاب' : 'likes'}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
