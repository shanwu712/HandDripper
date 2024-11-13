import { Dispatch, useState } from "react";

const FullStar = () => (
  <svg height={24} viewBox="0 0 24 24" fill="#d8a427">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const HalfStar = () => (
  <svg height={24} viewBox="0 0 24 24">
    {/* 左半填充 */}
    <path
      fill="#d8a427"
      d="M12 2L9.19 8.63 2 9.24l5.19 4.55L5.56 21 12 17.27V2z"
    />

    {/* 右半空心 */}
    <path
      fill="#e4e5e9"
      d="M12 2l2.81 6.63 7.19.62-5.19 4.55 1.63 7.03L12 15.4V2z"
    />
  </svg>
);

const EmptyStar = () => (
  <svg height={24} viewBox="0 0 24 24" fill="#e4e5e9">
    <path d="M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24z" />
  </svg>
);

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

interface StarRatingProps {
  state: RecipeFormAndRatingState;
  dispatch: Dispatch<FormAction>;
}

function StarRating({ state, dispatch }: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);
  const [isHalfStar, setIsHalfStar] = useState(false);

  const handleClick = (value: number) =>
    dispatch({ type: "SET_RATING", payload: value });
  const handleMouseEnter = (value: number) => setHoverRating(value);
  const handleMouseLeave = () => {
    setHoverRating(0);
    setIsHalfStar(false);
  };

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>,
    index: number,
  ) => {
    const { left, width } = event.currentTarget.getBoundingClientRect();
    const isHalf = event.clientX - left < width / 2;
    setHoverRating(index + (isHalf ? 0.5 : 1));
    setIsHalfStar(isHalf);
  };

  const renderStar = (index: number) => {
    const displayRating = hoverRating || state.rating;
    if (displayRating >= index + 1) return <FullStar key={index} />;
    if (displayRating >= index + 0.5) return <HalfStar key={index} />;
    return <EmptyStar key={index} />;
  };

  return (
    <div
      className="flex cursor-pointer flex-col gap-1 md:flex-row"
      onMouseLeave={handleMouseLeave}
    >
      <p className="md: justify-start text-nowrap text-lg font-medium">
        Rate today's coffee
      </p>

      <div className="flex items-center justify-center gap-1 md:grow md:gap-2">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            onClick={() => handleClick(isHalfStar ? index + 0.5 : index + 1)}
            onMouseEnter={() => handleMouseEnter(index + 1)}
            onMouseMove={(event) => handleMouseMove(event, index)}
          >
            {renderStar(index)}
          </div>
        ))}

        <span className="text-sm font-semibold">({state.rating})</span>
      </div>
    </div>
  );
}

export default StarRating;
