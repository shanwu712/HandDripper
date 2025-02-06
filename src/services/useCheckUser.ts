import { useQuery } from "@tanstack/react-query";
import { getUser } from "./apiUser";

export default function useCheckUser() {
  const {
    data: user,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return { user, isLoading, refetch };
}
