import { useEffect, useState } from "react";

import { MediaTrackType } from "../modules/audio/types";

import Tile from "./Tile";

import { secondsToTime } from "../helpers/common";

import { AUDIO_STATE, AudioState, AudioX } from "audio_x";
import NewEq from "./NewEq";

const audio = new AudioX();

const initializeAudio = () => {
  audio.init({
    autoPlay: false,
    useDefaultEventListeners: true,
    mode: "REACT",
    showNotificationActions: true,
    preloadStrategy: "auto",
    playbackRate: 1,
    enableEQ: true,
    enablePlayLog: true,
    enableHls: true,
    hlsConfig: {
      startLevel: -1,
    },
  });
};

const getAudioTrack = async (getTrack: any) => {
  const track = await getTrack();

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
  ];

  const random = Math.floor(Math.random() * (1 - 0 + 1) + 0);

  return mediaTrack[0];
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

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full">
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
        value={`${instance.paused ? "PLAY" : "PAUSE"}`}
        onClick={() => {
          instance.paused ? audio.play() : audio.pause();
        }}
        className="bg-slate-700 px-4 py-2 text-white rounded-md cursor-pointer"
      />

      <div className="">
        <NewEq instance={instance} audio={audio} bands={undefined} />
        {/* <Equalizer instance={instance} play={playAudio} /> */}
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <p>State : {state.playbackState}</p>
        <p>Progress : {secondsToTime(state.progress)}</p>
      </div>
    </div>
  );
};

export default Progress;
