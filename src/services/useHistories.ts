import { useQuery } from "@tanstack/react-query";
import { getHistories } from "./apiHistory";

export function useHistories() {
  const {
    isLoading,
    data: histories,
    error,
  } = useQuery({
    queryKey: ["histories"],
    queryFn: () => getHistories(),
  });

  return { isLoading, histories, error };
}
