import { useRef } from "react";

const soundFiles = {
  start: "/sounds/click.mp3",
  finish: "/sounds/finish.mp3",
  hit1: "/sounds/hit1.mp3",
  hit2: "/sounds/hit2.mp3",
  hit3: "/sounds/hit3.mp3",
  record: "/sounds/record.mp3",
  restart: "/sounds/restart.mp3",
};

export default function useSoundPlayer() {
  const audioRefs = useRef({});

  // Ініціалізація аудіо
  for (const [name, path] of Object.entries(soundFiles)) {
    if (!audioRefs.current[name]) {
      const audio = new Audio(path);
      audioRefs.current[name] = audio;
    }
  }

  const play = (name) => {
    const sound = audioRefs.current[name];
    if (sound) {
      sound.currentTime = 0;
      sound.play().catch((err) => {
        console.warn(`Cannot play sound "${name}":`, err);
      });
    }
  };

  const stop = (name) => {
    const sound = audioRefs.current[name];
    if (sound) {
      sound.pause();
      sound.currentTime = 0;
    }
  };

  const stopAll = () => {
    for (const sound of Object.values(audioRefs.current)) {
      sound.pause();
      sound.currentTime = 0;
    }
  };

  const playRandom = (prefix, options = {}) => {
    const matches = Object.keys(audioRefs.current).filter((name) =>
      name.startsWith(prefix)
    );

    if (matches.length === 0) return;

    const randomName = matches[Math.floor(Math.random() * matches.length)];
    const sound = audioRefs.current[randomName];

    if (sound) {
      if (options.volume !== undefined) sound.volume = options.volume;
      sound.currentTime = 0;
      sound.play().catch((err) => {
        console.warn(`Cannot play sound "${randomName}":`, err);
      });
    }
  };

  return { play, stop, stopAll, playRandom };
}
