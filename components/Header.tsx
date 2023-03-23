/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { signOut } from 'firebase/auth';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import useFetchPicture from 'hooks/fetchPictures';
import { auth } from '../firebase/firebase';
import DarkModeButton from './ToggleDark';
import logo from '../public/images/trailfinder_logo_simple.png';

function Header() {
  const router = useRouter();
  const { profilePicture } = useFetchPicture();

  async function logout() {
    await signOut(auth);
    router.replace('/login');
  }

  return (
    <header className="p-2 md:p-4">
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
        {/* <Searchbar /> */}

        <div className="text-center flex flex-row items-center justify-end mt-2">
          <DarkModeButton />
          <div className="flex flex-col ml-3">
            <div
              className="avatar cursor-pointer mb-2 ml-1 duration-100 hover:opacity-60"
              onClick={() => { router.push('/profile'); }}
            >
              <div className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {profilePicture ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profilePicture} alt="Profile" className="rounded-full w-14 h-14 object-cover" />
                ) : (
                  <i className="fa-solid fa-user fa-2x mt-2" />
                )}

              </div>
            </div>
            {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <button type="button" onClick={logout} className="btn btn-xs mt-1 w-16 px-0 rounded-full btn-primary text-neutral">Log out</button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
