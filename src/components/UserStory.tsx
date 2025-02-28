
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
} from "@/components/ui/dialog";

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

export function UserStory({ story }: UserStoryProps) {
  const [isOpen, setIsOpen] = useState(false);

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
