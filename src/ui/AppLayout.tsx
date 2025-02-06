import { Outlet, useMatches, useNavigation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Loader from "./Loader";
import { ReactNode, useState } from "react";
import Button from "../components/Button";
import { useSignOut } from "../services/useSignOut";

interface MatchHandle {
  navBtn: (string | ReactNode)[];
}

interface UIMatch {
  handle: MatchHandle;
}

export default function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const matches = useMatches();
  const currentMatch = matches[matches.length - 1] as UIMatch;
  const [showManual, setShowManual] = useState(false);

  const signOut = useSignOut();

  const shouldShowManual =
    currentMatch?.handle.navBtn[0] === "How to use HandDripper";

  return (
    <div className="relative">
      {isLoading && <Loader />}

      <NavBar>
        {
          <ul className="ml-auto mr-4 flex gap-3">
            {currentMatch?.handle.navBtn[0] !== "" && (
              <li className="relative flex w-fit">
                <button
                  className="font-bold text-light-brown transition-transform duration-200 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:text-dark-brown"
                  onClick={() => setShowManual(!showManual)}
                >
                  {currentMatch?.handle.navBtn[0]}
                </button>
              </li>
            )}
            <li>
              {currentMatch?.handle.navBtn[1] && (
                <Button type="primary" onClick={signOut}>
                  {currentMatch?.handle.navBtn[1]}
                </Button>
              )}
            </li>
          </ul>
        }
      </NavBar>

      {shouldShowManual && showManual && (
        <div
          className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-30 transition-opacity duration-500 ease-in-out"
          onClick={() => setShowManual(false)}
        >
          <div
            className="fixed top-16 mt-3 h-[55vh] w-[85vw] max-w-lg rounded border bg-slate-100 p-3 shadow-lg sm:right-3 sm:w-[45vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col">
              <button
                className="block self-start px-1 text-lg font-black"
                onClick={() => setShowManual(false)}
              >
                &times;
              </button>
              <p className="m-2 flex">Manual</p>
            </div>
          </div>
        </div>
      )}

      <main className="mt-16">
        <Outlet />
      </main>
    </div>
  );
}
