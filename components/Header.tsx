/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { signOut } from 'firebase/auth';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { auth } from '../firebase/firebase';
import DarkModeButton from './ToggleDark';
import logo from '../public/images/trailfinder_logo_simple.png';
import SearchBar from './SearchBar';

function Header() {
  const router = useRouter();

  async function logout() {
    await signOut(auth);
    router.replace('/login');
  }

  return (
    <header className="p-2 sm:p-4">
      <div className="flex justify-between">
        <button onClick={() => { router.push('/'); }} type="button" className="text-center flex items-center duration-300 hover:opacity-40 cursor-pointer">
          <Image
            src={logo}
            alt="Logo"
            className="h-20 w-14 duration-100 hover:opacity-40 mr-3"
          />
          <div
            onClick={() => { router.push('/'); }}
            className="flex items-center
          text-3xl sm:text-5xl font-extrabold duration-100 hover:opacity-60 cursor-pointer"
          >
            TrailFinder
          </div>
        </button>
        <SearchBar />

        <div className="text-center flex flex-row items-center justify-end mt-2">
          <DarkModeButton />
        </div>

        <div className="text-center flex flex-col items-center justify-end mt-2">
          <div
            onClick={() => { router.push('/profile'); }}
            className="bg-neutral
          cursor-pointer border rounded-full p-3 duration-100 hover:opacity-60"
          >
            <i className="fa-solid fa-user" />
            <p className="text-xs">profile</p>
          </div>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <button type="button" onClick={logout} className="btn btn-xs mt-1 rounded-full btn-primary text-white">Log out</button>
        </div>
      </div>
    </header>
  );
}

export default Header;
