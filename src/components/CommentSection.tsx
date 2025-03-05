
import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Comment {
  id: string;
  text: string;
  created_at: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface CommentSectionProps {
  productId: string;
  initialComments?: Comment[];
}

export function CommentSection({ productId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { language, t } = useLanguage();
  const { isAuthenticated, user } = useAuth();

  // Fetch comments for this product
  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('comments')
          .select(`
            id,
            text,
            created_at,
            user_id,
            profiles(full_name, avatar)
          `)
          .eq('product_id', productId)
          .order('created_at', { ascending: false });
        
        if (error) {
          console.error("Error fetching comments:", error);
          return;
        }
        
        if (data) {
          const formattedComments = data.map((comment: any) => ({
            id: comment.id,
            text: comment.text,
            created_at: comment.created_at,
            author: {
              name: comment.profiles?.full_name || 'User',
              avatar: comment.profiles?.avatar || "https://ui-avatars.com/api/?name=User&background=random&color=fff",
            }
          }));
          setComments(formattedComments);
        }
      } catch (error) {
        console.error("Error in comment fetch:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchComments();
  }, [productId]);

  const handleSubmitComment = async () => {
    if (!isAuthenticated) {
      toast.error(t('loginToComment'));
      return;
    }

    if (!newComment.trim()) {
      toast.error(t('emptyCommentError'));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          text: newComment,
          product_id: productId,
          user_id: user?.id
        })
        .select(`
          id,
          text,
          created_at,
          user_id,
          profiles(full_name, avatar)
        `)
        .single();
      
      if (error) {
        throw error;
      }
      
      if (data) {
        const newCommentObj = {
          id: data.id,
          text: data.text,
          created_at: data.created_at,
          author: {
            name: data.profiles?.full_name || user?.profile?.full_name || 'User',
            avatar: data.profiles?.avatar || user?.profile?.avatar || "https://ui-avatars.com/api/?name=User&background=random&color=fff",
          }
        };
        
        setComments([newCommentObj, ...comments]);
        setNewComment("");
        toast.success(t('commentAdded'));
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(t('commentError'));
    }
  };

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
    <div className="space-y-4">
      <h3 className="text-xl font-bold">
        {t('comments')} ({comments.length})
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
            placeholder={t('writeComment')}
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
            <span>{t('sendComment')}</span>
          </Button>
        </div>
      </div>

      {/* Comments list */}
      {isLoading ? (
        <div className="space-y-4 mt-6">
          {[1, 2, 3].map((_, i) => (
            <div key={i} className="flex gap-3 p-3 border rounded-lg animate-pulse">
              <div className="h-10 w-10 rounded-full bg-muted"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-muted rounded w-1/4"></div>
                <div className="h-4 bg-muted rounded w-full"></div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
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
                  <span className="text-xs text-muted-foreground">{formatDate(comment.created_at)}</span>
                </div>
                <p className="text-sm">{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-muted-foreground">
          {t('noCommentsYet')}
        </div>
      )}
    </div>
  );
}
