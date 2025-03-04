
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { 
  Car, Building, Computer, Wrench, Sofa, 
  Shirt, Home as HomeIcon, Utensils, 
  Gamepad, Briefcase, Scissors 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CategoryItem {
  id: string;
  title: string;
  enTitle: string;
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
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const categories: CategoryItem[] = [
    {
      id: "vehicles",
      title: "سيارات",
      enTitle: "Cars",
      icon: <Car className="h-6 w-6" />,
      href: "/category/vehicles"
    },
    {
      id: "real-estate",
      title: "عقارات",
      enTitle: "Houses",
      icon: <Building className="h-6 w-6" />,
      href: "/category/real-estate"
    },
    {
      id: "technology",
      title: "تقنية",
      enTitle: "Electronics",
      icon: <Computer className="h-6 w-6" />,
      href: "/category/technology"
    },
    {
      id: "services",
      title: "خدمات",
      enTitle: "Services",
      icon: <Wrench className="h-6 w-6" />,
      href: "/category/services"
    },
    {
      id: "furniture",
      title: "أثاث",
      enTitle: "Furniture",
      icon: <Sofa className="h-6 w-6" />,
      href: "/category/furniture"
    },
    {
      id: "clothes",
      title: "ملابس",
      enTitle: "Fashion",
      icon: <Shirt className="h-6 w-6" />,
      href: "/category/clothes"
    },
    {
      id: "appliances",
      title: "أجهزة منزلية",
      enTitle: "Appliances",
      icon: <HomeIcon className="h-6 w-6" />,
      href: "/category/appliances"
    },
    {
      id: "food",
      title: "طعام",
      enTitle: "Food",
      icon: <Utensils className="h-6 w-6" />,
      href: "/category/food"
    },
    {
      id: "games",
      title: "ألعاب",
      enTitle: "Games",
      icon: <Gamepad className="h-6 w-6" />,
      href: "/category/games"
    },
    {
      id: "jobs",
      title: "وظائف",
      enTitle: "Jobs",
      icon: <Briefcase className="h-6 w-6" />,
      href: "/category/jobs"
    },
    {
      id: "handmade",
      title: "يدويات",
      enTitle: "Handmade",
      icon: <Scissors className="h-6 w-6" />,
      href: "/category/handmade"
    }
  ];

  const handleCategoryClick = (category: CategoryItem) => {
    if (activeCategory === category.title) {
      setActiveCategory(null);
    } else {
      setActiveCategory(category.title);
      navigate(category.href);
    }
  };

  return (
    <section className="overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none">
      <div className="flex space-x-2 space-x-reverse">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`category-chip ${activeCategory === category.title ? 'active' : ''}`}
            onClick={() => handleCategoryClick(category)}
          >
            <div className="flex items-center space-x-2 space-x-reverse">
              {category.icon}
              <span>{language === 'ar' ? category.title : category.enTitle}</span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};
