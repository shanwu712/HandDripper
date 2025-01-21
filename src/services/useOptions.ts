import { useQuery } from "@tanstack/react-query";
import { getHistories } from "./apiHistory";

interface Option {
  [key: string]: string;
}

export default function useOptions(columnName: string) {
  const {
    data: options,
    error,
    isLoading,
  } = useQuery<Option[]>({
    queryKey: ["histories", columnName],
    queryFn: () => getHistories(columnName, true),
  });

  const flattenedLimitedOptions = [
    ...new Set(options?.map((option) => option[columnName]) || []),
  ].slice(0, 4);

  return { options: flattenedLimitedOptions, error, isLoading };
}
