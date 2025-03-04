
import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLanguage } from "@/contexts/LanguageContext";

export interface FavoriteProduct {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  location: string;
  addedAt: string;
}

interface FavoriteItemProps {
  product: FavoriteProduct;
  onRemove: (id: string) => void;
}

export function FavoriteItem({ product, onRemove }: FavoriteItemProps) {
  const { language } = useLanguage();
  const [isDeleting, setIsDeleting] = useState(false);
  
  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDeleting(true);
    
    // Simulate API call
    setTimeout(() => {
      onRemove(product.id);
      setIsDeleting(false);
      toast.success(
        language === 'ar' 
          ? 'تمت إزالة المنتج من المفضلة' 
          : 'Product removed from favorites'
      );
    }, 300);
  };
  
  return (
    <Link 
      to={`/product/${product.id}`}
      className="block border rounded-xl overflow-hidden bg-card hover:shadow-md transition-all"
    >
      <div className="flex md:items-center flex-col md:flex-row">
        <div className="md:w-1/3 h-48 md:h-32">
          <img 
            src={product.image} 
            alt={product.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-4 md:p-5 flex-1">
          <div className="flex justify-between">
            <div>
              <h3 className="font-medium">{product.title}</h3>
              <p className="text-lg font-semibold text-primary mt-1">
                {product.price.toLocaleString()} {language === 'ar' ? 'ل.س' : 'SYP'}
              </p>
              <div className="flex items-center mt-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{product.location}</span>
                <span className="mx-2">•</span>
                <span>{product.category}</span>
              </div>
            </div>
            <div>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={handleRemove}
                disabled={isDeleting}
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-3">
            {language === 'ar' ? 'تمت الإضافة' : 'Added'}: {product.addedAt}
          </div>
        </div>
      </div>
    </Link>
  );
}
