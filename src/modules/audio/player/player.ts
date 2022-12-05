let audioInstance: HTMLAudioElement;
class Player {
  audio: HTMLAudioElement;
  constructor(source: string) {
    if (process.env.NODE_ENV !== 'development' && audioInstance) {
      throw new Error('Cannot create multiple audio instance');
    }
    this.audio = new Audio(source);
    audioInstance = this.audio;
  }

  set updateSource(source: string) {
    this.audio.src = source;
  }

  static getAudioInstance() {
    return audioInstance;
  }

  play() {
    const isSourceAvailable: boolean = this.audio.src !== '';
    if (isSourceAvailable) {
      this.audio.play();
    } else {
      throw new Error('Audio source must be set before playing an audio');
    }
  }

  pause() {
    this.audio.pause();
  }

  reset() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }

  getPlayerEvents() {
    const events = {
      isPlaying: true,
      timeStamp: 0,
    };
    this.audio.addEventListener('timeupdate', (e) => {
      events.timeStamp = e.timeStamp;
    });
    return events;
  }
}
export default Player;
