import { Link } from 'react-router-dom';
import { secondsToTime } from '../helpers/common';
import AudioPlayer from '../modules/audio/audio';
import useListener from '../utils/hooks/useListener.hook';
import Home from './Home';
import New from './New';

const audio = AudioPlayer.getAudioInstance();

const Test = () => {
  const {
    state: { CURRENT_TIME, IS_PLAYING, IS_PAUSED, ENDED, ERROR },
  } = useListener(2, 'AUDIO_EVENTS');

  return (
    <>
      <div>
        <button
          onClick={() => {
            audio.play();
          }}>
          Play
        </button>
        <button
          onClick={() => {
            audio.pause();
          }}>
          Pause
        </button>

        <p>
          DURATION : <span>{secondsToTime(CURRENT_TIME)}</span>
        </p>
        <p>PLAYING : {JSON.stringify(IS_PLAYING)}</p>
        <p>PAUSED : {JSON.stringify(IS_PAUSED)}</p>
        <p>ENDED : {JSON.stringify(ENDED)}</p>
        <p>ERROR : {JSON.stringify(ERROR)}</p>
        <Link to={'/'}>GO TO HOME</Link>
      </div>
    </>
  );
};

export default Test;
