import Progress from './Progress';

const Home = () => {
  return (
    <div className='flex justify-center items-center min-h-screen bg-black text-gray-300'>
      <div className='flex flex-col justify-center items-center gap-4'>
        <div className='divide-y divide-blue-200 w-full flex flex-col gap-2 w-full'>
          <div className='pt-2'>
            <Progress />
          </div>
          <br />
          <div>
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
    </div>
  );
};

export default Home;
