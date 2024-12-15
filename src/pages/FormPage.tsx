import { useReducer, useRef } from "react";
import DetailForm from "../form/DetailForm";
import RecipeForm from "../form/RecipeForm";
import HistoryPreview from "../history/HistoryPreview";

enum HotOrIced {
  HOT = "Hot",
  ICED = "Iced",
}

interface RecipeFormAndRatingState {
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
  iceRatio: string;
  iceWeight: number | string;
  sec: number;
  rating: number;
}

type FormAction =
  | { type: "SET_DATE"; payload: string }
  | { type: "SET_BEAN"; payload: string }
  | { type: "SET_ROASTER"; payload: string }
  | { type: "SET_DRIPPER"; payload: string }
  | { type: "SET_GRINDER"; payload: string }
  | { type: "SET_SCALE"; payload: string }
  | { type: "SET_HOT"; payload: HotOrIced }
  | { type: "SET_TEMP"; payload: number }
  | { type: "SET_BEAN_WEIGHT"; payload: string }
  | { type: "SET_WATER_RATIO"; payload: string }
  | { type: "SET_WATER_WEIGHT"; payload: number | string }
  | { type: "SET_ICE_RATIO"; payload: string }
  | { type: "SET_ICE_WEIGHT"; payload: number | string }
  | { type: "SET_SEC"; payload: number }
  | { type: "SET_RATING"; payload: number };

const initialState: RecipeFormAndRatingState = {
  date: new Date().toISOString().substring(0, 10),
  bean: "",
  roaster: "",
  dripper: "",
  grinder: "",
  scale: "",
  hotOrIced: HotOrIced.HOT,
  temp: 80,
  beanWeight: "",
  waterRatio: "",
  waterWeight: "",
  iceRatio: "",
  iceWeight: "",
  sec: 0,
  rating: 0,
};

const recipeFormDataReducer = (
  recipeAndRatingState: RecipeFormAndRatingState,
  action: FormAction,
): RecipeFormAndRatingState => {
  switch (action.type) {
    case "SET_DATE":
      return { ...recipeAndRatingState, date: action.payload };
    case "SET_BEAN":
      return { ...recipeAndRatingState, bean: action.payload };
    case "SET_ROASTER":
      return { ...recipeAndRatingState, roaster: action.payload };
    case "SET_DRIPPER":
      return { ...recipeAndRatingState, dripper: action.payload };
    case "SET_GRINDER":
      return { ...recipeAndRatingState, grinder: action.payload };
    case "SET_SCALE":
      return { ...recipeAndRatingState, scale: action.payload };
    case "SET_HOT":
      return { ...recipeAndRatingState, hotOrIced: action.payload };
    case "SET_TEMP":
      return { ...recipeAndRatingState, temp: action.payload };
    case "SET_BEAN_WEIGHT":
      return { ...recipeAndRatingState, beanWeight: action.payload };
    case "SET_WATER_RATIO":
      return { ...recipeAndRatingState, waterRatio: action.payload };
    case "SET_WATER_WEIGHT":
      return { ...recipeAndRatingState, waterWeight: action.payload };
    case "SET_ICE_RATIO":
      return { ...recipeAndRatingState, iceRatio: action.payload };
    case "SET_ICE_WEIGHT":
      return { ...recipeAndRatingState, iceWeight: action.payload };
    case "SET_SEC":
      return { ...recipeAndRatingState, sec: action.payload };
    case "SET_RATING":
      return { ...recipeAndRatingState, rating: action.payload };
    default:
      return recipeAndRatingState;
  }
};

export default function FormPage() {
  const [recipeAndRatingState, dispatch] = useReducer(
    recipeFormDataReducer,
    initialState,
  );

  const detailFormRef = useRef<HTMLFormElement>(null);

  function handleSubmitCombinedData(
    detailData: Record<string, FormDataEntryValue>,
  ) {
    const combinedData = {
      ...recipeAndRatingState,
      ...detailData,
    };
    console.log(combinedData);
  }

  return (
    <div className="flex h-[92vh] w-screen flex-col items-center justify-start overflow-x-hidden px-6 sm:flex-row sm:space-x-5 sm:overflow-x-auto sm:overflow-y-hidden md:space-x-8 lg:px-16">
      <RecipeForm state={recipeAndRatingState} dispatch={dispatch} />

      <div className="flex h-5/6 min-h-[40rem] flex-col items-center justify-center gap-3 sm:w-1/2 sm:min-w-[30rem]">
        <DetailForm
          detailFormRef={detailFormRef}
          handleSubmitCombinedData={handleSubmitCombinedData}
          state={recipeAndRatingState}
          dispatch={dispatch}
        />
        <HistoryPreview></HistoryPreview>
      </div>
    </div>
  );
}
