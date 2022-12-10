import { useEffect, useState } from 'react';
import './App.css';
import Player from './modules/audio/player/player';
import ChangeNotifier from './utils/common/notifier';
import useNotifier from './utils/common/useNotifier.hook';

function App() {
  const player = new Player(
    'https://snoidcdnems03.cdnsrv.jio.com/jiosaavn.cdn.jio.com/583/8b5425d84ca8c3f718c82c94c701a8a3_160.mp4'
  );

  // const event = player.getPlayerEvents();
  // console.log(event);

  // const fetchAndPlay = async () => {
  // const response = await fetch(
  //   'https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm'
  // );
  // const res = await response.json();
  // const track = res.tracks[0];
  // console.log(track);
  // };

  const { state, notify } = useNotifier('ADD', 0, (data: any) => {
    console.log('APP :: ', data);
  });

  console.log('RE_RENDERING');
  return (
    <div className='App'>
      Hello
      <button
        onClick={() => {
          console.log('played');
          player.play();
        }}>
        Play
      </button>
      {state}
      <button
        onClick={() => {
          notify('ADD', state + 1);
        }}>
        Pause
      </button>
    </div>
  );
}

export default App;
