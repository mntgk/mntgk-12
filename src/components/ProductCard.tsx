
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Bookmark } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
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

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLiked) {
      setLikesCount(likesCount - 1);
      toast.success(language === 'ar' ? 'تم إلغاء الإعجاب' : 'Like removed');
    } else {
      setLikesCount(likesCount + 1);
      toast.success(language === 'ar' ? 'تم الإعجاب' : 'Liked successfully');
    }
    setIsLiked(!isLiked);
  };

  const handleSave = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsSaved(!isSaved);
    if (!isSaved) {
      toast.success(language === 'ar' ? 'تم حفظ المنتج في المفضلة' : 'Saved to favorites');
    } else {
      toast.success(language === 'ar' ? 'تم إزالة المنتج من المفضلة' : 'Removed from favorites');
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
