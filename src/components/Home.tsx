import Progress from './Progress';

const getTracks = async () => {
  const res = await fetch(
    'https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm'
  );
  const data = await res.json();
  return data;
};
const getTrack = () => {
  let track = getTracks().then(({ tracks }) => {
    return tracks[Math.floor(Math.random() * (9 - 0 + 1) + 0)];
  });
  return track;
};

const Home = () => {
  return (
    <div className='flex flex-col  items-center justify-center min-h-screen bg-black text-gray-300'>
      <Progress getTrack={getTrack} />
      <button
        onClick={() => {
          // audio.addMedia(media);
          getTrack();
          // console.log(audio.currentMediaTrack)
        }}
        className='bg-slate-700 px-4 py-2 text-white rounded-md'>
        PLAY NEXT
      </button>
    </div>
  );
};

export default Home;
