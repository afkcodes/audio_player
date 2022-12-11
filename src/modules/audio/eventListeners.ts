import ChangeNotifier from '../../utils/common/notifier';
import Player from './audio';
import PLAYER_EVENTS from './events';

const attachAudioEventListeners = () => {
  const audioInstance = Player.getAudioInstance();
  const notifier = ChangeNotifier;

  audioInstance.addEventListener(PLAYER_EVENTS.TIME_UPDATE, (e: any) => {
    notifier.notify('AUDIO_EVENTS', {
      IS_PLAYING: true,
      CURRENT_TIME: audioInstance.currentTime,
      IS_PAUSED: false,
    });
  });

  audioInstance.addEventListener(PLAYER_EVENTS.PROGRESS, (e: any) => {
    // console.log(e);
  });

  audioInstance.addEventListener(PLAYER_EVENTS.PLAY, (e: any) => {
    // console.log('CALLING PLAY', e);
  });

  audioInstance.addEventListener(PLAYER_EVENTS.PLAYING, (e: any) => {
    // console.log('CALLING PLAYING', e);
    notifier.notify('AUDIO_EVENTS', {
      IS_PLAYING: true,
    });
  });

  audioInstance.addEventListener(PLAYER_EVENTS.PAUSE, (e: any) => {
    // console.log('CALLING PAUSE', e);
    notifier.notify('AUDIO_EVENTS', {
      IS_PLAYING: false,
      CURRENT_TIME: audioInstance.currentTime,
      IS_PAUSED: true,
    });
  });
};

export default attachAudioEventListeners;
