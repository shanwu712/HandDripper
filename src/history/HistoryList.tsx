import HistoryItem from "./HistoryItem";

enum HotOrIced {
  HOT = "Hot",
  ICED = "Iced",
}
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
interface HistoryListProps {
  formData: FormData[];
}

export default function HistoryList({ formData }: HistoryListProps) {
  return (
    <div className="flex h-screen w-auto flex-col gap-3 bg-slate-50 px-6 pt-8 lg:px-10 xl:px-16">
      {formData.map((item) => (
        <HistoryItem item={item} key={item.comment} />
      ))}
    </div>
  );
}
