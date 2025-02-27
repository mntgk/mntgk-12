
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
    <Link to={`/product/${id}`} className="block">
      <div className="rounded-xl overflow-hidden bg-white shadow-sm card-hover">
        <div className="aspect-[4/3] relative overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-2 left-2">
            <span className="px-2 py-1 text-xs font-medium bg-white/90 rounded-full">
              {category}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium truncate">{title}</h3>
          <div className="mt-2 flex items-center justify-between">
            <span className="text-lg font-semibold text-primary">
              ${price.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              {location}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
