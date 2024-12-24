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
  | { type: "SET_SEC"; payload: number };

interface TimerProps {
  state: RecipeFormAndRatingState;
  dispatch: Dispatch<FormAction>;
}

export default function Timer({ state, dispatch }: TimerProps) {
  const [active, setActive] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [manualInput, setManualInput] = useState(false);
  const [editingSec, setEditingSec] = useState(false);
  const [manualSec, setManualSec] = useState<{ min: number; sec: number }>({
    min: 0,
    sec: 0,
  });

  const secRef = useRef(state.sec);

  function formatSec(seconds: number) {
    const min = Math.floor(seconds / 60);
    const secs = seconds - 60 * min;

    const formattedSecs = secs < 10 ? `0${secs}` : secs;

    return `${min} ： ${formattedSecs}`;
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
    intervalRef.current = null;
    setManualSec({ min: 0, sec: 0 });
    dispatch({ type: "SET_SEC", payload: 0 });
    setActive(false);
  }

  function convertFormattedSec(secObj: { min: number; sec: number }) {
    if (secObj.min !== 0 || secObj.sec !== 0) {
      return secObj.min * 60 + secObj.sec;
    }
  }

  function handleManualInput(e: React.MouseEvent<HTMLButtonElement>) {
    setManualInput(!manualInput);
    const convertedSec = convertFormattedSec(manualSec) ?? 0;
    if (e.currentTarget.textContent === "Done") {
      dispatch({ type: "SET_SEC", payload: convertedSec });

      setEditingSec(false);
    } else {
      setEditingSec(true);
    }
  }

  return (
    <div className="flex w-40 flex-col items-center justify-center gap-2 border-light-beige">
      <Button
        type="secondary"
        onClick={handleInterval}
        disabled={editingSec || manualSec.min !== 0 || manualSec.sec !== 0}
      >
        {active ? "Stop" : "Start Dripping"}
      </Button>

      {manualInput ? (
        <div className="flex gap-2 pb-2">
          <input
            maxLength={1}
            defaultValue={manualSec.min}
            onChange={(e) =>
              setManualSec({ ...manualSec, min: Number(e.target.value) })
            }
            className="w-5 rounded-md px-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
          />
          <span>:</span>
          <input
            maxLength={2}
            defaultValue={manualSec.sec}
            onChange={(e) =>
              setManualSec({ ...manualSec, sec: Number(e.target.value) })
            }
            className="w-7 rounded-md px-1.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
          />
        </div>
      ) : (
        <span className="pb-2 text-lg font-medium tracking-wide">
          {manualSec.min !== 0 || manualSec.sec !== 0
            ? `${manualSec.min} : ${manualSec.sec > 9 ? manualSec.sec : `0${manualSec.sec}`}`
            : formatSec(state.sec)}
        </span>
      )}

      {(editingSec || !intervalRef.current) && (
        <Button type="small" onClick={handleManualInput}>
          {manualInput ? "Done" : "Input manually"}
        </Button>
      )}

      {intervalRef.current && (
        <Button onClick={handleReset} type="small">
          Reset
        </Button>
      )}
    </div>
  );
}
