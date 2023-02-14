import React from "react"
import Image from "next/image"
import Header from "../login/header";

export default function Profile() {
    return (
        <>
            <Header />

            <div className="flex w-full">
      <div className="w-4/5 p-4">
        <div className="flex justify-between items-center mb-4">
          
          <div>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
              Edit Profile
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Username:</h2>
          <p>myusername</p>
        </div>
        <div className="mb-4">
          <h2 className="text-lg font-bold">Email:</h2>
          <p>user@example.com</p>
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