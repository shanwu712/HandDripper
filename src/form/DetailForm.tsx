import { Form } from "react-router-dom";
import Button from "../components/Button";
import StarRating from "./StarRating";

const methodOptions = ["Pulse Pouring", "Continuous Pouring", "Bloom and Pour"];

export default function DetailForm() {
  return (
    <div className="bg-light-beige/50 flex h-fit w-screen min-w-[30rem] flex-col rounded-lg px-2 py-2 shadow-lg sm:w-full">
      <Form className="space-y-2">
        <div className="flex w-full gap-2">
          <label className="text-nowrap text-lg font-medium">
            Brewing method
          </label>
          <input
            name="method"
            list="methodOptions"
            className="grow rounded-lg px-2 py-1 shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400/70"
          />
          <datalist id="methodOptions">
            {methodOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </datalist>
        </div>

        <StarRating />

        <div className="flex flex-col space-y-2 pb-2">
          <label className="w-16 text-nowrap text-lg font-medium">
            How is today's coffee?
          </label>
          <textarea
            name="comment"
            style={{ resize: "none" }}
            className="h-28 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400/70"
          ></textarea>
        </div>

        <Button type="primary">Done Dripping</Button>
      </Form>
    </div>
  );
}
