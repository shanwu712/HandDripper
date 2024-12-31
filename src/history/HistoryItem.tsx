import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Button from "../components/Button";
import { useState } from "react";

import { TagIcon } from "@heroicons/react/16/solid";
import { useDeleteHistory } from "../services/useDeleteHistory";
import { FormData } from "../Type/FormData";

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
const methodOptions = ["Pulse Pouring", "Continuous Pouring", "Bloom and Pour"];
const grinderOptions = ["Grinder 1", "Grinder 2", "Grinder 3"];
enum HotOrIced {
  HOT = "Hot",
  ICED = "Iced",
}

interface HistoryItemProp {
  item: FormData;
  pinedStates: Record<string, boolean>;
  togglePined: (id: string) => void;
}

const FullStar = () => (
  <svg height={24} viewBox="0 0 24 24" fill="#d8a427">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default function HistoryItem({
  item,
  pinedStates,
  togglePined,
}: HistoryItemProp) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingHotOrIced, setEditingHotOrIced] = useState(item.hotOrIced);
  const [editingIceWeight, setEditingIceWeight] = useState(item.iceWeight);

  const { deleteHistory } = useDeleteHistory();

  return (
    <div className="flex w-full flex-col items-start rounded-sm bg-white px-2 py-2 shadow-md">
      <Disclosure>
        <DisclosureButton className="relative w-full rounded-md px-0.5 py-1 text-left md:px-2">
          <div className="absolute -left-2 -top-8 flex gap-1 rounded-t-md bg-sage px-2 py-2 text-xs font-bold text-white">
            <span>{item.date.slice(5).split("-").join("/")}</span>
            <span>{item.hotOrIced}</span>
          </div>

          {pinedStates[item.id] && (
            <div className="absolute -top-8 left-16 flex gap-1 rounded-t-md bg-light-beige px-2 py-2 text-xs font-bold">
              <span>
                <TagIcon className="h-4 w-4 text-dark-brown" />
              </span>
            </div>
          )}
          <div className="flex min-w-0 justify-between whitespace-nowrap">
            <span className="flex-1 overflow-hidden text-ellipsis lg:tracking-wider">
              {item.bean}
            </span>
            <span className="flex items-center font-semibold">
              <p>{item.rating}</p>
              <FullStar />
            </span>
          </div>
        </DisclosureButton>

        <DisclosurePanel className="flex w-full flex-col px-3 text-gray-500">
          <div className="flex flex-col flex-wrap justify-between gap-x-2 md:flex-row">
            <span className="text-nowrap">Roaster: {item.roaster}</span>
            <span className="">Dripper: {item.dripper}</span>
            <span className="text-nowrap">
              {item.grinder && item.scale
                ? `Grinder: ${item.grinder} / ${item.scale}`
                : item.grinder
                  ? `Grinder: ${item.grinder}`
                  : `Grinder Scale: ${item.scale}`}
            </span>
          </div>

          <div className="flex flex-wrap justify-between gap-x-1">
            <span className="text-nowrap">
              Bean weight: {item.beanWeight} g
            </span>

            {item.iceWeight && (
              <span className="text-nowrap">
                Ice weight: {item.iceWeight} g
              </span>
            )}

            <span className="text-nowrap">
              Ratio: 1 : {item.waterRatio}{" "}
              {item.iceRatio && `: ${item.iceRatio}`}
            </span>

            <span className="text-nowrap">Temperature: {item.temp}°C</span>
          </div>

          <div className="flex flex-col justify-between sm:flex-row">
            <div className="flex w-full flex-col sm:w-2/3">
              <span>Method: {item.method}</span>
              <span>Comment: {item.comment}</span>
            </div>

            <div className="flex w-44 flex-col justify-end gap-2 self-end pt-2">
              <div className="flex gap-1">
                <Button type="primary" onClick={() => setIsEditing(!isEditing)}>
                  Edit
                </Button>
                <Button type="primary" onClick={() => togglePined(item.id)}>
                  Pin
                </Button>
              </div>
              <Button type="secondary" onClick={() => setIsOpen(!isOpen)}>
                Delete
              </Button>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      {/* confirm deleting modal */}
      {isOpen && (
        <Dialog
          open={isOpen}
          onClose={() => setIsOpen(false)}
          className="relative z-50"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/30 duration-500 ease-in-out data-[closed]:opacity-0"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel
              transition
              className="max-w-lg transform space-y-4 rounded-md bg-white p-9 opacity-0 duration-500 ease-in-out data-[open]:scale-100 data-[open]:opacity-100"
            >
              <DialogTitle className="text-lg font-bold">
                Delete this brewing history from{" "}
                {item.date.slice(5).split("-").join("/")}?
              </DialogTitle>
              <Description>
                {item.hotOrIced} - {item.bean} from{" "}
                {item.date.slice(5).split("-").join("/")}
              </Description>

              <div className="ml-auto flex w-1/3 gap-3">
                <Button type="secondary" onClick={() => deleteHistory(item.id)}>
                  Yes
                </Button>

                <Button onClick={() => setIsOpen(false)} type="primary">
                  NO
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}

      {/* Edit Modal */}
      {isEditing && (
        <Dialog
          open={isEditing}
          onClose={() => {
            setIsEditing(false);
            setEditingHotOrIced(item.hotOrIced);
            setEditingIceWeight(item.iceWeight);
          }}
          className="relative z-40"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black/30 duration-500 ease-in-out data-[closed]:opacity-0"
          />
          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <DialogPanel
              transition
              className="z-50 w-full transform space-y-1 rounded-md bg-white p-7 opacity-0 duration-500 ease-in-out data-[open]:scale-100 data-[open]:opacity-100 sm:w-2/3 sm:px-12 sm:py-10 lg:space-y-3 lg:px-16"
            >
              <div className="flex justify-between">
                <input
                  id="date"
                  name="date"
                  type="date"
                  defaultValue={item.date}
                  onBlur={() => {}}
                  className="border-blue-400/70 font-semibold focus:border-b-[1.5px] focus:outline-none"
                />
                <div className="flex gap-2">
                  <label
                    htmlFor="hotOrIced"
                    className="text-nowrap text-lg font-semibold"
                  >
                    Hot / Iced:
                  </label>
                  <select
                    required
                    id="hotOrIced"
                    name="hotOrIced"
                    defaultValue={item.hotOrIced}
                    onChange={(e) =>
                      setEditingHotOrIced(e.target.value as HotOrIced)
                    }
                    className="border-blue-400/70 px-2 focus:border-b-[1.5px] focus:outline-none"
                  >
                    {Object.values(HotOrIced).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="flex space-x-2">
                <label htmlFor="bean" className="w-16 text-lg font-semibold">
                  Bean
                </label>
                <input
                  required
                  id="bean"
                  name="bean"
                  list="beanOptions"
                  defaultValue={item.bean}
                  onBlur={() => {}}
                  className="grow border-blue-400/70 px-2 focus:border-b-[1.5px] focus:outline-none"
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
                <label htmlFor="roaster" className="w-16 text-lg font-semibold">
                  Roaster
                </label>
                <input
                  id="roaster"
                  name="roaster"
                  list="roasterOptions"
                  defaultValue={item.roaster}
                  onBlur={() => {}}
                  className="grow border-blue-400/70 px-2 focus:border-b-[1.5px] focus:outline-none"
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
                <label htmlFor="dripper" className="w-16 text-lg font-semibold">
                  Dripper
                </label>
                <input
                  id="dripper"
                  name="dripper"
                  list="dripperOptions"
                  defaultValue={item.dripper}
                  onBlur={() => {}}
                  className="grow border-blue-400/70 px-2 focus:border-b-[1.5px] focus:outline-none"
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
                <label htmlFor="grinder" className="w-16 text-lg font-semibold">
                  Grinder
                </label>

                <div className="flex">
                  <input
                    id="grinder"
                    name="grinder"
                    list="grinderOptions"
                    defaultValue={item.grinder}
                    className="flex w-32 border-blue-400/70 px-2 focus:border-b-[1.5px] focus:outline-none"
                  />
                  <datalist id="grinderOptions">
                    {grinderOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </datalist>
                  <span>/</span>
                  <input
                    id="scale"
                    name="scale"
                    type="text"
                    defaultValue={item.scale}
                    placeholder="Scale"
                    className="w-20 border-blue-400/70 px-2 text-center focus:border-b-[1.5px] focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-between gap-x-2 sm:gap-y-1">
                <div className="flex items-center space-x-2 text-nowrap">
                  <label htmlFor="beanWeight" className="text-lg font-semibold">
                    Bean weight:
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="beanWeight"
                      name="beanWeight"
                      maxLength={3}
                      className="w-12 border-blue-400/70 px-2 focus:border-b-[1.5px] focus:outline-none"
                      defaultValue={item.beanWeight}
                      onBlur={() => {}}
                    />
                    <span className="absolute right-1">g</span>
                  </div>
                </div>

                {editingHotOrIced === HotOrIced.ICED && (
                  <div className="flex items-center space-x-2 text-nowrap">
                    <label className="text-lg font-semibold">Ice weight:</label>
                    <div className="relative flex items-center">
                      <input
                        name="iceWeight"
                        maxLength={3}
                        className="w-12 rounded-lg px-2 py-0.5 focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                        defaultValue={editingIceWeight ?? undefined}
                      />
                      <span className="absolute right-1">g</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <label
                    htmlFor="temp"
                    className="text-nowrap text-lg font-semibold"
                  >
                    Water temp:
                  </label>
                  <div className="relative flex items-center">
                    <input
                      id="temp"
                      name="temp"
                      maxLength={3}
                      className="w-12 border-blue-400/70 px-2 focus:border-b-[1.5px] focus:outline-none"
                      defaultValue={item.temp}
                      onBlur={() => {}}
                    />
                    <span className="absolute -right-2">°C</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center space-x-1">
                    <label className="mr-1 text-lg font-semibold">
                      Ratio:{" "}
                    </label>

                    <div className="relative">
                      <input
                        readOnly
                        value="1"
                        className="pointer-events-none w-10 rounded-lg px-2 text-center"
                      />
                      <label className="absolute -top-2.5 left-0 text-sm font-medium italic text-black">
                        Bean
                      </label>
                    </div>

                    <span className="font-semibold">:</span>

                    <div className="relative">
                      <input
                        id="waterRatio"
                        name="waterRatio"
                        maxLength={4}
                        placeholder=" "
                        className="peer w-12 border-blue-400/70 px-2 text-center outline-none focus:border-b-[1.5px]"
                        step="any"
                        defaultValue={item.waterRatio}
                      />
                      <label
                        htmlFor="waterRatio"
                        className="pointer-events-none absolute left-1 top-0 -translate-y-1/2 transform text-sm font-medium italic transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:text-black"
                      >
                        Water
                      </label>
                    </div>

                    {editingHotOrIced === HotOrIced.ICED && (
                      <>
                        <span className="font-semibold">:</span>
                        <div className="relative">
                          <input
                            id="iceRatio"
                            name="iceRatio"
                            maxLength={4}
                            placeholder=" "
                            className="peer w-12 border-blue-400/70 px-2 text-center outline-none focus:border-b-[1.5px]"
                            defaultValue={item.iceRatio}
                            onBlur={() => {}}
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

              <div className="flex w-fit gap-2">
                <label
                  htmlFor="method"
                  className="text-nowrap text-lg font-semibold"
                >
                  Brewing method
                </label>
                <input
                  id="method"
                  name="method"
                  list="methodOptions"
                  defaultValue={item.method}
                  className="grow border-blue-400/70 px-2 focus:border-b-[1.5px] focus:outline-none"
                />
                <datalist id="methodOptions">
                  {methodOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </datalist>
              </div>

              <div className="flex items-center space-x-2 text-nowrap">
                <label htmlFor="rating" className="text-lg font-semibold">
                  Star rating
                </label>
                <div className="relative flex items-center">
                  <input
                    id="rating"
                    name="rating"
                    maxLength={3}
                    className="w-12 border-blue-400/70 px-2 focus:border-b-[1.5px] focus:outline-none"
                    defaultValue={item.rating}
                    onBlur={() => {}}
                  />
                  <span className="absolute -right-1">
                    <FullStar />
                  </span>
                </div>
              </div>

              <div className="flex grow space-x-2 pb-5">
                <label
                  htmlFor="comment"
                  className="text-nowrap text-lg font-semibold"
                >
                  Comment
                </label>
                <textarea
                  id="comment"
                  name="comment"
                  defaultValue={item.comment}
                  style={{ resize: "none" }}
                  className="h-fit grow border-blue-400/70 px-2 focus:border-b-[1.5px] focus:outline-none"
                ></textarea>
              </div>
              <div className="flex w-80 justify-self-center lg:w-96">
                <Button
                  type="secondary"
                  onClick={() => {
                    setIsEditing(false);
                    setEditingHotOrIced(item.hotOrIced);
                    setEditingIceWeight(item.iceWeight);
                  }}
                >
                  Done
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
}
