import React from "react";
import Header from "./Header";
import Link from "next/link";

export default function Profile({setEdit}:any) {
  return (
    <>
      <Header />
      <div className="flex w-full p-4">
        <div className="w-4/5 p-4">
          <div className="flex justify-center items-center mb-4 ml-10 font-inter">
            <div className="w-1/4 h-40 border border-solid border-black mr-4">
              <img src="/profilbilde.jpg" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="text-3xl pb-2 font-bold">Kristine Eide Rapp</div>
              <div className="mb-2">
                <p className="text-m">Krapp</p>
              </div>
              <div className="mb-2">
                <p className="text-m">Kristrap@gmail.com</p>
              </div>
              <div className="mb-2 flex items-center">
                <i className="fa-solid fa-cake-candles"></i>
                <p className="text-sm">16.03.2001</p>
              </div>
              <div className="flex items-center">
                <div className="inline-flex mr-2">
                  <button onClick={() => setEdit(true)} className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-1 px-16 rounded text-xs flex items-center justify-center">
                    <span className="mx-auto">Edit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
