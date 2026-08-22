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
    <div className="flex h-full w-screen flex-col gap-3 rounded-2xl border border-dark-beige bg-white p-4 shadow-lg sm:w-full">
      <div className="sticky top-0 z-20 flex justify-between text-nowrap">
        <p className="font-serif text-lg font-semibold">
          Brewing History Preview
        </p>
        <Link to="/history">
          <Button type="secondary">View All History</Button>
        </Link>
      </div>
      <div className="flex h-[17rem] max-h-[24rem] flex-grow flex-col gap-2 overflow-y-scroll">
        {isLoading || isCreating ? (
          <Loader />
        ) : histories?.length === 0 ? (
          <div className="flex h-full items-center justify-center">
            <p className="text-lg text-ink-muted">
              You haven't created any brewing history!
            </p>
          </div>
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
