import { login } from "@/lib/action";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="max-w-sm w-full p-6 border border-gray-200 rounded-lg shadow-lg bg-white">
        <h1 className="font-semibold text-xl text-center">
          Sign in to your account
        </h1>
        <form className="mt-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="block border border-gray-300 px-3 py-2 rounded-md w-full focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              className="block border border-gray-300 px-3 py-2 rounded-md w-full focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full font-semibold text-sm bg-blue-500 text-white rounded-md py-2 cursor-pointer hover:bg-blue-600"
          >
            Sign in
          </button>
        </form>
        <p className="my-4 text-center text-gray-600">Or</p>
        <button
          onClick={login}
          aria-label="Sign in with GitHub"
          className="w-full text-sm border border-gray-300 rounded-md py-2 cursor-pointer hover:bg-gray-100 flex items-center justify-center"
        >
          <span>Sign in with GitHub</span>
        </button>
      </div>
    </div>
  );
}
