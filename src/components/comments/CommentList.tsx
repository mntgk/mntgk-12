
import { CommentItem } from "@/components/comments/CommentItem";
import { Skeleton } from "@/components/ui/skeleton";

interface Comment {
  id: string;
  text: string;
  created_at: string;
  author: {
    name: string;
    avatar: string;
  };
}

interface CommentListProps {
  comments: Comment[];
  isLoading: boolean;
  emptyMessage: string;
}

export function CommentList({ comments, isLoading, emptyMessage }: CommentListProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex gap-4 animate-pulse">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center p-6 border rounded-lg bg-muted/20">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
