import { AUDIO_STATE, AudioState, AudioX } from "audio_x";
import { useEffect, useState } from "react";
import { secondsToTime } from "../helpers/common";
import { MediaTrackType } from "../modules/audio/types";

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

const audio = new AudioX({
  mode: "REACT",
  autoplay: false,
  useDefaultEventListeners: true,
});

// const initializeAudio = (source: string) => {
//   audio.init({
//     mediaTrack: {
//       title: 'Test',
//       source: source,
//     },
//     mode: 'REACT',
//     autoplay: false,
//     useDefaultEventListeners: true,
//   });
// };

const getAudioTrack = async (getTrack: any) => {
  const track = await getTrack();
  const stream = JSON.parse(track.streams)[0];

  const tracks = [
    "https://aac.saavncdn.com/006/587d8c98eb1ce0279a7ecd564432b2c4_160.mp4",
    "https://aac.saavncdn.com/779/83e6c1c7a37e7fd2997f3dfdb9e81a76_160.mp4",
    "https://aac.saavncdn.com/815/483a6e118e8108cbb3e5cd8701674f32_160.mp4",
    "https://aac.saavncdn.com/134/cf7b0e6af6c65a579edffa05b120ed62_160.mp4",
  ];

  const random = Math.floor(Math.random() * (3 - 0 + 1) + 0);

  return tracks[random];
};

// const fetchAnPlay = async (getTrack: any) => {
//   getAudioTrack(getTrack).then((track) => {
//     if (track) {
//       audio
//         .addMedia({
//           title: "Test",
//           source: track,
//         })
//         .then(() => {
//           audio.subscribe("AUDIO_X_STATE", (state: AudioState) => {
//             if (state.playbackState === "ready") {
//               audio.play().then(() => {
//                 console.log("audio started playing");
//               });
//             }
//           });
//         });
//     }
//   });
// };

const Progress = ({ tracks, getTrack }: any) => {
  const [state, setState] = useState<AudioState>(AUDIO_STATE);
  audio.subscribe("AUDIO_X_STATE", (data: AudioState) => {
    setState({ ...AUDIO_STATE, ...data });
  });

  const playAudio = () => {
    audio.reset().then(() => {
      getAudioTrack(getTrack).then((track) => {
        audio.playNextTrack({
          title: "Test",
          source: track,
        });
      });
    });
  };

  // console.log(state);

  useEffect(() => {
    if (state.playbackState === "ended") {
      playAudio();
    }
  }, [state.playbackState]);

  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <button
        onClick={playAudio}
        className="bg-slate-700 px-4 py-2 text-white rounded-md"
      >
        PLAY
      </button>

      <button
        onClick={() => {
          audio.pause();
        }}
        className="bg-slate-700 px-4 py-2 text-white rounded-md"
      >
        PAUSE
      </button>
      <button
        onClick={() => {
          // audio.pause();
          audio.seek(state.progress + 30);
        }}
        className="bg-slate-700 px-4 py-2 text-white rounded-md"
      >
        SEEK
      </button>
      <div className="flex flex-col justify-center items-center gap-4">
        <p>Duration : {secondsToTime(state.duration)}</p>
        <p>Progress : {secondsToTime(state.progress)}</p>
      </div>
    </div>
  );
};

export default Progress;
