
import { useState } from "react";

interface ProductImagesProps {
  images: string[];
  title: string;
}

export function ProductImages({ images, title }: ProductImagesProps) {
  const [activeImage, setActiveImage] = useState(0);
  
  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="aspect-video relative">
        <img 
          src={images[activeImage]} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex p-2 gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button 
              key={index}
              className={`flex-shrink-0 w-20 h-16 border-2 rounded overflow-hidden ${
                index === activeImage ? 'border-primary' : 'border-transparent'
              }`}
              onClick={() => setActiveImage(index)}
            >
              <img 
                src={image} 
                alt={`${title} - صورة ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
