import React from "react"
import Image from "next/image"
import Header from "../login/header";

export default function Profile() {
    return (
        <>
            <Header />
            <div className="flex w-full">
  <div className="w-4/5 p-4">
    <div className="flex items-center mb-4 font-family: 'Open Sans', sans-serif;">
      <img src="bruker.png" alt="User icon" className="w-32 h-32 mr-4" />
      <div>
        <h1 className="text-2xl font-bold">Kristine Eide Rapp</h1>
        <div className="mb-4">
          <p className="text-lg">krapp</p>
        </div>
        <div className="mb-4">
          <p className="text-lg">kristrap@gmail.com</p>
        </div>
        <div className="flex items-center">
          <a href="#" className="text-gray-700 text-sm underline">Edit Profile</a>
        </div>
      </div>
    </div>
  </div>














                <div className="w-1/5 p-4">
                    <h2 className="text-lg font-bold mb-4">Sidebar Content</h2>
                    <ul>
                        <li>Link 1</li>
                        <li>Link 2</li>
                        <li>Link 3</li>
                    </ul>
                </div>
            </div>
        </>
    );
}