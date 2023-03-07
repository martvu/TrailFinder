import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import React from 'react';
import { useRouter } from 'next/navigation';
import DarkModeButton from './ToggleDark';

const Header = () => {
  const router = useRouter();

  async function logout() {
    await signOut(auth);
    router.replace('/login'); 
  }

  return (
    <header className="p-2 sm:p-4">
      <div className='flex justify-between'>
        <div onClick={() => { router.push('/home') }} className='text-center flex items-center duration-300 hover:opacity-40 cursor-pointer'>
          <img src="/images/trailfinder_logo_simple.png" alt="Logo" className="h-20 duration-100 hover:opacity-40 mr-3" />
          <div onClick={() => { router.push('/home') }} className='flex items-center 
          text-3xl sm:text-5xl font-extrabold duration-100 hover:opacity-60 cursor-pointer'>
            TrailFinder
          </div>
        </div>

        
        <div className="flex items-center ">
          <DarkModeButton />
        </div>

        <div className='text-center flex flex-col items-center justify-end mt-2'>
          <div onClick={() => { router.push('/profile') }} className='bg-neutral 
          cursor-pointer border rounded-full p-3 duration-100 hover:opacity-60'>
            <i className="fa-solid fa-user"></i>
            <p className='text-xs'>profile</p>
          </div>
          <button onClick={logout} className='btn btn-xs mt-1 rounded-full btn-primary text-white'>Log out</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
