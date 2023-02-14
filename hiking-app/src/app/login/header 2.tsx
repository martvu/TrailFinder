import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-300 flex items-center justify-between p-4">
      <img src="/logo.png" alt="Logo" className="w-20" />
      <form className="flex items-center">
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
      </form>
      <img src="/profilbilde.jpg" alt="Profile" className="w-12 h-12 rounded-full" />
    </header>
  );
};

export default Header;