import { Link } from 'react-router-dom';
import { secondsToTime } from '../helpers/common';
import AudioPlayer from '../modules/audio/audio';
import AUDIO_STATE from '../modules/audio/state';
import useNotifier from '../utils/hooks/useNotifier.hook';
import Volume from './Volume';

const audio = AudioPlayer.getAudioInstance();

const Test = () => {
  const {
    state: { CURRENT_TIME, IS_PLAYING, IS_PAUSED, ENDED, ERROR, VOLUME },
  } = useNotifier('AUDIO_EVENTS', AUDIO_STATE);

  return (
    <div className='flex justify-center items-center h-screen bg-black text-gray-300'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <button
          onClick={() => {
            audio.play();
          }}
          className='bg-slate-700 px-4 py-2 text-white rounded-md'>
          Play
        </button>
        <button
          onClick={() => {
            audio.pause();
          }}
          className='bg-slate-700 px-4 py-2 text-white rounded-md'>
          Pause
        </button>

        <p>
          DURATION : <span>{secondsToTime(CURRENT_TIME)}</span>
        </p>
        <p>PLAYING : {JSON.stringify(IS_PLAYING)}</p>
        <p>PAUSED : {JSON.stringify(IS_PAUSED)}</p>
        <p>ENDED : {JSON.stringify(ENDED)}</p>
        <p>ERROR : {JSON.stringify(ERROR)}</p>
        <p>VOLUME : {JSON.stringify(VOLUME)}</p>

        <Link className='bg-slate-700 px-4 py-2 text-white rounded-md' to={'/'}>
          GO TO HOME
        </Link>
        <Volume />
      </div>
    </div>
  );
};

export default Test;
