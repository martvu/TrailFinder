import React, { useEffect, useState } from 'react';
import { PostData } from 'hooks/PostData';
import { useFetchUser } from 'context/AuthContext';
import Image from 'next/image';
import { doc, getDoc } from 'firebase/firestore';
import { getDownloadURL, ref } from 'firebase/storage';
import HeartButton from './HeartButton';
import FullPost from './FullPost';
import OptionMenu from './OptionMenu';
import { firestore, storage } from '../firebase/firebase';

type PostProps = {
  post: PostData,
};

export default function PostCard({ post }: PostProps) {
  const [isDeleted, setIsDeleted] = useState(false);
  const {
    title,
    price,
    rating,
    date,
    username,
    length,
    stops,
    description,
    likedBy,
    uid,
  } = post;
  const { userData } = useFetchUser();
  const [isLiked, setIsLiked] = useState(likedBy?.includes(userData.username));
  const [profilePicUrl, setProfilePicUrl] = useState<string>('');
  useEffect(() => {
    async function fetchProfilePic() {
      if (!uid || uid === '') return '';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const docRef = doc(firestore, 'users', uid);
      const docSnap = await getDoc(docRef);
      const profilePicture = docSnap.data()?.profilePicture as string;
      if (!profilePicture || profilePicture === '') return '';
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      const profilePictureRef = ref(storage, profilePicture);
      const downloadUrl = await getDownloadURL(profilePictureRef);
      return downloadUrl;
    }
    // eslint-disable-next-line no-void
    void fetchProfilePic().then((url) => setProfilePicUrl(url));
  }, [uid]);

  if (isDeleted) {
    return null;
  }
  return (
    <div
      className="card card-side shadow-md min-w-full max-w-full max-h-64 min-h-64 mb-2 bg-neutral"
    >

      <div className="flex w-full">

        {/* left section */}
        <div className="h-64 min-h-full w-1/6 flex items-center flex-col pt-5">
          <div className="avatar">
            <div
              className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 mb-2"
            >
              {/* get profilepic from  */}
              {!profilePicUrl || profilePicUrl === '' ? (
                <i className="fa-solid fa-user fa-2x object-cover ml-3.5 mt-3" />
              ) : (
                <Image
                  loader={() => profilePicUrl}
                  src={profilePicUrl}
                  alt="Profile"
                  width={50}
                  height={50}
                  className="rounded-full w-14 h-14 object-cover"
                />
              )}

            </div>
          </div>
          <p className="card-title flex text-sm opacity-90 ">
            {username}
          </p>
          <div className="text-xs">
            {date.toDate()
              .toLocaleDateString()
              .replace(',', '')}
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

          <div className="absolute bottom-0 right-10 m-2 flex flex-row">
            { post.description.length > 110 ? (
              <div>
                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                <label htmlFor={`my-modal-3${post.id}`} className="btn btn-xs btn-outline mr-2 mb-1 overflow-hidden">
                  see more
                </label>
                <FullPost post={post} />
              </div>
            ) : null }
          </div>
          <OptionMenu setIsDeleted={setIsDeleted} post={post} />
          <h2 className="card-title font-extrabold absolute top-2">{title}</h2>

          {/* stops */}
          <div className="flex pt-6">
            <div className="flex">
              <p className="font-bold mr-2">Stops:</p>
              <div>
                { /* A user may want to stop at the same place multiple times */}
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
            <p className="max-w-full break-words truncate">{description}</p>
          </div>

        </div>

        {/* right section */}
        <div
          className="max-w-sm flex relative border-l-2 border-0 border-solid flex-col w-1/5 h-full pr-4 p-3 gap-2 "
        >
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
