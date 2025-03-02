
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Car, Building, Computer, Wrench, Sofa, 
  Shirt, Home as HomeIcon, Book, Utensils, 
  Gamepad, Briefcase, Scissors 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryItem {
  title: string;
  icon: JSX.Element;
  href: string;
}

interface CategoriesSectionProps {
  activeCategory: string | null;
  setActiveCategory: (category: string | null) => void;
}

export const CategoriesSection = ({ 
  activeCategory, 
  setActiveCategory 
}: CategoriesSectionProps) => {
  const { language, translateCategory } = useLanguage();
  
  const categories: CategoryItem[] = [
    {
      title: "سيارات",
      icon: <Car className="h-6 w-6" />,
      href: "/category/vehicles"
    },
    {
      title: "عقارات",
      icon: <Building className="h-6 w-6" />,
      href: "/category/real-estate"
    },
    {
      title: "تقنية",
      icon: <Computer className="h-6 w-6" />,
      href: "/category/technology"
    },
    {
      title: "خدمات",
      icon: <Wrench className="h-6 w-6" />,
      href: "/category/services"
    },
    {
      title: "أثاث",
      icon: <Sofa className="h-6 w-6" />,
      href: "/category/furniture"
    },
    {
      title: "ملابس",
      icon: <Shirt className="h-6 w-6" />,
      href: "/category/clothes"
    },
    {
      title: "أجهزة منزلية",
      icon: <HomeIcon className="h-6 w-6" />,
      href: "/category/appliances"
    },
    {
      title: "طعام",
      icon: <Utensils className="h-6 w-6" />,
      href: "/category/food"
    },
    {
      title: "ألعاب",
      icon: <Gamepad className="h-6 w-6" />,
      href: "/category/games"
    },
    {
      title: "وظائف",
      icon: <Briefcase className="h-6 w-6" />,
      href: "/category/jobs"
    },
    {
      title: "يدويات",
      icon: <Scissors className="h-6 w-6" />,
      href: "/category/handmade"
    }
  ];

  return (
    <section className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
      <div className="flex space-x-2 space-x-reverse">
        {categories.map((category) => (
          <button
            key={category.title}
            className={`category-chip ${activeCategory === category.title ? 'active' : ''}`}
            onClick={() => setActiveCategory(
              activeCategory === category.title ? null : category.title
            )}
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              {category.icon}
              <span>{language === 'ar' ? category.title : translateCategory(category.title)}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
