import { Dispatch, useEffect } from "react";
import { Form } from "react-router-dom";
import Timer from "./Timer";
import useOptions from "../services/useOptions";
import useUser from "../useUser";

// const roasterOptions = ["Dreamer Cafe", "Come True Coffee", "Starbucks"];
// const beanOptions = [
//   "Panama Geisha - Hacienda La Esmeralda, Washed Process, Light Roast",
//   "Ethiopia Yirgacheffe - Konga Cooperative, Natural Process, Medium Roast",
//   "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
// ];
// const dripperOptions = [
//   "Hario V60 Hario V60-02 Ceramic Coffee Dripper",
//   "Kalita Wave Kalita Wave 185 Stainless Steel Dripper",
//   "Chemex Chemex Classic 6-Cup Glass Coffee Maker",
// ];

// const grinderOptions = ["Grinder 1", "Grinder 2", "Grinder 3"];

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
interface RecipeFormProps {
  state: RecipeFormAndRatingState;
  dispatch: Dispatch<FormAction>;
  editingSec: boolean;
  setEditingSec: (arg0: boolean) => void;
  errors: {
    beanRequiredMessage?: string;
    beanWeightRequiredMessage?: string;
    waterWeightRequiredMessage?: string;
  };
  manualSec: { min: number; sec: number };
  setManualSec: ({ min, sec }: { min: number; sec: number }) => void;
  beanInputRef: React.LegacyRef<HTMLInputElement>;
  beanWeightInputRef: React.LegacyRef<HTMLInputElement>;
  waterWeightInputRef: React.LegacyRef<HTMLInputElement>;
}

