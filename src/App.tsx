import './App.css';
import { Test } from './components/Test';
import AudioPlayer from './modules/audio/audio';

function App() {
  const audio = new AudioPlayer(
    'https://aac.saavncdn.com/871/adc852f9b398ef7c6c406199611f20fd_160.mp4'
  );

  audio.attachAudioEventListeners();

  return (
    <div className='App'>
      <button
        onClick={() => {
          audio.play();
        }}>
        Play
      </button>
      <Test />
      <button
        onClick={() => {
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
