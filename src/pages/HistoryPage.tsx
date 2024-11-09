import { useState } from "react";
import HistoryList from "../history/HistoryList";
import Sorting from "../history/Sorting";

export default function HistoryPage() {
  const [searchByPin, setSearchByPin] = useState(false);
  return (
    <div className="flex flex-col">
      <Sorting setSearchByPin={setSearchByPin} searchByPin={searchByPin} />

      <div className="mt-10">
        <HistoryList />
      </div>
    </div>
  );
}
