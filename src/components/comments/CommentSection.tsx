
import { useState, useEffect } from "react";
import { CommentForm } from "./CommentForm";
import { CommentList } from "./CommentList";
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
}

export function CommentSection({ productId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();

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
          profiles:user_id(full_name, avatar)
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
  
  useEffect(() => {
    fetchComments();
  }, [productId]);

  const handleSubmitComment = async (commentText: string) => {
    if (!isAuthenticated) {
      toast.error(t('loginToComment'));
      return;
    }

    if (!commentText.trim()) {
      toast.error(t('emptyCommentError'));
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert({
          text: commentText,
          product_id: productId,
          user_id: user?.id
        })
        .select('id, text, created_at, user_id')
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
            name: user?.profile?.full_name || 'User',
            avatar: user?.profile?.avatar || "https://ui-avatars.com/api/?name=User&background=random&color=fff",
          }
        };
        
        setComments([newCommentObj, ...comments]);
        toast.success(t('commentAdded'));
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error(t('commentError'));
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold">
        {t('comments')} ({comments.length})
      </h3>
      
      {/* Comment form */}
      {isAuthenticated ? (
        <CommentForm onSubmit={handleSubmitComment} />
      ) : (
        <div className="text-center p-4 border rounded-lg bg-muted/30">
          <p>{t('loginToComment')}</p>
        </div>
      )}

      {/* Comments list */}
      <CommentList 
        comments={comments} 
        isLoading={isLoading} 
        emptyMessage={t('noCommentsYet')}
      />
    </div>
  );
}
