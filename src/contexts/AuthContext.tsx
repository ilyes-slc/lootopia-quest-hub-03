import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { AuthService } from "@/lib/authService";
import type { StaticUser } from "@/lib/staticUsers";

interface AuthContextType {
  user: StaticUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<StaticUser | null>(AuthService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(AuthService.isAuthenticated());

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
    setIsAuthenticated(AuthService.isAuthenticated());
  }, []);

  const login = (email: string, password: string) => {
    const loggedInUser = AuthService.login(email, password);
    setUser(loggedInUser);
    setIsAuthenticated(!!loggedInUser);
    return !!loggedInUser;
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}; 