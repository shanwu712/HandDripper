import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteHistory as deleteHistoryApi } from "./apiHistory";
import toast from "react-hot-toast";

export function useDeleteHistory() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteHistory } = useMutation({
    mutationFn: deleteHistoryApi,
    onSuccess: () => {
      toast.success("Deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["histories"] });
    },
    onError: () => {
      toast.error("Failed to delete history!");
    },
  });

  return { isDeleting, deleteHistory };
}
