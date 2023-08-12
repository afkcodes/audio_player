import Progress from "./Progress";

const getTracks = async () => {
  const res = await fetch(
    "http://140.238.249.231/v1/station/search?search_query=bollywood&limit=0&filter=radio&user_id=12312aasdasd"
  );
  const data = await res.json();
  const station = data.data.stations[0];

  return station;
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
      <button
        onClick={() => {
          // audio.addMedia(media);
          getTrack();
          // console.log(audio.currentMediaTrack)
        }}
        className="bg-slate-700 px-4 py-2 text-white rounded-md"
      >
        PLAY NEXT
      </button>
    </div>
  );
};

export default Home;
