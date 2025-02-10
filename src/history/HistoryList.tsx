import { Link } from "react-router-dom";
import HistoryItem from "./HistoryItem";
import Button from "../components/Button";
import Loader from "../ui/Loader";
import { HistoryFormData } from "../Type/HistoryFormData";

interface HistoryListProps {
  isLoading: boolean;
  formData: HistoryFormData[];
  sortedData: HistoryFormData[];
  userId: string;
  refetch: () => void;
}

export default function HistoryList({
  isLoading,
  formData,
  sortedData,
  userId,
  refetch,
}: HistoryListProps) {
  if (isLoading || userId === "") return <Loader />;
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
      <h3 className="flex h-screen w-auto justify-center bg-slate-50 pt-20 text-lg font-semibold sm:text-xl">
        No brewing history matches this filter condition!
      </h3>
    );
  }
  return (
    <div className="flex h-screen w-auto flex-col gap-3 bg-slate-50 px-6 pt-8 lg:px-10 lg:pt-14 xl:px-16">
      {sortedData.map((item) => (
        <HistoryItem
          item={item}
          key={item.id}
          userId={userId}
          refetch={refetch}
        />
      ))}
    </div>
  );
}
