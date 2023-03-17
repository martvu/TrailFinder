import React from 'react';

export default function Searchbar () {
  return (
    <form className="flex items-center mx-auto ml-32 mr-32">
    <div className="relative">
      <img src="/searchicon.png" alt="search" className="w-6 h-6 absolute top-0 left-0 mt-2 ml-2" />
      <input
        type="text"
        placeholder="Search for desired travel..."
        className="bg-white border border-gray-400 rounded-full py-2 px-32 mr-4 pl-12 focus:border-green-500"
      />
    </div>
    <button className="bg-green-500 text-white rounded-full py-2 px-4">
      Search
    </button>
  </form>
  );
}
