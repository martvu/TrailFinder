import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import React from 'react';
import { useRouter } from 'next/navigation';

const Header = () => {
  const router = useRouter();

  async function logout() {
    await signOut(auth);
    router.replace('/login'); 
  }

  return (
    <header className="sm:p-4">
      <div className='flex items-center justify-between '>
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
        <div onClick={() => { router.push('/home') }} className='flex items-center 
      text-3xl sm:text-5xl font-extrabold duration-300 hover:opacity-40 cursor-pointer'>
          TrailFinder</div>
        <div className='text-center flex flex-col items-center'>
          <div onClick={() => { router.push('/profile') }} className='cursor-pointer border rounded-full duration-300 hover:opacity-40 p-3'>
            <i className="fa-solid fa-user"></i>
            <p className='text-sm'>profile</p>
          </div>
          <button onClick={logout} className='btn btn-sm rounded-full bg-green-500 hover:opacity-40 duration-300 text-white'>Log out</button>
        </div>
      </div>
    </header>
  );
};

export default Header;