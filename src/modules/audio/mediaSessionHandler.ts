import { metaDataCreator } from '../../helpers/common';
import AudioPlayer from './audio';

export const updateMetaData = (data: any) => {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata(metaDataCreator(data));
  }
};

export const attachMediaSessionHandlers = () => {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.setActionHandler('play', () => {
      /* Code excerpted. */
      const audioInstance = AudioPlayer.getAudioInstance();
      audioInstance.play();
    });
    navigator.mediaSession.setActionHandler('pause', () => {
      /* Code excerpted. */
      const audioInstance = AudioPlayer.getAudioInstance();
      audioInstance.pause();
    });
  }
};
