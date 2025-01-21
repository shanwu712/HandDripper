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
    queryFn: () => getHistories(columnName),
  });

  const flattenedOptions = [
    ...new Set(options?.map((option) => option[columnName]) || []),
  ];

  return { options: flattenedOptions, error, isLoading };
}
