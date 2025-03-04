
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLanguage } from "@/contexts/LanguageContext";

interface Specification {
  name: string;
  value: string;
}

interface ProductTabsProps {
  description: string;
  specifications: Specification[];
}

export function ProductTabs({ description, specifications }: ProductTabsProps) {
  const { language } = useLanguage();
  
  return (
    <Tabs defaultValue="description">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="description">
          {language === 'ar' ? 'الوصف' : 'Description'}
        </TabsTrigger>
        <TabsTrigger value="specifications">
          {language === 'ar' ? 'المواصفات' : 'Specifications'}
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="mt-4">
        <div className="prose max-w-none dark:prose-invert">
          <p>{description}</p>
        </div>
      </TabsContent>
      
      <TabsContent value="specifications" className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {specifications.map((spec, index) => (
            <div key={index} className="flex justify-between p-3 border rounded-lg">
              <span className="text-muted-foreground">{spec.name}</span>
              <span className="font-medium">{spec.value}</span>
            </div>
          ))}
        </div>
      </TabsContent>
    </Tabs>
  );
}
