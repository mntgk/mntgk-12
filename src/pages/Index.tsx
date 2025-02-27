
import { Building, Car, Computer, Wrench } from "lucide-react";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";

// Mock data for initial display
const featuredProducts = [
  {
    id: "1",
    title: "Modern Apartment in Downtown",
    price: 250000,
    image: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
    category: "Houses",
    location: "Downtown"
  },
  {
    id: "2",
    title: "MacBook Pro 16-inch",
    price: 2499,
    image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
    category: "Tech",
    location: "City Center"
  },
  {
    id: "3",
    title: "Web Development Services",
    price: 500,
    image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
    category: "Services",
    location: "Remote"
  }
];

const categories = [
  {
    title: "Cars & Vehicles",
    icon: <Car className="h-6 w-6" />,
    description: "Browse cars, motorcycles, and more",
    href: "/category/vehicles"
  },
  {
    title: "Real Estate",
    icon: <Building className="h-6 w-6" />,
    description: "Find properties for sale and rent",
    href: "/category/real-estate"
  },
  {
    title: "Technology",
    icon: <Computer className="h-6 w-6" />,
    description: "Discover the latest gadgets and tech",
    href: "/category/technology"
  },
  {
    title: "Services",
    icon: <Wrench className="h-6 w-6" />,
    description: "Professional services and expertise",
    href: "/category/services"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="container py-8 space-y-12 animate-fade-in">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Your Trusted Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Buy, sell, and exchange items in your local community
          </p>
        </section>

        {/* Categories */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Browse Categories</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {categories.map((category) => (
              <CategoryCard key={category.title} {...category} />
            ))}
          </div>
        </section>

        {/* Featured Listings */}
        <section>
          <h2 className="text-2xl font-semibold mb-6">Featured Listings</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
