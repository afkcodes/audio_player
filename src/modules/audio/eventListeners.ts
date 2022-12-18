import ChangeNotifier from '../../utils/common/notifier';
import AudioPlayer from './audio';
import Player from './audio';
import { audioErrorHandler } from './errorHandler';
import { PLAYER_EVENTS } from './events';

const attachAudioEventListeners = () => {
  const audioInstance = Player.getAudioInstance();
  const notifier = ChangeNotifier;

  audioInstance.addEventListener(PLAYER_EVENTS.TIME_UPDATE, (e: any) => {
    notifier.notify(
      'AUDIO_EVENTS',
      {
        IS_PLAYING: true,
        CURRENT_TIME: audioInstance.currentTime,
        IS_PAUSED: false,
        ENDED: false,
      },
      PLAYER_EVENTS.TIME_UPDATE
    );
    // navigator.mediaSession.setPositionState({
    //   duration: audioInstance.duration,
    //   playbackRate: audioInstance.playbackRate,
    //   position: audioInstance.currentTime,
    // });
  });

  audioInstance.addEventListener(PLAYER_EVENTS.PROGRESS, (e: any) => {
    // console.log(e);
  });

  audioInstance.addEventListener(PLAYER_EVENTS.PLAYING, (e: any) => {
    // console.log('CALLING PLAYING', e);

    notifier.notify('AUDIO_EVENTS', {
      CURRENT_TIME: audioInstance.currentTime,
      IS_PLAYING: true,
      IS_PAUSED: false,
      ENDED: false,
    });
  });

  audioInstance.addEventListener(PLAYER_EVENTS.PAUSE, (e: any) => {
    // console.log('CALLING PAUSE', e);
    notifier.notify('AUDIO_EVENTS', {
      IS_PLAYING: false,
      CURRENT_TIME: audioInstance.currentTime,
      IS_PAUSED: true,
      ENDED: false,
    });
  });

  audioInstance.addEventListener(PLAYER_EVENTS.ENDED, (e: any) => {
    // console.log('CALLING PAUSE', e);
    notifier.notify('AUDIO_EVENTS', {
      IS_PLAYING: false,
      CURRENT_TIME: audioInstance.currentTime,
      IS_PAUSED: false,
      ENDED: true,
    });
  });

  audioInstance.addEventListener(PLAYER_EVENTS.ERROR, (e: any) => {
    const error = audioErrorHandler(e);

    notifier.notify('AUDIO_EVENTS', {
      IS_PLAYING: false,
      CURRENT_TIME: audioInstance.currentTime,
      IS_PAUSED: false,
      ENDED: true,
      ERROR: error,
    });
  });

  audioInstance.addEventListener(PLAYER_EVENTS.LOADED_META_DATA, (e: any) => {
    navigator.mediaSession.setPositionState({
      duration: audioInstance.duration,
      playbackRate: audioInstance.playbackRate,
      position: audioInstance.currentTime,
    });
  });

  audioInstance.addEventListener(PLAYER_EVENTS.LOADED_META_DATA, (e: any) => {
    console.log('LOADED DATA');
  });
};

export default attachAudioEventListeners;
