// import Test from './components/Test';
import { useState } from 'react';
import './index.css';
import ChangeNotifier from './utils/common/notifier';
import useListener from './utils/hooks/useListener.hooks';

export const notifier = new ChangeNotifier();
function App() {
  const [state, setState] = useState(0);
  const { notifier } = useListener('ADD', (data: any) => {
    setState(data);
  });

  return (
    <div className='h-screen w-full flex'>
      <div className='flex flex-col justify-center items-center h-screen bg-red-500 text-white'>
        {state}
        <button
          className='px-4 py-3 bg-red-500'
          onClick={() => {
            notifier.notify('ADD', state + 1);
          }}>
          ADD
        </button>
      </div>
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
