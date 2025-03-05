
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";

interface CommentFormProps {
  onSubmit: (text: string) => void;
}

export function CommentForm({ onSubmit }: CommentFormProps) {
  const [commentText, setCommentText] = useState("");
  const { t } = useLanguage();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(commentText);
    setCommentText("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder={t('writeComment')}
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        className="min-h-[100px]"
      />
      <Button type="submit" className="w-full sm:w-auto">
        {t('addComment')}
      </Button>
    </form>
  );
}
