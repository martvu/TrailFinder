import React from "react"
import Header from "../login/header";
import Pictures from "./pictures";
import Navbar from "./navbar";
import Annonser from "./annonser";

export default function Profile() {
    return (
        <>
         <Header />
         <div className="flex w-full">
  <div className="w-4/5 p-4">
    <div className="flex items-center mb-4 font-family: 'Open Sans', sans-serif;">
      <img src="bruker.png" alt="User icon" className="w-28 h-28 mr-8" />
      <div>
        <h1 className="text-3xl">Kristine Eide Rapp</h1>
        <div className="mb-2">
          <p className="text-sm">krapp</p>
        </div>
        <div className="mb-2">
          <p className="text-sm">kristrap@gmail.com</p>
        </div>
        <div className="mb-2 flex items-center">
          <img src="cake.png" alt="Birthday icon" className="w-4 h-4 mr-2" />
          <p className="text-sm">23.06.1995</p>
        </div>
        <div className="flex items-center">
          <div className="inline-flex mr-2">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-2 rounded text-sm">
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

                    <Navbar />
                    <Pictures />
                </div>
                    <Annonser />
                
            </div>
        </>
    );
}