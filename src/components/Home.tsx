import { useEffect, useState } from 'react';
import BottomPlayer from './BottomPlayer';
import PlayCard from './PlayCard';

const getData = async () => {
  const res = await fetch(
    'https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm'
  );
  const data = await res.json();
  return data;
};

const Home = () => {
  const [songData, setSongData] = useState<any[]>([]);

  useEffect(() => {
    getData().then((data) => {
      setSongData(data.tracks);
    });
  }, []);

  return (
    <div className='flex flex-col justify-start min-h-screen bg-black text-gray-300'>
      {/* <div className='flex flex-col justify-center items-center gap-4 w-full'>
        <div className='divide-y divide-blue-200 flex flex-col gap-2 w-full'>
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
      </div> */}
      <div className='flex flex-col gap-2 py-2'>
        {songData.map((el: any) => (
          <PlayCard data={el} key={el.id} />
        ))}
      </div>
      <BottomPlayer />
    </div>
  );
};

export default Home;
