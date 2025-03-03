
import { useState, useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/auth";

export function useAuthState() {
  const [user, setUser] = useState<(User & { profile?: Profile }) | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize session and user state from Supabase
  useEffect(() => {
    const getCurrentSession = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          setSession(session);
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        }
      } catch (error) {
        console.error("Error getting session:", error);
      } finally {
        setLoading(false);
      }
    };

    getCurrentSession();

    // Subscribe to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      setSession(newSession);
      setUser(newSession?.user || null);
      
      if (newSession?.user) {
        await fetchUserProfile(newSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile data
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        setUser(prevUser => {
          if (!prevUser) return null;
          return { ...prevUser, profile: data as Profile };
        });
      }
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  return {
    user,
    session,
    loading,
    setUser
  };
}
