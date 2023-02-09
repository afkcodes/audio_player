import useListener from '../utils/hooks/useListener.hook';
import ProgressIndicator from './ProgressIndicator';

const BottomPlayer = () => {
  const state = useListener('CURRENTLY_PLAYING', {});
  return (
    <div className='bg-white text-black w-full'>
      <div className='flex gap-4 justify-center w-full cursor-pointer px-1 py-1'>
        <div className='h-24 w-24 overflow-hidden rounded-md object-fill'>
          <img
            src={`https://api.napster.com/imageserver/v2/albums/${state.albumId}/images/200x200.png`}
            alt='asdas'
            className='object-fill'
          />
        </div>
        <div className='flex flex-col flex-1'>
          <p>{state.name}</p>
          <p>{state.artistName}</p>
        </div>
        <div className='flex justify-center items-center'>
          <ProgressIndicator
            size='MD'
            source={state.previewURL}
            key={state.id}
          />
          {/* {isPlaying ? 'PLAYING' : 'PAUSED'} */}
        </div>
      </div>
    </div>
  );
};

export default BottomPlayer;
