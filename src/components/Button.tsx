interface BtnProp {
  children: string;
  onClick?: () => void;
  type: string;
}

const baseStyle =
  "transform rounded-3xl  font-medium  transition-all duration-300 hover:-translate-x-0.5 hover:-translate-y-0.5  hover:shadow-md ";

export default function Button({ children, onClick, type }: BtnProp) {
  if (type === "primary") {
    return (
      <div
        className={`${baseStyle} bg-amber-100 p-1.5 px-2 text-light-brown hover:text-dark-brown`}
      >
        <button onClick={onClick}>{children}</button>
      </div>
    );
  }

  if (type === "secondary") {
    return (
      <div
        className={`${baseStyle} bg-sage text-light-beige px-2 py-1 hover:text-stone-50`}
      >
        <button onClick={onClick}>{children}</button>
      </div>
    );
  }

  if (type === "small") {
    return (
      <div
        className={`${baseStyle} bg-stone-100 px-1 py-0.5 text-stone-500 hover:text-stone-800`}
      >
        <button onClick={onClick}>{children}</button>
      </div>
    );
  }
}
