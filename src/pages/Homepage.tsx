import { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import supabase from "../services/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSignOut } from "../services/useSignOut";
import useCheckUser from "../services/useCheckUser";
import Loader from "../ui/Loader";
import useUser from "../useUser";
import { getUser } from "../services/apiUser";

export default function Homepage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);
  const { user, isLoading: isCheckingUser } = useCheckUser();
  const { userId, setUserId } = useUser();

  const navigate = useNavigate();

  const signOut = useSignOut();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const email = formRef.current?.email.value;
    const password = formRef.current?.password.value;
    const { error } = await supabase.auth.signUp({ email, password });
    setIsLoading(false);

    if (error) {
      toast.error(
        error.message.charAt(0).toUpperCase() + error.message.slice(1),
      );
    } else {
      setIsSignUp(false);
      toast.success(
        (t) => (
          <div className="flex gap-1">
            <span>
              Your account has been created successfully! Please go check your
              email and click the link to verify and activate your account!
            </span>
            <div className="w-fit self-center">
              <Button type="secondary" onClick={() => toast.dismiss(t.id)}>
                Dismiss
              </Button>
            </div>
          </div>
        ),
        { duration: Infinity },
      );
    }
    formRef.current?.reset();
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const email = formRef.current?.email.value;
    const password = formRef.current?.password.value;

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      toast.error(
        error.message.charAt(0).toUpperCase() + error.message.slice(1),
      );
    } else {
      // 更新 UserContext 中的 userId
      const user = await getUser();
      if (user) setUserId(user?.id);

      navigate("/form");
    }

    formRef.current?.reset();
  }

  useEffect(() => {
    if (!isCheckingUser && user) {
      setUserEmail(user?.email || "");
    }
  }, [user, isCheckingUser]);

  return (
    <div className="h-[93vh] overflow-hidden bg-gray-300 bg-opacity-30 p-3">
      <div
        style={{ backgroundImage: "url(/home-bg.png)" }}
        className="flex h-full w-full justify-center bg-cover bg-center"
      >
        {isCheckingUser ? (
          <Loader width={100} />
        ) : (
          <div
            className={`relative top-20 flex h-96 min-h-fit w-80 min-w-20 max-w-3xl flex-col items-center justify-center rounded-lg bg-white bg-opacity-80 py-6 shadow-lg sm:top-24 md:h-[50vh] md:w-[45vw] lg:h-[60vh] lg:w-[35vw] lg:gap-5 ${userId && "h-fit w-fit max-w-[92vw] sm:h-fit sm:w-fit md:h-fit md:w-fit lg:h-fit lg:w-fit"}`}
          >
            <div className="space-y-2 xl:space-y-6">
              <img
                className="m-auto h-20 rounded-full"
                src="/logo.png"
                alt="HandDripper"
              />
              {userEmail !== "" && userId ? (
                <div className="flex flex-col items-center space-y-2">
                  <h2 className="text-nowrap px-6 text-xl font-semibold sm:text-2xl">
                    Log out of
                  </h2>
                  <h2 className="text-nowrap px-6 text-xl font-semibold sm:text-2xl">
                    {userEmail}?
                  </h2>
                </div>
              ) : (
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">
                    {isSignUp ? "Create an account" : "Sign in your account"}
                  </h2>
                </div>
              )}
            </div>

            {userId ? (
              <div className="mt-3 w-2/3 space-y-2">
                <Button type="primary" onClick={() => navigate("/form")}>
                  Start Dripping
                </Button>
                <Button type="secondary" onClick={signOut}>
                  Log out
                </Button>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={isSignUp ? handleSignUp : handleLogin}
                className="mt-2 flex w-[80%] flex-col items-center space-y-3 p-3 font-medium sm:space-y-6"
              >
                <div className="flex w-5/6 flex-col sm:w-2/3">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue=""
                    required
                    className="w-auto rounded focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                  />
                </div>

                <div className="relative flex w-5/6 flex-col sm:w-2/3">
                  <span className="flex items-center gap-1 whitespace-nowrap">
                    <label htmlFor="password">Password</label>
                    {isSignUp && (
                      <p className="text-sm text-gray-600">
                        (at least 6 characters)
                      </p>
                    )}
                  </span>

                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="off"
                    defaultValue=""
                    required
                    className="w-auto rounded focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                  />
                </div>

                <div className="flex w-full flex-col items-center pt-4 sm:w-5/6">
                  <Button type="primary" disabled={isLoading}>
                    {isLoading
                      ? "Loading..."
                      : isSignUp
                        ? "Sign Up"
                        : "Start Dripping"}
                  </Button>
                  <a
                    href="#"
                    className="mt-1.5 text-sm font-normal text-indigo-600 hover:text-indigo-500 xl:mt-3"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsSignUp(!isSignUp);
                    }}
                  >
                    {isSignUp ? "Sign in your account" : "Create an account"}
                  </a>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
