
import { useNavigate } from "react-router-dom";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Profile } from "@/types/auth";
import { useLanguage } from "@/contexts/LanguageContext";

type SetUserFunction = React.Dispatch<React.SetStateAction<(User & { profile?: Profile }) | null>>;

export function useAuthActions(setUser: SetUserFunction) {
  const navigate = useNavigate();
  const { language } = useLanguage();

  // Login with email and password
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log("Attempting login with:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Login error:", error.message);
        toast.error(language === 'ar' ? 'فشل تسجيل الدخول: ' + error.message : 'Login failed: ' + error.message);
        return false;
      }

      console.log("Login successful, user:", data.user);
      if (data.user) {
        toast.success(language === 'ar' ? 'تم تسجيل الدخول بنجاح' : 'Logged in successfully');
        
        // Fetch user profile immediately after login
        if (data.user.id) {
          try {
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', data.user.id)
              .single();
            
            if (!profileError && profileData) {
              setUser(prevUser => {
                if (!prevUser) return data.user;
                return { ...prevUser, profile: profileData as Profile };
              });
            }
          } catch (profileFetchError) {
            console.error("Error fetching profile after login:", profileFetchError);
          }
        }
        
        return true;
      }

      return false;
    } catch (error) {
      console.error("Unexpected login error:", error);
      toast.error(language === 'ar' ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
      return false;
    }
  };

  // Register new user
  const register = async (name: string, email: string, password: string, phone?: string): Promise<boolean> => {
    try {
      console.log("Attempting registration with:", email, name);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            phone_number: phone,
          },
        },
      });

      if (error) {
        console.error("Registration error:", error.message);
        toast.error(language === 'ar' ? 'فشل التسجيل: ' + error.message : 'Registration failed: ' + error.message);
        return false;
      }

      console.log("Registration successful, user:", data.user);
      if (data.user) {
        toast.success(language === 'ar' ? 'تم إنشاء الحساب بنجاح' : 'Account created successfully');
        return true;
      }

      return false;
    } catch (error) {
      console.error("Unexpected registration error:", error);
      toast.error(language === 'ar' ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
      return false;
    }
  };

  // Logout current user
  const logout = async (): Promise<void> => {
    try {
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      // Clear user state explicitly
      setUser(null);
      
      toast.success(language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Logged out successfully');
      navigate('/');
    } catch (error) {
      console.error("Logout error:", error);
      toast.error(language === 'ar' ? 'فشل تسجيل الخروج' : 'Logout failed');
    }
  };

  // Update user profile
  const updateProfile = async (profileData: Partial<Profile>): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error(language === 'ar' ? 'يجب تسجيل الدخول أولاً' : 'You must be logged in first');
        return false;
      }

      console.log("Updating profile for user:", user.id, "with data:", profileData);
      const { error } = await supabase
        .from('profiles')
        .update(profileData)
        .eq('id', user.id);

      if (error) {
        console.error("Profile update error:", error.message);
        toast.error(language === 'ar' ? 'فشل تحديث الملف الشخصي' : 'Failed to update profile');
        return false;
      }

      // Fetch the updated profile to ensure state is current
      const { data: updatedProfile, error: fetchError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (fetchError) {
        console.error("Error fetching updated profile:", fetchError);
      } else if (updatedProfile) {
        // Update the local user state with the freshly fetched profile data
        setUser(prevUser => {
          if (!prevUser) return null;
          return {
            ...prevUser,
            profile: updatedProfile as Profile
          };
        });
      }

      toast.success(language === 'ar' ? 'تم تحديث الملف الشخصي بنجاح' : 'Profile updated successfully');
      return true;
    } catch (error) {
      console.error("Unexpected profile update error:", error);
      toast.error(language === 'ar' ? 'حدث خطأ غير متوقع' : 'An unexpected error occurred');
      return false;
    }
  };

  return {
    login,
    register,
    logout,
    updateProfile
  };
}
