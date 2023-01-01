import { Link } from 'react-router-dom';
import { secondsToTime } from '../helpers/common';
import AudioPlayer from '../modules/audio/audio';
import AUDIO_STATE from '../modules/audio/state';
import { metaData } from '../utils/common/data';
import useNotifier from '../utils/hooks/useNotifier.hook';

const audio = new AudioPlayer(
  'https://aac.saavncdn.com/784/5346d8f2a5b23175eba11713420ec5e5_320.mp4'
);
audio.attachAudioEventListeners();
const audioInstance = AudioPlayer.getAudioInstance();

const Progress = () => {
  const {
    state: { CURRENT_TIME, PROGRESS },
  } = useNotifier('AUDIO_EVENTS', AUDIO_STATE);

  return (
    <div className='flex flex-col justify-center items-center gap-4'>
      <button
        onClick={() => {
          audio.play(metaData);
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
      <div className='flex flex-col justify-center items-center gap-4'>
        <p>DURATION : {secondsToTime(CURRENT_TIME)}</p>
        <p>DURATION : {secondsToTime(audioInstance.duration)}</p>
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
