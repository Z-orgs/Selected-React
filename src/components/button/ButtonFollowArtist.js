import React from "react";

const ButtonFollowArtist = ({ onClick, followed = false, countFollower }) => {
  console.log(followed);
  return (
    <button
      className={`flex items-center gap-2 px-4 py-1 text-sm rounded-full ${
        followed ? "text-primary bg-white border border-primary" : "bg-primary"
      }`}
      onClick={onClick}
    >
      {followed ? (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
          >
            <path
              className="fill-primary"
              d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41L9 16.17z"
            />
          </svg>
        </span>
      ) : (
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={18}
            height={18}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M20 9V6h-2v3h-3v2h3v3h2v-3h3V9h-3zM9 12c2.21 0 4-1.79 4-4s-1.79-4-4-4s-4 1.79-4 4s1.79 4 4 4zm0-6c1.1 0 2 .9 2 2s-.9 2-2 2s-2-.9-2-2s.9-2 2-2zm6.39 8.56C13.71 13.7 11.53 13 9 13s-4.71.7-6.39 1.56A2.97 2.97 0 0 0 1 17.22V20h16v-2.78c0-1.12-.61-2.15-1.61-2.66zM15 18H3v-.78c0-.38.2-.72.52-.88C4.71 15.73 6.63 15 9 15c2.37 0 4.29.73 5.48 1.34c.32.16.52.5.52.88V18z"
            />
          </svg>
        </span>
      )}
      {followed ? "Followed" : "Follow"}
    </button>
  );
};

export default ButtonFollowArtist;
