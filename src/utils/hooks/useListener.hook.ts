import { useEffect, useState } from 'react';
import { checkValidObject } from '../../helpers/validators';
import AUDIO_STATE from '../../modules/audio/state';
import ChangeNotifier, { notifierState } from '../common/notifier';

const useListener = (id: number = 1, eventName: string) => {
  const [state, setState] = useState(
    notifierState[eventName] ? notifierState[eventName] : AUDIO_STATE
  );

  useEffect(() => {
    const removeEventListener = ChangeNotifier.listen(
      eventName,
      (data: any) => {
        if (checkValidObject(data)) {
          setState({ ...state, ...data });
        } else {
          setState(data);
        }
      }
    );
    return () => {
      removeEventListener('use_listener', false);
    };
  }, []);

  return {
    state,
  };
};

export default useListener;
