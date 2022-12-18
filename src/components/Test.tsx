import { secondsToTime } from '../helpers/common';
import AUDIO_STATE from '../modules/audio/state';
import useNotifier from '../utils/hooks/useNotifier.hook';

export const Test = ({ num }: any) => {
  // console.log('RENDERING TEST');
  const {
    state: { CURRENT_TIME, IS_PLAYING, IS_PAUSED, ENDED, ERROR },
    removeListener,
  } = useNotifier('AUDIO_EVENTS', AUDIO_STATE);

  return (
    <div>
      <p>DURATION : {secondsToTime(CURRENT_TIME)}</p>
      <p>PLAYING : {JSON.stringify(IS_PLAYING)}</p>
      <p>PAUSED : {JSON.stringify(IS_PAUSED)}</p>
      <p>ENDED : {JSON.stringify(ENDED)}</p>
      <p>ERROR : {JSON.stringify(ERROR)}</p>

      <button onClick={() => removeListener('test')}>Remove Listener</button>
    </div>
  );
};
