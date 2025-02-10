import { useQuery } from "@tanstack/react-query";
import { getHistories } from "./apiHistory";

interface Option {
  [key: string]: string;
}

export default function useOptions(userId: string, columnName: string) {
  const {
    data: options,
    error,
    isLoading,
  } = useQuery<Option[]>({
    queryKey: ["histories", columnName],
    queryFn: () => getHistories(userId, columnName, true),
    enabled: userId !== "",
  });

  const flattenedLimitedOptions = [
    ...new Set(options?.map((option) => option[columnName]) || []),
  ].slice(0, 4);

  return { options: flattenedLimitedOptions, error, isLoading };
}
