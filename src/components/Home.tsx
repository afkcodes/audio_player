import AudioPlayer from '../modules/audio/audio';
import AUDIO_STATE from '../modules/audio/state';
import { notifierState } from '../utils/common/notifier';
import useNotifier from '../utils/hooks/useNotifier.hook';
import Progress from './Progress';
import Volume from './Volume';

const Home = () => {
  console.log(notifierState);
  return (
    <div className='flex justify-center items-center h-screen bg-black text-gray-300'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <Progress />
        <Volume />
      </div>
    </div>
  );
};

export default Home;
