import { Dispatch, useEffect, useRef, useState } from "react";
import Button from "../components/Button";

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
  | { type: "SET_SEC"; payload: number };

interface TimerProps {
  state: RecipeFormAndRatingState;
  dispatch: Dispatch<FormAction>;
}

export default function Timer({ state, dispatch }: TimerProps) {
  const [active, setActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const secRef = useRef(state.sec);

  function formatSec(seconds: number) {
    const min = Math.floor(seconds / 60);
    const secs = seconds - 60 * min;

    const formattedSecs = secs < 10 ? `0${secs}` : secs;

    return `${min} : ${formattedSecs}`;
  }

  useEffect(() => {
    secRef.current = state.sec;
  }, [state.sec]);

  function handleInterval() {
    if (active && intervalRef.current) {
      clearInterval(intervalRef.current);
      setActive(false);
    } else {
      setActive(true);
      intervalRef.current = setInterval(() => {
        if (secRef.current >= 359 && intervalRef.current !== null) {
          clearInterval(intervalRef.current);
        } else {
          secRef.current += 1;

          dispatch({ type: "SET_SEC", payload: secRef.current });
        }
      }, 1000);
    }
  }

  function handleReset() {
    if (active && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    dispatch({ type: "SET_SEC", payload: 0 });
    setActive(false);
  }

  return (
    <div className="border-light-beige flex w-40 flex-col items-center justify-center">
      <Button type="secondary" onClick={handleInterval}>
        {active ? "Stop" : "Start Dripping"}
      </Button>
      <span className="py-1 text-lg font-medium tracking-wide">
        {formatSec(state.sec)}
      </span>

      {state.sec !== 0 && (
        <Button onClick={handleReset} type="small">
          Reset
        </Button>
      )}
    </div>
  );
}
