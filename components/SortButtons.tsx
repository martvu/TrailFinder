import React, { useState } from 'react'



interface sortOption {
  text: string;
  onClick?: () => void;
  isSelected: boolean;
}

export default function SortButtons() {
  const [sortBy, setSortBy] = useState("Recent Posts")

  /**Sorting options */
  const recommended: sortOption = {
    text: "Recommended",
    onClick: () => setSortBy("Recommended Posts"),
    isSelected: sortBy === "Recommended Posts"
  }
  const mostLiked: sortOption = {
    text: "Most Liked",
    onClick: () => setSortBy("Most Liked"),
    isSelected: sortBy === "Most Liked"
  }
  const recent: sortOption = {
    text: "Recent",
    onClick: () => setSortBy("Recent Posts"),
    isSelected: sortBy === "Recent Posts"
  }
  const alphabetical: sortOption = {
    text: "Alphabetical",
    onClick: () => setSortBy("Alphabetical"),
    isSelected: sortBy === "Alphabetical"
  }
  const sortOptions = [recommended, recent, mostLiked, alphabetical]


  return (
    <>

      <div className="px-2 flex items-center justify-between rounded-xl shadow-md min-w-full max-w-full h-12 bg-neutral">
         {/** Sort by Button*/}
        <div className=''>
          {
            <div className='flex flex-row z-10 rounded-lg'>
              {sortOptions.map((item, i) => (
                <div key={i} onClick={item.onClick} className= {`btn btn-xs btn-outline justify-start px-2 mr-2 ${item.isSelected ? 'btn-active' : ''}`} >
                  <h3 className=''>{item.text}</h3>
                </div>
              ))}
            </div>
          }
        </div>

      </div>
    </>
  )
}



