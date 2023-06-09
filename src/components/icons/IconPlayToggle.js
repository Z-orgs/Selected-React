import React from "react";

const IconPlayToggle = ({
  playing = false,
  currentColor = "white",
  hover = true,
}) => {
  if (playing)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        className="group"
        // onClick={() => {
        //   setPlay(!play);
        // }}
      >
        <path
          className={`hover ? 'group-hover:fill-gray-300' : ''`}
          fill={currentColor}
          d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
        />
      </svg>
    );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      className="group"
    >
      <path
        className={`hover ? 'group-hover:fill-gray-300' : ''`}
        fill={currentColor}
        d="M8 5v14l11-7z"
      />
    </svg>
  );
};

export default IconPlayToggle;
