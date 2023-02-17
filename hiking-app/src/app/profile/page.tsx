import React from "react"
import Header from "../login/header";
import Pictures from "./pictures";
import Navbar from "./navbar";
import Annonser from "./annonser";

export default function Profile() {
    return (
        <>
            <Header />
            <div className="flex w-full p-4">
  <div className="w-4/5 p-4">
    <div className="flex items-center mb-4 ml-10 font-inter; ">
      <img src="bruker.png" alt="User icon" className="w-32 h-32 mr-8" />
      <div>
        <div className="text-3xl pb-2 font-bold">Kristine Eide Rapp</div>
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
          <div className="inline-flex mr-2">
            <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-16 rounded text-xs flex items-center justify-center">
              <span className="mx-auto">Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>



                    <Navbar />
                    <Pictures />
                </div>
                <Annonser />

            </div >
        </>
    );
}