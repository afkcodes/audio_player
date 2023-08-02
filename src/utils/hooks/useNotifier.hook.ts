import { useEffect, useState } from 'react';
import { checkValidFunction, checkValidObject } from '../../helpers/validators';
import ChangeNotifier from '../common/notifier';

const notifier = new ChangeNotifier();
const notifierState = notifier.getNotifierState();

const useNotifier = (
  eventName: string,
  initialValue?: any,
  shouldUpdateState: boolean = true,
  resetState: boolean = false,
  callback?: Function
) => {
  if (notifierState[eventName] == undefined && initialValue == undefined) {
    throw new Error('Cannot initialize state without initial value');
  }

  const baseValue = notifierState[eventName]
    ? notifierState[eventName]
    : initialValue;

  const [state, setState] = useState(baseValue);
  const [removeListener, setRemoveListener] = useState<any>(null);

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
      baseValue
    );

    setState(notifierState[eventName]);

    setRemoveListener(() => {
      return (caller = 'useNotifier') => {
        removeEventListener(caller, resetState);
      };
    });

    return () => {
      removeEventListener('useNotifier_return', resetState);
    };
  }, []);

  return {
    state,
    notify: (eventName: string, data: any) => {
      notifier.notify(eventName, data);
    },
    removeListener,
  };
};

export default useNotifier;
