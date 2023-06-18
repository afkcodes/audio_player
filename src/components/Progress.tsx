import { AUDIO_STATE, AudioState, AudioX } from 'audio_x';
import { useEffect, useState } from 'react';
import { secondsToTime } from '../helpers/common';
import { MediaTrackType } from '../modules/audio/types';

const media: MediaTrackType = {
  title: 'Rubaaiyaan',
  album: 'Qala (Music From The Netflix Film)',
  artist: 'Amit Trivedi, Swanand Kirkire and Shahid Mallya',
  source:
    'https://aac.saavncdn.com/440/74ecdc751adf8a3c51a9a526d3c6429c_160.mp4',
  artwork: [
    {
      src: 'https://c.saavncdn.com/440/Qala-Music-From-The-Netflix-Film-Hindi-2022-20221218100455-500x500.jpg',
      name: 'apna bana le bhediya movie',
      sizes: '500x500',
    },
  ],
};

const media2: MediaTrackType = {
  source:
    'https://aac.saavncdn.com/815/483a6e118e8108cbb3e5cd8701674f32_160.mp4',
  title: 'Apna Bana Le',
  artist: 'Arijit Singh, Sachin-Jigar',
  album: 'Bhediya',
  artwork: [
    {
      src: 'https://c.saavncdn.com/815/Bhediya-Hindi-2022-20221206124543-500x500.jpg',
      sizes: '96x96',
    },
  ],
};

const audio = new AudioX({
  mode: 'REACT',
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

const audioInstance = AudioX.getAudioInstance();
const getAudioTrack = async (getTrack: any) => {
  const track = await getTrack();
  if (track.previewURL) {
    audio.addMedia({
      title: 'Test',
      source: track.previewURL,
    });
  }
};

const Progress = ({ tracks, getTrack }: any) => {
  const [state, setState] = useState<AudioState>(AUDIO_STATE);
  audio.subscribe('AUDIO_X_STATE', (data: AudioState) => {
    setState({ ...AUDIO_STATE, ...data });
  });

  useEffect(() => {
    getAudioTrack(getTrack).then(() => {
      audio.play();
    });
  }, []);

  console.log('RE_RENDERING 2 TIMES');

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <button
        onClickCapture={async () => {
          await audio.play();
        }}
        className='bg-slate-700 px-4 py-2 text-white rounded-md'>
        PLAY
      </button>

      <button
        onClick={() => {
          audio.pause();
        }}
        className='bg-slate-700 px-4 py-2 text-white rounded-md'>
        PAUSE
      </button>
      <div className='flex flex-col justify-center items-center gap-4'>
        <p>Duration : {secondsToTime(state.duration)}</p>
        <p>Progress : {secondsToTime(state.progress)}</p>
      </div>
    </div>
  );
};

export default Progress;
