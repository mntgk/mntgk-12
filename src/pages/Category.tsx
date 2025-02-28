
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Filter, GridIcon, List, MapPin, ArrowRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { BottomNav } from "@/components/BottomNav";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// بيانات مثالية لفئات مختلفة
const categoryProducts = {
  "vehicles": [
    {
      id: "v1",
      title: "مرسيدس E200 موديل 2020",
      price: 120000,
      image: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2",
      category: "سيارات",
      location: "دمشق"
    },
    {
      id: "v2",
      title: "هوندا سيفيك 2019",
      price: 85000,
      image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf",
      category: "سيارات",
      location: "حلب"
    },
    {
      id: "v3",
      title: "كيا سبورتاج 2021",
      price: 110000,
      image: "https://images.unsplash.com/photo-1551830820-330a71b99659",
      category: "سيارات",
      location: "اللاذقية"
    },
    {
      id: "v4",
      title: "تويوتا كامري 2018",
      price: 95000,
      image: "https://images.unsplash.com/photo-1550355291-bbee04a92027",
      category: "سيارات",
      location: "حمص"
    }
  ],
  "real-estate": [
    {
      id: "r1",
      title: "شقة فاخرة 3 غرف وصالة",
      price: 250000,
      image: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
      category: "عقارات",
      location: "دمشق"
    },
    {
      id: "r2",
      title: "فيلا مع حديقة في ضاحية الأسد",
      price: 450000,
      image: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde",
      category: "عقارات",
      location: "ريف دمشق"
    },
    {
      id: "r3",
      title: "مكتب تجاري بموقع مميز",
      price: 180000,
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
      category: "عقارات",
      location: "اللاذقية"
    },
    {
      id: "r4",
      title: "شقة للإيجار بإطلالة بحرية",
      price: 7000,
      image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
      category: "عقارات",
      location: "طرطوس"
    }
  ],
  "technology": [
    {
      id: "t1",
      title: "ماك بوك برو M2 2023",
      price: 3500,
      image: "https://images.unsplash.com/photo-1483058712412-4245e9b90334",
      category: "تقنية",
      location: "دمشق"
    },
    {
      id: "t2",
      title: "آيفون 13 برو - جديد",
      price: 2200,
      image: "https://images.unsplash.com/photo-1591337676887-a217a6970a8a",
      category: "تقنية",
      location: "حلب"
    },
    {
      id: "t3",
      title: "سامسونج جالاكسي S22",
      price: 1800,
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c",
      category: "تقنية",
      location: "حمص"
    },
    {
      id: "t4",
      title: "سماعات AirPods Pro 2",
      price: 500,
      image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5",
      category: "تقنية",
      location: "اللاذقية"
    }
  ],
  "furniture": [
    {
      id: "f1",
      title: "طقم كنب مودرن",
      price: 4500,
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc",
      category: "أثاث",
      location: "دمشق"
    },
    {
      id: "f2",
      title: "طاولة طعام خشبية فاخرة",
      price: 2800,
      image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc",
      category: "أثاث",
      location: "حلب"
    },
    {
      id: "f3",
      title: "سرير مزدوج مع خزانة",
      price: 3200,
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
      category: "أثاث",
      location: "اللاذقية"
    },
    {
      id: "f4",
      title: "مكتبة كتب خشبية",
      price: 1900,
      image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe",
      category: "أثاث",
      location: "حمص"
    }
  ],
  "clothes": [
    {
      id: "c1",
      title: "جاكيت رجالي جلد",
      price: 750,
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5",
      category: "ملابس",
      location: "دمشق"
    },
    {
      id: "c2",
      title: "فستان سهرة نسائي",
      price: 850,
      image: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1",
      category: "ملابس",
      location: "حلب"
    },
    {
      id: "c3",
      title: "حذاء نايك رياضي",
      price: 350,
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      category: "ملابس",
      location: "اللاذقية"
    },
    {
      id: "c4",
      title: "بنطلون جينز",
      price: 200,
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d",
      category: "ملابس",
      location: "حمص"
    }
  ],
  "services": [
    {
      id: "s1",
      title: "خدمات تصميم جرافيك",
      price: 300,
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      category: "خدمات",
      location: "دمشق"
    },
    {
      id: "s2",
      title: "صيانة منزلية شاملة",
      price: 500,
      image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      category: "خدمات",
      location: "حلب"
    },
    {
      id: "s3",
      title: "دروس خصوصية للرياضيات",
      price: 250,
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173",
      category: "خدمات",
      location: "اللاذقية"
    },
    {
      id: "s4",
      title: "تصميم وبرمجة مواقع",
      price: 700,
      image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
      category: "خدمات",
      location: "حمص"
    }
  ],
  "appliances": [
    {
      id: "a1",
      title: "ثلاجة سامسونج جديدة",
      price: 1800,
      image: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5",
      category: "أجهزة منزلية",
      location: "دمشق"
    },
    {
      id: "a2",
      title: "غسالة أوتوماتيك LG",
      price: 1200,
      image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1",
      category: "أجهزة منزلية",
      location: "حلب"
    },
    {
      id: "a3",
      title: "ميكروويف توشيبا",
      price: 400,
      image: "https://images.unsplash.com/photo-1574269909862-7e1d70bb8078",
      category: "أجهزة منزلية",
      location: "اللاذقية"
    },
    {
      id: "a4",
      title: "مكيف هواء كارير",
      price: 950,
      image: "https://images.unsplash.com/photo-1651108748916-04bb2a948dc5",
      category: "أجهزة منزلية",
      location: "حمص"
    }
  ],
  "food": [
    {
      id: "fo1",
      title: "عسل جبلي طبيعي",
      price: 150,
      image: "https://images.unsplash.com/photo-1587049633312-d628ae10b8bb",
      category: "طعام",
      location: "دمشق"
    },
    {
      id: "fo2",
      title: "زيت زيتون عضوي",
      price: 80,
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5",
      category: "طعام",
      location: "حلب"
    },
    {
      id: "fo3",
      title: "مكسرات مشكلة فاخرة",
      price: 120,
      image: "https://images.unsplash.com/photo-1545022388-9d2c1b8a55a8",
      category: "طعام",
      location: "اللاذقية"
    },
    {
      id: "fo4",
      title: "صندوق فواكه طازجة",
      price: 60,
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b",
      category: "طعام",
      location: "حمص"
    }
  ],
  "games": [
    {
      id: "g1",
      title: "بلايستيشن 5 جديد",
      price: 1800,
      image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e",
      category: "ألعاب",
      location: "دمشق"
    },
    {
      id: "g2",
      title: "إكس بوكس سيريس إكس",
      price: 1600,
      image: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d",
      category: "ألعاب",
      location: "حلب"
    },
    {
      id: "g3",
      title: "مجموعة ألعاب فيديو متنوعة",
      price: 500,
      image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8",
      category: "ألعاب",
      location: "اللاذقية"
    },
    {
      id: "g4",
      title: "نينتندو سويتش مع ألعاب",
      price: 900,
      image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e",
      category: "ألعاب",
      location: "حمص"
    }
  ],
  "jobs": [
    {
      id: "j1",
      title: "مطلوب مهندس برمجيات",
      price: 1500,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2",
      category: "وظائف",
      location: "دمشق"
    },
    {
      id: "j2",
      title: "وظيفة محاسب بدوام كامل",
      price: 1200,
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      category: "وظائف",
      location: "حلب"
    },
    {
      id: "j3",
      title: "مطلوب مدير تسويق",
      price: 1800,
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
      category: "وظائف",
      location: "اللاذقية"
    },
    {
      id: "j4",
      title: "وظيفة مصمم جرافيك",
      price: 900,
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7",
      category: "وظائف",
      location: "حمص"
    }
  ],
  "handmade": [
    {
      id: "h1",
      title: "تحف خشبية يدوية",
      price: 350,
      image: "https://images.unsplash.com/photo-1610445297908-1411dd18c3cf",
      category: "مصنوعات يدوية",
      location: "دمشق"
    },
    {
      id: "h2",
      title: "مجوهرات فضية يدوية",
      price: 700,
      image: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584",
      category: "مصنوعات يدوية",
      location: "حلب"
    },
    {
      id: "h3",
      title: "سجاد يدوي سوري تقليدي",
      price: 1200,
      image: "https://images.unsplash.com/photo-1584413183776-7af337f35521",
      category: "مصنوعات يدوية",
      location: "اللاذقية"
    },
    {
      id: "h4",
      title: "فخاريات مزخرفة يدوياً",
      price: 280,
      image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9",
      category: "مصنوعات يدوية",
      location: "حمص"
    }
  ]
};

