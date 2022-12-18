import { useEffect, useState } from 'react';
import { checkValidFunction, checkValidObject } from '../../helpers/validators';
import ChangeNotifier from '../common/notifier';

const notifier = ChangeNotifier;

const useNotifier = (
  eventName: string,
  initialValue: any,
  callback?: Function
) => {
  const [state, setState] = useState(initialValue);
  const [removeListener, setRemoveListener] = useState<any>(null);
  useEffect(() => {
    const listener = notifier.listen(eventName, (data: any) => {
      if (callback && checkValidFunction(callback)) {
        callback(data);
      }
      if (checkValidObject(data)) {
        setState({ ...state, ...data });
      } else {
        setState(data);
      }
    });
    setRemoveListener(() => {
      return (caller = 'useNotifier') => {
        listener(caller);
      };
    });
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
