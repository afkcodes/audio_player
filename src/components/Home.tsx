import Progress from "./Progress";

const getTracks = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  // const station = data.data.stations[0];

  return data;
};
const getTrack = () => {
  let track = getTracks().then((track) => {
    return track;
  });
  return track;
};

const Home = () => {
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen bg-black text-gray-300">
      <Progress getTrack={getTrack} />
    </div>
  );
};

export default Home;
