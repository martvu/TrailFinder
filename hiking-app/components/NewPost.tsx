import React from 'react'

export default function NewPost() {
  return (
    <div>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
    <div className="modal"> {/* Opprett innlegg boks */}
      <div className="modal-box relative h-4/5 w-full max-w-5xl">
        <h1> Opprett innlegg </h1>
        <div className="divider"></div> 
        <div className="flex flex-row">
          <div className="flex flex-col w-2/5">
            <div className="flex flex-row place-items-center h-full">
              <img src="/blank-profile-picture-973460_1280.webp" className="w-10 h-10"/> {/*sett  inn profilbilde*/} 
              <div className="opprett-info p-1"> Karl
                {/* importer navn på brukeren*/}
              </div>
            </div>
          </div>
          <div className="flex flex-col w-3/5">
            <div className="opprett-info">
              Price: <input type="text" id="tripPrice" name="tirpPrice" placeholder='price'></input>
            </div>
            <div className="opprett-info">
              Country:
            </div>
            <div className="addStops">
              <div className="opprett-info">
                Add stops: <button className="btn btn-xs rounded-full">+</button>
              </div>
            </div>
            <textarea className="textarea textarea-bordered w-full" placeholder="Tell about your trip!"></textarea>
          </div>
          <label htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
        </div>
      </div>
    </div>
    </div>
  )
}


