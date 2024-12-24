import { FormData } from "../Type/FormData";

interface PreviewHistoryItemProp {
  item: FormData;
}

export default function PreviewHistoryItem({ item }: PreviewHistoryItemProp) {
  return (
    <div className="flex min-h-16 max-w-full rounded-lg bg-sage/85 shadow-md">
      <div className="flex w-12 flex-col items-center justify-center px-1 font-semibold">
        <span className="text-white">
          {item.date.slice(5).split("-").join("/")}
        </span>

        <span>{item.hotOrIced}</span>
      </div>

      <div className="relative flex min-w-0 grow flex-col rounded-r-lg bg-white px-1">
        <p className="overflow-hidden text-ellipsis text-nowrap font-medium italic">
          {item.bean}
        </p>

        <div className="absolute -bottom-0.5 left-0 flex h-fit gap-3">
          <div className="flex flex-col items-center justify-center">
            <svg height={24} width={24} viewBox="0 0 24 24" fill="#d8a427">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <p className="text-sm font-semibold">{item.rating}</p>
          </div>

          <div className="flex max-h-full flex-wrap items-center justify-between gap-x-2 pr-4 font-medium md:gap-x-4">
            <span className="flex items-center gap-1 text-nowrap">
              Bean weight: <p>{item.beanWeight}</p>
            </span>
            <span className="flex items-center gap-1 text-nowrap">
              Temp: <p>{item.temp}</p>
            </span>
            <span className="text-nowrap">
              Grinder: {item.grinder} / {item.scale}
            </span>

            <span className="flex items-center gap-1 text-nowrap">
              Ratio:{" "}
              <p>
                1 : {item.waterRatio} {item.iceRatio && `: ${item.iceRatio}`}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
