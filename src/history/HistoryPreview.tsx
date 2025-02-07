import { Link } from "react-router-dom";
import Button from "../components/Button";
import PreviewHistoryItem from "./PreviewHistoryItem";
import { useHistories } from "../services/useHistories";
import Loader from "../ui/Loader";

import { HistoryFormData } from "../Type/HistoryFormData";
import useUser from "../useUser";
interface HistoryPreviewProps {
  isCreating: boolean;
}

export default function HistoryPreview({ isCreating }: HistoryPreviewProps) {
  const { userId } = useUser();

  const { isLoading, histories } = useHistories(userId ?? "");

  return (
    <div className="flex h-full w-screen flex-col rounded-lg bg-beige p-3 shadow-lg sm:w-full">
      <div className="sticky top-0 z-20 mb-2 flex justify-between text-nowrap">
        <p className="text-xl font-semibold">Brewing History Preview</p>
        <Link to="/history">
          <Button type="secondary">View All history</Button>
        </Link>
      </div>
      <div className="flex h-[17rem] max-h-[24rem] flex-grow flex-col gap-1 overflow-y-scroll">
        {isLoading || histories?.length === 0 || isCreating ? (
          <Loader />
        ) : (
          histories
            ?.sort((a: HistoryFormData, b: HistoryFormData) =>
              a.date !== b.date
                ? new Date(b.date).getTime() - new Date(a.date).getTime()
                : new Date(`1970-01-01T${b.added_time}Z`).getTime() -
                  new Date(`1970-01-01T${a.added_time}Z`).getTime(),
            )
            .map((item) => (
              <PreviewHistoryItem
                item={item}
                key={item.id}
              ></PreviewHistoryItem>
            ))
        )}
      </div>
    </div>
  );
}
