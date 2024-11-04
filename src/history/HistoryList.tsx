import HistoryItem from "./HistoryItem";

const formData = [
  {
    date: "2024-10-26",
    roaster: "Come True Coffee",
    bean: "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
    dripper: "Chemex Chemex Classic 6-Cup Glass Coffee Maker",
    hotOrIced: "Iced",
    beanWeight: "14",
    waterRatio: "12",
    iceRatio: "16",
    waterWeight: "168",
    iceWeight: "172",
    temp: "90",
    method: "Continuous Pouring",
    star: "4",
    comment:
      "Victor Hugo's tale of injustice, heroism and love follows the  to put his are constantly put under threat: by his own conscience, when, owing to a case of mistaken identity, another man is arrested in hinvestigations of the dogged Inspector Javert. It is not simply for himself that Valjean must stay free, however, for he has sworn to protect the baby daughter of Fantine, driven to prostitution by poverty.",
  },
  {
    date: "2024-10-12",
    roaster: "Come True Coffee",
    bean: "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
    dripper: "Hario V60 Hario V60-02 Ceramic Coffee Dripper",
    hotOrIced: "Hot",
    beanWeight: "13",
    waterRatio: "14",
    waterWeight: "168",
    temp: "90",
    method: "Continuous Pouring",
    star: "3.5",
    comment: "fair",
  },
  {
    date: "2024-10-14",
    roaster: "Starbucks",
    bean: "Panama Geisha - Hacienda La Esmeralda, Washed Process, Light Roast",
    dripper: "Hario V60 Hario V60-02 Ceramic Coffee Dripper",
    hotOrIced: "Iced",
    beanWeight: "13",
    waterRatio: "18",
    iceRatio: "15",
    waterWeight: "168",
    iceWeight: "172",
    temp: "90",
    method: "Continuous Pouring",
    star: "1",
    comment: "bad",
  },
  {
    date: "2024-10-26",
    roaster: "Come True Coffee",
    bean: "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
    dripper: "Chemex Chemex Classic 6-Cup Glass Coffee Maker",
    hotOrIced: "Hot",
    beanWeight: "14",
    waterRatio: "12",
    waterWeight: "168",
    temp: "90",
    method: "Continuous Pouring",
    star: "4",
    comment: "so good",
  },
];

export default function HistoryList() {
  return (
    <div className="flex h-screen w-auto flex-col gap-3 bg-slate-50 px-6 lg:px-10">
      {formData.map((item) => (
        <HistoryItem item={item} key={item.comment} />
      ))}
    </div>
  );
}
