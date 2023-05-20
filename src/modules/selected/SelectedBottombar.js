import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";

const SelectedBottombar = () => {
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  useEffect(() => {
    const socket = new io("ws://localhost:3000/track");
    socket.emit("play", { trackId: "64579bc2b680077a8e37166d" });
    socket.on("message", (data) => {
      setAudioChunks((chunks) => [...chunks, data.data]);
    });

    return () => {
      socket.close();
    };
  }, []);
  useEffect(() => {
    if (audioChunks.length > 0) {
      const blob = new Blob(audioChunks, { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(blob);
      setAudioUrl(audioUrl);
      console.log(
        "🚀 ~ file: HomePage.js:34 ~ useEffect ~ audioUrl:",
        audioUrl
      );
    }
  }, [audioChunks]);
  return (
    <div className="fixed bottom-0 flex items-center justify-center w-full h-player-height">
      <AudioPlayer
        showJumpControls={false}
        showSkipControls={true}
        // autoPlay
        src={audioUrl}
        onPlay={(e) => console.log("onPlay")}
        layout="stacked-reverse"

        // other props here
      />
    </div>
  );
};

export default SelectedBottombar;
