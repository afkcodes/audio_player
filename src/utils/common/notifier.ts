import { checkValidFunction, checkValidObject } from '../../helpers/validators';

// const listeners: any = {};
// export const notifierState: any = {};

class ChangeNotifier {
  /**
   * this method notifies all the listener attached with the data received.
   *
   * @param eventName - Name of the event that the notifier has to notify.
   * @param data - the data with which the notify method has been called, will notify all the listeners with this data.
   * @param caller - caller is basically an identifier to know who has made the call to notify.
   * @returns void
   */

  #listeners: any = {};
  #notifierState: any = {};

  private static _instance: ChangeNotifier;

  constructor() {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (ChangeNotifier._instance) {
      console.warn(
        'Instantiation failed: cannot create multiple instance of Notifier returning existing instance'
      );
      return ChangeNotifier._instance;
    }
    ChangeNotifier._instance = this;
  }

  notify(eventName: string, data: any, caller: string = 'notifier_default') {
    const listenerCallback = this.#listeners[eventName];

    if (!listenerCallback) return;

    if (checkValidFunction(listenerCallback as Function) && data !== null) {
      console.log(`NOTIFYING TO EVENT : ${eventName} - CALLER : ${caller}`);

      /**
       * checks if the data is object then updates the local
       * state with the object destructure, if not then assign
       * the value
       */

      if (checkValidObject(data)) {
        this.#notifierState[eventName] = {
          ...this.#notifierState[eventName],
          ...data,
        };
      } else {
        this.#notifierState[eventName] = data;
      }
      listenerCallback(this.#notifierState[eventName]);
    }
  }

  /**
   * this method registers a listeners to an event name which it will listen to,
   * works in conjunction with notify method.
   *
   * @param eventName - name of the event for which it will listen to changes
   * @param callback - any callback that needs to be called once the event is fired
   * @param state - default state for each event to which it listens to
   * @returns - a method that unsubscribe the events and basically deletes it
   */
  listen(eventName: string, callback: Function, state = {}) {
    if (!this.#listeners[eventName] && checkValidFunction(callback)) {
      this.#listeners[eventName] = callback;
      if (!this.#notifierState[eventName]) {
        this.#notifierState[eventName] = state;
      }
      console.log(`LISTENER ADDED FOR EVENT : ${eventName}`);
    } else {
      console.log(`FAILED TO ADD EVENT FOR : ${eventName}`);
    }

    /**
     * below we are returning the a function that would allow us to remove the listener,
     * which takes two parameters
     *
     * @param caller - identifier name who has made the call to unsubscribe.
     * @param resetState - a boolean flag which allow if the state needs to be destroyed when the listener is removed.
     */

    return (caller: string, resetState: boolean) => {
      if (this.#listeners[eventName]) {
        console.log(
          `REMOVING EVENT LISTENER FOR EVENT : ${eventName} - CALLER : ${caller}`
        );
        delete this.#listeners[eventName];
        if (resetState && this.#notifierState[eventName]) {
          console.log(
            `RESETTING STATE FOR EVENT : ${eventName} - CALLER : ${caller}`
          );
          delete this.#notifierState[eventName];
        }
      } else {
        console.log(`EVENT NOT FOUND : ${eventName}`);
      }
    };
  }

  getNotifierState() {
    return this.#notifierState;
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
