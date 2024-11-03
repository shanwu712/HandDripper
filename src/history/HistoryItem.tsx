import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import Button from "../components/Button";

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

export default function HistoryItem({ item }: HistoryItemProp) {
  return (
    <div className="flex flex-col items-start rounded-sm px-2 py-2 shadow-md">
      <Disclosure>
        <DisclosureButton className="relative rounded-md pb-1 pl-4 pt-3">
          <div className="bg-sage absolute -left-2 -top-8 flex gap-1 rounded-t-md px-2 py-2 text-xs font-bold text-white">
            <span>{item.date.slice(5).split("-").join("/")}</span>
            <span>{item.hotOrIced}</span>
          </div>
          {item.bean}
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

            <div className="flex items-end justify-between">
              <span className="w-2/3">Comment: {item.comment}</span>
              <Button type="secondary">Delete</Button>
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>
    </div>
  );
}
