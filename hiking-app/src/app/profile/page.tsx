import React from "react"
import Header from "../login/header";
import Pictures from "./pictures";
import Navbar from "./navbar";
import Annonser from "./annonser";
import Link from "next/link";


export default function Profile() {
  return (
    <>
     <div className='bg-base-200'>
      <Header />
      <div className="flex p-4 bg-base-200 font-inherit">
        <div className="bg-base-100 flex items-center mb-4 ml-10 mr-10 rounded-lg w-full p-4">
          <img src="bruker.png" alt="User icon" className="w-32 h-32 mr-8" />
          <div>
            <div className="text-3xl pt-2 pb-2 font-bold">Kristine Eide Rapp</div>
            <div className="mb-2">
              <p className="text-m">Krapp</p>
            </div>
            <div className="mb-2">
              <p className="text-m">Kristrap@gmail.com</p>
            </div>
            <div className="mb-2 flex items-center">
              <img src="cake.png" alt="Birthday icon" className="w-4 h-4 mr-2" />
              <p className="text-sm">16.03.2001</p>
            </div>
            <div className="flex items-center">
              <div className="inline-flex mr-2 pb-4">
                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-16 rounded text-xs flex items-center justify-center ">
                  <Link href="/profile/edit"> <span className="mx-auto">Edit</span> </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pictures />
      </div>

    </>
  );
}