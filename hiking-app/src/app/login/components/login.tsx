import Link from "next/link";

export default function Login() {
    return (
        <div className="w-96 max-h p-6 shadow-lg bg-white rounded-lg">
            <h1 className="text-3xl block text-center font-bold text-green-500">
                Login
            </h1>
            <div className="mt-3">
                <label className="block text-base mb-2" htmlFor="username">
                    Username
                </label>
                <input
                    className="border w-full text-base px-2 py-1"
                    type="text"
                    id="username"
                    placeholder="Enter username..."
                />
            </div>
            <div className="mt-3">
                <label className="block text-base mb-2" htmlFor="password">
                    Password
                </label>
                <input
                    className="border w-full text-base px-2 py-1"
                    type="password"
                    id="password"
                    placeholder="Enter password..."
                />
            </div>
            <div className="mt-5 flex justify-center">
                <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md"
                    type="submit"
                >
                    Log in
                </button>
            </div>
            <div className="mt-3 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link href='/login/signup' className="font-bold text-green-500 hover:text-green-700"> Sign-up
                </Link>
            </div>
        </div>
    )
}