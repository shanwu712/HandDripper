import { Link } from "react-router-dom";
import HistoryItem from "./HistoryItem";
import Button from "../components/Button";

enum HotOrIced {
  HOT = "Hot",
  ICED = "Iced",
}
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
interface HistoryListProps {
  formData: FormData[];
  sortedData: FormData[];
  pinedStates: Record<string, boolean>;
  togglePined: (id: string) => void;
}

export default function HistoryList({
  formData,
  sortedData,
  pinedStates,
  togglePined,
}: HistoryListProps) {
  if (!formData.length) {
    return (
      <div className="mx-auto flex h-screen w-fit flex-col items-center gap-3 pt-24">
        <h3 className="text-xl font-semibold">
          You haven't created any brewing history!
        </h3>

        <Link to="/form">
          <Button type="secondary">Go create your first brewing history</Button>
        </Link>
      </div>
    );
  }

  if (!sortedData.length) {
    return (
      <h3 className="flex h-screen w-auto justify-center pt-20 text-xl font-semibold">
        No brewing history matches this filter condition!
      </h3>
    );
  }
  return (
    <div className="flex h-screen w-auto flex-col gap-3 bg-slate-50 px-6 pt-8 lg:px-10 lg:pt-14 xl:px-16">
      {formData.map((item) => (
        <HistoryItem
          item={item}
          key={item.comment}
          pinedStates={pinedStates}
          togglePined={togglePined}
        />
      ))}
    </div>
  );
}
