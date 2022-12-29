import { checkValidArray, checkValidFunction } from '../../helpers/validators';

const listeners: any = {};
export const notifierState: any = {};

class ChangeNotifier {
  static notify(
    eventName: string,
    data: any,
    caller: string = 'notifier_default'
  ) {
    const listenerCbs = listeners[eventName];

    if (!listenerCbs) return;

    if (checkValidFunction(listenerCbs as Function) && data !== null) {
      console.log(`NOTIFYING TO EVENT : ${eventName} - CALLER : ${caller}`);
      // console.log(`NOTIFY DATA :: ${JSON.stringify(data, null, 2)}`);
      notifierState[eventName] = { ...notifierState[eventName], ...data };
      listenerCbs(notifierState[eventName]);
    }

    if (checkValidArray(listenerCbs as Function[]) && data !== null) {
      listenerCbs.forEach((cb: Function) => {
        cb(data);
      });
    }
  }

  static listen(eventName: string, callback: Function, state = {}) {
    if (!listeners[eventName] && checkValidFunction(callback)) {
      listeners[eventName] = callback;
      if (!notifierState[eventName]) {
        notifierState[eventName] = state;
      }
      console.log(`LISTENER ADDED FOR EVENT : ${eventName}`);
    } else {
      console.log(`FAILED TO ADD EVENT FOR : ${eventName}`);
    }
    return (caller: string, resetState: boolean) => {
      if (listeners[eventName]) {
        console.log(
          `REMOVING EVENT LISTENER FOR EVENT : ${eventName} - CALLER : ${caller}`
        );
        delete listeners[eventName];
        if (resetState && notifierState[eventName]) {
          console.log(
            `RESETTING STATE FOR EVENT : ${eventName} - CALLER : ${caller}`
          );
          delete notifierState[eventName];
        }
      } else {
        console.log(`EVENT NOT FOUND : ${eventName}`);
      }
    };
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
