import { Link } from "react-router-dom";
import Button from "../components/Button";
import PreviewHistoryItem from "./PreviewHistoryItem";
import { useHistories } from "../services/useHistories";
import Loader from "../ui/Loader";

export default function HistoryPreview() {
  const { isLoading, histories } = useHistories();

  return (
    <div className="flex h-full w-screen flex-col rounded-lg bg-beige p-3 shadow-lg sm:w-full">
      <div className="sticky top-0 z-20 mb-2 flex justify-between text-nowrap">
        <p className="text-xl font-semibold">Brewing History Preview</p>
        <Link to="/history">
          <Button type="secondary">View All history</Button>
        </Link>
      </div>
      <div className="flex h-[17rem] max-h-[24rem] flex-grow flex-col gap-1 overflow-y-scroll">
        {histories?.length ? (
          histories
            .sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
            )
            .map((item) => (
              <PreviewHistoryItem
                item={item}
                key={item.id}
              ></PreviewHistoryItem>
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
