import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getHistories, updateIsPined } from "./apiHistory";

export function useGetPin(id: string, userId: string) {
  const { data = [], isLoading } = useQuery<{ isPined: boolean }[]>({
    queryKey: ["history", "isPined", id],
    queryFn: () => getHistories(userId, "isPined", false, id),
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });
  return { data, isLoading };
}

export function useUpdatePin(id: string, userId: string) {
  const queryClient = useQueryClient();

  const { data } = useGetPin(id, userId);

  const { mutate, isPending: isPinning } = useMutation({
    mutationFn: () => updateIsPined(id, userId, data[0].isPined),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["history", "isPined", id] });
    },
  });
  return { mutate, isPinning };
}
