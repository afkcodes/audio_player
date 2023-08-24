import { useEffect, useState } from "react";
import { secondsToTime } from "../helpers/common";

import { MediaTrackType } from "../modules/audio/types";

import { AUDIO_STATE, AudioState, AudioX } from "../utils/dist";
import Tile from "./Tile";

const media: MediaTrackType = {
  title: "Rubaaiyaan",
  album: "Qala (Music From The Netflix Film)",
  artist: "Amit Trivedi, Swanand Kirkire and Shahid Mallya",
  source:
    "https://aac.saavncdn.com/440/74ecdc751adf8a3c51a9a526d3c6429c_160.mp4",
  artwork: [
    {
      src: "https://c.saavncdn.com/440/Qala-Music-From-The-Netflix-Film-Hindi-2022-20221218100455-500x500.jpg",
      name: "apna bana le bhediya movie",
      sizes: "500x500",
    },
  ],
};

const media2: MediaTrackType = {
  source:
    "https://aac.saavncdn.com/815/483a6e118e8108cbb3e5cd8701674f32_160.mp4",
  title: "Apna Bana Le",
  artist: "Arijit Singh, Sachin-Jigar",
  album: "Bhediya",
  artwork: [
    {
      src: "https://c.saavncdn.com/815/Bhediya-Hindi-2022-20221206124543-500x500.jpg",
      sizes: "96x96",
    },
  ],
};

const audio = new AudioX();

const initializeAudio = () => {
  audio.init({
    autoplay: false,
    useDefaultEventListeners: true,
    mode: "REACT",
    showNotificationActions: true,
    preloadStrategy: "auto",
    playbackRate: 1,
    enablePlayLog: true,
    enableHls: true,
  });
};

const getAudioTrack = async (getTrack: any) => {
  const track = await getTrack();
  // const stream = JSON.parse(track.streams)[0];

  // const tracks = [
  //   "https://aac.saavncdn.com/006/587d8c98eb1ce0279a7ecd564432b2c4_160.mp4",
  //   "https://aac.saavncdn.com/779/83e6c1c7a37e7fd2997f3dfdb9e81a76_160.mp4",
  //   "https://aac.saavncdn.com/815/483a6e118e8108cbb3e5cd8701674f32_160.mp4",
  //   "https://aac.saavncdn.com/134/cf7b0e6af6c65a579edffa05b120ed62_160.mp4",
  // ];

  const mediaTrack: MediaTrackType[] = [
    {
      artwork: [
        {
          src: "https://mirchiapi.s3.amazonaws.com/radio-stations/mumbai.png",
          name: "",
          sizes: "",
        },
      ],
      source:
        "https://playerservices.streamtheworld.com/api/livestream-redirect/BOM_HIN_ESTAAC.m3u8",
      title: "Mirchi Mumbai",
      album: "Mumbai",
      artist: "Mumbai",
      comment: "",
      duration: 309,
      genre: "",
      year: 2023,
    },

    {
      artwork: [
        {
          src: "https://static.mytuner.mobi/media/tvos_radios/bjmtc6tcrepm.png",
          name: "",
          sizes: "",
        },
      ],
      source: "https://carol.epichosts.co.uk:8570/;",
      title: "Diverse FM",
      album: "Mumbai",
      artist: "Mumbai",
      comment: "",
      duration: 309,
      genre: "",
      year: 2023,
    },

    {
      artwork: [
        {
          src: "https://mirchiapi.s3.amazonaws.com/radio-stations/mumbai.png",
          name: "",
          sizes: "",
        },
      ],
      source:
        "https://playerservices.streamtheworld.com/api/livestream-redirect/BOM_HIN_ESTAAC.m3u8",
      title: "Mirchi Mumbai",
      album: "Mumbai",
      artist: "Mumbai",
      comment: "",
      duration: 309,
      genre: "",
      year: 2023,
    },

    {
      artwork: [
        {
          src: "https://c.saavncdn.com/026/Chaleya-From-Jawan-Hindi-2023-20230814014337-500x500.jpg",
          name: "Chaleya",
          sizes: "500x500",
        },
      ],
      source:
        "https://playerservices.streamtheworld.com/api/livestream-redirect/BOM_HIN_ESTAAC.m3u8",
      title: "Chaleya",
      album: " Jawan",
      artist: "Anirudh Ravichander, Arijit Singh, Shilpa Rao",
      comment: "",
      duration: 154.2,
      genre: "",
      year: 2023,
    },
  ];

  const random = Math.floor(Math.random() * (2 - 0 + 1) + 0);

  return mediaTrack[random];
};
initializeAudio();
const instance = AudioX.getAudioInstance();

const Progress = ({ tracks, getTrack }: any) => {
  const [state, setState] = useState<AudioState>(AUDIO_STATE);
  audio.subscribe("AUDIO_X_STATE", (data: AudioState) => {
    setState({ ...data });
  });

  const playAudio = () => {
    getAudioTrack(getTrack).then((track) => {
      audio.addMediaAndPlay(track);
    });
  };

  useEffect(() => {
    if (state.playbackState === "ended") {
      playAudio();
    }
  }, [state.playbackState]);

  console.log("playbackState", state.playbackState);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <Tile
        artwork={state?.currentTrack?.artwork?.[0]?.src}
        title={state.currentTrack.title}
        artist={state.currentTrack.artist}
        album={state.currentTrack.album}
      />

      <input
        type="button"
        value="ADD NEW AND PLAY"
        onClick={playAudio}
        className="bg-slate-700 px-4 py-2 text-white rounded-md cursor-pointer"
      />

      <input
        type="button"
        value="PLAY"
        onClick={() => {
          audio.play();
        }}
        className="bg-slate-700 px-4 py-2 text-white rounded-md cursor-pointer"
      />

      <input
        type="button"
        value="PAUSE"
        onClick={() => {
          audio.pause();
        }}
        className="bg-slate-700 px-4 py-2 text-white rounded-md cursor-pointer"
      />

      <input
        type="button"
        value="SEEK"
        onClick={() => {
          audio.seek((state.progress as number) + 10);
        }}
        className="bg-slate-700 px-4 py-2 text-white rounded-md cursor-pointer"
      />

      <div className="flex flex-col justify-center items-center gap-4">
        <p>State : {state.playbackState}</p>
        <p>Duration : {secondsToTime(state.duration)}</p>
        <p>Progress : {secondsToTime(state.progress)}</p>
        <p>currentTrackPlayTime :{state.currentTrackPlayTime}</p>
        <p>previousTrackPlayTime :{state.previousTrackPlayTime}</p>
      </div>
    </div>
  );
};

export default Progress;
