// context/UserContext.tsx
"use client";

import { createContext, useState, ReactNode, useContext } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
  cloudinaryId?: string;
  provider?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;

  fetchUser: () => Promise<void>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},

  fetchUser: async () => {},
});

const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  const fetchUser = async () => {
    try {
      const res = await axios.get("/api/user/me", { withCredentials: true });
      setUser(res.data.user);
      console.log("user information is :", res?.data.user);
    } catch (err) {
      console.error("Error fetching user:", err);
      setUser(null);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};
function useData() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Context cannot be used in this component");
  }
  return context;
}
export { useData, UserProvider };
