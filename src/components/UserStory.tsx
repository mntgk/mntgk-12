
import { useState } from "react";
import { Plus } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Story {
  id: number;
  username: string;
  avatar: string;
  image: string;
  title: string;
}

interface UserStoryProps {
  story: Story;
}

export function AddStoryButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const { toast } = useToast();
  const { language, t } = useLanguage();

  const handleAddStory = () => {
    if (!selectedImage || !title.trim()) {
      toast({
        title: language === 'ar' ? "معلومات غير مكتملة" : "Incomplete Information",
        description: language === 'ar' ? "يرجى إضافة صورة وعنوان للقصة" : "Please add an image and title for your story",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: language === 'ar' ? "تمت إضافة القصة" : "Story Added",
      description: language === 'ar' ? "تمت إضافة قصتك بنجاح" : "Your story has been added successfully",
    });
    setIsOpen(false);
    setSelectedImage(null);
    setTitle("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center space-y-1"
      >
        <div className="h-16 w-16 rounded-full p-0.5 bg-gradient-to-tr from-primary to-primary/50 flex items-center justify-center">
          <div className="h-full w-full rounded-full border-2 border-background overflow-hidden bg-muted flex items-center justify-center">
            <Plus className="h-8 w-8 text-primary" />
          </div>
        </div>
        <span className="text-xs font-medium truncate max-w-[4rem]">{t('addStory')}</span>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogTitle>{language === 'ar' ? 'إضافة قصة جديدة' : 'Add New Story'}</DialogTitle>
          <DialogDescription>
            {language === 'ar' ? 'شارك لحظاتك المميزة مع الآخرين' : 'Share your special moments with others'}
          </DialogDescription>
          
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 h-48">
              {selectedImage ? (
                <div className="relative w-full h-full">
                  <img 
                    src={selectedImage} 
                    alt="Preview" 
                    className="w-full h-full object-contain rounded"
                  />
                  <Button 
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setSelectedImage(null)}
                  >
                    {language === 'ar' ? 'إزالة' : 'Remove'}
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <div className="mt-2">
                    <label 
                      htmlFor="story-image" 
                      className="cursor-pointer bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                    >
                      {language === 'ar' ? 'اختر صورة' : 'Choose Image'}
                    </label>
                    <input 
                      id="story-image" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleImageChange}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {language === 'ar' ? 'PNG، JPG حتى 10MB' : 'PNG, JPG up to 10MB'}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="story-title" className="block text-sm font-medium mb-1">
                {language === 'ar' ? 'عنوان القصة' : 'Story Title'}
              </label>
              <input 
                id="story-title" 
                type="text" 
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-md"
                placeholder={language === 'ar' ? 'أدخل عنوانًا قصيرًا لقصتك' : 'Enter a short title for your story'}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              {language === 'ar' ? 'إلغاء' : 'Cancel'}
            </Button>
            <Button onClick={handleAddStory}>
              {language === 'ar' ? 'نشر القصة' : 'Post Story'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function UserStory({ story }: UserStoryProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { language } = useLanguage();

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex flex-col items-center space-y-1"
      >
        <div className="h-16 w-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500">
          <div className="h-full w-full rounded-full border-2 border-background overflow-hidden">
            <img
              src={story.avatar}
              alt={story.username}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
        <span className="text-xs font-medium truncate max-w-[4rem]">{story.title}</span>
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogOverlay className="bg-black/90 backdrop-blur" />
        <DialogContent className="max-w-md p-0 border-none bg-transparent shadow-none">
          <div className="relative h-[70vh]">
            <img
              src={story.image}
              alt={story.title}
              className="h-full w-full object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <div className="flex items-center space-x-2 space-x-reverse">
                <img
                  src={story.avatar}
                  alt={story.username}
                  className="h-8 w-8 rounded-full border border-white"
                />
                <div>
                  <p className="font-medium">{story.username}</p>
                  <p className="text-sm opacity-90">{story.title}</p>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
