
import React, { createContext, useContext } from "react";
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  
  return context;
};
