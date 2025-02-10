import { createContext, useEffect, useState } from "react";
import { getUser } from "./services/apiUser";
import Loader from "./ui/Loader";

type UserContextType = {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
};

export const UserContext = createContext<UserContextType | null>(null);
export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userId, setUserId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();

      if (user) setUserId(user.id);
      setIsLoading(false);
    }

    fetchUser();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
