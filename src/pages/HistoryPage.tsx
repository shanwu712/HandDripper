import { useState } from "react";
import HistoryList from "../history/HistoryList";
import Sorting from "../history/Sorting";

enum HotOrIced {
  HOT = "Hot",
  ICED = "Iced",
}

const formData = [
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

export default function HistoryPage() {
  const [searchByPin, setSearchByPin] = useState(false);
  return (
    <div className="flex flex-col">
      <Sorting setSearchByPin={setSearchByPin} searchByPin={searchByPin} />

      <div className="mt-10">
        <HistoryList formData={formData} />
      </div>
    </div>
  );
}
