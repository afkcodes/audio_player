export const PLAYER_EVENTS = Object.freeze({
  ABORT: 'abort',
  TIME_UPDATE: 'timeupdate',
  CAN_PLAY: 'canplay',
  CAN_PLAY_THROUGH: 'canplaythrough',
  DURATION_CHANGE: 'durationchange',
  ENDED: 'ended',
  EMPTIED: 'emptied',
  PLAYING: 'playing',
  WAITING: 'waiting',
  SEEKING: 'seeking',
  SEEKED: 'seeked',
  LOADED_META_DATA: 'loadedmetadata',
  LOADED_DATA: 'loadeddata',
  PLAY: 'play',
  PAUSE: 'pause',
  RATE_CHANGE: 'ratechange',
  VOLUME_CHANGE: 'volumechange',
  SUSPEND: 'suspend',
  STALLED: 'stalled',
  PROGRESS: 'progress',
  LOAD_START: 'loadstart',
  ERROR: 'error',
});

export const ERROR_EVENTS: any = Object.freeze({
  1: 'MEDIA_ERR_ABORTED',
  3: 'MEDIA_ERR_DECODE',
  2: 'MEDIA_ERR_NETWORK',
  4: 'MEDIA_ERR_SRC_NOT_SUPPORTED',
});

// Ref: https://html.spec.whatwg.org/multipage/media.html#network-states
export const NETWORK_STATE: any = Object.freeze({
  0: 'NETWORK_EMPTY',
  1: 'NETWORK_IDLE',
  2: 'NETWORK_LOADING',
  3: 'NETWORK_NO_SOURCE',
});
