import React from 'react';
import { Link } from 'react-router-dom';
import { secondsToTime } from '../helpers/common';
import AudioPlayer from '../modules/audio/audio';
import AUDIO_STATE from '../modules/audio/state';
import useNotifier from '../utils/hooks/useNotifier.hook';

const audio = new AudioPlayer(
  'https://aac.saavncdn.com/784/5346d8f2a5b23175eba11713420ec5e5_320.mp4'
);
audio.attachAudioEventListeners();

const Home = () => {
  const {
    state: { CURRENT_TIME },
  } = useNotifier('AUDIO_EVENTS', AUDIO_STATE);

  return (
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
      <div>
        <p>DURATION : {secondsToTime(CURRENT_TIME)}</p>
        <Link to={'test'}>GO TO TEST</Link>
      </div>
    </div>
  );
};

export default Home;
