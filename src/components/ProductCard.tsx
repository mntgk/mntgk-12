
import { Link } from "react-router-dom";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  location: string;
}

export function ProductCard({ id, title, price, image, category, location }: ProductCardProps) {
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
        </div>
        <div className="p-3">
          <h3 className="font-medium text-sm truncate">{title}</h3>
          <div className="mt-1 flex items-center justify-between">
            <span className="text-base font-semibold text-primary">
              {price.toLocaleString()} ل.س
            </span>
            <span className="text-xs text-muted-foreground">
              {location}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
