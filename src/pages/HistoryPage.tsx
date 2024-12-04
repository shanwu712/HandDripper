/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import HistoryList from "../history/HistoryList";
import Sorting from "../history/Sorting";

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

const mockFormData = [
  {
    id: "6789",
    date: "2024-10-26",
    roaster: "Come True Coffee",
    bean: "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
    dripper: "Chemex Chemex Classic 6-Cup Glass Coffee Maker",
    grinder: "grinder 1",
    scale: "7",
    hotOrIced: HotOrIced.ICED,
    beanWeight: "14",
    waterRatio: "12",
    iceRatio: "16",
    waterWeight: "168",
    iceWeight: "172",
    temp: 85,
    sec: 80,
    method: "Continuous Pouring",
    rating: 4,
    comment:
      "Victor Hugo's tale of injustice, heroism and love follows the  to put his are constantly put under threat: by his own conscience, when, owing to a case of mistaken identity, another man is arrested in hinvestigations of the dogged Inspector Javert. It is not simply for himself that Valjean must stay free, however, for he has sworn to protect the baby daughter of Fantine, driven to prostitution by poverty.",
  },
  {
    id: "6729",
    date: "2024-10-12",
    roaster: "Come True Coffee",
    bean: "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
    dripper: "Hario V60 Hario V60-02 Ceramic Coffee Dripper",
    grinder: "grinder 2",
    scale: "8",
    hotOrIced: HotOrIced.HOT,
    beanWeight: "13",
    waterRatio: "14",
    waterWeight: "168",
    temp: 90,
    sec: 85,
    method: "Continuous Pouring",
    rating: 3.5,
    comment: "fair",
  },
  {
    id: "7233",
    date: "2024-10-14",
    roaster: "Starbucks",
    bean: "Panama Geisha - Hacienda La Esmeralda, Washed Process, Light Roast",
    dripper: "Hario V60 Hario V60-02 Ceramic Coffee Dripper",
    grinder: "grinder 3",
    scale: "6",
    hotOrIced: HotOrIced.ICED,
    beanWeight: "13",
    waterRatio: "18",
    iceRatio: "15",
    waterWeight: "168",
    iceWeight: "172",
    temp: 90,
    sec: 90,
    method: "Continuous Pouring",
    rating: 1,
    comment: "bad",
  },
  {
    id: "5743",
    date: "2024-10-26",
    roaster: "Come True Coffee",
    bean: "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
    dripper: "Chemex Chemex Classic 6-Cup Glass Coffee Maker",
    grinder: "grinder 2",
    scale: "8",
    hotOrIced: HotOrIced.HOT,
    beanWeight: "14",
    waterRatio: "12",
    waterWeight: "168",
    temp: 90,
    sec: 100,
    method: "Continuous Pouring",
    rating: 4,
    comment: "so good",
  },
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

  function togglePined(id: string) {
    setPinedStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }
  useEffect(() => {
    setFormData(mockFormData);
  }, []);

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
          formData={formData}
          sortedData={sortedData}
          pinedStates={pinedStates}
          togglePined={togglePined}
        />
      </div>
    </div>
  );
}
