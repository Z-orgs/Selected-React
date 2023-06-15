// import { IconPlayToggle } from 'components/icons';
// import React from 'react';

// const PlayerControl = (isPlay, audioRef) => {
//     const handlePausePlayClick = () => {
//         if (isPlay) {
//           audioRef.current.pause();
//           // dispatch(playPause(false));
//         } else {
//           audioRef.current.play();
//           // dispatch(playPause(true));
//         }
//         setPlay(!isPlay);
//         dispatch(playPause(!isPlay));
//       };
//     return (
//         <div className="flex items-center justify-center gap-4 mb-2">
//           <div
//             className="Prev-Button"
//             onClick={() => {
//               setAudioIndex((audioIndex - 1) % audios.length);
//               dispatch(prevTrack());
//             }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width={32}
//               height={32}
//               viewBox="0 0 24 24"
//             >
//               <path fill="currentColor" d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
//             </svg>
//           </div>
//           <div
//             className="p-1 bg-white rounded-full Pause-Play-Button"
//             onClick={handlePausePlayClick}
//           >
//             <IconPlayToggle
//               hover={false}
//               currentColor={"black"}
//               playing={isPlay}
//             ></IconPlayToggle>
//           </div>
//           <div
//             className="Next-Button"
//             onClick={() => {
//               setAudioIndex((audioIndex + 1) % audios.length);
//               dispatch(nextTrack());
//             }}
//           >
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width={32}
//               height={32}
//               viewBox="0 0 24 24"
//             >
//               <path
//                 fill="currentColor"
//                 d="m6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"
//               />
//             </svg>
//           </div>
//           <div>
//             <div>
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width={18}
//                 height={18}
//                 viewBox="0 0 512 512"
//               >
//                 <path
//                   fill="currentColor"
//                   d="M464 210.511V264a112.127 112.127 0 0 1-112 112H78.627l44.686-44.687l-22.626-22.626L56 353.373l-4.415 4.414l-33.566 33.567l74.022 83.276l23.918-21.26L75.63 408H352c79.4 0 144-64.6 144-144v-85.489Z"
//                 />
//                 <path
//                   fill="currentColor"
//                   d="M48 256a112.127 112.127 0 0 1 112-112h273.373l-44.686 44.687l22.626 22.626L456 166.627l4.117-4.116l33.864-33.865l-74.022-83.276l-23.918 21.26L436.37 112H160c-79.4 0-144 64.6-144 144v85.787l32-32Z"
//                 />
//               </svg>
//               {/* <svg xmlns="http://www.w3.org/2000/svg" width={32} height={32} viewBox="0 0 512 512"><path fill="currentColor" d="M208 312v32h112v-32h-40V176h-32v24h-32v32h32v80h-40z" /><path fill="currentColor" d="M464 210.511V264a112.127 112.127 0 0 1-112 112H78.627l44.686-44.687l-22.626-22.626L56 353.373l-4.415 4.414l-33.566 33.567l74.022 83.276l23.918-21.26L75.63 408H352c79.4 0 144-64.6 144-144v-85.489Z" /><path fill="currentColor" d="M48 256a112.127 112.127 0 0 1 112-112h273.373l-44.686 44.687l22.626 22.626L456 166.627l4.117-4.116l33.864-33.865l-74.022-83.276l-23.918 21.26L436.37 112H160c-79.4 0-144 64.6-144 144v85.787l32-32Z" /></svg> */}
//             </div>
//           </div>
//         </div>
//     );
// };

// export default PlayerControl;
