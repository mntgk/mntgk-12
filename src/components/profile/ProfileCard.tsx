
import { MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { Profile } from "@/types/auth";
import { User } from "@supabase/supabase-js";

interface ProfileCardProps {
  user: (User & { profile?: Profile }) | null;
  onEditClick: () => void;
}

const ProfileCard = ({ user, onEditClick }: ProfileCardProps) => {
  return (
    <div className="bg-card rounded-xl p-4 border mb-6">
      <div className="flex space-x-4 space-x-reverse">
        <div className="h-20 w-20 rounded-full overflow-hidden">
          <img 
            src={user?.profile?.avatar} 
            alt={user?.profile?.full_name || "User"} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{user?.profile?.full_name}</h2>
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={onEditClick}>
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-muted-foreground">{user?.profile?.username}</p>
          <div className="mt-2 flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 ml-1" />
            <span>{user?.profile?.location}</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">{user?.profile?.join_date}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
