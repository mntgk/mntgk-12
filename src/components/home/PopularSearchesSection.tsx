
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

export const PopularSearchesSection = () => {
  const { t } = useLanguage();
  
  const popularSearches = [
    "آيفون", "سامسونج", "لابتوب", "شقق للإيجار", "سيارات", "أثاث مستعمل"
  ];

  return (
    <section>
      <h3 className="text-lg font-semibold mb-3">{t('popularSearches')}</h3>
      <div className="flex flex-wrap gap-2">
        {popularSearches.map((search) => (
          <Link key={search} to={`/search?q=${search}`} className="category-chip">
            {search}
          </Link>
        ))}
      </div>
    </section>
  );
};
