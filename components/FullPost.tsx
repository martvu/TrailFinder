import React from 'react';
import { PostData } from 'hooks/PostData';
import Image from 'next/image';

interface Props {
  post: PostData;
}
export default function FullPost({ post }: Props) {
  return (
    <>
      <input type="checkbox" id={`my-modal-3${post.id}`} className="modal-toggle overflow-hidden no-scrollbar" />
      <div className="modal overflow-hidden no-scrollbar">
        <div className="modal-box relative w-11/12 max-w-full max-h-full no-scrollbar h-4/5">
          {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
          <label htmlFor={`my-modal-3${post.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <div className="card card-side shadow-md min-w-full max-w-full h-full mb-2 bg-neutral no-scrollbar relative">

            <div className="flex relative">

              {/* left section */}
              <div className="w-1/6 h-1/2 flex flex-col space-x-2 items-center">
                <div className="p-5 flex justify-center items-center border border-solid rounded-full w-24 h-24 ">
                  <i className="fa-solid fa-user fa-2x text-l" />
                </div>
                <p className="card-title text-sm opacity-90 ">
                  {post.username}
                </p>
                <div className="text-xs">
                  {post.date.toDate().toLocaleDateString().replace(',', '')}
                </div>
                <Image
                  src="/images/bg_trailfinder.png"
                  alt="Picture of the trip"
                  width={200}
                  height={200}
                  className="pt-3"
                />
              </div>
              <div className="relative card-body w-3/6">

                <h2 className="card-title font-extrabold absolute top-2">{post.title}</h2>

                {/* stops */}
                <div className="flex pt-6">
                  <div className="flex">
                    <p className="font-bold mr-2">Stops:</p>
                    <div>
                      { /* A user may want to stop at the same place multiple times */ }
                      {post.stops && post.stops.length > 0 && post.stops.map((stop, index) => (
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
                  <div className="max-w-full break-words">{post.description}</div>
                </div>
              </div>

              {/* right section */}
              <div className="max-w-sm flex relative border-l-2 border-0 border-solid flex-col w-1/5 h-full pr-4 p-3 gap-2 ">
                <div>
                  <span className="font-bold">Price: </span>
                  {' '}
                  {post.price}
                </div>
                <div>
                  <span className="font-bold">Rating: </span>
                  {' '}
                  {post.rating}
                </div>
                <div>
                  <span className="font-bold">Trip length: </span>
                  <div>{post.length}</div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
