
import React, { createContext, useContext, useEffect } from "react";
import { AuthContextType } from "@/types/auth";
import { useAuthState } from "@/hooks/useAuthState";
import { useAuthActions } from "@/hooks/useAuthActions";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, session, loading, setUser } = useAuthState();
  const { login, register, logout, updateProfile } = useAuthActions(setUser);

  // Auth context value
  const value: AuthContextType = {
    isAuthenticated: !!user,
    user,
    login,
    register,
    logout,
    loading,
    session,
    updateProfile,
  };

  // Debug authentication state
  useEffect(() => {
    console.log("Auth state updated:", { 
      isAuthenticated: !!user, 
      user: user ? { 
        id: user.id, 
        email: user.email,
        profile: user.profile ? {
          full_name: user.profile.full_name,
          username: user.profile.username,
          avatar: user.profile.avatar?.substring(0, 30) + '...'
        } : 'No profile'
      } : null,
      sessionActive: !!session
    });
  }, [user, session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
