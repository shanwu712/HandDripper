import { Link } from "react-router-dom";
import Button from "../components/Button";
import PreviewHistoryItem from "./PreviewHistoryItem";

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
    comment: "so good",
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

export default function HistoryPreview() {
  return (
    <div className="bg-beige flex h-full w-screen flex-col overflow-y-auto rounded-lg p-3 shadow-lg sm:w-full">
      <div className="sticky top-0 z-20 mb-2 flex justify-between text-nowrap">
        <p className="text-xl font-semibold">Brewing History Preview</p>
        <Link to="/history">
          <Button type="secondary">View All history</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto">
        {formData.map((item) => (
          <PreviewHistoryItem item={item}></PreviewHistoryItem>
        ))}
      </div>
    </div>
  );
}
