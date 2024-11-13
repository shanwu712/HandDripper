import { Form } from "react-router-dom";
import Button from "../components/Button";
import StarRating from "./StarRating";
import { Dispatch, RefObject } from "react";

const methodOptions = ["Pulse Pouring", "Continuous Pouring", "Bloom and Pour"];

enum HotOrIced {
  hot = "Hot",
  iced = "Iced",
}
interface FormState {
  date: string;
  bean: string;
  roaster: string;
  dripper: string;
  grinder: string;
  scale: string;
  hot: HotOrIced;
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
interface DetailFormProps {
  state: FormState;
  dispatch: Dispatch<FormAction>;
  detailFormRef: RefObject<HTMLFormElement>;
  handleSubmitCombinedData: (data: Record<string, FormDataEntryValue>) => void;
}

export default function DetailForm({
  state,
  dispatch,
  detailFormRef,
  handleSubmitCombinedData,
}: DetailFormProps) {
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const formData = new FormData(detailFormRef.current as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    console.log(detailFormRef.current);
    handleSubmitCombinedData(data);
  }

  return (
    <div className="bg-light-beige/50 flex h-fit w-screen min-w-[30rem] flex-col rounded-lg px-2 py-2 shadow-lg sm:w-full">
      <Form className="space-y-2" ref={detailFormRef} onSubmit={handleSubmit}>
        <div className="flex w-full gap-2">
          <label className="text-nowrap text-lg font-medium">
            Brewing method
          </label>
          <input
            name="method"
            list="methodOptions"
            className="grow rounded-lg px-2 py-1 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400/70"
          />
          <datalist id="methodOptions">
            {methodOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </datalist>
        </div>

        <StarRating state={state} dispatch={dispatch} />

        <div className="flex flex-col space-y-2 pb-2">
          <label className="w-16 text-nowrap text-lg font-medium">
            How is today's coffee?
          </label>
          <textarea
            name="comment"
            style={{ resize: "none" }}
            className="h-28 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400/70"
          ></textarea>
        </div>

        <Button type="primary">Done Dripping</Button>
      </Form>
    </div>
  );
}
