import React, { useState } from 'react';

function FullPostCard(props) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <label htmlFor={props.id} className={props.btnClass} onClick={toggleModal}>
        {props.btnText}
      </label>
      <input type="checkbox" id={props.id} className={props.checkboxClass} checked={isOpen} />
      <div className={props.modalClass}>
        <div className="modal-box relative">
          <label htmlFor={props.id} className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
          {props.children}
        </div>
      </div>
    </>
  );
}
