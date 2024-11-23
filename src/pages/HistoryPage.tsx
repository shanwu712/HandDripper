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
  const [pined, setPined] = useState(false);

  const [formData, setFormData] = useState<FormData[]>([]);
  const [sortedData, setSortedData] = useState<FormData[]>([]);

  const [sortingMethod, setSortingMethod] = useState<
    DateOptions | RatingOptions | string | null
  >(null);

  useEffect(() => {
    setFormData(mockFormData);
  }, []);

  useEffect(() => {
    if (
      sortingMethod === RatingOptions.HIGHEST ||
      sortingMethod === RatingOptions.LOWEST
    ) {
      const dataSortedByRating = [...formData].sort((a: any, b: any) => {
        return sortingMethod === RatingOptions.HIGHEST
          ? b.rating - a.rating
          : a.rating - b.rating;
      });
      setSortedData(dataSortedByRating);
      return;
    }

    if (beanOptions.includes(sortingMethod as string)) {
      const dataSortedByBean = [...formData].filter(
        (item) => item.bean === sortingMethod,
      );
      setSortedData(dataSortedByBean);
      return;
    }

    if (
      sortingMethod === DateOptions.NEWEST ||
      sortingMethod === DateOptions.OLDEST
    ) {
      const dataSortedByDate = [...formData].sort((a: any, b: any) => {
        return sortingMethod === DateOptions.NEWEST
          ? new Date(b.date).getTime() - new Date(a.date).getTime()
          : new Date(a.date).getTime() - new Date(b.date).getTime();
      });

      setSortedData(dataSortedByDate);
      return;
    }

    setSortedData(
      [...formData].sort((a: any, b: any) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }),
    );
  }, [sortingMethod, formData]);

  return (
    <div className="flex flex-col">
      <Sorting
        pined={pined}
        setPined={setPined}
        sortingMethod={sortingMethod}
        setSortingMethod={setSortingMethod}
      />

      <div className="mt-10">
        <HistoryList formData={sortedData} />
      </div>
    </div>
  );
}
