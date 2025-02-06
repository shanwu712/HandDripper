import { useReducer, useRef, useState } from "react";
import DetailForm from "../form/DetailForm";
import RecipeForm from "../form/RecipeForm";
import HistoryPreview from "../history/HistoryPreview";
import { useCreateHistory } from "../services/useCreateHistory";
import { HistoryFormData } from "../Type/HistoryFormData";
import toast from "react-hot-toast";

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
  waterWeight: number | null;
  iceRatio: string;
  iceWeight: number | null;
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
  | { type: "SET_WATER_WEIGHT"; payload: number | null }
  | { type: "SET_ICE_RATIO"; payload: string }
  | { type: "SET_ICE_WEIGHT"; payload: number | null }
  | { type: "SET_SEC"; payload: number }
  | { type: "SET_RATING"; payload: number }
  | { type: "RESET" };

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
  waterWeight: null,
  iceRatio: "",
  iceWeight: null,
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
    case "RESET":
      return initialState;
    default:
      return recipeAndRatingState;
  }
};

export default function FormPage() {
  const [editingSec, setEditingSec] = useState(false);
  const [recipeAndRatingState, dispatch] = useReducer(
    recipeFormDataReducer,
    initialState,
  );
  const [errors, setErrors] = useState({});
  const [manualSec, setManualSec] = useState<{ min: number; sec: number }>({
    min: 0,
    sec: 0,
  });

  const detailFormRef = useRef<HTMLFormElement>(null);

  const beanInputRef = useRef<HTMLInputElement>(null);
  const beanWeightInputRef = useRef<HTMLInputElement>(null);
  const waterWeightInputRef = useRef<HTMLInputElement>(null);

  const { createHistory, isCreating } = useCreateHistory();

  const validate = () => {
    const newErrors = {
      beanRequiredMessage: "",
      beanWeightRequiredMessage: "",
      waterWeightRequiredMessage: "",
    };
    let focusSet = false;
    if (!recipeAndRatingState.bean) {
      newErrors.beanRequiredMessage = "Bean name is required";

      if (!focusSet) {
        beanInputRef.current?.focus();
        focusSet = true;
      }
    }
    if (!recipeAndRatingState.beanWeight) {
      newErrors.beanWeightRequiredMessage = "Bean weight is required";
      if (!focusSet) {
        beanWeightInputRef.current?.focus();
        focusSet = true;
      }
    }
    if (!recipeAndRatingState.waterWeight) {
      newErrors.waterWeightRequiredMessage = "Water weight is required";
      if (!focusSet) {
        waterWeightInputRef.current?.focus();
        focusSet = true;
      }
    }

    setErrors(newErrors);
  };

  function resetAllField() {
    detailFormRef.current?.reset();
    dispatch({ type: "RESET" });
    setManualSec({ min: 0, sec: 0 });
    dispatch({ type: "SET_RATING", payload: 0 });
  }

  function handleSubmitCombinedData(
    detailData: Record<string, FormDataEntryValue>,
  ) {
    validate();

    if (
      !recipeAndRatingState.bean ||
      !recipeAndRatingState.beanWeight ||
      !recipeAndRatingState.waterWeight
    ) {
      toast("Please complete all required fields!", {
        icon: "⚠️",
      });
      return;
    }
    if (editingSec) {
      toast("You haven't saved your dripping time!", {
        icon: "⚠️",
      });
      return;
    }

    const combinedData = {
      ...recipeAndRatingState,
      ...detailData,
    };
    console.log(combinedData);

    createHistory(combinedData as HistoryFormData);
    resetAllField();
  }

  return (
    <div className="flex h-[92vh] w-screen flex-col items-center justify-start gap-6 overflow-x-hidden px-6 sm:flex-row sm:justify-center sm:gap-0 sm:space-x-5 sm:overflow-x-auto sm:overflow-y-hidden md:space-x-8 lg:px-16">
      <RecipeForm
        state={recipeAndRatingState}
        dispatch={dispatch}
        editingSec={editingSec}
        setEditingSec={setEditingSec}
        errors={errors}
        manualSec={manualSec}
        setManualSec={setManualSec}
        beanInputRef={beanInputRef}
        beanWeightInputRef={beanWeightInputRef}
        waterWeightInputRef={waterWeightInputRef}
      />

      <div className="flex h-[85%] min-h-[40rem] flex-col items-center justify-center gap-3 sm:w-1/2 sm:min-w-[30rem] lg:w-[45%]">
        <DetailForm
          detailFormRef={detailFormRef}
          handleSubmitCombinedData={handleSubmitCombinedData}
          state={recipeAndRatingState}
          dispatch={dispatch}
        />
        <HistoryPreview isCreating={isCreating} />
      </div>
    </div>
  );
}
