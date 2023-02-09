import { checkValidWindow } from '../../helpers/validators';
import attachAudioEventListeners from './eventListeners';
import {
  attachMediaSessionHandlers,
  updateMetaData,
} from './mediaSessionHandler';

let audioInstance: HTMLAudioElement;

class AudioPlayer {
  audio: HTMLAudioElement;
  constructor(source: string) {
    if (process.env.NODE_ENV !== 'development' && audioInstance) {
      throw new Error('Cannot create multiple audio instance');
    }
    this.audio = new Audio(source);
    audioInstance = this.audio;
  }

  set updateSource(source: string) {
    audioInstance.src = source;
  }

  static getAudioInstance() {
    return audioInstance;
  }

  play(source: string, metaData?: any) {
    const isSourceAvailable: boolean = audioInstance.src !== '';
    if (isSourceAvailable && audioInstance.HAVE_FUTURE_DATA) {
      this.reset(source);
      audioInstance.load();
      audioInstance.play().then((_) => {
        if (metaData !== undefined) {
          updateMetaData(metaData);
        } else {
          console.error('Unable to set MetaData, no MetaData supplied');
        }
      });
      attachMediaSessionHandlers();
    } else {
      throw new Error('Audio source must be set before playing an audio');
    }
  }

  pause() {
    audioInstance.pause();
  }

  reset(source?: string) {
    audioInstance.pause();
    audioInstance.currentTime = 0;
    if (source) {
      audioInstance.src = source;
    }
  }

  attachAudioEventListeners() {
    attachAudioEventListeners();
  }

  static updateMetaData(data: any) {
    if (checkValidWindow) {
      updateMetaData(data);
    } else {
      throw new Error('window not found or undefined');
    }
  }
  static attachMediaSessionHandlers() {
    if (checkValidWindow) {
      attachMediaSessionHandlers();
    } else {
      throw new Error('window not found or undefined');
    }
  }
}
export default AudioPlayer;
