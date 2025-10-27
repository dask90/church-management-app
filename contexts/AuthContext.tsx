"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  id: string;
  email: string;
  name: string;
  role: "admin" | "pastor";
  password: string; // This is not safe, but for mock purposes.
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (
    email: string,
    password: string,
    name: string,
    role: User["role"]
  ) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize with some demo users
  useEffect(() => {
    const checkAuth = () => {
      // Check if we have a current user session
      const storedUser = localStorage.getItem("church-current-user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      // Initialize with demo admin user if no users exist
      const existingUsers = localStorage.getItem("church-users");
      if (!existingUsers) {
        const demoUsers: User[] = [
          {
            id: "1",
            email: "admin@church.com",
            name: "Church Admin",
            role: "admin",
            password: "password",
          },
        ];
        localStorage.setItem("church-users", JSON.stringify(demoUsers));
      }

      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const usersJson = localStorage.getItem("church-users");
      if (!usersJson) return false;

      const users: User[] = JSON.parse(usersJson);
      const foundUser = users.find(
        (u) => u.email === email && u.password === password
      );

      if (foundUser) {
        // Don't store password in current user session
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword as User);
        localStorage.setItem(
          "church-current-user",
          JSON.stringify(userWithoutPassword)
        );
        return true;
      }
      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const signup = async (
    email: string,
    password: string,
    name: string,
    role: User["role"]
  ): Promise<boolean> => {
    try {
      const usersJson = localStorage.getItem("church-users");
      const users: User[] = usersJson ? JSON.parse(usersJson) : [];

      // Check if user already exists
      if (users.find((u) => u.email === email)) {
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role,
        password, // In real app, this would be hashed
      };

      // Add to users list
      users.push(newUser);
      localStorage.setItem("church-users", JSON.stringify(users));

      // Auto-login the new user (without storing password in session)
      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword as User);
      localStorage.setItem(
        "church-current-user",
        JSON.stringify(userWithoutPassword)
      );

      return true;
    } catch (error) {
      console.error("Signup error:", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("church-current-user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
