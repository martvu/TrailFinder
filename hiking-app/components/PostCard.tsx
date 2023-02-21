import React from 'react'

export default function PostCard() {
  return (
    <div className="card card-side bg-base-100 shadow-md min-w-full max-w-full ">
    <div className="flex w-full lg:flex-row min-w-full h-64 bg-base 300">
    <section className="flex lg:flex-col bg-base 300">
    <div>
    <img src="/profilbilde.jpg" alt="Profile" className="w-20 h-20 p-2 overflow-hidden " />
    </div>
    </section>

      <div className="card-body max-w-3/4">
        <h2 className="card-title">New movieaaaaaaa!</h2>
        <p>Click the button to watch on Jetflix app.</p>
        <div className="card-actions">
        <a href="#" className="font-bold text-green-500 hover:text-green-700">
          Les mer
        </a>
        </div>
      </div>
      
      <div className="divider lg:divider-horizontal"></div> {/*divider*/}
      <div className="flex flex-col w-1/4 h-full pr-4 p-5 gap-5 ">
        <div>
          Pris:
          </div>
        <div>
        Likes:
          </div>
      </div>
    </div>
  </div>
  )
}


