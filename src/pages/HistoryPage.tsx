/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import HistoryList from "../history/HistoryList";
import Sorting from "../history/Sorting";
import { useHistories } from "../services/useHistories";
import { HistoryFormData } from "../Type/HistoryFormData";
import useUser from "../useUser";

enum DateOptions {
  NEWEST = "Newest",
  OLDEST = "Oldest",
}

enum RatingOptions {
  HIGHEST = "Highest",
  LOWEST = "Lowest",
}

const beanOptions = [
  "Panama Geisha - Hacienda La Esmeralda, Washed Process, Light Roast",
  "Ethiopia Yirgacheffe - Konga Cooperative, Natural Process, Medium Roast",
  "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
];

export default function HistoryPage() {
  const [sortByPin, setSortByPin] = useState(false);

  const [formData, setFormData] = useState<HistoryFormData[]>([]);
  const [sortedData, setSortedData] = useState<HistoryFormData[]>([]);

  const [sortingMethod, setSortingMethod] = useState<
    DateOptions | RatingOptions | string | null
  >(DateOptions.NEWEST);

  const { userId } = useUser();

  const { histories, isLoading, refetch } = useHistories(userId ?? "");

  useEffect(() => {
    setFormData((histories as HistoryFormData[]) || []);
  }, [histories]);

  useEffect(() => {
    let dataToSort = [...formData];
    // 先過濾已 pin 的項目（如果 sortByPin 為 true）
    if (sortByPin) {
      dataToSort = dataToSort.filter((item) => item.isPined);
    }

    // 依照 sortingMethod 進行其它排序
    if (
      sortingMethod === RatingOptions.HIGHEST ||
      sortingMethod === RatingOptions.LOWEST
    ) {
      dataToSort = dataToSort.sort((a: HistoryFormData, b: HistoryFormData) => {
        return sortingMethod === RatingOptions.HIGHEST
          ? Number(b.rating) - Number(a.rating)
          : Number(a.rating) - Number(b.rating);
      });
    } else if (beanOptions.includes(sortingMethod as string)) {
      dataToSort = dataToSort.filter((item) => item.bean === sortingMethod);
      dataToSort = dataToSort.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } else if (
      sortingMethod === DateOptions.NEWEST ||
      sortingMethod === DateOptions.OLDEST
    ) {
      dataToSort =
        sortingMethod === DateOptions.NEWEST
          ? dataToSort.sort((a, b) =>
              a.date !== b.date
                ? new Date(b.date).getTime() - new Date(a.date).getTime()
                : new Date(`1970-01-01T${b.added_time}Z`).getTime() -
                  new Date(`1970-01-01T${a.added_time}Z`).getTime(),
            )
          : dataToSort.sort((a, b) =>
              a.date !== b.date
                ? new Date(a.date).getTime() - new Date(b.date).getTime()
                : new Date(`1970-01-01T${a.added_time}Z`).getTime() -
                  new Date(`1970-01-01T${b.added_time}Z`).getTime(),
            );
    }

    // 更新排序後的資料
    setSortedData(dataToSort);
  }, [formData, sortByPin, sortingMethod]);

  useEffect(() => {
    if (histories) {
      refetch();
    }
  }, [histories, sortByPin, userId, refetch]);

  return (
    <div className="flex flex-col">
      <Sorting
        sortByPin={sortByPin}
        setSortByPin={setSortByPin}
        setSortingMethod={setSortingMethod}
        userId={userId}
      />

      <div className="mt-16 sm:mt-10">
        <HistoryList
          userId={userId ?? ""}
          isLoading={isLoading}
          formData={formData}
          sortedData={sortedData}
        />
      </div>
    </div>
  );
}
