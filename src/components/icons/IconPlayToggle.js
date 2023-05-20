import React from "react";

const IconPlayToggle = ({ played = false }) => {
  if (played)
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={32}
        height={32}
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="M9 16h2V8H9v8zm3-14C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8zm1-4h2V8h-2v8z"
        />
      </svg>
    );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={32}
      height={32}
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="m10 16.5l6-4.5l-6-4.5v9zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8z"
      />
    </svg>
  );
};

export default IconPlayToggle;
