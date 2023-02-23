import { checkValidObject, checkValidWindow } from '../../helpers/validators';
import attachAudioEventListeners from './eventListeners';
import {
  attachMediaSessionHandlers,
  updateMetaData
} from './mediaSessionHandler';
import { MediaTrackType } from './types';

let audioInstance: HTMLAudioElement;

class AudioPlayer {
  private _audio: HTMLAudioElement;
  private _currentTrack: MediaTrackType | undefined;
  constructor(source: string) {
    if (process.env.NODE_ENV !== 'development' && audioInstance) {
      throw new Error('Cannot create multiple audio instance');
    }
    this._audio = new Audio(source)
    audioInstance = this._audio;
  }

  private _updateSource(source: string) {
    this.reset()
    audioInstance.src = source;
  }

  static getAudioInstance() {
    return audioInstance;
  }


  addMedia(media: MediaTrackType) {
    if (checkValidObject(media)) {
      this._updateSource(media?.source);
      this._currentTrack = media;
    }
  }

  play() {
    const isSourceAvailable: boolean = audioInstance.src !== '';
    if (isSourceAvailable && audioInstance.HAVE_FUTURE_DATA) {
      audioInstance.play().then((_) => {
        this._updateMetaData(this._currentTrack);
      })
      attachMediaSessionHandlers();
    } else {
      throw new Error('Audio source must be set before playing an audio');
    }
  }

  pause() {
    audioInstance.pause();
  }

  stop() {
    this.reset();
  }

  reset() {
    audioInstance.pause();
    audioInstance.currentTime = 0;
  }

  attachAudioEventListeners() {
    attachAudioEventListeners();
  }

  private _updateMetaData(metaData: any) {
    if (checkValidObject(metaData)) {
      updateMetaData(metaData);
    } else {
      throw new Error('window not found or undefined');
    }
  }

  attachMediaSessionHandlers() {
    if (checkValidWindow) {
      attachMediaSessionHandlers();
    } else {
      throw new Error('window not found or undefined');
    }
  }

  get currentMediaTrack() {
    return this._currentTrack
  }
}
export default AudioPlayer;