// هذا الكود يقوم بترجمة معرفات الفئات إلى أسماء عربية للعرض
const categoryTitles: Record<string, string> = {
  "vehicles": "سيارات",
  "real-estate": "عقارات",
  "technology": "تقنية",
  "services": "خدمات",
  "furniture": "أثاث",
  "clothes": "ملابس",
  "appliances": "أجهزة منزلية",
  "food": "طعام",
  "games": "ألعاب",
  "jobs": "وظائف",
  "handmade": "مصنوعات يدوية"
};

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // التحقق من وجود البيانات للفئة المحددة
  if (!categoryId || !categoryProducts[categoryId as keyof typeof categoryProducts]) {
    return (
      <div className="min-h-screen bg-background pb-20">
        <Navbar />
        <main className="container py-4 text-center">
          <div className="py-12">
            <h1 className="text-2xl font-bold mb-4">فئة غير موجودة</h1>
            <p className="mb-6 text-muted-foreground">لم يتم العثور على الفئة المطلوبة</p>
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

  const products = categoryProducts[categoryId as keyof typeof categoryProducts];
  const categoryTitle = categoryTitles[categoryId as keyof typeof categoryTitles] || categoryId;

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
            <h1 className="text-2xl font-bold">{categoryTitle}</h1>
          </div>
          
          <div className="flex items-center space-x-2 space-x-reverse">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center">
                  <MapPin className="ml-2 h-4 w-4" />
                  <span className="text-sm">المنطقة</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>دمشق</DropdownMenuItem>
                <DropdownMenuItem>حلب</DropdownMenuItem>
                <DropdownMenuItem>حمص</DropdownMenuItem>
                <DropdownMenuItem>حماه</DropdownMenuItem>
                <DropdownMenuItem>اللاذقية</DropdownMenuItem>
                <DropdownMenuItem>طرطوس</DropdownMenuItem>
                <DropdownMenuItem>درعا</DropdownMenuItem>
                <DropdownMenuItem>السويداء</DropdownMenuItem>
                <DropdownMenuItem>القنيطرة</DropdownMenuItem>
                <DropdownMenuItem>ريف دمشق</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

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
            <h2 className="mt-4 text-xl font-bold">لا توجد منتجات في هذه الفئة</h2>
            <p className="mt-2 text-muted-foreground">حاول تصفية بحثك بطريقة مختلفة</p>
            <Button className="mt-6">تصفح الفئات الأخرى</Button>
          </div>
        )}
      </main>
      
      <BottomNav />
    </div>
  );
};

export default Category;
