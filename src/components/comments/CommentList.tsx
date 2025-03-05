
import { CommentItem } from "./CommentItem";

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
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-6">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          author={comment.author}
          text={comment.text}
          createdAt={comment.created_at}
        />
      ))}
    </div>
  );
}
