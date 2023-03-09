import React, { useEffect, useState } from 'react';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import { firestore, storage } from '../firebase/firebase';
import { useAuth, useFetchUser } from '../context/AuthContext';
import { getDownloadURL, ref, uploadBytesResumable, deleteObject } from 'firebase/storage';
import useFetchPicture from 'hooks/fetchPictures';

export default function EditProfile({ setEdit }: any) {
  const { userData, setUserData } = useFetchUser();
  const { currentUser } = useAuth();
  const [firstName, setFirstName] = useState(userData?.firstname || '');
  const [lastName, setLastName] = useState(userData?.lastname || '');
  const { profilePicture } = useFetchPicture();
  const [error, setError] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    if (userData) {
      setFirstName(userData.firstname);
      setLastName(userData.lastname);
    }
  }, [userData]);

  async function updateUser() {
    if (firstName !== '' && lastName !== '' && currentUser) {
      const docRef = doc(firestore, 'users', currentUser.uid);
      const data = {
        firstName,
        lastName,
      };
      await updateDoc(docRef, data)
        .then(() => {
          console.log('A new document field has been added to an existing document');
        })
        .catch((error) => {
          console.log(error);
        });
      setEdit(false);
      if (!file && !profilePicture) {
        await updateDoc(docRef, { profilePicture: null }).then(() => {
          setUserData({ ...userData, profilePicture: null });
        }).catch((error) => {
          console.log(error);
        });
      }
    } else {
      setError('Fields required');
      console.log('Error');
    }
  }

  if (!userData) {
    return <div>Error: User does not exist.</div>;
  }

  /* function handleChange(event: { target: { files: FileList; }; }) {
    const file = event.target.files[0];
    setFile(file);
  } */

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const fileList = event.target.files;
    if (fileList && fileList.length > 0) {
      const selectedFile = fileList[0];
      setFile(selectedFile);
    }
  }


  function handleUpload() {
    if (!file) {
      alert("Please choose a file first!")
    }
    if (currentUser && file) {
      const storageRef = ref(storage, `/profile-pictures/${file.name}`)
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          setPercent(percent);
        },
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((url) => {
            console.log(url);
          });
          //setFile(null); // set file to null when the upload is finished
        }
      );
      if (file) {
        const fileUrl = `gs://gruppe64-hiking-app.appspot.com/profile-pictures/${file.name}`
        const newUserData = { ...userData, profilePicture: fileUrl };
        console.log("uploader")
        setUserData(newUserData);
        updateDoc(doc(firestore, "users", currentUser.uid), { profilePicture: fileUrl });
      }

    }
  }
  return (
    <div>
      <div className={"flex h-screen items-center justify-center"}>
        <div className={"relative w-96 max-h p-6 py-3 shadow-lg bg-white rounded-md gap-4"}>
          <div className='flex items-center justify-center'>
            <h1 className="text-2xl block text-center font-bold text-green-500">
              Edit profile
            </h1>
            <i className="fa-solid fa-pen-to-square mx-3"></i>
          </div>

          <div onClick={() => { setEdit(false) }} className="btn btn-sm btn-circle absolute right-2 top-2" >
            <i className="inline fa-solid fa-xmark"></i>
          </div>
          <div className='flex flex-col justify-center items-center mt-3 text-center'>
            <label htmlFor='profile-picture-input' />
            <div className="flex justify-center items-center border p-2 shadow-lg border-solid rounded-full w-20 h-20 border-black">
              {profilePicture ? (
                <div className="relative">
                <img src={profilePicture} alt="Profile" className="rounded-full mx-auto" />
                <button
                  onClick={() => {
                    if (profilePicture) {
                    const storageRef = ref(storage, `profile-pictures/${profilePicture}`);
                    deleteObject(storageRef).then(() => {
                      setUserData({ ...userData, profilePicture: null });
                    });
                  }}}
                  className=" btn btn-error btn-outline btn-xs btn-circle absolute top-0 right-0 left-16"
                >
                  <i className="fa-solid fa-times"></i>
                </button>
              </div>
              ) : (
                <i className="fa-solid fa-user fa-2x"></i>
              )}
            </div>
            <div className='flex justify-end items-end'>
              <input className=" text-sm p-2 ml-16 " type="file" accept="image/*" onChange={handleChange} />
            </div>
            <button className="btn btn-xs btn-outline" onClick={handleUpload}>Upload</button>
            <p>{percent} % done </p>
            <label className="block text-base mb-3">
              {/* <p>{userData.firstname} {userData.lastname}</p> */}
              <p className='text-xs mt-2'>{userData.email}</p>
            </label>
          </div>
          <div className="flex mb-3 items-center">
            <label>First name: </label>
            <input className="p-1 rounded-md border focus:outline-primary mx-2"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              type="text"
            >
            </input>
          </div>
          <div className="flex items-center">
            <label>Last name: </label>
            <input className="p-1 rounded-md border focus:outline-primary mx-2"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              type="text"
              placeholder={lastName} >
            </input>
          </div>
          {error && <div className='w-full max-w-[30ch] text-center border-rose-300 text-rose-300'>{error}</div>}
          <div className='mt-3 text-center'>
            <button onClick={() => { updateUser() }} className="btn-sm btn-primary text-white font-bold rounded-md justify-center">Confirm</button>
          </div>
        </div>
      </div>
    </div>

  );
};
