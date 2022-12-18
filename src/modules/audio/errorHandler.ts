import { ERROR_EVENTS } from './events';

export const audioErrorHandler = (e: any) => {
  const error = {
    code: e.target.error.code,
    message: e.target.error.message,
    type: '',
  };
  switch (e.target.error) {
    case e.target.error.MEDIA_ERR_ABORTED:
      error.type = ERROR_EVENTS[e.target.error.MEDIA_ERR_ABORTED];
      console.error('You aborted the video playback.');
      break;
    case e.target.error.MEDIA_ERR_NETWORK:
      error.type = ERROR_EVENTS[e.target.error.MEDIA_ERR_NETWORK];
      console.error('A network error caused the audio download to fail.');
      break;
    case e.target.error.MEDIA_ERR_DECODE:
      error.type = ERROR_EVENTS[e.target.error.MEDIA_ERR_DECODE];
      console.error(
        `The audio playback was aborted due to a corruption problem or 
        because the audio used features your browser did not support.`
      );
      break;
    case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
      error.type = ERROR_EVENTS[e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED];
      console.error(
        `The audio cannot not be loaded, either because the server or network failed
         or because the format is not supported.`
      );
      break;
    default:
      error.type = 'UNKNOWN';
      console.error('An unknown error occurred.');
      break;
  }

  return error;
};
