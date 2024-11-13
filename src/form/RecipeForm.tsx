import { Dispatch, useEffect } from "react";
import { Form } from "react-router-dom";
import Timer from "./Timer";

const roasterOptions = ["Dreamer Cafe", "Come True Coffee", "Starbucks"];
const beanOptions = [
  "Panama Geisha - Hacienda La Esmeralda, Washed Process, Light Roast",
  "Ethiopia Yirgacheffe - Konga Cooperative, Natural Process, Medium Roast",
  "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
];
const dripperOptions = [
  "Hario V60 Hario V60-02 Ceramic Coffee Dripper",
  "Kalita Wave Kalita Wave 185 Stainless Steel Dripper",
  "Chemex Chemex Classic 6-Cup Glass Coffee Maker",
];

const grinderOptions = ["Grinder 1", "Grinder 2", "Grinder 3"];

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
interface RecipeFormProps {
  state: RecipeFormAndRatingState;
  dispatch: Dispatch<FormAction>;
}

export default function RecipeForm({ state, dispatch }: RecipeFormProps) {
  useEffect(() => {
    if (state.beanWeight && state.iceRatio) {
      const calculatedIceWeight = Math.round(
        Number(state.beanWeight) * Number(state.iceRatio),
      );
      dispatch({ type: "SET_ICE_WEIGHT", payload: calculatedIceWeight });
    } else {
      dispatch({ type: "SET_ICE_WEIGHT", payload: "" });
    }
  }, [state.beanWeight, state.iceRatio, dispatch]);

  useEffect(() => {
    if (state.beanWeight && state.waterRatio) {
      const calculatedWaterWeight = Math.round(
        Number(state.beanWeight) * Number(state.waterRatio),
      );
      dispatch({ type: "SET_WATER_WEIGHT", payload: calculatedWaterWeight });
    } else {
      dispatch({ type: "SET_WATER_WEIGHT", payload: "" });
    }
  }, [state.beanWeight, state.waterRatio, dispatch]);

  return (
    <div className="relative flex h-5/6 min-h-[40rem] w-screen min-w-[30rem] flex-col rounded-lg shadow-lg sm:w-1/2">
      <h2 className="bg-light-beige/50 flex justify-center rounded-t-lg p-2 text-2xl font-semibold italic tracking-wider">
        Today's recipe
      </h2>

      <div className="bg-beige flex h-full w-auto flex-col items-center justify-center gap-2 overflow-y-auto rounded-b-lg">
        <Form className="space-y-5 sm:w-3/4 md:space-y-6">
          <span className="absolute left-3 top-16">
            <input
              name="date"
              type="date"
              value={state.date}
              onChange={(e) =>
                dispatch({ type: "SET_DATE", payload: e.target.value })
              }
              className="rounded-lg px-1 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
            />
          </span>

          <div className="items-start space-y-4 px-1">
            <div className="flex space-x-2">
              <label className="w-16 text-lg font-medium">Bean</label>
              <input
                required
                name="bean"
                list="beanOptions"
                value={state.bean}
                onChange={(e) =>
                  dispatch({ type: "SET_BEAN", payload: e.target.value })
                }
                className="grow rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
              />
              <datalist id="beanOptions">
                {beanOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </datalist>
            </div>

            <div className="flex space-x-2">
              <label className="w-16 text-lg font-medium">Roaster</label>
              <input
                name="roaster"
                list="roasterOptions"
                value={state.roaster}
                onChange={(e) =>
                  dispatch({ type: "SET_ROASTER", payload: e.target.value })
                }
                className="grow rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
              />
              <datalist id="roasterOptions">
                {roasterOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </datalist>
            </div>

            <div className="flex space-x-2">
              <label className="w-16 text-lg font-medium">Dripper</label>
              <input
                name="dripper"
                list="dripperOptions"
                value={state.dripper}
                onChange={(e) =>
                  dispatch({ type: "SET_DRIPPER", payload: e.target.value })
                }
                className="grow rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
              />
              <datalist id="dripperOptions">
                {dripperOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </datalist>
            </div>

            <div className="flex space-x-2">
              <label className="w-16 text-lg font-medium">Grinder</label>

              <div className="flex grow rounded-lg focus-within:ring-2 focus-within:ring-blue-400/70">
                <input
                  name="grinder"
                  list="grinderOptions"
                  value={state.grinder}
                  onChange={(e) =>
                    dispatch({ type: "SET_GRINDER", payload: e.target.value })
                  }
                  className="flex-grow rounded-l-lg px-2 py-1 focus:outline-none"
                />
                <datalist id="grinderOptions">
                  {grinderOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </datalist>
                <input
                  name="grinderScale"
                  type="text"
                  value={state.scale}
                  onChange={(e) =>
                    dispatch({ type: "SET_SCALE", payload: e.target.value })
                  }
                  placeholder="Scale"
                  className="w-20 rounded-r-lg border-l px-2 py-1 text-center focus:outline-none"
                />
              </div>
            </div>
          </div>

          <hr className="border-light-beige h-0 border-t-[3px] border-dotted bg-none" />

          {/* Second section */}
          <div className="border-light-beige flex items-center justify-between gap-2 px-1">
            <div className="space-y-2">
              <div className="flex gap-2">
                <label className="text-nowrap text-lg font-semibold">
                  Hot / Iced:
                </label>
                <select
                  required
                  name="hotOrIced"
                  onChange={(e) =>
                    dispatch({
                      type: "SET_HOT",
                      payload: e.target.value as HotOrIced,
                    })
                  }
                  className="rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                >
                  {Object.values(HotOrIced).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center space-x-2 text-nowrap">
                <label className="text-lg font-semibold">Bean weight:</label>
                <div className="relative flex items-center">
                  <input
                    name="beanWeight"
                    maxLength={3}
                    className="w-12 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                    value={state.beanWeight}
                    onChange={(e) =>
                      e.target.value === "" || !isNaN(Number(e.target.value))
                        ? dispatch({
                            type: "SET_BEAN_WEIGHT",
                            payload: e.target.value,
                          })
                        : null
                    }
                  />
                  <span className="absolute right-1">g</span>
                </div>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center space-x-1">
                <label className="mr-1 text-lg font-semibold">Ratio: </label>

                <div className="relative">
                  <input
                    readOnly
                    value="1"
                    className="pointer-events-none w-10 rounded-lg px-2 py-0.5"
                  />
                  <label className="absolute bottom-5 left-0 text-sm font-medium italic text-black">
                    Bean
                  </label>
                </div>

                <span className="font-semibold">:</span>

                <div className="relative">
                  <input
                    id="waterRatio"
                    maxLength={4}
                    placeholder=" "
                    className="peer w-12 rounded-lg px-2 py-0.5 outline-none focus:ring-2 focus:ring-blue-400/70"
                    step="any"
                    value={state.waterRatio}
                    onChange={(e) =>
                      e.target.value === "" || !isNaN(Number(e.target.value))
                        ? dispatch({
                            type: "SET_WATER_RATIO",
                            payload: e.target.value,
                          })
                        : null
                    }
                  />
                  <label
                    htmlFor="inputField"
                    className="pointer-events-none absolute left-1 top-0 -translate-y-1/2 transform text-sm font-medium italic transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-black"
                  >
                    Water
                  </label>
                </div>

                {state.hotOrIced === HotOrIced.ICED && (
                  <>
                    <span className="font-semibold">:</span>
                    <div className="relative">
                      <input
                        id="iceRatio"
                        maxLength={4}
                        placeholder=" "
                        className="peer w-12 rounded-lg px-2 py-0.5 outline-none focus:ring-2 focus:ring-blue-400/70"
                        value={state.iceRatio}
                        onChange={(e) =>
                          e.target.value === "" ||
                          !isNaN(Number(e.target.value))
                            ? dispatch({
                                type: "SET_ICE_RATIO",
                                payload: e.target.value,
                              })
                            : null
                        }
                      />
                      <label
                        htmlFor="iceRatio"
                        className="pointer-events-none absolute left-1 top-0 -translate-y-1/2 transform text-sm font-medium italic transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-black"
                      >
                        Ice
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <hr className="border-light-beige h-0 border-t-[3px] border-dotted bg-none" />

          {/* Third section */}
          <div className="border-light-beige flex items-center justify-between gap-1 px-1">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-nowrap">
                <label className="text-lg font-semibold">Water weight:</label>
                <div className="relative flex items-center">
                  <input
                    name="waterWeight"
                    maxLength={3}
                    className="w-12 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                    value={state.waterWeight}
                    onChange={(e) =>
                      dispatch({
                        type: "SET_WATER_WEIGHT",
                        payload: Number(e.target.value),
                      })
                    }
                  />
                  <span className="absolute right-1">g</span>
                </div>
              </div>

              {state.hotOrIced === HotOrIced.ICED && (
                <div className="flex items-center space-x-2 text-nowrap">
                  <label className="text-lg font-semibold">Ice weight:</label>
                  <div className="relative flex items-center">
                    <input
                      name="iceWeight"
                      maxLength={3}
                      className="w-12 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                      value={state.iceWeight}
                      onChange={(e) =>
                        dispatch({
                          type: "SET_ICE_WEIGHT",
                          payload: Number(e.target.value),
                        })
                      }
                    />
                    <span className="absolute right-1">g</span>
                  </div>
                </div>
              )}
            </div>

            <div className="relative flex flex-col items-center">
              <div className="flex items-center gap-2">
                <label htmlFor="temp" className="text-lg font-semibold">
                  Water temp:
                </label>
                <span>{state.temp}</span>
                <span>°C</span>
              </div>

              <div className="flex items-center space-x-1 text-sm">
                <span>80</span>
                <input
                  id="temp"
                  min={80}
                  max={100}
                  type="range"
                  value={state.temp}
                  onChange={(e) =>
                    dispatch({
                      type: "SET_TEMP",
                      payload: Number(e.target.value),
                    })
                  }
                  className="[&::-webkit-slider-thumb]:bg-sage appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-slate-50 [&::-webkit-slider-thumb]:h-[1rem] [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
                />
                <span>100</span>
              </div>
            </div>
          </div>

          <hr className="border-light-beige h-0 border-t-[3px] border-dotted bg-none" />
        </Form>

        <Timer state={state} dispatch={dispatch}></Timer>
      </div>
    </div>
  );
}
