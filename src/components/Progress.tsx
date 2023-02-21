import { Link } from 'react-router-dom';
import { secondsToTime } from '../helpers/common';
import AudioPlayer from '../modules/audio/audio';
import AUDIO_STATE from '../modules/audio/state';
import { MediaTrackType } from '../modules/audio/types';
import useListener from '../utils/hooks/useListener.hook';

const media: MediaTrackType = {
  title: 'Rubaaiyaan',
  album: "Qala (Music From The Netflix Film)",
  artist: "Amit Trivedi, Swanand Kirkire and Shahid Mallya",
  source: 'https://aac.saavncdn.com/440/74ecdc751adf8a3c51a9a526d3c6429c_160.mp4',
  artwork: [{ src: 'https://c.saavncdn.com/440/Qala-Music-From-The-Netflix-Film-Hindi-2022-20221218100455-500x500.jpg', name: "apna bana le bhediya movie", sizes: '500x500' }]
}

const media2: MediaTrackType = {
  source: 'https://aac.saavncdn.com/815/483a6e118e8108cbb3e5cd8701674f32_160.mp4',
  title: 'Apna Bana Le',
  artist: 'Arijit Singh, Sachin-Jigar',
  album: 'Bhediya',
  artwork: [
    {
      src: 'https://c.saavncdn.com/815/Bhediya-Hindi-2022-20221206124543-500x500.jpg',
      sizes: '96x96',
    }
  ],
}

const audio = new AudioPlayer(
  'https://aac.saavncdn.com/815/483a6e118e8108cbb3e5cd8701674f32_160.mp4'
);
audio.attachAudioEventListeners();

const Progress = () => {
  const state = useListener('AUDIO_EVENTS', AUDIO_STATE);

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <button
        onClick={() => {
          audio.addMedia(media2);
          audio.play()
          console.log(audio.currentMediaTrack)
        }}
        className='bg-slate-700 px-4 py-2 text-white rounded-md'>
        PLAY
      </button>
      <button
        onClick={() => {
          audio.addMedia(media);
          audio.play();
          console.log(audio.currentMediaTrack)
        }}
        className='bg-slate-700 px-4 py-2 text-white rounded-md'>
        PLAY NEXT
      </button>
      <button
        onClick={() => {
          audio.pause();
        }}
        className='bg-slate-700 px-4 py-2 text-white rounded-md'>
        PAUSE
      </button>
      <div className='flex flex-col justify-center items-center gap-4'>
        <p>DURATION : {secondsToTime(state.CURRENT_TIME)}</p>
        <p>DURATION : {secondsToTime(state.PROGRESS)}</p>
        <Link
          className='bg-slate-700 px-4 py-2 text-white  rounded-md'
          to={'test'}>
          GO TO TEST
        </Link>
      </div>
    </div>
  );
};

export default Progress;
