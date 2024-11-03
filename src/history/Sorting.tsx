import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/16/solid";

const beanOptions = [
  "Panama Geisha - Hacienda La Esmeralda, Washed Process, Light Roast",
  "Ethiopia Yirgacheffe - Konga Cooperative, Natural Process, Medium Roast",
  "Colombia El Paraiso - El Paraiso Estate, Honey Process, Dark Roast",
];
const dateOptions = ["Newest", "Oldest"];

const ratingOptions = ["Highest", "Lowest"];

export default function Sorting() {
  return (
    <div className="mr-3 flex gap-1 self-end py-2">
      <p className="mr-1 text-lg font-semibold">Sort By:</p>
      <Popover className="relative">
        <PopoverButton className="inline-flex items-center gap-x-1 text-lg font-semibold text-gray-900 hover:border-b-2 focus:outline-none">
          <span>Date</span>
          <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
        </PopoverButton>
        <PopoverPanel
          anchor="bottom"
          transition
          className="flex w-auto flex-col items-center divide-y rounded-md shadow-md transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {dateOptions.map((item) => (
            <div
              key={item}
              className="relative flex w-full cursor-pointer justify-center bg-white p-2 font-medium tracking-wide hover:bg-gray-50"
            >
              {item}
            </div>
          ))}
        </PopoverPanel>
      </Popover>

      <Popover className="relative">
        <PopoverButton className="inline-flex items-center gap-x-1 text-lg font-semibold text-gray-900 hover:border-b-2 focus:outline-none">
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
              className="relative flex w-full cursor-pointer justify-center bg-white p-2 font-medium tracking-wide hover:bg-gray-50"
            >
              {item}
            </div>
          ))}
        </PopoverPanel>
      </Popover>

      <Popover className="relative">
        <PopoverButton className="inline-flex items-center gap-x-1 text-lg font-semibold text-gray-900 hover:border-b-2 focus:outline-none">
          <span>Rating</span>
          <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
        </PopoverButton>
        <PopoverPanel
          anchor="bottom"
          className="flex w-auto flex-col items-center divide-y rounded-md shadow-md transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
        >
          {ratingOptions.map((item) => (
            <div
              key={item}
              className="relative flex w-full cursor-pointer justify-center bg-white p-2 font-medium tracking-wide hover:bg-gray-50"
            >
              {item}
            </div>
          ))}
        </PopoverPanel>
      </Popover>
    </div>
  );
}
