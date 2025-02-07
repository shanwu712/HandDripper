import { createContext, useEffect, useState } from "react";
import { getUser } from "./services/apiUser";

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
      setIsLoading(false); // 設置為 false，表示資料已經準備好
    }

    fetchUser();
  }, []);

  if (isLoading) {
    // 可以返回 loading 畫面，或者不顯示內容
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ userId, setUserId }}>
      {children}
    </UserContext.Provider>
  );
}
