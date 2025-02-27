
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  description: string;
  href: string;
}

export function CategoryCard({ title, icon, description, href }: CategoryCardProps) {
  return (
    <Link to={href} className="block">
      <div className="rounded-xl p-6 bg-white shadow-sm card-hover">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-primary/10 text-primary">
            {icon}
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
