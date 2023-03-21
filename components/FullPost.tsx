import React from 'react';
import { PostData } from 'hooks/PostData';
import Image from 'next/image';

interface Props {
  // eslint-disable-next-line react/require-default-props
  className?: string;
  posto: PostData;
}

export default function FullPost({
  className, posto,
}: Props) {
  return (
    <>
      <label htmlFor={`my-modal-3${posto.id}`} className={className}>
        see more
      </label>
      <input type="checkbox" id={`my-modal-3${posto.id}`} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative w-11/12 max-w-full max-h-full  h-4/5">
          <label htmlFor={`my-modal-3${posto.id}`} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          <div className="card card-side shadow-md min-w-full max-w-full h-full mb-2 bg-neutral">

            <div className="flex w-full">

              {/* left section */}
              <div className="h-64 min-h-full w-1/6 flex justify-items-center flex-col pt-5 pl-40 ">
                <div className="p-5 flex justify-center items-center border border-solid rounded-full w-12 h-12 ">
                  <i className="fa-solid fa-user fa-2x" />
                </div>
                <p className="card-title flex text-xl opacity-90 h-1/5 ">
                  {posto.username}
                </p>
                <div className="text-xl">
                  {posto.date.toDate().toLocaleDateString().replace(',', '')}
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

                <h2 className="card-title font-extrabold absolute text-3xl top-2">{posto.title}</h2>

                {/* stops */}
                <div className="flex pt-6">
                  <div className="flex">
                    <p className="font-bold mr-2 text-3xl">Stops:</p>
                    <div>
                      { /* A user may want to stop at the same place multiple times */ }
                      {posto.stops && posto.stops.length > 0 && posto.stops.map((stop, index) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <span className="text-2xl list-none pr-1" key={index}>
                          <i className="fa-solid fa-map-pin mr-1 text-accent text-2xl" />
                          {stop}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="max-w-sm sm:max-w-full">
                  <span className="font-bold text-3xl">Description</span>
                  <div className="max-w-full break-words text-2xl">{posto.description}</div>
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
                  {posto.price}
                </div>
                <div>
                  <span className="font-bold">Rating: </span>
                  {' '}
                  {posto.rating}
                </div>
                <div>
                  <span className="font-bold">Trip length: </span>
                  <div>{posto.length}</div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
