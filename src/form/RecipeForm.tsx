import { useState } from "react";
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

enum HotOrIced {
  hot = "Hot",
  iced = "Iced",
}

export default function RecipeForm() {
  const [hot, setHot] = useState<HotOrIced>(HotOrIced.hot);
  const [temp, setTemp] = useState<number>(80);

  return (
    <div className="relative left-7 top-10 flex h-2/3 w-3/5 flex-col rounded-lg shadow-lg">
      <h2 className="bg-light-beige/50 flex justify-center rounded-t-lg p-2 text-2xl font-semibold italic tracking-wider">
        Today's recipe
      </h2>

      <div className="bg-beige flex h-full flex-col items-center justify-center rounded-b-lg">
        <Form>
          <div className="space-y-3 px-1 py-4">
            <div className="flex space-x-2">
              <label className="w-16 text-lg font-medium">Roaster</label>
              <input
                name="roaster"
                list="roasterOptions"
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
              <label className="w-16 text-lg font-medium">Bean</label>
              <input
                name="bean"
                list="beanOptions"
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
              <label className="w-16 text-lg font-medium">Dripper</label>
              <input
                name="dripper"
                list="dripperOptions"
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
          </div>

          <div className="border-light-beige flex items-center justify-between gap-2 border-t-2 border-dashed px-1 py-4">
            <div className="space-y-2">
              <div className="flex gap-2">
                <label className="text-nowrap text-lg font-semibold">
                  Hot / Iced:
                </label>
                <select
                  name="hotOrIced"
                  onChange={(e) => setHot(e.target.value as HotOrIced)}
                  className="rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                >
                  <option value={HotOrIced.hot}>{HotOrIced.hot}</option>
                  <option value={HotOrIced.iced}>{HotOrIced.iced}</option>
                </select>
              </div>

              <div className="flex items-center space-x-2 text-nowrap">
                <label className="text-lg font-semibold">Bean weight:</label>
                <div className="relative flex items-center">
                  <input
                    name="beanWeight"
                    className="w-12 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
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
                    className="pointer-events-none w-10 rounded-lg border px-2 py-0.5"
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
                    className="peer w-14 rounded-lg border px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                  />
                  <label
                    htmlFor="inputField"
                    className="pointer-events-none absolute left-1 top-0 -translate-y-1/2 transform text-sm font-medium italic transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-black"
                  >
                    Water
                  </label>
                </div>

                {hot === HotOrIced.iced && (
                  <>
                    <span className="font-semibold">:</span>
                    <div className="relative">
                      <input
                        id="iceRatio"
                        maxLength={4}
                        placeholder=" "
                        className="peer w-14 rounded-lg border px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
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

          <div className="border-light-beige flex items-center justify-between border-y-2 border-dashed px-1 py-4">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-nowrap">
                <label className="text-lg font-semibold">Water weight:</label>
                <div className="relative flex items-center">
                  <input
                    name="waterWeight"
                    className="w-12 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                  />
                  <span className="absolute right-1">g</span>
                </div>
              </div>

              <div className="flex items-center space-x-2 text-nowrap">
                <label className="text-lg font-semibold">Ice weight:</label>
                <div className="relative flex items-center">
                  <input
                    name="iceWeight"
                    className="w-12 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                  />
                  <span className="absolute right-1">g</span>
                </div>
              </div>
            </div>

            <div className="relative flex flex-col items-center">
              <div className="flex items-center gap-2">
                <label htmlFor="temp" className="text-lg font-semibold">
                  Water temp:
                </label>
                <span>{temp}</span>
                <span>°C</span>
              </div>

              <div className="flex items-center space-x-1 text-sm">
                <span>80</span>
                <input
                  id="temp"
                  min={80}
                  max={100}
                  type="range"
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  className="[&::-webkit-slider-thumb]:bg-sage appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-slate-50 [&::-webkit-slider-thumb]:h-[1rem] [&::-webkit-slider-thumb]:w-[16px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
                />
                <span>100</span>
              </div>
            </div>
          </div>
        </Form>

        <Timer></Timer>
      </div>
    </div>
  );
}
