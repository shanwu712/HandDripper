import { Link } from "react-router-dom";

interface BtnProp {
  children: string;
  onClick?: () => void;
  type: string;
  to?: string;
}

const baseStyle =
  "transform rounded-3xl font-bold transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5  hover:shadow-md tracking-wider shadow-sm";

export default function Button({ children, onClick, type, to }: BtnProp) {
  const btnContent = <button onClick={onClick}>{children}</button>;

  if (type === "primary") {
    return (
      <div
        className={`${baseStyle} bg-amber-100 p-1.5 px-2 text-center text-light-brown hover:text-dark-brown`}
      >
        {to ? <Link to={to}>{btnContent}</Link> : btnContent}
      </div>
    );
  }

  if (type === "secondary") {
    return (
      <div
        className={`${baseStyle} bg-sage text-light-beige w-44 px-2 py-1 text-center hover:text-slate-50`}
      >
        {btnContent}
      </div>
    );
  }

  if (type === "small") {
    return (
      <div
        className={`${baseStyle} absolute mt-24 bg-stone-100 px-2 py-0.5 text-stone-500 hover:text-stone-800`}
      >
        {btnContent}
      </div>
    );
  }
}
