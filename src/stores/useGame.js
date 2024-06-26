import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      blocksCount: 15,
      blocksSeed: 0,
      startTime: 0,
      endTime: 0,
      phase: "ready",
      start: (modalOpen) => {
        set((state) => {
          if (state.phase === "ready" && modalOpen === false) 
            return { phase: "playing", startTime: Date.now() };
          return {};
        });
      },
      restart: () => {
        set((state) => {
          if (state.phase === "playing" || state.phase === "ended")
            return { phase: "ready", blocksSeed: Math.random()};
          return {};
        });
      },
      end: () => {
        set((state) => {
          if (state.phase === "playing") 
            return { phase: "ended", endTime: Date.now() };
          return {};
        });
      },
    };
  })
);
