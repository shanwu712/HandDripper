import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateHistory } from "./apiHistory";
import { HistoryFormData } from "../Type/HistoryFormData";

interface EditHistoryArgs {
  id: string;
  newHistoryData: HistoryFormData;
}

export function useUpdateHistory() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: editHistory } = useMutation({
    mutationFn: ({ id, newHistoryData }: EditHistoryArgs) =>
      updateHistory(id, newHistoryData),
    onSuccess: () => {
      toast.success("Edited Successfully");
      queryClient.invalidateQueries({ queryKey: ["histories"] });
    },
    onError: () => toast.error("Brewing history could not be edited!"),
  });

  return { editHistory, isUpdating };
}
