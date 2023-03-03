import React, { useState } from 'react'

export function HeartButton() {
    const [isLiked, setIsLiked] = useState(false);
  
    function handleClick() {
      setIsLiked((prevIsLiked: boolean) => !prevIsLiked);
    }
  
    return (
      <div>
        <button
          className={``}
          onClick={handleClick}
        >
          {isLiked && <i className='fa-regular fa-heart text-neutral btn btn-error btn-sm btn-circle'></i>}
          {!isLiked && <i className='fa-regular fa-heart btn btn-neutral btn-sm btn-circle'></i>}
        </button>
      </div>
    );
  }

  
  
  