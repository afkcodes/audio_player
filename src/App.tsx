import { useEffect, useRef } from 'react';
import './App.css';

function App() {
  const playerRef = useRef<any>(null);

  const fetchAndPlay = async () => {
    const response = await fetch(
      'https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm'
    );
    const res = await response.json();
    const track = res.tracks[0];
    console.log(track);
    playerRef.current.pause();
    playerRef.current.currentTime = 0;
    playerRef.current.src = track.previewURL;
    playerRef.current.play();

    const audio = new Audio(track.previewURL);
    console.log(audio);
  };

  return (
    <div className='App'>
      Hello
      <audio
        ref={playerRef}
        // style={{ display: 'none' }}
        src='https://snoidcdnems03.cdnsrv.jio.com/jiosaavn.cdn.jio.com/583/8b5425d84ca8c3f718c82c94c701a8a3_160.mp4'>
        your browser doesn't support html audio
      </audio>
      <button
        onClick={() => {
          console.log('clicked');
          fetchAndPlay();
          playerRef.current.play();
        }}>
        Play
      </button>
    </div>
  );
}

export default App;
