
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useLanguage } from "@/contexts/LanguageContext";

interface CommentItemProps {
  author: {
    name: string;
    avatar: string;
  };
  text: string;
  createdAt: string;
}

export function CommentItem({ author, text, createdAt }: CommentItemProps) {
  const { language } = useLanguage();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="flex gap-3 p-3 border rounded-lg">
      <Avatar className="h-10 w-10">
        <AvatarImage src={author.avatar} alt={author.name} />
        <AvatarFallback>{author.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium">{author.name}</span>
          <span className="text-xs text-muted-foreground">{formatDate(createdAt)}</span>
        </div>
        <p className="text-sm">{text}</p>
      </div>
    </div>
  );
}
