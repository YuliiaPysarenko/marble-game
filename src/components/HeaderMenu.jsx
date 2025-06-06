import { logOut } from "../utils/firebase/helpers";
import MusicPlayer from "./MusicPlayer";

export default function HeaderMenu({ openModal }) {
  return (
    <div className="header">
      <MusicPlayer />
      <button className="open-modal" onClick={(e) => openModal("recordTable")}>
        <svg id="icon-trophy11" viewBox="0 0 32 32">
          <path d="M26 6v-4h-20v4h-6v4c0 3.314 2.686 6 6 6 0.627 0 1.232-0.096 1.801-0.275 1.443 2.063 3.644 3.556 6.199 4.075v6.2h-2c-2.209 0-4 1.791-4 4h16c0-2.209-1.791-4-4-4h-2v-6.2c2.555-0.519 4.756-2.012 6.199-4.075 0.568 0.179 1.173 0.275 1.801 0.275 3.314 0 6-2.686 6-6v-4h-6zM6 13.625c-1.999 0-3.625-1.626-3.625-3.625v-2h3.625v2c0 1.256 0.232 2.457 0.655 3.565-0.213 0.039-0.431 0.060-0.655 0.060zM29.625 10c0 1.999-1.626 3.625-3.625 3.625-0.224 0-0.442-0.021-0.655-0.060 0.423-1.107 0.655-2.309 0.655-3.565v-2h3.625v2z"></path>
        </svg>
      </button>
      <button className="open-modal" onClick={(e) => openModal("editData")}>
        <svg id="icon-person_outline" viewBox="0 0 24 24">
          <path d="M12 12.984q1.5 0 3.281 0.422t3.258 1.406 1.477 2.203v3h-16.031v-3q0-1.219 1.477-2.203t3.258-1.406 3.281-0.422zM12 3.984q1.641 0 2.813 1.195t1.172 2.836-1.172 2.813-2.813 1.172-2.813-1.172-1.172-2.813 1.172-2.836 2.813-1.195zM12 14.906q-2.063 0-4.078 0.773t-2.016 1.336v1.078h12.188v-1.078q0-0.563-2.016-1.336t-4.078-0.773zM12 5.906q-0.891 0-1.5 0.609t-0.609 1.5 0.609 1.477 1.5 0.586 1.5-0.586 0.609-1.477-0.609-1.5-1.5-0.609z"></path>
        </svg>
      </button>
      <button className="logout" onClick={logOut}>
        <svg id="icon-log-out" viewBox="0 0 24 24">
          <path d="M9 20h-4c-0.276 0-0.525-0.111-0.707-0.293s-0.293-0.431-0.293-0.707v-14c0-0.276 0.111-0.525 0.293-0.707s0.431-0.293 0.707-0.293h4c0.552 0 1-0.448 1-1s-0.448-1-1-1h-4c-0.828 0-1.58 0.337-2.121 0.879s-0.879 1.293-0.879 2.121v14c0 0.828 0.337 1.58 0.879 2.121s1.293 0.879 2.121 0.879h4c0.552 0 1-0.448 1-1s-0.448-1-1-1zM18.586 11h-9.586c-0.552 0-1 0.448-1 1s0.448 1 1 1h9.586l-3.293 3.293c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0l5-5c0.092-0.092 0.166-0.202 0.217-0.324 0.15-0.362 0.078-0.795-0.217-1.090l-5-5c-0.391-0.391-1.024-0.391-1.414 0s-0.391 1.024 0 1.414z"></path>
        </svg>
      </button>
    </div>
  );
}
