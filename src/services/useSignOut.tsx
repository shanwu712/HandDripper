import toast from "react-hot-toast";
import Button from "../components/Button";
import { signOut } from "./apiUser";
import { useNavigate } from "react-router-dom";
import useCheckUser from "./useCheckUser";

export function useSignOut() {
  const navigate = useNavigate();
  const { refetch } = useCheckUser();
  return () => {
    console.log("wut");
    toast.custom(
      (t) => (
        <div className="absolute top-2 flex flex-col items-center gap-5 rounded-lg bg-white p-5 shadow-lg">
          <p className="text-lg font-medium">Do you want to log out?</p>
          <div className="flex gap-3">
            <Button
              type="secondary"
              onClick={() => {
                signOut();
                toast.remove(t.id);
                refetch();
                navigate("/");
              }}
            >
              Yes
            </Button>
            <Button type="primary" onClick={() => toast.remove(t.id)}>
              Cancel
            </Button>
          </div>
        </div>
      ),
      { duration: 30000 },
    );
  };
}
