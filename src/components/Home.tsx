import NewProgress from './NewProgress';
import Progress from './Progress';

const Home = () => {
  return (
    <div className='flex flex-col  items-center min-h-screen bg-black text-gray-300'>
      <div className='flex flex-col justify-center items-center gap-4 w-full'>
        <div className='divide-y divide-blue-200 w-full flex flex-col gap-2 pb-20'>
          <div className='pt-2'>
            <Progress />
          </div>
          <br />
          <div className='pt-2'>
            <Progress />
          </div>
          <br />
          <div className='pt-2'>
            <Progress />
          </div>
          <br />
          <div className='pt-2'>
            <Progress />
          </div>
        </div>
      </div>
      <div className='pt-2 w-full'>
        <NewProgress />
      </div>
    </div>
  );
};

export default Home;
