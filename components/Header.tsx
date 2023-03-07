import { signOut } from 'firebase/auth';
import React from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/firebase';

function Header() {
  const router = useRouter();

  async function logout() {
    await signOut(auth);
    router.replace('/login');
  }

  return (
    <header className="p-2 sm:p-4">
      <div className="flex justify-between">
        <button onClick={() => { router.push('/home'); }} type="button" className="text-center flex items-center duration-300 hover:opacity-40 cursor-pointer">
          <img src="/images/trailfinder_logo_simple.png" alt="Logo" className="h-20 duration-100 hover:opacity-40 mr-3" />
          <button
            type="button"
            onClick={() => { router.push('/home'); }}
            className="flex items-center
      text-3xl sm:text-5xl font-extrabold duration-100 hover:opacity-60 cursor-pointer"
          >
            TrailFinder
          </button>
        </button>
        <div className="text-center flex flex-col items-center justify-end">
          <button
            type="button"
            onClick={() => { router.push('/profile'); }}
            className="bg-neutral-50
          cursor-pointer border rounded-full p-3 duration-100 hover:opacity-60"
          >
            <i className="fa-solid fa-user" />
            <p className="text-xs">profile</p>
          </button>
          <button onClick={logout} type="button" className="btn btn-xs mt-1 rounded-full btn-primary text-white">Log out</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
