import React from 'react';
import useListener from '../utils/hooks/useListener.hook';

const New = () => {
  const {
    state: { CURRENT_TIME, IS_PLAYING, IS_PAUSED, ENDED, ERROR },
  } = useListener(3, 'AUDIO_EVENTS');

  return <div>{CURRENT_TIME}</div>;
};

export default New;
