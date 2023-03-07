import React, { useState } from 'react';
import { PostData } from 'hooks/PostData';
import Image from 'next/image';
import UtilityButtons from './UtilityButtons';

type PostProps = {
  post: PostData
};

export default function PostCard({ post }: PostProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  const {
    title, price, rating, date, username, length, stops, description,
  } = post;

  if (isDeleted) {
    return null;
  }
  return (
    <div className="card card-side shadow-md min-w-full max-w-full max-h-64 min-h-64 bg-neutral-50">

      <div className="flex w-full">

        {/* left section */}
        <div className="h-64 min-h-full w-1/6 flex items-center flex-col pt-5">
          <div className="p-5 flex justify-center items-center border border-solid rounded-full w-12 h-12 border-black">
            <i className="fa-solid fa-user fa-2x" />
          </div>
          <p className="card-title flex text-sm opacity-90 ">
            {username}
          </p>

          <div className="max-w-20 w-20 m-3">
            <Image src="./images/bg_trailfinder.png" alt="BackgroundPic" />
          </div>
        </div>

        <UtilityButtons setIsDeleted={setIsDeleted} post={post} className="absolute bottom-0 left-0 m-2" />
        <div className="card-body w-3/6">
          <h2 className="card-title font-extrabold absolute top-2">{title}</h2>

          {/* stops */}
          <div className="flex pt-6">
            <div className="flex">
              <p className="font-bold mr-2">Stops:</p>
              <div>
                {stops && stops.length > 0 && stops.map((stop, index) => (
                  <span className="text-sm list-none pr-1" key={index}>
                    <i className="fa-solid fa-map-pin mr-1 text-accent" />
                    {stop}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="max-w-sm sm:max-w-full">
            <span className="font-bold">Description</span>
            <div className="max-w-full break-words">{description}</div>
          </div>

          {/* <div className="card-actions bg-base300">
            <a href="#" className="font-bold text-green-500 hover:text-green-700 absolute bottom-2">
              Read more
            </a>
          </div> */}

        </div>

        {/* right section */}
        <div className="max-w-sm flex relative border-l-2 border-0 border-solid flex-col w-1/5 h-full pr-4 p-3 gap-2 ">
          <div>
            <span className="font-bold">Price: </span>
            {' '}
            {price}
          </div>
          <div>
            <span className="font-bold">Rating: </span>
            {' '}
            {rating}
          </div>
          <div>
            <span className="font-bold">Trip length: </span>
            <div>{length}</div>
          </div>

          <div className="text-sm absolute bottom-0 left-0 p-2">
            {date.toDate().toLocaleDateString().replace(',', '')}
          </div>

        </div>
      </div>
    </div>
  );
}
