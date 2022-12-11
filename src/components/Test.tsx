import { secondsToTime } from '../helpers/common';
import AUDIO_STATE from '../modules/audio/state';
import useNotifier from '../utils/hooks/useNotifier.hook';

export const Test = ({ num }: any) => {
  console.log('RENDERING Test');
  const { state: audioEvents } = useNotifier('AUDIO_EVENTS', AUDIO_STATE);

  return (
    <div>
      <p>Duration : {secondsToTime(audioEvents.CURRENT_TIME)}</p>
      <p>PLAYING : {JSON.stringify(audioEvents.IS_PLAYING)}</p>
      <p>PAUSED : {JSON.stringify(audioEvents.IS_PAUSED)}</p>
    </div>
  );
};
