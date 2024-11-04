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

interface HistoryData {
  date: string;
  roaster?: string;
  bean: string;
  dripper: string;
  hotOrIced: string;
  beanWeight: string;
  waterRatio: string;
  iceRatio?: string;
  waterWeight: string;
  iceWeight?: string;
  temp: string;
  method?: string;
  star?: string;
  comment?: string;
}

interface HistoryItemProp {
  item: HistoryData;
}

const FullStar = () => (
  <svg height={24} viewBox="0 0 24 24" fill="#d8a427">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

export default function HistoryItem({ item }: HistoryItemProp) {
  const [pined, setPined] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex w-full flex-col items-start rounded-sm bg-white px-2 py-2 shadow-md">
      <Disclosure>
        <DisclosureButton className="relative w-full rounded-md pb-1 pl-4 pt-3 text-left">
          <div className="bg-sage absolute -left-2 -top-8 flex gap-1 rounded-t-md px-2 py-2 text-xs font-bold text-white">
            <span>{item.date.slice(5).split("-").join("/")}</span>
            <span>{item.hotOrIced}</span>
          </div>

          {pined && (
            <div className="bg-light-beige absolute -top-8 left-16 flex gap-1 rounded-t-md px-2 py-2 text-xs font-bold">
              <span>
                <TagIcon className="h-4 w-4 text-dark-brown" />
              </span>
            </div>
          )}
          <div className="flex justify-between">
            {item.bean}
            <span className="flex items-center font-semibold">
              <p>{item.star}</p>
              <FullStar />
            </span>
          </div>
        </DisclosureButton>

        <DisclosurePanel className="flex w-full flex-col px-3 text-gray-500">
          <div className="flex flex-col justify-between gap-1 whitespace-nowrap sm:flex-row">
            <span>Roaster: {item.roaster}</span>
            <span>Dripper: {item.dripper}</span>
          </div>

          <div className="flex justify-between">
            <span>Bean: {item.beanWeight} g</span>

            <span>
              Ratio: 1 : {item.waterRatio}{" "}
              {item.iceRatio && `: ${item.iceRatio}`}
            </span>

            <span>Temperature: {item.temp}°C</span>
          </div>

          <div className="flex flex-col">
            <span>Method: {item.method}</span>

            <div className="flex justify-between">
              <span className="w-2/3">Comment: {item.comment}</span>

              <div className="flex w-32 flex-col justify-end gap-3 sm:w-40">
                <Button type="primary" onClick={() => setPined(!pined)}>
                  Pin this recipe
                </Button>
                <Button type="secondary" onClick={() => setIsOpen(!isOpen)}>
                  Delete
                </Button>
              </div>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

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
                <Button type="secondary">Yes</Button>

                <Button onClick={() => setIsOpen(false)} type="primary">
                  NO
                </Button>
              </div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </div>
  );
}
