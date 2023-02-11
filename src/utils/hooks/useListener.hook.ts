import { useEffect, useState } from 'react';
import { checkValidFunction, checkValidObject } from '../../helpers/validators';
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
        if (callback && checkValidFunction(callback)) {
          callback(data);
        }
        if (checkValidObject(data)) {
          setState({ ...state, ...data });
        } else {
          setState(data);
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
