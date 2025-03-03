
import { Session, User } from "@supabase/supabase-js";

export interface Profile {
  id: string;
  full_name: string;
  phone_number?: string;
  avatar?: string;
  location?: string;
  username?: string;
  join_date?: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: (User & { profile?: Profile }) | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, phone?: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
  session: Session | null;
  updateProfile: (profileData: Partial<Profile>) => Promise<boolean>;
}
