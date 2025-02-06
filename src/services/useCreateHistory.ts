import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAHistory } from "./apiHistory";
import toast from "react-hot-toast";

export function useCreateHistory() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createAHistory,
    onSuccess: () => {
      toast.success("New brewing history has been created!");
      queryClient.invalidateQueries({ queryKey: ["histories"] });
    },
    onError: (err) => console.log(err),
  });

  return {
    createHistory: mutation.mutate,
    isCreating: mutation.status === "pending",
  };
}
