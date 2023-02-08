import { useEffect, useState } from 'react';
import { checkValidFunction } from '../../helpers/validators';
import ChangeNotifier, { notifierState } from '../common/notifier';

const notifier = ChangeNotifier;

const useListener = (
  eventName: string,
  initialValue: any,
  callback?: Function,
  resetState: boolean = false
) => {
  const baseValue = notifierState[eventName]
    ? notifierState[eventName]
    : initialValue;
  const [state, setState] = useState<any>(baseValue);

  useEffect(() => {
    const removeEventListener = notifier.listen(
      eventName,
      (data: any) => {
        setState(data);
        if (callback && checkValidFunction(callback)) {
          callback();
        }
      },
      state
    );
    return () => {
      removeEventListener('use_listener', resetState);
    };
  }, []);
  return state;
};

export default useListener;
