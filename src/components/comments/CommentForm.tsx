
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

interface CommentFormProps {
  onSubmit: (text: string) => Promise<void>;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  const { user } = useAuth();
  
  const handleSubmit = async () => {
    if (!newComment.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(newComment);
      setNewComment("");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-start gap-2">
      <Avatar className="h-10 w-10">
        <AvatarImage 
          src={user?.profile?.avatar || "https://ui-avatars.com/api/?name=User&background=random&color=fff"} 
          alt={user?.profile?.full_name || "User"}
        />
        <AvatarFallback>
          {user?.profile?.full_name?.charAt(0) || "U"}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <Textarea
          placeholder={t('writeComment')}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="mb-2"
          rows={3}
        />
        <Button 
          size="sm" 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex items-center ml-auto"
        >
          <Send className="h-4 w-4 ml-1" />
          <span>{t('sendComment')}</span>
        </Button>
      </div>
    </div>
  );
}
