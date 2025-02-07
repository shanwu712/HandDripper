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

  const { histories, isLoading } = useHistories(userId ?? "");

  useEffect(() => {
    setFormData((histories as HistoryFormData[]) || []);
  }, [histories]);

  useEffect(() => {
    let dataToSort = [...formData];

    if (sortByPin) {
      dataToSort = dataToSort.filter((item) => item.isPined);
    }

    if (
      sortingMethod === RatingOptions.HIGHEST ||
      sortingMethod === RatingOptions.LOWEST
    ) {
      const dataSortedByRating = dataToSort.sort(
        (a: HistoryFormData, b: HistoryFormData) => {
          return sortingMethod === RatingOptions.HIGHEST
            ? Number(b.rating) - Number(a.rating)
            : Number(a.rating) - Number(b.rating);
        },
      );
      setSortedData(dataSortedByRating);
      return;
    }

    if (beanOptions.includes(sortingMethod as string)) {
      const dataSortedByBean = dataToSort.filter(
        (item) => item.bean === sortingMethod,
      );
      const dataSortedByBeanAndDate = dataSortedByBean.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setSortedData(dataSortedByBeanAndDate);
      return;
    }

    if (
      sortingMethod === DateOptions.NEWEST ||
      sortingMethod === DateOptions.OLDEST
    ) {
      const dataSortedByDate =
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

      setSortedData(dataSortedByDate);
      return;
    }
  }, [formData, sortByPin, sortingMethod]);

  return (
    <div className="flex flex-col">
      <Sorting
        sortByPin={sortByPin}
        setSortByPin={setSortByPin}
        setSortingMethod={setSortingMethod}
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
