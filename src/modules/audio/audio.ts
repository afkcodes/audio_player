import attachAudioEventListeners from './eventListeners';

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
      audioInstance.play();
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

  static attachAudioEventListeners() {
    attachAudioEventListeners();
  }
}
export default AudioPlayer;
