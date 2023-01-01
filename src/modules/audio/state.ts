const AUDIO_STATE = {
  CURRENT_TIME: 0,
  IS_PLAYING: false,
  IS_PAUSED: true,
  ENDED: true,
  ERROR: {
    code: null,
    message: '',
    type: '',
  },
  PROGRESS: 0,
  VOLUME: 50,
};

export default AUDIO_STATE;

// const AUDIO_STATE = {
//   ABORTED: false,
//   CURRENT_TIME: 0,
//   CAN_PLAY: false,
//   CAN_PLAY_THROUGH: false,
//   DURATION_CHANGE: '',
//   ENDED: false,
//   EMPTIED: false,
//   PLAYING: false,
//   WAITING: false,
//   SEEKING: false,
//   SEEKED: false,
//   LOADED_META_DATA: false,
//   LOADED_DATA: false,
//   IS_PLAYING: false,
//   IS_PAUSED: false,
//   RATE_CHANGE: '',
//   VOLUME_CHANGE: '',
//   SUSPEND: false,
//   STALLED: false,
//   PROGRESS: false,
//   LOAD_START: false,
//   ERROR: false,
// };
