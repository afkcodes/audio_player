import { RiPlayFill, RiPauseFill } from 'react-icons/ri';
import AudioPlayer from '../modules/audio/audio';
import AUDIO_STATE from '../modules/audio/state';
import { metaData } from '../utils/common/data';
import useNotifier from '../utils/hooks/useNotifier.hook';

const audio = new AudioPlayer(
  'https://aac.saavncdn.com/784/5346d8f2a5b23175eba11713420ec5e5_320.mp4'
);
audio.attachAudioEventListeners();
const audioInstance = AudioPlayer.getAudioInstance();

const sizeConfig: any = {
  SM: {
    outer: 'h-8 w-8',
    inner: 'after:h-6 after:w-6',
    icon: 20,
  },
  MD: {
    outer: 'h-14 w-14',
    inner: 'after:h-12 after:w-12',
    icon: 34,
  },
  LG: {
    outer: 'h-16 w-16',
    inner: 'after:h-14 after:w-14',
    icon: 42,
  },
};

const ProgressIcon = ({ size = 'MD' }) => {
  const {
    state: { CURRENT_TIME, IS_PLAYING },
  } = useNotifier('AUDIO_EVENTS', AUDIO_STATE);

  const duration = Math.round(audioInstance?.duration) || 0;
  const durationPercent = Math.round(
    (Math.round(CURRENT_TIME) / duration) * 100
  );

  const handlePlay = (metaData: any) => {
    if (IS_PLAYING) {
      audio.pause();
    } else {
      audio.play(metaData);
    }
  };

  return (
    <button
      style={{
        backgroundImage: `conic-gradient(#d80000 ${durationPercent}%, lightgrey 0%)`,
      }}
      onClick={() => {
        handlePlay(metaData);
      }}
      className={`
       ${sizeConfig[size].outer} bg-gray-200 flex justify-center items-center rounded-full relative cursor-pointer after:transition-all after:duration-300 after:ease-in-out
      after:content-[''] after:absolute after:top-1/2 after:left-1/2 ${sizeConfig[size].inner} after:bg-gray-200 after:rounded-full after:-translate-x-1/2 after:-translate-y-1/2
      `}>
      {IS_PLAYING ? (
        <RiPauseFill
          size={sizeConfig[size].icon}
          color='#d80000'
          className='z-10'
        />
      ) : (
        <RiPlayFill
          size={sizeConfig[size].icon}
          color='#d80000'
          className='z-10'
        />
      )}
    </button>
  );
};

export default ProgressIcon;
