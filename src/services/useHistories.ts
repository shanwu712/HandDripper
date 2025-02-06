import { useQuery } from "@tanstack/react-query";
import { getHistories } from "./apiHistory";
import { HistoryFormData } from "../Type/HistoryFormData";

export function useHistories() {
  const {
    isLoading,
    data: histories,
    error,
  } = useQuery<HistoryFormData[]>({
    queryKey: ["histories"],
    queryFn: () => getHistories(),
  });

  return { isLoading, histories, error };
}
