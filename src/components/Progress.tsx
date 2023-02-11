import { Link } from 'react-router-dom';
import { secondsToTime } from '../helpers/common';
import AudioPlayer from '../modules/audio/audio';
import AUDIO_STATE from '../modules/audio/state';
import useListener from '../utils/hooks/useListener.hook';
import useNotifier from '../utils/hooks/useNotifier.hook';

const audio = new AudioPlayer(
  'https://aac.saavncdn.com/807/f5a2929f50aa073c95017522ab406717_320.mp4'
);
audio.attachAudioEventListeners();

const Progress = () => {
  const state = useListener('AUDIO_EVENTS', AUDIO_STATE);
  const audioInstance = AudioPlayer.getAudioInstance();

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <button
        onClick={() => {
          audioInstance.paused ? audio.play() : audio.pause();
        }}
        className='bg-slate-700 px-4 py-2 text-white rounded-md'>
        {audioInstance.paused ? 'PLAY' : 'PAUSE'}
      </button>
      <div className='flex flex-col justify-center items-center gap-4'>
        <p>DURATION : {secondsToTime(state.CURRENT_TIME)}</p>
        <p>DURATION : {secondsToTime(state.PROGRESS)}</p>
        <Link
          className='bg-slate-700 px-4 py-2 text-white rounded-md'
          to={'test'}>
          GO TO TEST
        </Link>
      </div>
    </div>
  );
};

export default Progress;
