import { useEffect, useState } from 'react';
import {
  checkValidFunction,
  checkValidObject,
} from '../../helpers/common/validators';
import ChangeNotifier from './notifier';

const useNotifier = (
  eventName: string,
  initialValue: any,
  callback?: Function
) => {
  const [state, setState] = useState(initialValue);
  const notifier = ChangeNotifier;
  useEffect(() => {
    notifier.listen(eventName, (data: any) => {
      if (callback && checkValidFunction(callback)) {
        callback(data);
      }

      if (checkValidObject(data)) {
        setState({ ...state, ...data });
      } else {
        setState(data);
      }
    });
  }, []);

  return {
    state,
    notify: (eventName: string, data: any) => {
      notifier.notify(eventName, data);
    },
  };
};

export default useNotifier;
