import HistoryList from "../history/HistoryList";
import Sorting from "../history/Sorting";

export default function HistoryPage() {
  return (
    <div className="flex flex-col">
      <Sorting />

      <div>
        <HistoryList />
      </div>
    </div>
  );
}
