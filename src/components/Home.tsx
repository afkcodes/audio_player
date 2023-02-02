import { useEffect, useState } from 'react';
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
    <div className='flex bg-black text-gray-300'>
      <div className='flex flex-col justify-center items-center gap-4'>
        {/* <ProgressIcon size='LG' /> */}
        {/* <ProgressIndicator /> */}
        {/* <Volume /> */}
        {songData.map((el: any) => (
          <PlayCard data={el} key={el.id} />
        ))}
      </div>
    </div>
  );
};

export default Home;
