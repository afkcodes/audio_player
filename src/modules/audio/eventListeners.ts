import ChangeNotifier, { notifierState } from '../../utils/common/notifier';
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
  });

  audioInstance.addEventListener(PLAYER_EVENTS.PROGRESS, (e: any) => {
    notifier.notify('AUDIO_EVENTS', {
      CURRENT_TIME: audioInstance.currentTime,
      IS_PLAYING: true,
      IS_PAUSED: false,
      ENDED: false,
      PROGRESS: e.timeStamp,
    });
  });

  audioInstance.addEventListener(PLAYER_EVENTS.PLAYING, (e: any) => {
    notifier.notify(
      'AUDIO_EVENTS',
      {
        CURRENT_TIME: audioInstance.currentTime,
        IS_PLAYING: !audioInstance.paused,
        IS_PAUSED: audioInstance.paused,
        ENDED: audioInstance.ended,
      },
      PLAYER_EVENTS.PLAYING
    );
  });

  audioInstance.addEventListener(PLAYER_EVENTS.PAUSE, (e: any) => {
    notifier.notify(
      'AUDIO_EVENTS',
      {
        CURRENT_TIME: audioInstance.currentTime,
        IS_PLAYING: !audioInstance.paused,
        IS_PAUSED: audioInstance.paused,
        ENDED: audioInstance.ended,
      },
      PLAYER_EVENTS.PAUSE
    );
  });

  audioInstance.addEventListener(PLAYER_EVENTS.ENDED, (e: any) => {
    notifier.notify('AUDIO_EVENTS', {
      CURRENT_TIME: audioInstance.currentTime,
      IS_PLAYING: !audioInstance.paused,
      IS_PAUSED: audioInstance.paused,
      ENDED: audioInstance.ended,
    });
  });

  audioInstance.addEventListener(PLAYER_EVENTS.ERROR, (e: any) => {
    const error = audioErrorHandler(e);

    notifier.notify(
      'AUDIO_EVENTS',
      {
        CURRENT_TIME: audioInstance.currentTime,
        IS_PLAYING: !audioInstance.paused,
        IS_PAUSED: audioInstance.paused,
        ENDED: audioInstance.ended,
        ERROR: error,
      },
      PLAYER_EVENTS.ERROR
    );
  });

  audioInstance.addEventListener(PLAYER_EVENTS.LOADED_META_DATA, (e: any) => {

    navigator.mediaSession.setPositionState({
      duration: audioInstance.duration,
      playbackRate: audioInstance.playbackRate,
      position: audioInstance.currentTime,
    });
    notifier.notify(
      'AUDIO_EVENTS',
      {
        DURATION: audioInstance.duration,
        IS_PLAYING: !audioInstance.paused,
        IS_PAUSED: audioInstance.paused,
        ENDED: audioInstance.ended,
      },
      PLAYER_EVENTS.LOADED_META_DATA
    );
  });

  audioInstance.addEventListener(PLAYER_EVENTS.VOLUME_CHANGE, (e: any) => {
    notifier.notify(
      'VOLUME_CHANGE',
      (notifierState['AUDIO_EVENTS'] = {
        ...notifierState['AUDIO_EVENTS'],
        VOLUME: Math.round(audioInstance.volume * 100),
      }),
      PLAYER_EVENTS.VOLUME_CHANGE
    );
  });
};

export default attachAudioEventListeners;
