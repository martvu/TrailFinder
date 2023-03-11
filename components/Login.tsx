import { signInWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DataSnapshot, get, ref } from 'firebase/database';
import InputField from './Inputfield';
import { auth, db } from '../firebase/firebase';

export default function Login() {
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function login() {
    setError('');
    let usernameDBsnap : DataSnapshot | null;
    try {
      usernameDBsnap = await get(ref(db, `users/${email}`));
    } catch (e) {
      usernameDBsnap = null;
    }
    const userEmail = usernameDBsnap && usernameDBsnap.exists()
      ? usernameDBsnap.val() as string : email;
    try {
      await signInWithEmailAndPassword(auth, userEmail, password);
      console.log('Logged in');
      router.replace('/');
    } catch (e) {
      setError('Login failed. Try again.');
    }
  }
  return (
    <div className="w-96 max-h p-6 shadow-lg bg-neutral rounded-lg">
      <form onSubmit={(e) => {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        login();
      }}
      >
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
        <div className="w-full max-w-[30ch] h-3 pt-2 text-rose-500">
          {error && <p className="w-full">{error}</p>}
        </div>
        <div className="mt-5 flex justify-center">
          <button
            className="btn btn-primary text-white mt-2 flex justify-center rounded-md"
            type="submit"
          >
            Log in
          </button>
        </div>
      </form>

      <div className="mt-3 text-center text-sm text-gray-500">
        No account?
        {' '}
        <Link href="/signup" className="font-bold text-primary duration-300 hover:brightness-75">
          Sign-up
        </Link>
      </div>
    </div>
  );
}
