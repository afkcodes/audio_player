import './App.css';
import { Test } from './components/Test';
import AudioPlayer from './modules/audio/audio';
import useNotifier from './utils/common/useNotifier.hook';

function App() {
  const audio = new AudioPlayer(
    'https://snoidcdnems08.cdnsrv.jio.com/jiosaavn.cdn.jio.com/723/8e174f785101d131f548c537f4f024d2_160.mp4'
  );

  AudioPlayer.attachAudioEventListeners();

  return (
    <div className='App'>
      Hello
      <button
        onClick={() => {
          audio.play();
        }}>
        Play
      </button>
      <Test />
      <button
        onClick={() => {
          // ChangeNotifier.notify('ADD', num + 1);
          audio.pause();
        }}>
        Pause
      </button>
    </div>
  );
}

export default App;

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
