import AudioPlayer from '../modules/audio/audio';
import AUDIO_STATE from '../modules/audio/state';
import useNotifier from '../utils/hooks/useNotifier.hook';
const audioInstance = AudioPlayer.getAudioInstance();

const Volume = () => {
  const {
    state: { VOLUME },
  } = useNotifier('VOLUME_CHANGE', AUDIO_STATE);
  return (
    <div>
      <input
        type='range'
        name='volume'
        id='volume'
        max={100}
        min={0}
        value={VOLUME}
        onChange={(e: any) => {
          audioInstance.volume = e.target.value / 100;
        }}
      />
    </div>
  );
};

export default Volume;
