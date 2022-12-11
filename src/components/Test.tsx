import AUDIO_STATE from '../modules/audio/state';
import useNotifier from '../utils/common/useNotifier.hook';

export const Test = ({ num }: any) => {
  console.log('RENDERING Test');
  const { state: audioEvents } = useNotifier('AUDIO_EVENTS', AUDIO_STATE);

  return (
    <div>
      <pre>{JSON.stringify(audioEvents, null, 2)}</pre>
    </div>
  );
};
