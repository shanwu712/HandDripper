import Button from "../components/Button";

export default function Homepage() {
  return (
    <div className="h-[92vh] overflow-hidden bg-gray-300 bg-opacity-30 p-3">
      <div
        style={{ backgroundImage: "url(/home-bg.png)" }}
        className="h-full w-full bg-cover bg-center"
      >
        <div className="relative left-20 top-14 flex h-96 w-80 flex-col items-center justify-center rounded-lg bg-white bg-opacity-80 py-6 shadow-lg xl:h-[50vh] xl:w-[30vw]">
          <div className="space-y-2 xl:space-y-6">
            <img
              className="m-auto h-20 rounded-full"
              src="/logo.png"
              alt="HandDripper"
            />
            <h2 className="text-2xl font-semibold">Sign in your account</h2>
          </div>

          <form className="mt-2 flex flex-col space-y-3 p-3 font-medium xl:w-[50%]">
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

          <div className="mt-3 flex flex-col items-center">
            <Button type="primary">Start Dripping</Button>
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
