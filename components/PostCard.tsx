import React, { useState } from 'react';
import { PostData } from 'hooks/PostData';
import { useFetchUser } from 'context/AuthContext';
import Image from 'next/image';
import HeartButton from './HeartButton';
import OptionMenu from './OptionMenu';

type PostProps = {
  post: PostData,
};

export default function PostCard({ post }: PostProps) {
  const [isDeleted, setIsDeleted] = useState(false);
  const {
    title, price, rating, date, username, length, stops, description, likedBy,
  } = post;
  const { userData } = useFetchUser();
  const [isLiked, setIsLiked] = useState(likedBy?.includes(userData.username));

  if (isDeleted) {
    return null;
  }
  return (
    <div className="card card-side shadow-md min-w-full max-w-full max-h-64 min-h-64 mb-2 bg-neutral">

      <div className="flex w-full">

        {/* left section */}
        <div className="h-64 min-h-full w-1/6 flex items-center flex-col pt-5">
          <div className="p-5 flex justify-center items-center border border-solid rounded-full w-12 h-12 ">
            <i className="fa-solid fa-user fa-2x" />
          </div>
          <p className="card-title flex text-sm opacity-90 ">
            {username}
          </p>
          <div className="text-xs">
            {date.toDate().toLocaleDateString().replace(',', '')}
          </div>

          <div className="max-w-20 w-20 m-3">
            <Image
              src="/images/bg_trailfinder.png"
              alt="Picture of the trip"
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="relative card-body w-3/6">
          <OptionMenu setIsDeleted={setIsDeleted} post={post} className="z-10 absolute bottom-0 right-0 m-2" />
          <h2 className="card-title font-extrabold absolute top-2">{title}</h2>

          {/* stops */}
          <div className="flex pt-6">
            <div className="flex">
              <p className="font-bold mr-2">Stops:</p>
              <div>
                { /* A user may want to stop at the same place multiple times */ }
                {stops && stops.length > 0 && stops.map((stop, index) => (
                  // eslint-disable-next-line react/no-array-index-key
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

          <HeartButton
            setIsLiked={setIsLiked}
            isLiked={isLiked}
            post={post}
            className="absolute bottom-0 right-0 m-2"
          />

        </div>
      </div>
    </div>
  );
}
