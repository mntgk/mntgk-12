
import { useParams, Link } from "react-router-dom";
import { Filter, GridIcon, List, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// بيانات مثالية للمنتجات في كل منطقة
const regionProducts: Record<string, any[]> = {
  "دمشق": [
    {
      id: "d1",
      title: "شقة مفروشة في المزة",
      price: 180000,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      category: "عقارات",
      location: "المزة، دمشق"
    },
    {
      id: "d2",
      title: "سيارة كيا 2020",
      price: 90000,
      image: "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a",
      category: "سيارات",
      location: "المالكي، دمشق"
    },
    {
      id: "d3",
      title: "ايفون 13 برو - جديد",
      price: 2100,
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179",
      category: "تقنية",
      location: "ساحة عرنوس، دمشق"
    },
    {
      id: "d4",
      title: "طقم كنب مودرن",
      price: 3800,
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
      category: "أثاث",
      location: "دمر، دمشق"
    }
  ],
  "حلب": [
    {
      id: "a1",
      title: "محل تجاري للبيع",
      price: 350000,
      image: "https://images.unsplash.com/photo-1582281171754-405cb2a75fb1",
      category: "عقارات",
      location: "الجميلية، حلب"
    },
    {
      id: "a2",
      title: "سامسونج جالاكسي S22",
      price: 1700,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
      category: "تقنية",
      location: "السليمانية، حلب"
    },
    {
      id: "a3",
      title: "آلة خياطة احترافية",
      price: 2800,
      image: "https://images.unsplash.com/photo-1605883705077-8d3d3003b648",
      category: "مصنوعات يدوية",
      location: "وسط المدينة، حلب"
    },
    {
      id: "a4",
      title: "أدوات مطبخ مستعملة",
      price: 700,
      image: "https://images.unsplash.com/photo-1623625434462-e5e42318ae49",
      category: "أجهزة منزلية",
      location: "الحمدانية، حلب"
    }
  ],
  "حمص": [
    {
      id: "h1",
      title: "قطعة أرض للبيع",
      price: 450000,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      category: "عقارات",
      location: "حي الوعر، حمص"
    },
    {
      id: "h2",
      title: "دراجة هوائية رياضية",
      price: 1200,
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e",
      category: "رياضة",
      location: "حي عكرمة، حمص"
    },
    {
      id: "h3",
      title: "ثلاجة LG - جديدة",
      price: 1500,
      image: "https://images.unsplash.com/photo-1584568694244-14fbdf83bd30",
      category: "أجهزة منزلية",
      location: "وسط المدينة، حمص"
    },
    {
      id: "h4",
      title: "خدمات حلاقة متنقلة",
      price: 300,
      image: "https://images.unsplash.com/photo-1621607512214-68297480165e",
      category: "خدمات",
      location: "الخالدية، حمص"
    }
  ],
  "اللاذقية": [
    {
      id: "l1",
      title: "شقة بإطلالة بحرية",
      price: 280000,
      image: "https://images.unsplash.com/photo-1566908829550-e6551b00979b",
      category: "عقارات",
      location: "الكورنيش، اللاذقية"
    },
    {
      id: "l2",
      title: "قارب صيد صغير",
      price: 35000,
      image: "https://images.unsplash.com/photo-1575467678930-c7acd65f2e44",
      category: "قوارب",
      location: "المرفأ، اللاذقية"
    },
    {
      id: "l3",
      title: "معدات غطس كاملة",
      price: 7800,
      image: "https://images.unsplash.com/photo-1517627043994-d62e410e0221",
      category: "رياضة",
      location: "شاطئ جبلة، اللاذقية"
    },
    {
      id: "l4",
      title: "كاميرا كانون احترافية",
      price: 3500,
      image: "https://images.unsplash.com/photo-1516724562728-afc824a36e84",
      category: "تقنية",
      location: "وسط المدينة، اللاذقية"
    }
  ],
  "طرطوس": [
    {
      id: "t1",
      title: "فيلا قرب الشاطئ",
      price: 520000,
      image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739",
      category: "عقارات",
      location: "الرمل الذهبي، طرطوس"
    },
    {
      id: "t2",
      title: "قوارب نزهة",
      price: 25000,
      image: "https://images.unsplash.com/photo-1520255870062-bd79d735e6e2",
      category: "قوارب",
      location: "المرفأ، طرطوس"
    },
    {
      id: "t3",
      title: "جهاز تلفزيون سامسونج 65 بوصة",
      price: 3200,
      image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1",
      category: "أجهزة منزلية",
      location: "وسط المدينة، طرطوس"
    },
    {
      id: "t4",
      title: "خدمات سياحية ورحلات",
      price: 2500,
      image: "https://images.unsplash.com/photo-1499678329028-101435549a4e",
      category: "خدمات",
      location: "شاطئ أرواد، طرطوس"
    }
  ],
  "درعا": [
    {
      id: "dr1",
      title: "أرض زراعية للبيع",
      price: 320000,
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
      category: "عقارات",
      location: "طريق دمشق، درعا"
    },
    {
      id: "dr2",
      title: "معدات زراعية مستعملة",
      price: 45000,
      image: "https://images.unsplash.com/photo-1577128228907-08571b987a9a",
      category: "معدات",
      location: "منطقة نوى، درعا"
    },
    {
      id: "dr3",
      title: "محل تجاري للبيع",
      price: 180000,
      image: "https://images.unsplash.com/photo-1604328471151-5ec51956d4b9",
      category: "عقارات",
      location: "وسط المدينة، درعا"
    },
    {
      id: "dr4",
      title: "أواني منزلية جديدة",
      price: 1200,
      image: "https://images.unsplash.com/photo-1629089434757-173211371776",
      category: "أثاث",
      location: "المحطة، درعا"
    }
  ],
  "حماه": [
    {
      id: "ha1",
      title: "منزل ريفي للبيع",
      price: 210000,
      image: "https://images.unsplash.com/photo-1592595896616-c37162298647",
      category: "عقارات",
      location: "سلمية، حماه"
    },
    {
      id: "ha2",
      title: "آلات نسيج تقليدية",
      price: 28000,
      image: "https://images.unsplash.com/photo-1594631389194-0fa09821281a",
      category: "مصنوعات يدوية",
      location: "قلعة المضيق، حماه"
    },
    {
      id: "ha3",
      title: "خدمات نجارة وصناعة أثاث",
      price: 1500,
      image: "https://images.unsplash.com/photo-1588854337236-6889d631faa8",
      category: "خدمات",
      location: "وسط المدينة، حماه"
    },
    {
      id: "ha4",
      title: "سيارة نقل بضائع",
      price: 75000,
      image: "https://images.unsplash.com/photo-1519003722824-194d4c582875",
      category: "سيارات",
      location: "مصياف، حماه"
    }
  ],
  "السويداء": [
    {
      id: "su1",
      title: "شقة للبيع في وسط المدينة",
      price: 240000,
      image: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e",
      category: "عقارات",
      location: "وسط المدينة، السويداء"
    },
    {
      id: "su2",
      title: "منتجات تقليدية محلية",
      price: 800,
      image: "https://images.unsplash.com/photo-1624396290404-38e61c47659e",
      category: "طعام",
      location: "ريف السويداء"
    },
    {
      id: "su3",
      title: "لابتوب ديل للبيع",
      price: 1800,
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6",
      category: "تقنية",
      location: "شهبا، السويداء"
    },
    {
      id: "su4",
      title: "أدوات صناعة الفخار",
      price: 3200,
      image: "https://images.unsplash.com/photo-1514222134-b57cbb8ce073",
      category: "مصنوعات يدوية",
      location: "القريا، السويداء"
    }
  ],
  "القنيطرة": [
    {
      id: "q1",
      title: "أرض زراعية للإيجار",
      price: 120000,
      image: "https://images.unsplash.com/photo-1589873897539-e211a9a7160f",
      category: "عقارات",
      location: "خان أرنبة، القنيطرة"
    },
    {
      id: "q2",
      title: "معدات صيد سمك",
      price: 2500,
      image: "https://images.unsplash.com/photo-1587222318667-31212ce2828d",
      category: "رياضة",
      location: "بحيرة مسعدة، القنيطرة"
    },
    {
      id: "q3",
      title: "سيارة جيب للطرق الوعرة",
      price: 85000,
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
      category: "سيارات",
      location: "نبع الصخر، القنيطرة"
    },
    {
      id: "q4",
      title: "منتجات ألبان محلية",
      price: 350,
      image: "https://images.unsplash.com/photo-1628689469838-524a4a973b8e",
      category: "طعام",
      location: "الحميدية، القنيطرة"
    }
  ],
  "ريف دمشق": [
    {
      id: "rd1",
      title: "فيلا مع حديقة في الزبداني",
      price: 320000,
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      category: "عقارات",
      location: "الزبداني، ريف دمشق"
    },
    {
      id: "rd2",
      title: "منتجات زراعية عضوية",
      price: 450,
      image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf",
      category: "طعام",
      location: "داريا، ريف دمشق"
    },
    {
      id: "rd3",
      title: "خدمات نقل وتوصيل",
      price: 700,
      image: "https://images.unsplash.com/photo-1601628828688-632f38a5a7d0",
      category: "خدمات",
      location: "جرمانا، ريف دمشق"
    },
    {
      id: "rd4",
      title: "شاليه للإيجار اليومي",
      price: 2500,
      image: "https://images.unsplash.com/photo-1521401830884-6c03c1c87ebb",
      category: "عقارات",
      location: "بلودان، ريف دمشق"
    }
  ]
};

const Region = () => {
  const { regionName } = useParams<{ regionName: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // التحقق من وجود البيانات للمنطقة المحددة
  if (!regionName || !regionProducts[regionName]) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Navbar />
        <main className="container py-4 text-center">
          <div className="py-12">
            <h1 className="text-2xl font-bold mb-4">منطقة غير موجودة</h1>
            <p className="mb-6 text-muted-foreground">لم يتم العثور على المنطقة المطلوبة</p>
            <Link to="/">
              <Button>
                <ArrowRight className="ml-2 h-4 w-4" />
                العودة للصفحة الرئيسية
              </Button>
            </Link>
          </div>
        </main>
        <BottomNav />
      </div>
    );
  }

  const products = regionProducts[regionName];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navbar />
      
      <main className="container py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Link to="/" className="mr-2">
              <Button variant="ghost" size="sm">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">{regionName}</h1>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <Filter className="ml-2 h-4 w-4" />
                  <span className="text-sm">الترتيب</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>السعر: من الأعلى إلى الأقل</DropdownMenuItem>
                <DropdownMenuItem>السعر: من الأقل إلى الأعلى</DropdownMenuItem>
                <DropdownMenuItem>الأحدث</DropdownMenuItem>
                <DropdownMenuItem>الأقرب إليك</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <div className="flex border rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                className="h-9 w-9"
                onClick={() => setViewMode("grid")}
              >
                <GridIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                className="h-9 w-9"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Products */}
        {products.length > 0 ? (
          viewMode === "grid" ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {products.map((product) => (
                <Link to={`/product/${product.id}`} key={product.id} className="block animate-fade-up">
                  <div className="border rounded-xl overflow-hidden bg-card shadow-sm hover:shadow-md transition-all flex">
                    <div className="w-1/3 sm:w-1/4">
                      <img 
                        src={product.image} 
                        alt={product.title}
                        className="object-cover w-full h-full"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-3 flex-1">
                      <h3 className="font-medium">{product.title}</h3>
                      <p className="text-lg font-semibold text-primary mt-1">{product.price.toLocaleString()} ل.س</p>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-sm text-muted-foreground">{product.location}</span>
                        <span className="text-xs px-2 py-1 bg-muted rounded-full">{product.category}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )
        ) : (
          <div className="text-center py-16">
            <h2 className="mt-4 text-xl font-bold">لا توجد منتجات في هذه المنطقة</h2>
            <p className="mt-2 text-muted-foreground">حاول تصفية بحثك بطريقة مختلفة</p>
            <Button className="mt-6">تصفح المناطق الأخرى</Button>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Region;
