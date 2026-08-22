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
    <div className="relative h-[93vh] overflow-hidden bg-ink">
      <div
        style={{ backgroundImage: "url(/home-bg.png)" }}
        className="absolute inset-0 bg-cover bg-center opacity-80"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/70 to-ink/85" />

      <div className="relative flex h-full w-full items-center justify-center p-3">
        {isCheckingUser ? (
          <Loader width={100} />
        ) : (
          <div
            className={`relative flex h-fit min-h-fit w-80 min-w-20 max-w-3xl flex-col items-center rounded-3xl border border-white/60 bg-white/95 px-8 py-9 shadow-2xl sm:w-[26rem] ${userId && "w-fit max-w-[92vw] px-10 sm:w-fit"}`}
          >
            <img
              className="h-[4.5rem] w-[4.5rem] rounded-full object-cover shadow-md"
              src="/logo.png"
              alt="HandDripper"
            />

            <div className="mt-4 space-y-1 text-center">
              {userEmail !== "" && userId ? (
                <div className="flex flex-col items-center gap-1">
                  <h2 className="text-nowrap px-6 font-serif text-xl font-semibold sm:text-2xl">
                    Log out of
                  </h2>
                  <h2 className="text-nowrap px-6 font-serif text-xl font-semibold sm:text-2xl">
                    {userEmail}?
                  </h2>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-2xl font-semibold">
                    Welcome back
                  </h2>
                  <p className="text-sm text-ink-muted">
                    Sign in to log today's brew
                  </p>
                </>
              )}
            </div>

            {userId ? (
              <div className="mt-6 w-2/3 space-y-2">
                <Button type="primary" onClick={() => navigate("/form")}>
                  Start Dripping
                </Button>
                <Button type="secondary" onClick={signOut}>
                  Log out
                </Button>
              </div>
            ) : (
              <>
                <div className="mt-7 flex w-full items-center gap-6 border-b border-dark-beige">
                  <button
                    type="button"
                    onClick={() => setIsSignUp(false)}
                    className={`-mb-px border-b-2 pb-2.5 text-[15px] font-semibold transition-colors ${
                      !isSignUp
                        ? "border-light-brown text-light-brown"
                        : "border-transparent text-ink-muted hover:text-ink"
                    }`}
                  >
                    Sign in
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsSignUp(true)}
                    className={`-mb-px border-b-2 pb-2.5 text-[15px] font-semibold transition-colors ${
                      isSignUp
                        ? "border-light-brown text-light-brown"
                        : "border-transparent text-ink-muted hover:text-ink"
                    }`}
                  >
                    Create account
                  </button>
                </div>

                <form
                  ref={formRef}
                  onSubmit={isSignUp ? handleSignUp : handleLogin}
                  className="mt-6 flex w-full flex-col items-center gap-4 font-medium"
                >
                  <div className="flex w-full flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="text-[13px] font-semibold uppercase tracking-wide text-ink-muted"
                    >
                      Email address
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue=""
                      required
                      className="w-auto rounded-xl border border-dark-beige bg-light-beige px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-light-brown/40"
                    />
                  </div>

                  <div className="flex w-full flex-col gap-1.5">
                    <span className="flex items-center gap-1 whitespace-nowrap">
                      <label
                        htmlFor="password"
                        className="text-[13px] font-semibold uppercase tracking-wide text-ink-muted"
                      >
                        Password
                      </label>
                      {isSignUp && (
                        <p className="text-xs normal-case text-ink-muted">
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
                      className="w-auto rounded-xl border border-dark-beige bg-light-beige px-3.5 py-2.5 text-[15px] focus:outline-none focus:ring-2 focus:ring-light-brown/40"
                    />
                  </div>

                  <div className="mt-2 flex w-full flex-col items-center">
                    <Button type="primary" disabled={isLoading}>
                      {isLoading
                        ? "Loading..."
                        : isSignUp
                          ? "Sign Up"
                          : "Start Dripping"}
                    </Button>
                  </div>
                </form>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
