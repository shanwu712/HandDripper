import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAHistory } from "./apiHistory";
import toast from "react-hot-toast";

export function useCreateHistory() {
  const queryClient = useQueryClient();

  const { mutate: createHistory, isPending: isCreating } = useMutation({
    mutationFn: createAHistory,
    onSuccess: () => {
      toast.success("New brewing history has been created!");
      queryClient.invalidateQueries({ queryKey: ["histories"] });
    },
    onError: (err) => console.log(err),
  });
  return { createHistory, isCreating };
}
