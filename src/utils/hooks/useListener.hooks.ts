import { useEffect, useRef } from 'react';
import { notifier } from '../../App';

// const notifier = new ChangeNotifier();

const useListener = (eventName: string, callback: (data: any) => void) => {
  const removeRef = useRef<any>(null);
  useEffect(() => {
    removeRef.current = notifier.listen(eventName, callback);
  }, []);

  return {
    removeEvent: removeRef.current,
    notifier: notifier,
  };
};

export default useListener;
