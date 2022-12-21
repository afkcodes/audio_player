import { Link } from 'react-router-dom';
import { secondsToTime } from '../helpers/common';
import AUDIO_STATE from '../modules/audio/state';
import useNotifier from '../utils/hooks/useNotifier.hook';

const Test = () => {
  const {
    state: { CURRENT_TIME, IS_PLAYING, IS_PAUSED, ENDED, ERROR },
  } = useNotifier('AUDIO_EVENTS', AUDIO_STATE);

  return (
    <div>
      <p>
        DURATION : <span>{secondsToTime(CURRENT_TIME)}</span>
      </p>
      <p>PLAYING : {JSON.stringify(IS_PLAYING)}</p>
      <p>PAUSED : {JSON.stringify(IS_PAUSED)}</p>
      <p>ENDED : {JSON.stringify(ENDED)}</p>
      <p>ERROR : {JSON.stringify(ERROR)}</p>
      <Link to={'/'}>GO TO HOME</Link>
    </div>
  );
};

export default Test;
