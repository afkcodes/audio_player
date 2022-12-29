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

  play() {
    const isSourceAvailable: boolean = audioInstance.src !== '';
    if (isSourceAvailable && audioInstance.HAVE_FUTURE_DATA) {
      audioInstance.play().then((_) => {
        updateMetaData({
          title: 'Aasman Ke Neeche',
          artist: 'Kishore Kumar',
          album: 'Jewel Thief',
          artwork: [
            {
              src: 'https://c.saavncdn.com/784/Jewel-Thief-Hindi-1967-20200901153934-500x500.jpg',
              sizes: '96x96',
              type: 'image/png',
            },
            {
              src: 'https://c.saavncdn.com/784/Jewel-Thief-Hindi-1967-20200901153934-500x500.jpg',
              sizes: '128x128',
              type: 'image/png',
            },
            {
              src: 'https://c.saavncdn.com/784/Jewel-Thief-Hindi-1967-20200901153934-500x500.jpg',
              sizes: '192x192',
              type: 'image/png',
            },
            {
              src: 'https://c.saavncdn.com/784/Jewel-Thief-Hindi-1967-20200901153934-500x500.jpg',
              sizes: '256x256',
              type: 'image/png',
            },
            {
              src: 'https://c.saavncdn.com/784/Jewel-Thief-Hindi-1967-20200901153934-500x500.jpg',
              sizes: '384x384',
              type: 'image/png',
            },
            {
              src: 'https://c.saavncdn.com/784/Jewel-Thief-Hindi-1967-20200901153934-500x500.jpg',
              sizes: '512x512',
              type: 'image/png',
            },
          ],
        });
      });
      attachMediaSessionHandlers();
    } else {
      throw new Error('Audio source must be set before playing an audio');
    }
  }

  pause() {
    audioInstance.pause();
  }

  reset() {
    audioInstance.pause();
    audioInstance.currentTime = 0;
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
