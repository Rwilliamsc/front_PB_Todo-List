import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  token: string | null;
  userId: number | null;
  login: (token: string, user: string, userId: number) => void;
  logout: () => void;
  restoreContext: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = (token: string, user: string, userId: number) => {
    setToken(token);
    setUser(user);
    setUserId(userId);
    localStorage.setItem("token", token);
    localStorage.setItem("user", user);
    localStorage.setItem("userId", userId.toString());
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
  };

  const restoreContext = () => {
    setToken(localStorage.getItem("token"));
    setUser(localStorage.getItem("user"));
    setUserId(Number(localStorage.getItem("userId")));
  };

  return <AuthContext.Provider value={{ user, userId, token, login, logout, restoreContext }}>{children}</AuthContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
