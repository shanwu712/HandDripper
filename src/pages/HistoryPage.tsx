/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import HistoryList from "../history/HistoryList";
import Sorting from "../history/Sorting";
import { useHistories } from "../services/useHistories";

enum HotOrIced {
  HOT = "Hot",
  ICED = "Iced",
}

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

interface FormData {
  id: string;
  date: string;
  bean: string;
  roaster: string;
  dripper: string;
  grinder: string;
  scale: string;
  hotOrIced: HotOrIced;
  temp: number;
  beanWeight: string;
  waterRatio: string;
  waterWeight: number | string;
  iceRatio?: string;
  iceWeight?: number | string;
  sec: number;
  rating: number;
  method: string;
  comment: string;
}

export default function HistoryPage() {
  const [pinedStates, setPinedStates] = useState<Record<string, boolean>>({});
  const [sortByPin, setSortByPin] = useState(false);

  const [formData, setFormData] = useState<FormData[]>([]);
  const [sortedData, setSortedData] = useState<FormData[]>([]);

  const [sortingMethod, setSortingMethod] = useState<
    DateOptions | RatingOptions | string | null
  >(DateOptions.NEWEST);

  const { histories, isLoading } = useHistories();

  function togglePined(id: string) {
    setPinedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }
  useEffect(() => {
    setFormData((histories as FormData[]) || []);
  }, [histories]);

  useEffect(() => {
    const initialPinedStates = [...formData].reduce(
      (acc, item) => {
        acc[item.id] = false;
        return acc;
      },
      {} as Record<string, boolean>,
    );

    setPinedStates(initialPinedStates);
  }, [formData]);

  useEffect(() => {
    const pinedId = Object.entries(pinedStates).reduce((acc, [key, value]) => {
      if (value) acc.push(key);
      return acc;
    }, [] as string[]);

    let dataToSort = [...formData];

    if (sortByPin) {
      const dataSortedByPined = dataToSort.filter((item) =>
        pinedId.includes(item.id),
      );

      dataToSort = dataSortedByPined;
    }

    if (
      sortingMethod === RatingOptions.HIGHEST ||
      sortingMethod === RatingOptions.LOWEST
    ) {
      const dataSortedByRating = dataToSort.sort((a: any, b: any) => {
        return sortingMethod === RatingOptions.HIGHEST
          ? b.rating - a.rating
          : a.rating - b.rating;
      });
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
      const dataSortedByDate = dataToSort.sort((a: any, b: any) => {
        return sortingMethod === DateOptions.NEWEST
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      setSortedData(dataSortedByDate);
      return;
    }
  }, [formData, sortByPin, sortingMethod, pinedStates]);

  return (
    <div className="flex flex-col">
      <Sorting
        sortByPin={sortByPin}
        setSortByPin={setSortByPin}
        setSortingMethod={setSortingMethod}
      />

      <div className="mt-16 sm:mt-10">
        <HistoryList
          isLoading={isLoading}
          formData={formData}
          sortedData={sortedData}
          pinedStates={pinedStates}
          togglePined={togglePined}
        />
      </div>
    </div>
  );
}
