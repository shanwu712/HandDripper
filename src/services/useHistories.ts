import { useQuery } from "@tanstack/react-query";
import { getHistories } from "./apiHistory";
import { HistoryFormData } from "../Type/HistoryFormData";

export function useHistories(userId: string) {
  const {
    isLoading,
    data: histories,
    error,
    refetch,
  } = useQuery<HistoryFormData[]>({
    queryKey: ["histories"],
    queryFn: () => getHistories(userId),
    enabled: userId !== "",
  });

  return { isLoading, histories, error, refetch };
}
