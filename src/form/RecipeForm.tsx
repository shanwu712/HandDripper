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

const grinderOptions = ["Grinder 1", "Grinder 2", "Grinder 3"];

enum HotOrIced {
  hot = "Hot",
  iced = "Iced",
}

export default function RecipeForm() {
  const [hot, setHot] = useState<HotOrIced>(HotOrIced.hot);
  const [temp, setTemp] = useState<number>(80);

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
              defaultValue={new Date().toISOString().substring(0, 10)}
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
                  placeholder="Scale"
                  className="w-20 rounded-r-lg border-l px-2 py-1 text-center focus:outline-none"
                />
              </div>
            </div>
          </div>

          <hr className="border-light-beige h-0 border-t-[3px] border-dotted bg-none" />

          <div className="border-light-beige flex items-center justify-between gap-2 px-1">
            <div className="space-y-2">
              <div className="flex gap-2">
                <label className="text-nowrap text-lg font-semibold">
                  Hot / Iced:
                </label>
                <select
                  required
                  name="hotOrIced"
                  onChange={(e) => setHot(e.target.value as HotOrIced)}
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
                        className="peer w-12 rounded-lg px-2 py-0.5 outline-none focus:ring-2 focus:ring-blue-400/70"
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

          <div className="border-light-beige flex items-center justify-between gap-1 px-1">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 text-nowrap">
                <label className="text-lg font-semibold">Water weight:</label>
                <div className="relative flex items-center">
                  <input
                    name="waterWeight"
                    maxLength={3}
                    className="w-12 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                  />
                  <span className="absolute right-1">g</span>
                </div>
              </div>

              {hot === HotOrIced.iced && (
                <div className="flex items-center space-x-2 text-nowrap">
                  <label className="text-lg font-semibold">Ice weight:</label>
                  <div className="relative flex items-center">
                    <input
                      name="iceWeight"
                      maxLength={3}
                      className="w-12 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
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

          <hr className="border-light-beige h-0 border-t-[3px] border-dotted bg-none" />
        </Form>

        <Timer></Timer>
      </div>
    </div>
  );
}
