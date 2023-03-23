import React, { useEffect, useRef, useState } from 'react';
import { useFetchUser } from 'context/AuthContext';
import { PostData } from 'hooks/PostData';
import {
  arrayUnion, deleteDoc, doc, getDoc, updateDoc,
} from 'firebase/firestore';
import { firestore } from '../firebase/firebase';
import EditPostModal from './EditPostModal';

interface Props {
  setIsDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  post: PostData;
}

interface Option {
  text: string;
  icon: string;
  onClick: () => void
  visible?: boolean;
}

export default function OptionMenu({ setIsDeleted, post }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useFetchUser();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isOwner = (post.username === userData.username);
  const [isEdit, setIsEdit] = useState(false);
  const [isReported, setIsReported] = useState(post.reports?.includes(userData.uid));
  const adminState = userData?.isAdmin ?? false;
  const [reportCounter, setReportCounter] = useState([...post.reports]?.length);
  async function deletePost() {
    if (adminState || post.username === userData?.username) {
      // eslint-disable-next-line no-alert
      const confirmDelete = window.confirm('Are you sure you want to delete this post?');
      if (confirmDelete) {
        await deleteDoc(doc(firestore, 'posts', `${post.id}`));
        setIsDeleted(true);
      }
    } else { // should never be called
      alert("You don't have permission to delete that post..");
    }
  }
  async function reportPost() {
    const confirmReport = window.confirm('Are you sure you want to report this post?');
    if (!confirmReport) return;

    const postRef = doc(firestore, 'posts', post.id);
    const postSnap = await getDoc(postRef);
    if (postSnap.exists()) {
      const reportSnap = postSnap.data().reports as string[] || [];
      reportSnap.push(userData.uid);
      await updateDoc(postRef, { reports: arrayUnion(...reportSnap) });
      setIsOpen(false);
      setIsReported(true);
    }
    setReportCounter(reportCounter + 1);
  }
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | Event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event?.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isEdit]);

  const deleteButton: Option = {
    text: 'Delete',
    icon: 'fa-solid fa-trash',
    // eslint-disable-next-line @typescript-eslint/no-misused-promises
    onClick: deletePost,
    visible: isOwner || adminState,
  };
  const editButton: Option = {
    text: 'Edit',
    icon: 'fa-solid fa-pen-to-square',
    onClick: () => { setIsOpen(false); setIsEdit(true); },
    visible: isOwner,
  };
  const reportButton: Option = {
    text: 'Report',
    icon: 'fa-solid fa-flag',
    onClick: () => {
      setIsEdit(false);
      // eslint-disable-next-line no-void
      void reportPost();
    },
    visible: !isReported,
  };
  const options = [deleteButton, editButton, reportButton];
  const visibleOptions = options.filter((item) => item.visible);

  return (
    <>
      {(isReported || adminState) && reportCounter > 0
        && (
          <div className="text-error absolute top-2 right-2">
            {adminState && <span>{reportCounter}</span>}
            <span className="mr-2"> Reported!</span>
            <i className="fa-solid fa-flag " />
          </div>
        )}
      <div className="absolute bottom-0 right-0 m-2 flex flex-row z-10" ref={dropdownRef}>
        <label htmlFor={isEdit ? `edit-modal${post.id}` : ''}>
          <button
            className="btn btn-sm btn-circle btn-outline"
            onClick={() => setIsOpen((prev) => !prev)}
            type="button"
          >
            <i className={!isOpen ? 'fa-solid fa-ellipsis' : 'fa-solid fa-ellipsis-vertical'} />
          </button>

          {isOpen && visibleOptions.length > 0 && (
            <div className="absolute shadow-md bg-neutral px-1 py-1 rounded-md w-28 space-y-1">
              {visibleOptions.map((option) => (
                // eslint-disable-next-line max-len
                // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
                <div
                  key={option.text}
                  onClick={() => {
                    option.onClick();
                  }}
                  className="flex w-full flex-row text-left btn btn-xs btn-outline"
                >
                  <i className={option.icon} />
                  <h3 className="px-2">{option.text}</h3>
                </div>
              ))}
            </div>
          )}

        </label>
        <EditPostModal
          postData={post}
        />
      </div>
    </>
  );
}
