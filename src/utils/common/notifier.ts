import {
  checkValidArray,
  checkValidFunction,
} from '../../helpers/common/validators';

const listeners: any = {};
let sum = 0;

class changeNotifier {
  static notify(eventName: string, data: any) {
    const listenerCbs = listeners[eventName];
    if (!listenerCbs) return;

    if (checkValidFunction(listenerCbs) && data !== null) {
      console.log(`NOTIFYING TO EVENT : ${eventName}`);
      listenerCbs(data);
    }

    if (checkValidArray(listeners) && data !== null) {
    }
  }

  static listen(eventName: string, callback: Function) {
    if (!listeners[eventName] && checkValidFunction(callback)) {
      listeners[eventName] = callback;
      console.log(`LISTENING TO EVENT : ${eventName}`);
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

export default changeNotifier;

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
