import { useEffect, useState } from 'react';
import { checkValidFunction, checkValidObject } from '../../helpers/validators';
import ChangeNotifier, { notifierState } from '../common/notifier';

const notifier = ChangeNotifier;

const useNotifier = (
  eventName: string,
  initialValue?: any,
  resetState: boolean = false,
  callback?: Function
) => {
  if (!notifierState[eventName] && !initialValue) {
    throw new Error('Cannot initialize state without initial value');
  }
  const [state, setState] = useState(
    notifierState[eventName] ? notifierState[eventName] : initialValue
  );
  const [removeListener, setRemoveListener] = useState<any>(null);
  useEffect(() => {
    const removeEventListener = notifier.listen(
      eventName,
      (data: any) => {
        if (callback && checkValidFunction(callback)) {
          callback(data);
        }
        if (checkValidObject(data)) {
          setState({ ...data });
        } else {
          setState(data);
        }
      },
      notifierState[eventName] ? notifierState[eventName] : initialValue
    );

    setState(notifierState[eventName]);

    setRemoveListener(() => {
      return (caller = 'useNotifier') => {
        removeEventListener(caller, false);
      };
    });

    return () => {
      removeEventListener('useNotifier_return', resetState);
    };
  }, []);

  return {
    state,
    notify: (eventName: string, data: any) => {
      ChangeNotifier.notify(eventName, data);
    },
    removeListener,
  };
};

export default useNotifier;
