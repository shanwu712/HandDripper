import { useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h2>Something went wrong...</h2>
      <p></p>
    </div>
  );
}