export default function RecipeForm({
  manualSec,
  setManualSec,
  state,
  dispatch,
  editingSec,
  setEditingSec,
  errors,
  beanInputRef,
  beanWeightInputRef,
  waterWeightInputRef,
}: RecipeFormProps) {
  const { userId } = useUser();
  // console.log("checkUserID", userId);
  const { options: beanOptions } = useOptions(userId ?? "", "bean");
  const { options: roasterOptions } = useOptions(userId ?? "", "roaster");
  const { options: dripperOptions } = useOptions(userId ?? "", "dripper");
  const { options: grinderOptions } = useOptions(userId ?? "", "grinder");

  useEffect(() => {
    if (state.beanWeight && state.iceRatio) {
      const calculatedIceWeight = Math.round(
        Number(state.beanWeight) * Number(state.iceRatio),
      );
      dispatch({ type: "SET_ICE_WEIGHT", payload: calculatedIceWeight });
    } else {
      dispatch({ type: "SET_ICE_WEIGHT", payload: null });
    }
  }, [state.beanWeight, state.iceRatio, dispatch]);

  useEffect(() => {
    if (state.beanWeight && state.waterRatio) {
      const calculatedWaterWeight = Math.round(
        Number(state.beanWeight) * Number(state.waterRatio),
      );
      dispatch({ type: "SET_WATER_WEIGHT", payload: calculatedWaterWeight });
    } else {
      dispatch({ type: "SET_WATER_WEIGHT", payload: null });
    }
  }, [state.beanWeight, state.waterRatio, dispatch]);

  return (
    <div className="relative flex h-[85%] min-h-[40rem] w-screen flex-col overflow-x-hidden rounded-2xl border border-dark-beige shadow-lg sm:w-1/2 sm:min-w-[30rem] lg:w-[45%]">
      <div className="flex items-center justify-between rounded-t-2xl border-b border-dark-beige bg-beige px-5 py-3">
        <h2 className="font-serif text-xl font-semibold italic tracking-wide">
          Today's recipe
        </h2>
        <input
          name="date"
          type="date"
          value={state.date}
          onChange={(e) =>
            dispatch({ type: "SET_DATE", payload: e.target.value })
          }
          className="rounded-lg border border-dark-beige bg-white px-2 py-1 text-sm text-ink-muted focus:outline-none focus:ring-2 focus:ring-light-brown/40"
        />
      </div>

      <div className="flex h-full w-auto flex-col items-center justify-center gap-2 overflow-y-auto rounded-b-2xl bg-beige">
        <Form className="space-y-5 sm:w-3/4 md:space-y-6">

          <div className="items-start space-y-4 px-1">
            <div className="flex space-x-2">
              <label className="w-16 text-lg font-medium">Bean</label>
              <div className="relative flex grow flex-col">
                {errors.beanRequiredMessage && (
                  <p className="absolute -left-3 top-1 text-red-500">*</p>
                )}
                <input
                  required
                  name="bean"
                  type="text"
                  ref={beanInputRef}
                  list="beanOptions"
                  value={state.bean}
                  onChange={(e) =>
                    dispatch({ type: "SET_BEAN", payload: e.target.value })
                  }
                  className="rounded-lg border border-dark-beige bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-light-brown/40"
                />
                <datalist id="beanOptions">
                  {beanOptions?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </datalist>
                {errors.beanRequiredMessage && (
                  <p className="absolute -bottom-[18px] text-sm text-red-500">
                    {errors.beanRequiredMessage}
                  </p>
                )}
              </div>
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
                className="grow rounded-lg border border-dark-beige bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-light-brown/40"
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
                className="grow rounded-lg border border-dark-beige bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-light-brown/40"
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

              <div className="flex grow rounded-lg border border-dark-beige bg-white focus-within:ring-2 focus-within:ring-light-brown/40">
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
                  className="w-20 rounded-r-lg border-l border-dark-beige px-2 py-1 text-center focus:outline-none"
                />
              </div>
            </div>
          </div>

          <hr className="h-0 border-t-2 border-dotted border-dark-beige bg-none" />

          {/* Second section */}
          <div className="flex items-center justify-between gap-2 px-1">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-nowrap text-lg font-semibold">
                  Hot / Iced
                </label>
                <div className="flex rounded-full border border-dark-beige bg-white p-0.5">
                  {Object.values(HotOrIced).map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        dispatch({ type: "SET_HOT", payload: option })
                      }
                      className={`rounded-full px-3.5 py-1 text-sm font-semibold transition-colors ${
                        state.hotOrIced === option
                          ? "bg-light-brown text-light-beige"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center space-x-2 text-nowrap">
                {errors.beanWeightRequiredMessage && (
                  <p className="absolute -left-0.5 top-1.5 text-sm text-red-500">
                    *
                  </p>
                )}
                <label className="text-lg font-semibold">Bean weight:</label>
                <div className="relative flex items-center">
                  <input
                    name="beanWeight"
                    ref={beanWeightInputRef}
                    maxLength={3}
                    className="w-12 rounded-lg border border-dark-beige bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-light-brown/40"
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
                  {errors.beanWeightRequiredMessage && (
                    <p className="absolute right-3 top-7 text-sm text-red-500">
                      {errors.beanWeightRequiredMessage}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
                Ratio
              </span>
              <div className="flex items-center gap-1.5 rounded-xl border border-dark-beige bg-white px-3 py-1.5">
                <div className="relative">
                  <input
                    readOnly
                    value="1"
                    className="pointer-events-none w-9 rounded-md bg-transparent px-1 py-0.5 text-center font-semibold"
                  />
                  <label className="absolute -bottom-4 left-0 w-full text-center text-[10px] font-medium italic text-ink-muted">
                    Bean
                  </label>
                </div>

                <span className="font-semibold text-ink-muted">:</span>

                <div className="relative">
                  <input
                    id="waterRatio"
                    maxLength={4}
                    placeholder=" "
                    className="peer w-9 rounded-md bg-transparent px-1 py-0.5 text-center font-semibold outline-none focus:ring-2 focus:ring-light-brown/40"
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
                    htmlFor="waterRatio"
                    className="pointer-events-none absolute -bottom-4 left-0 w-full text-center text-[10px] font-medium italic text-ink-muted"
                  >
                    Water
                  </label>
                </div>

                {state.hotOrIced === HotOrIced.ICED && (
                  <>
                    <span className="font-semibold text-ink-muted">:</span>
                    <div className="relative">
                      <input
                        id="iceRatio"
                        maxLength={4}
                        placeholder=" "
                        className="peer w-9 rounded-md bg-transparent px-1 py-0.5 text-center font-semibold outline-none focus:ring-2 focus:ring-light-brown/40"
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
                        className="pointer-events-none absolute -bottom-4 left-0 w-full text-center text-[10px] font-medium italic text-ink-muted"
                      >
                        Ice
                      </label>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          <hr className="h-0 border-t-2 border-dotted border-dark-beige bg-none" />

          {/* Third section */}
          <div className="flex items-center justify-between gap-1 px-1">
            <div className="flex flex-col space-y-2">
              <div className="relative flex items-center space-x-2 text-nowrap">
                {errors.waterWeightRequiredMessage && (
                  <p className="absolute top-1.5 text-sm text-red-500">*</p>
                )}
                <label className="text-lg font-semibold">Water weight:</label>
                <div className="relative flex items-center">
                  <input
                    name="waterWeight"
                    ref={waterWeightInputRef}
                    maxLength={3}
                    className="w-12 rounded-lg border border-dark-beige bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-light-brown/40"
                    value={state.waterWeight ?? ""}
                    onChange={(e) =>
                      e.target.value === "" || !isNaN(Number(e.target.value))
                        ? dispatch({
                            type: "SET_WATER_WEIGHT",
                            payload: Number(e.target.value),
                          })
                        : null
                    }
                  />
                  <span className="absolute right-1">g</span>
                </div>
                {errors.waterWeightRequiredMessage && (
                  <p className="absolute bottom-7 left-1 text-sm text-red-500">
                    {errors.waterWeightRequiredMessage}
                  </p>
                )}
              </div>

              {state.hotOrIced === HotOrIced.ICED && (
                <div className="flex items-center space-x-2 text-nowrap">
                  <label className="text-lg font-semibold">Ice weight:</label>
                  <div className="relative flex items-center">
                    <input
                      name="iceWeight"
                      maxLength={3}
                      className="w-12 rounded-lg border border-dark-beige bg-white px-2 py-1 focus:outline-none focus:ring-2 focus:ring-light-brown/40"
                      value={state.iceWeight ?? ""}
                      onChange={(e) =>
                        e.target.value === "" || !isNaN(Number(e.target.value))
                          ? dispatch({
                              type: "SET_ICE_WEIGHT",
                              payload: Number(e.target.value),
                            })
                          : null
                      }
                    />
                    <span className="absolute right-1">g</span>
                  </div>
                </div>
              )}
            </div>

            <div className="relative flex flex-col items-center">
              <div className="flex items-baseline gap-1.5">
                <label htmlFor="temp" className="text-lg font-semibold">
                  Water temp
                </label>
                <span className="font-serif font-semibold text-light-brown">
                  {state.temp}&deg;C
                </span>
              </div>

              <div className="flex items-center space-x-2 text-xs text-ink-muted">
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
                  className="[&::-webkit-slider-thumb]: cursor-pointer appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-dark-beige [&::-webkit-slider-thumb]:h-[1rem] [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-light-brown [&::-webkit-slider-thumb]:shadow-md"
                />
                <span>100</span>
              </div>
            </div>
          </div>

          <hr className="h-0 border-t-2 border-dotted border-dark-beige bg-none" />
        </Form>

        <Timer
          state={state}
          dispatch={dispatch}
          editingSec={editingSec}
          setEditingSec={setEditingSec}
          manualSec={manualSec}
          setManualSec={setManualSec}
        ></Timer>
      </div>
    </div>
  );
}
