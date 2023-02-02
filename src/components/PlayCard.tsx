import AudioPlayer from '../modules/audio/audio';

const audio = new AudioPlayer(
  'https://aac.saavncdn.com/815/483a6e118e8108cbb3e5cd8701674f32_320.mp4'
);
audio.attachAudioEventListeners();
const audioInstance = AudioPlayer.getAudioInstance();

const PlayCard = ({ data }: any) => {
  return (
    <div
      className='flex gap-4 justify-center w-full cursor-pointer'
      onClick={() => {
        audio.play(data.previewURL);
      }}>
      <div className='h-24 w-24 overflow-hidden rounded-md object-fill'>
        <img
          src={`https://api.napster.com/imageserver/v2/albums/${data.albumId}/images/200x200.png`}
          alt='asdas'
          className='object-fill'
        />
      </div>
      <div className='flex flex-col flex-1'>
        <p>{data.name}</p>
        <p>{data.artistName}</p>
      </div>
    </div>
  );
};

export default PlayCard;
