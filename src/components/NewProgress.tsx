import { secondsToTime } from '../helpers/common';
import AudioPlayer from '../modules/audio/audio';
import AUDIO_STATE from '../modules/audio/state';
import useListener from '../utils/hooks/useListener.hook';

const NewProgress = () => {
  const state = useListener('AUDIO_EVENTS', AUDIO_STATE);
  const audio = AudioPlayer.getAudioInstance();

  return (
    <div className='flex flex-col justify-center items-center gap-4 fixed bottom-0 w-full bg-gray-900'>
      <div className='flex p-4 justify-around w-full items-center'>
        <p>DURATION : {secondsToTime(state.CURRENT_TIME)}</p>
        <button
          onClick={() => {
            audio.paused ? audio.play() : audio.pause();
          }}
          className='bg-slate-700 px-4 py-2 text-white rounded-md'>
          {audio.paused ? 'PLAY' : 'PAUSE'}
        </button>
      </div>
    </div>
  );
};

export default NewProgress;
