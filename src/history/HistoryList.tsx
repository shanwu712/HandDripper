import HistoryItem from "./HistoryItem";

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
  pinedStates: Record<string, boolean>;
  togglePined: (id: string) => void;
}

export default function HistoryList({
  formData,
  pinedStates,
  togglePined,
}: HistoryListProps) {
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
