import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import React from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  return (
    <header className="flex items-center justify-between p-4">
      <div onClick={() => { router.push('/home') }} className='text-center flex flex-col items-center duration-300 hover:opacity-40 cursor-pointer'>
        <img src="/images/trailfinder_logo_simple.png" alt="Logo" className="h-10 duration-100 hover:opacity-40" />
        <p className=''>TrailFinder</p>
      </div>

      {/* <form className="flex items-center">
        <div className="relative">
          <img src="/searchicon.png" alt="search" className="w-6 h-6 absolute top-0 left-0 mt-2 ml-2" />
          <input
            type="text"
            placeholder="Search for desired travel..."
            className="bg-white border border-gray-400 rounded-lg py-2 px-4 mr-4 pl-12 focus:border-green-500"
          />
        </div>
        <button className="bg-green-500 text-white rounded-full py-2 px-4">
          Search
        </button>
      </form> */}
      <div onClick={()=>{router.push('/home')}}className='flex items-center text-5xl font-extrabold duration-300 hover:opacity-40 cursor-pointer'>TrailFinder</div>
      <div className='text-center flex flex-col items-center'>
        <div className='duration-300 hover:opacity-40'>
          <img onClick={() => { router.push('/profile') }} src="/profilbilde.jpg" alt="Profile" className="w-12 h-12 rounded-full cursor-pointer duration-300 hover:opacity-40'" />
          <p className='text-sm'>profile</p>
        </div>
        <button onClick={() => { signOut(auth); router.push('/login'); }} className='btn btn-sm rounded-full bg-gray-400 hover:bg-gray-600 text-white'>Log out</button>

      </div>

    </header>
  );
};

export default Header;