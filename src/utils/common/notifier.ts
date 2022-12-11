import {
  checkValidArray,
  checkValidFunction,
} from '../../helpers/common/validators';

const listeners: any = {};

class ChangeNotifier {
  static notify(eventName: string, data: any) {
    const listenerCbs = listeners[eventName];
    if (!listenerCbs) return;

    if (checkValidFunction(listenerCbs as Function) && data !== null) {
      console.log(`NOTIFYING TO EVENT : ${eventName}`);
      console.log(`NOTIFY DATA :: ${JSON.stringify(data, null, 2)}`);
      listenerCbs(data);
    }

    if (checkValidArray(listenerCbs as Function[]) && data !== null) {
      listenerCbs.forEach((cb: Function) => {
        cb(data);
      });
    }
  }

  static listen(eventName: string, callback: Function) {
    if (!listeners[eventName] && checkValidFunction(callback)) {
      listeners[eventName] = callback;
      console.log(`LISTENER ADDED FOR EVENT : ${eventName}`);
    } else {
    }
  }

  static multiListen(
    eventName: string,
    callbackArr: Function[],
    append: boolean = false
  ) {
    if (listeners[eventName] && checkValidArray(callbackArr)) {
      listeners[eventName] = callbackArr;
    }
  }
}

export default ChangeNotifier;

// const notifier = changeNotifier;

// notifier.listen('ADD', (num: number) => {
//   sum = sum + num;
//   console.log(sum);
// });

// notifier.notify('ADD', 0);
// notifier.notify('ADD', 1);
// notifier.notify('ADD', 2);
// notifier.notify('ADD', 3);
// notifier.notify('ADD', 4);
