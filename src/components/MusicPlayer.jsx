import { useRef, useState } from "react";
import audio from "../../public/DemT_-OST_Speed_Race.mp3";

export default function MusicPlayer() {
  const audioRef = useRef(null);
  const muteRef = useRef(null);
  const playRef = useRef(null);

  const [chosenBtn, setChosenBtn] = useState(muteRef);

  const handlePlay = (e) => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setChosenBtn(playRef);
    } else {
      audioRef.current.pause();
      setChosenBtn(muteRef);
    }
    if (e && e.target)
      document.activeElement.blur();
  };

  return (
    <div className="musicplayer">
      <audio ref={audioRef} src={audio} type="audio/mpeg" loop />
      <button className="volume" onClick={handlePlay}>
        <svg
          ref={muteRef}
          className={`${chosenBtn === muteRef ? "" : "hidden"}`}
          id="mute"
          viewBox="0 0 32 32"
        >
          <path d="M30 19.348v2.652h-2.652l-3.348-3.348-3.348 3.348h-2.652v-2.652l3.348-3.348-3.348-3.348v-2.652h2.652l3.348 3.348 3.348-3.348h2.652v2.652l-3.348 3.348 3.348 3.348z"></path>
          <path d="M13 30c-0.26 0-0.516-0.102-0.707-0.293l-7.707-7.707h-3.586c-0.552 0-1-0.448-1-1v-10c0-0.552 0.448-1 1-1h3.586l7.707-7.707c0.286-0.286 0.716-0.372 1.090-0.217s0.617 0.519 0.617 0.924v26c0 0.404-0.244 0.769-0.617 0.924-0.124 0.051-0.254 0.076-0.383 0.076z"></path>
        </svg>
        <svg
          ref={playRef}
          className={`${chosenBtn === playRef ? "" : "hidden"}`}
          id="play"
          viewBox="0 0 32 32"
        >
          <path d="M22.485 25.985c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 4.094-4.094 4.094-10.755 0-14.849-0.586-0.586-0.586-1.536 0-2.121s1.536-0.586 2.121 0c2.55 2.55 3.954 5.94 3.954 9.546s-1.404 6.996-3.954 9.546c-0.293 0.293-0.677 0.439-1.061 0.439v0zM17.157 23.157c-0.384 0-0.768-0.146-1.061-0.439-0.586-0.586-0.586-1.535 0-2.121 2.534-2.534 2.534-6.658 0-9.192-0.586-0.586-0.586-1.536 0-2.121s1.535-0.586 2.121 0c3.704 3.704 3.704 9.731 0 13.435-0.293 0.293-0.677 0.439-1.061 0.439z"></path>
          <path d="M13 30c-0.26 0-0.516-0.102-0.707-0.293l-7.707-7.707h-3.586c-0.552 0-1-0.448-1-1v-10c0-0.552 0.448-1 1-1h3.586l7.707-7.707c0.286-0.286 0.716-0.372 1.090-0.217s0.617 0.519 0.617 0.924v26c0 0.404-0.244 0.769-0.617 0.924-0.124 0.051-0.254 0.076-0.383 0.076z"></path>
        </svg>
      </button>
    </div>
  );
}
