import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon, TagIcon } from "@heroicons/react/24/solid";
import { TagIcon as OutlineTagIcon } from "@heroicons/react/24/outline";

const beanOptions = [
  "Panama Geisha - Hacienda La Esmeralda, Washed Process, Light Roast",
  "Ethiopia Yirgacheffe - Konga Cooperative, Natural Process, Medium Roast",
  "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
];

enum DateOptions {
  NEWEST = "Newest",
  OLDEST = "Oldest",
}

enum RatingOptions {
  HIGHEST = "Highest",
  LOWEST = "Lowest",
}

interface SortingProps {
  pined: boolean;
  setPined: (v: boolean) => void;
  sortingMethod: DateOptions | RatingOptions | string | null;
  setSortingMethod: (
    option: RatingOptions | DateOptions | string | null,
  ) => void;
}

export default function Sorting({
  pined,
  setPined,
  sortingMethod,
  setSortingMethod,
}: SortingProps) {
  return (
    <div className="fixed z-30 flex w-full items-center justify-between bg-white/95 px-3 py-2">
      <h2 className="text-2xl font-bold italic tracking-wide">
        Brewing History
      </h2>
      <div className="flex items-center justify-end gap-2">
        <p className="text-lg font-semibold italic">Sort By:</p>

        <Popover className="relative">
          <PopoverButton className="inline-flex items-center gap-x-1 text-lg font-semibold text-gray-900 hover:text-slate-500 focus:outline-none">
            <span>Date</span>
            <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            transition
            className="flex w-auto flex-col items-center divide-y rounded-md shadow-md transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {Object.values(DateOptions).map((item) => (
              <div
                key={item}
                data-value={item}
                onClick={(e) => {
                  setSortingMethod(
                    (e.target as HTMLDivElement).getAttribute(
                      "data-value",
                    ) as DateOptions,
                  );
                }}
                className="relative flex w-full cursor-pointer justify-center bg-white p-2 font-medium tracking-wide hover:bg-gray-50"
              >
                {item}
              </div>
            ))}
          </PopoverPanel>
        </Popover>

        <Popover className="relative">
          <PopoverButton className="inline-flex items-center gap-x-1 text-lg font-semibold text-gray-900 hover:text-slate-500 focus:outline-none">
            <span>Bean</span>
            <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            className="flex w-auto flex-col items-center divide-y rounded-md shadow-md transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {beanOptions.map((item) => (
              <div
                key={item}
                data-value={item}
                onClick={(e) => {
                  setSortingMethod(
                    (e.target as HTMLDivElement).getAttribute(
                      "data-value",
                    ) as string,
                  );
                }}
                className="relative flex w-full cursor-pointer justify-center bg-white p-2 font-medium tracking-wide hover:bg-gray-50"
              >
                {item}
              </div>
            ))}
          </PopoverPanel>
        </Popover>

        <Popover className="relative">
          <PopoverButton className="inline-flex items-center gap-x-1 text-lg font-semibold text-gray-900 hover:text-slate-500 focus:outline-none">
            <span>Rating</span>
            <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
          </PopoverButton>
          <PopoverPanel
            anchor="bottom"
            className="flex w-auto flex-col items-center divide-y rounded-md shadow-md transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
          >
            {Object.values(RatingOptions).map((item) => (
              <div
                key={item}
                data-value={item}
                onClick={(e) => {
                  setSortingMethod(
                    (e.target as HTMLDivElement).getAttribute(
                      "data-value",
                    ) as RatingOptions,
                  );
                }}
                className="relative flex w-full cursor-pointer justify-center bg-white p-2 font-medium tracking-wide hover:bg-gray-50"
              >
                {item}
              </div>
            ))}
          </PopoverPanel>
        </Popover>
        <div onClick={() => setPined(!pined)} className="cursor-pointer">
          {pined ? (
            <TagIcon className="h-6 w-6 text-dark-brown" />
          ) : (
            <OutlineTagIcon className="h-6 w-6 text-dark-brown" />
          )}
        </div>
      </div>
    </div>
  );
}
