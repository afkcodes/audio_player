import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Test from './components/Test';

function App() {
  console.log('RENDERING APP');
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='test' element={<Test />} />
      </Routes>
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
