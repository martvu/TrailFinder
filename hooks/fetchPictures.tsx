
import { useState, useEffect } from 'react'
import { collection, getDocs, query, orderBy } from 'firebase/firestore'
import { firestore, storage } from '../firebase/firebase'
import { useAuth, useFetchUser } from 'context/AuthContext'
import { PostData } from './PostData'
import { getDownloadURL, ref } from 'firebase/storage';

export default function useFetchPicture() {
  const [loading, setLoading] = useState(true)
  const { userData } = useFetchUser();
  const [profilePicture, setProfilePictureUrl] = useState<string>('');
  
useEffect(() => {
  async function fetchProfilePicture() {
    if (userData.profilePicture) {
      const profilePictureRef = ref(storage, userData.profilePicture);
      const downloadUrl = await getDownloadURL(profilePictureRef);
      setProfilePictureUrl(downloadUrl);
    }
  }
  fetchProfilePicture();
}, [userData]); 

return {profilePicture, setProfilePictureUrl};
}