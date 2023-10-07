import React, { useEffect } from 'react';

export const Modal = ({ onCloseModal, data }) => {
  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const onKeyDown = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [onCloseModal]);

  return (
    <div className="Overlay" onClick={onOverlayClick}>
      <div className="Modal">
        <img src={data} alt="images" width={850} />
      </div>
    </div>
  );
};
