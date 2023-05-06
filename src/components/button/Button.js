import React from "react";
import PropTypes from "prop-types";

const Button = ({ type, children, className, onClick }) => {
  return (
    <button
      className={`px-4 py-2 text-white rounded-md min-w-[120px] mb-5 font-semibold block text-lg text-white bg-blue-500 ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  type: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default Button;
