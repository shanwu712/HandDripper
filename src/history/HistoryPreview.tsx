import { Link } from "react-router-dom";
import Button from "../components/Button";
import PreviewHistoryItem from "./PreviewHistoryItem";
import { useHistories } from "../services/useHistories";
import Loader from "../ui/Loader";

enum HotOrIced {
  HOT = "Hot",
  ICED = "Iced",
}

const formData = [
  {
    id: 1,
    date: "2024-10-26",
    roaster: "Come True Coffee",
    bean: "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
    dripper: "Chemex Chemex Classic 6-Cup Glass Coffee Maker",
    grinder: "Grinder 1",
    scale: "8",
    hotOrIced: HotOrIced.ICED,
    beanWeight: "14",
    waterRatio: "12",
    iceRatio: "16",
    waterWeight: "168",
    iceWeight: "172",
    temp: 90,
    method: "Continuous Pouring",
    comment: "so good",
    sec: 0,
    rating: 3,
  },
  {
    id: 2,
    date: "2024-10-12",
    roaster: "Come True Coffee",
    bean: "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
    dripper: "Hario V60 Hario V60-02 Ceramic Coffee Dripper",
    grinder: "Grinder 3",
    scale: "7",
    hotOrIced: HotOrIced.HOT,
    beanWeight: "13",
    waterRatio: "14",
    waterWeight: "168",
    temp: 90,
    method: "Continuous Pouring",
    comment: "fair",
    sec: 90,
    rating: 4,
  },
  {
    id: 3,
    date: "2024-10-14",
    roaster: "Starbucks",
    bean: "Panama Geisha - Hacienda La Esmeralda, Washed Process, Light Roast",
    dripper: "Hario V60 Hario V60-02 Ceramic Coffee Dripper",
    grinder: "Grinder 1",
    scale: "8",
    hotOrIced: HotOrIced.ICED,
    beanWeight: "13",
    waterRatio: "18",
    iceRatio: "15",
    waterWeight: "168",
    iceWeight: "172",
    temp: 90,
    method: "Continuous Pouring",
    comment: "bad",
    sec: 70,
    rating: 1,
  },
  {
    id: 4,
    date: "2024-10-26",
    roaster: "Come True Coffee",
    bean: "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
    dripper: "Chemex Chemex Classic 6-Cup Glass Coffee Maker",
    grinder: "Grinder 3",
    scale: "7",
    hotOrIced: HotOrIced.HOT,
    beanWeight: "14",
    waterRatio: "12",
    waterWeight: "168",
    temp: 90,
    method: "Continuous Pouring",
    comment: "so good",
    sec: 80,
    rating: 5,
  },
];

export default function HistoryPreview() {
  const { isLoading, histories } = useHistories();

  return (
    <div className="flex h-full flex-col rounded-lg bg-beige p-3 shadow-lg sm:w-full">
      <div className="sticky top-0 z-20 mb-2 flex justify-between text-nowrap">
        <p className="text-xl font-semibold">Brewing History Preview</p>
        <Link to="/history">
          <Button type="secondary">View All history</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-1 overflow-y-auto">
        {histories?.length ? (
          histories.map((item) => (
            <PreviewHistoryItem item={item} key={item.id}></PreviewHistoryItem>
          ))
        ) : isLoading ? (
          <Loader />
        ) : (
          <p className="mt-5 flex self-center text-lg text-gray-500">
            You haven't created any brewing history!
          </p>
        )}
      </div>
    </div>
  );
}
