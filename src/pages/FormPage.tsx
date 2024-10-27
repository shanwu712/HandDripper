import DetailForm from "../form/DetailForm";
import RecipeForm from "../form/RecipeForm";
import HistoryPreview from "../history/historyPreview";

export default function FormPage() {
  return (
    <div className="flex h-screen flex-col items-center justify-start gap-4 px-6 py-4 sm:flex-row sm:items-start sm:space-x-5 sm:overflow-x-auto md:flex-row md:space-x-8">
      <RecipeForm></RecipeForm>

      <div className="flex h-5/6 min-h-[40rem] flex-col items-center gap-3 sm:w-1/2 sm:min-w-[30rem]">
        <DetailForm></DetailForm>
        <HistoryPreview></HistoryPreview>
      </div>
    </div>
  );
}
