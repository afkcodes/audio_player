import { notifierState } from '../utils/common/notifier';
import Progress from './Progress';
import ProgressIcon from './ProgressIcon';
import Volume from './Volume';

const Home = () => {
  console.log(notifierState);
  return (
    <div className='flex justify-center items-center h-screen bg-black text-gray-300'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <ProgressIcon size='MD' />
        <Volume />
      </div>
      {/* <Progress /> */}
    </div>
  );
};

export default Home;
