import { auth, db } from "@/app/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import InputField from "../signup/components/inputfield";
import { DataSnapshot, get, ref } from "firebase/database";

export default function Login() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  async function login() {
    setError("");
    let usernameDBsnap : DataSnapshot | null;
    try {
      usernameDBsnap = await get(ref(db, 'users/' + email));
    } catch (error) {
      usernameDBsnap = null;
    }
    const userEmail = usernameDBsnap && usernameDBsnap.exists() ? usernameDBsnap.val() : email;
    try {
      await signInWithEmailAndPassword(auth, userEmail, password);
      console.log("Logged in");
      router.push('/profile');
    } catch (error) {
      setError("Login failed. Try again.");
    }
  }
  return (
    <div className="w-96 max-h p-6 shadow-lg bg-white rounded-lg">
      <form onSubmit={(e) => {
        e.preventDefault();
        login();
      }}>
        <h1 className="text-3xl block text-center font-bold text-primary">
          Login
        </h1>
        <InputField
          label="Username"
          type="text"
          placeholder="Enter username..."
          setInput={setEmail}
        />
        <InputField
          label="Password"
          type="password"
          placeholder="Enter password..."
          setInput={setPassword}
        />
        {error != "" ? <p className="text-red-500 mt-3">{error}</p> : null}
        <div className="mt-5 flex justify-center">
          <button
            className="btn btn-primary text-white mt-5 flex justify-center rounded-md"
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>

      <div className="mt-3 text-center text-sm text-gray-500">
        No account?{" "}
        <Link href="/login/signup" className="font-bold text-primary">
          Sign-up
        </Link>
      </div>
    </div>
  );
}
