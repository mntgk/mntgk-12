
import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

// Example comment data structure
interface Comment {
  id: string;
  text: string;
  createdAt: Date;
  author: {
    name: string;
    avatar: string;
  };
}

interface CommentSectionProps {
  productId: string;
  initialComments?: Comment[];
}

export function CommentSection({ productId, initialComments = [] }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [newComment, setNewComment] = useState("");
  const { language } = useLanguage();
  const { isAuthenticated, user } = useAuth();

  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      toast.error(language === 'ar' ? "يرجى تسجيل الدخول للتعليق" : "Please login to comment");
      return;
    }

    if (!newComment.trim()) {
      toast.error(language === 'ar' ? "لا يمكن إرسال تعليق فارغ" : "Cannot send an empty comment");
      return;
    }

    // In a real app, this would be a call to your API
    const comment: Comment = {
      id: Math.random().toString(36).substring(2, 9),
      text: newComment,
      createdAt: new Date(),
      author: {
        name: user?.profile?.full_name || 'المستخدم',
        avatar: user?.profile?.avatar || "https://ui-avatars.com/api/?name=User&background=random&color=fff",
      },
    };

    setComments([comment, ...comments]);
    setNewComment("");
    toast.success(language === 'ar' ? "تم إضافة التعليق بنجاح" : "Comment added successfully");
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">
        {language === 'ar' ? 'التعليقات' : 'Comments'} ({comments.length})
      </h3>
      
      {/* Comment form */}
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
            placeholder={language === 'ar' ? "اكتب تعليقك هنا..." : "Write your comment here..."}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-2"
            rows={3}
          />
          <Button 
            size="sm" 
            onClick={handleSubmitComment}
            className="flex items-center ml-auto"
          >
            <Send className="h-4 w-4 ml-1" />
            <span>{language === 'ar' ? 'إرسال' : 'Send'}</span>
          </Button>
        </div>
      </div>

      {/* Comments list */}
      {comments.length > 0 ? (
        <div className="space-y-4 mt-6">
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-3 p-3 border rounded-lg">
              <Avatar className="h-10 w-10">
                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex justify-between items-center mb-1">
                  <span className="font-medium">{comment.author.name}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(comment.createdAt)}</span>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          {language === 'ar' ? 'لا توجد تعليقات بعد. كن أول من يعلق!' : 'No comments yet. Be the first to comment!'}
        </div>
      )}
    </div>
  );
}
