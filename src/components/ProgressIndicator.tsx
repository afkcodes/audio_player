import { RiPauseMiniFill, RiPlayFill } from 'react-icons/ri';
import AudioPlayer from '../modules/audio/audio';
import AUDIO_STATE from '../modules/audio/state';
import useNotifier from '../utils/hooks/useNotifier.hook';
import style from './progressIndicator.module.css';

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
    icon: 48,
  },
};

const ProgressIndicator = ({ source, size = 'LG' }: any) => {
  const audioInstance = AudioPlayer.getAudioInstance();

  const {
    state: { CURRENT_TIME, IS_PLAYING, ENDED },
  } = useNotifier('AUDIO_EVENTS', AUDIO_STATE);

  const duration = Math.round(audioInstance?.duration) || 0;
  const durationPercent = Math.round(
    (Math.round(CURRENT_TIME) / duration) * 100
  );

  const handlePlay = (source?: any) => {
    if (IS_PLAYING) {
      audioInstance.pause();
    } else {
      audioInstance.play();
    }
  };

  console.log({ CURRENT_TIME, IS_PLAYING, ENDED });

  return (
    <button
      style={{ '--progress': ENDED ? 0 : durationPercent } as any}
      onClick={() => {
        handlePlay(source);
      }}
      className={`h-16 w-16 rounded-full p-1 flex justify-center items-center ${style.progress}`}>
      {IS_PLAYING ? (
        <RiPauseMiniFill
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

export default ProgressIndicator;
