import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { secondsToTime } from '../helpers/common';
import AudioPlayer from '../modules/audio/audio';
import AUDIO_STATE from '../modules/audio/state';
import { notifierState } from '../utils/common/notifier';
import useNotifier from '../utils/hooks/useNotifier.hook';
import Test from './Test';

const audio = new AudioPlayer(
  'https://aac.saavncdn.com/784/5346d8f2a5b23175eba11713420ec5e5_320.mp4'
);
audio.attachAudioEventListeners();

audio.audio.volume = 0.2;

const Home = () => {
  const { state } = useNotifier(1, 'AUDIO_EVENTS', AUDIO_STATE, false, false);

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
        <p>DURATION : {secondsToTime(state.CURRENT_TIME)}</p>
        <Link to={'test'}>GO TO TEST</Link>
      </div>
    </div>
  );
};

export default Home;
