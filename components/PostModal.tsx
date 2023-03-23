'use client';

import React, { useState } from 'react';
import { PostData } from 'hooks/PostData';
import Image from 'next/image';

type ModalData = {
  modalId: string;
  title: string;
  buttonName: string;
};

type PostModalProps = {
  post: PostData;
  setPost: React.Dispatch<React.SetStateAction<PostData>>;
  finish: () => void;
  modalData: ModalData;
};

export default function PostModal({
  post,
  setPost,
  finish,
  modalData: { modalId, title, buttonName },
}: PostModalProps) {
  const [newStop, setNewStop] = useState(''); // array to hold the stop inputs
  function addStop(stop: string) {
    setPost({ ...post, stops: [...post.stops, stop] });
  }

  function removeStop(index: number) {
    const newStops = [...post.stops];
    newStops.splice(index, 1);
    setPost({ ...post, stops: newStops });
  }

  type RatingRadioProps = {
    rating: number
  };

  // eslint-disable-next-line react/no-unstable-nested-components
  function RatingRadio({ rating }: RatingRadioProps) {
    return (
      <input
        type="radio"
        name="rating-10"
        value={rating}
        checked={post.rating === rating}
        className={rating % 1 === 0 ? 'bg-green-500 mask mask-star-2 mask-half-2' : 'bg-green-500 mask mask-star-2 mask-half-1'}
        onChange={() => setPost({ ...post, rating })}
      />
    );
  }
  return (
    <div className="bg-neutral">
      <input type="checkbox" id={modalId} className="modal-toggle" />
      <div className="modal">
        {' '}
        {/* Opprett innlegg boks */}
        <div className="modal-box bg-neutral relative h-4/5 w-full max-w-5xl">
          <h1>
            {' '}
            {title}
            {' '}
          </h1>
          <div className="divider" />
          <div className="flex flex-row">
            <div className="flex flex-col w-2/5">
              <div className="flex flex-row">
                <Image
                  src="/images/bg_trailfinder.png"
                  alt="BackgroundPic"
                  width={300}
                  height={300}
                  className="w-full pr-10 mx"
                />
              </div>
            </div>
            <div className="flex flex-col w-3/5">
              <div className="mb-1">
                <label htmlFor="title">
                  Title:
                  <input
                    className="input input-sm input-bordered rounded-md mx-2"
                    onChange={(e) => setPost({
                      ...post,
                      title: e.target.value,
                    })}
                    value={post.title}
                    name="title"
                    type="text"
                    placeholder="Title of the trip"
                  />
                </label>
              </div>
              <div className="mb-1">
                <label htmlFor="length">
                  Trip length:
                  <input
                    className="input input-sm input-bordered rounded-md mx-2"
                    onChange={(e) => setPost({ ...post, length: e.target.value })}
                    name="length"
                    value={post.length}
                    type="text"
                    placeholder="Trip length"
                  />
                </label>
              </div>
              <div className="mb-1">
                <label htmlFor="price">
                  Price:
                  <input
                    className="input input-sm input-bordered rounded-md mx-2"
                    onChange={(e) => setPost({ ...post, price: e.target.value })}
                    value={post.price}
                    type="text"
                    name="price"
                    placeholder="Price"
                  />
                </label>
              </div>
              <div className="mb-1">
                <label htmlFor="rating-10">
                  Rating:
                  <div className="rating rating-lg rating-half">
                    <input
                      type="radio"
                      name="rating-10"
                      value={0}
                      checked={post.rating === 0}
                      className="rating-hidden"
                      onChange={() => setPost({ ...post, rating: 0 })}
                    />
                    <RatingRadio rating={0.5} />
                    <RatingRadio rating={1} />
                    <RatingRadio rating={1.5} />
                    <RatingRadio rating={2} />
                    <RatingRadio rating={2.5} />
                    <RatingRadio rating={3} />
                    <RatingRadio rating={3.5} />
                    <RatingRadio rating={4} />
                    <RatingRadio rating={4.5} />
                    <RatingRadio rating={5} />
                  </div>
                </label>
              </div>
              <div>
                <form
                  onSubmit={(event) => {
                    event.preventDefault();
                    addStop(newStop);
                    setNewStop('');
                  }}
                >

                  <div className="mb-1">
                    <label htmlFor="stop">
                      Stops:
                      <input
                        className="input input-sm input-bordered rounded-md mx-2"
                        placeholder="Stop"
                        value={newStop}
                        type="text"
                        name="stop"
                        onChange={(e) => setNewStop(e.target.value)}
                      />
                    </label>
                    {' '}
                    <button
                      type="submit"
                      className="btn btn-xs btn-primary"
                    >
                      +
                    </button>
                  </div>
                </form>
              </div>
              <ul>
                {post.stops.map((stop, index) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={index}>
                    {`${stop} `}
                    <button
                      className="btn btn-xs btn-secondary"
                      onClick={() => removeStop(index)}
                      type="button"
                    >
                      -
                    </button>
                  </li>
                ))}
              </ul>
              <div className="">
                <label htmlFor="description">
                  Trip description:
                  <textarea
                    className="block textarea textarea-bordered w-full max-w-sm"
                    maxLength={500}
                    value={post.description}
                    name="description"
                    onChange={(e) => setPost({
                      ...post,
                      description: e.target.value,
                    })}
                    placeholder="Tell people about your trip!"
                  />
                </label>
              </div>
            </div>
            <button
              onClick={finish}
              className="btn border border-solid border-black"
              type="button"
            >
              {buttonName}
            </button>
            <button
              type="button"
            >
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label
                htmlFor={modalId}
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
