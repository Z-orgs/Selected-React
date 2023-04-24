import React from "react";

const Modal = ({ show, heading, onClose, children }) => {
  const handleClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className={`${
        show ? "fixed" : "hidden"
      } h-[100vh] left-0 right-0 top-0 bottom-0 bg-black opacity-50 flex justify-center items-center z-10`}
      onClick={onClose}
    >
      <div className="absolute p-5 bg-white" onClick={handleClick}>
        <h3 className="text-4xl text-center uppercase">{heading}</h3>
        {children}
      </div>
    </div>
  );
};

export default Modal;
