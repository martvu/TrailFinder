import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-base-100 w-full rounded-lg">
        <div className="flex justify-center items-center py-4 shadow-md">
          <a href="#" className="mr-40 text-gray-600 hover:text-gray-900 font-sans font-medium text-lg">
            Profile
          </a>
          <a href="#" className="mr-40 text-gray-600 hover:text-gray-900 font-sans font-medium text-lg">
            Favorites
          </a>
          <a href="#" className="text-gray-600 hover:text-gray-900 font-sans font-medium text-lg">
            Rated
          </a>
        </div>
      </nav>
      
    );
};


export default Navbar;