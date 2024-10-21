import { useRef, useState } from "react";
import Button from "../components/Button";

export default function Timer() {
  const [sec, setSec] = useState(0);
  const [active, setActive] = useState(false);
  const intervalRef = useRef<number | null>(null);

  function formatSec(seconds: number) {
    const min = Math.floor(seconds / 60);
    const secs = seconds - 60 * min;

    const formattedSecs = secs < 10 ? `0${secs}` : secs;

    return `${min} : ${formattedSecs}`;
  }

  function handleInterval() {
    if (active && intervalRef.current) {
      clearInterval(intervalRef.current);
      setActive(false);
    } else {
      setActive(true);
      intervalRef.current = setInterval(() => {
        setSec((prevTime) => {
          if (prevTime > 359 && intervalRef.current !== null) {
            clearInterval(intervalRef.current);

            return prevTime;
          }
          return prevTime + 1;
        });
      }, 1000);
    }
  }

  function handleReset() {
    if (active && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    setSec(0);
    setActive(false);
  }

  return (
    <div className="border-light-beige mt-4 flex w-full flex-col items-center justify-center">
      <Button type="secondary" onClick={handleInterval}>
        {active ? "Stop" : "Start Dripping"}
      </Button>
      <span className="py-2 text-lg font-medium tracking-wide">
        {formatSec(sec)}
      </span>

      {sec !== 0 && (
        <Button onClick={handleReset} type="small">
          Reset
        </Button>
      )}
    </div>
  );
}
