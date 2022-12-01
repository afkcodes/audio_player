class Player {
  audio: HTMLAudioElement;
  constructor(source: string) {
    this.audio = new Audio(source);
  }

  set updateSource(source: string) {
    this.audio.src = source;
  }

  get audioInstance() {
    return this.audio;
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
