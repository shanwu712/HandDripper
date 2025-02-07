import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function useUser(): {
  userId: string | null;
  setUserId: React.Dispatch<React.SetStateAction<string | null>>;
} {
  const context = useContext(UserContext);

  if (!context) {
    return { userId: null, setUserId: () => {} };
  }

  const { userId, setUserId } = context;

  return { userId, setUserId };
}
