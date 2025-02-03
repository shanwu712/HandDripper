import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface BtnProp {
  children: ReactNode;
  onClick?: (() => void) | ((e: React.MouseEvent<HTMLButtonElement>) => void);
  type: string;
  to?: string;
  disabled?: boolean;
}

const baseStyle =
  "h-fit transform rounded-3xl font-bold transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-md tracking-wider shadow-sm text-nowrap";

export default function Button({
  children,
  onClick,
  type,
  to,
  disabled,
}: BtnProp) {
  // 當 `to` 存在，且 `onClick` 不存在時，渲染 `<Link>`（導航）
  if (to && !onClick) {
    return (
      <Link
        to={to}
        className={`${baseStyle} w-full min-w-16 bg-amber-100 p-1.5 px-2 text-center font-semibold text-light-brown hover:text-dark-brown`}
      >
        {children}
      </Link>
    );
  }

  // 當 `onClick` 存在（即在 `form` 內），渲染 `<button>` 以便觸發 `submit`
  return (
    <button
      className={`${baseStyle} ${
        type === "primary"
          ? "w-full min-w-16 bg-amber-100 px-2 py-1 text-lg text-light-brown hover:text-dark-brown"
          : type === "secondary"
            ? "w-full min-w-16 bg-sage px-2 py-1 text-light-beige hover:text-slate-50"
            : type === "small"
              ? "absolute mt-24 bg-stone-100 px-2 py-0.5 text-stone-500 hover:text-stone-800"
              : ""
      } ${disabled && "cursor-not-allowed text-gray-300"}`}
      onClick={onClick}
      disabled={disabled}
      type="submit"
    >
      {children}
    </button>
  );
}
