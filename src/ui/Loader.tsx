import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="mt-4 flex w-full justify-center">
      <ThreeDots
        height="20"
        width="50"
        color="#AAB396"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
}
