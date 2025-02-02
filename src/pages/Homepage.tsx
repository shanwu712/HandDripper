import { useEffect, useState } from "react";
import Button from "../components/Button";
import supabase from "../services/supabase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Homepage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [hasLoggedIn, setHasLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const navigate = useNavigate();

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      toast.error(error.message);
    } else {
      setIsSignUp(false);
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/form");
    }
  }

  useEffect(() => {
    async function checkUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user) {
        setHasLoggedIn(true);
        setUserEmail(data.user.email || "");
      }
    }
    checkUser();
  }, []);

  return (
    <div className="h-[93vh] overflow-hidden bg-gray-300 bg-opacity-30 p-3">
      <div
        style={{ backgroundImage: "url(/home-bg.png)" }}
        className="flex h-full w-full justify-center bg-cover bg-center"
      >
        <div
          className={`relative top-20 flex h-96 w-80 max-w-3xl flex-col items-center justify-center rounded-lg bg-white bg-opacity-80 py-6 shadow-lg sm:top-24 md:h-[50vh] md:w-[45vw] lg:h-[60vh] lg:w-[35vw] lg:gap-5 ${hasLoggedIn && "h-fit w-fit max-w-[92vw] sm:h-fit sm:w-fit md:h-fit md:w-fit lg:h-fit lg:w-fit"}`}
        >
          <div className="space-y-2 xl:space-y-6">
            <img
              className="m-auto h-20 rounded-full"
              src="/logo.png"
              alt="HandDripper"
            />
            {hasLoggedIn ? (
              <h2 className="text-nowrap px-6 text-xl font-semibold sm:text-2xl">{`Log out of ${userEmail}?`}</h2>
            ) : (
              <h2 className="text-2xl font-semibold">
                {isSignUp ? "Create an account" : "Sign in your account"}
              </h2>
            )}
          </div>

          {hasLoggedIn ? (
            <div className="mt-3 w-1/2">
              <Button type="primary">Log out</Button>
            </div>
          ) : (
            <>
              <form
                onSubmit={isSignUp ? handleSignUp : handleLogin}
                className="mt-2 flex flex-col space-y-3 p-3 font-medium md:w-[50%]"
              >
                <div className="flex flex-col">
                  <label htmlFor="email">Email address</label>
                  <input
                    id="email"
                    name="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-auto rounded focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="password">Password</label>

                  <input
                    id="password"
                    name="password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-auto rounded focus:outline-none focus:ring-2 focus:ring-blue-400/70"
                  />
                  {/* {!isSignUp && (
                <a
                  href="#"
                  className="self-end text-sm font-normal text-indigo-600 hover:text-indigo-500"
                >
                  Forgot password?
                </a>
              )} */}
                </div>
              </form>

              <div className="mt-3 flex w-3/5 flex-col items-center tracking-wider">
                <Button
                  type="primary"
                  to="/form"
                  onClick={isSignUp ? handleSignUp : handleLogin}
                >
                  {isSignUp ? "Sign Up" : "Start Dripping"}
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
            </>
          )}
        </div>
      </div>
    </div>
  );
}
