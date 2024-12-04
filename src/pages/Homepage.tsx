import Button from "../components/Button";

export default function Homepage() {
  return (
    <div className="h-[93vh] overflow-hidden bg-gray-300 bg-opacity-30 p-3">
      <div
        style={{ backgroundImage: "url(/home-bg.png)" }}
        className="flex h-full w-full justify-center bg-cover bg-center"
      >
        <div className=":w-[30vw] relative top-20 flex h-96 w-80 max-w-3xl flex-col items-center justify-center rounded-lg bg-white bg-opacity-80 py-6 shadow-lg sm:top-24 md:h-[50vh] md:w-[45vw] lg:h-[60vh] lg:w-[35vw] lg:gap-8">
          <div className="space-y-2 xl:space-y-6">
            <img
              className="m-auto h-20 rounded-full"
              src="/logo.png"
              alt="HandDripper"
            />
            <h2 className="xl:text-4xls text-2xl font-semibold">
              Sign in your account
            </h2>
          </div>

          <form className="mt-2 flex flex-col space-y-3 p-3 font-medium md:w-[50%]">
            <div className="flex flex-col">
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                name="email"
                required
                className="w-auto rounded"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password">Password</label>

              <input
                id="password"
                name="password"
                required
                className="w-auto rounded"
              />
              <a
                href="#"
                className="self-end text-sm font-normal text-indigo-600 hover:text-indigo-500"
              >
                Forgot password?
              </a>
            </div>
          </form>

          <div className="mt-3 flex w-3/5 flex-col items-center tracking-wider">
            <Button type="primary" to="/form">
              Start Dripping
            </Button>
            <a
              href="#"
              className="mt-1.5 text-sm font-normal text-indigo-600 hover:text-indigo-500 xl:mt-3"
            >
              Create an account
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
