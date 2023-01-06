// import {
//   checkValidArray,
//   checkValidFunction,
//   checkValidObject,
// } from '../../helpers/validators';

// const listeners: any = {};
// export const notifierState: any = {};

// class ChangeNotifier {
//   /**
//    * this method notifies all the listener attached with the data received.
//    *
//    * @param eventName - Name of the event that the notifier has to notify.
//    * @param data - the data with which the notify method has been called, will notify all the listeners with this data.
//    * @param caller - caller is basically an identifier to know who has made the call to notify.
//    * @returns void
//    */

//   static notify(
//     eventName: string,
//     data: any,
//     caller: string = 'notifier_default'
//   ) {
//     const listenerCbs = listeners[eventName];

//     if (!listenerCbs) return;

//     // if (checkValidFunction(listenerCbs as Function) && data !== null) {
//     // console.log(
//     //   `NOTIFYING TO EVENT : ${eventName} - CALLER : ${JSON.stringify(caller)}`
//     // );

//     //   /**
//     //    * checks if the data is object then updates the local
//     //    * state with the object destructure, if not then assign
//     //    * the value
//     //    */

//     //   if (checkValidObject(data)) {
//     //     notifierState[eventName] = { ...notifierState[eventName], ...data };
//     //   } else {
//     //     notifierState[eventName] = data;
//     //   }
//     //   listenerCbs(notifierState[eventName]);
//     // }

//     if (checkValidArray(listenerCbs as Function[]) && data !== null) {
//       console.log(listenerCbs);
//       listenerCbs.forEach((cb: Function) => {
//         if (checkValidObject(data)) {
//           notifierState[eventName] = { ...notifierState[eventName], ...data };
//         } else {
//           notifierState[eventName] = data;
//         }
//         cb(notifierState[eventName]);
//       });
//     }
//   }

//   /**
//    * this method registers a listeners to an event name which it will listen to,
//    * works in conjunction with notify method.
//    *
//    * @param eventName - name of the event for which it will listen to changes
//    * @param callback - any callback that needs to be called once the event is fired
//    * @param state - default state for each event to which it listens to
//    * @returns - a method that unsubscribe the events and basically deletes it
//    */
//   static listen(eventName: string, callback: Function, state = {}) {
//     if (!listeners[eventName] && checkValidFunction(callback)) {
//       listeners[eventName] = new Array(callback);
//       if (!notifierState[eventName]) {
//         notifierState[eventName] = state;
//       }
//       console.log(`LISTENER ADDED FOR EVENT : ${eventName}`);
//     } else {
//       console.log('HEKKI');
//       listeners[eventName].push(callback);
//     }
//     /**
//      * below we are returning the a function that would allow us to remove the listener,
//      * which takes two parameters
//      *
//      * @param caller - identifier name who has made the call to unsubscribe.
//      * @param resetState - a boolean flag which allow if the state needs to be destroyed when the listener is removed.
//      */

//     return (caller: string, resetState: boolean) => {
//       if (listeners[eventName]) {
//         console.log(
//           `REMOVING EVENT LISTENER FOR EVENT : ${eventName} - CALLER : ${caller}`
//         );
//         delete listeners[eventName];
//         if (resetState && notifierState[eventName]) {
//           console.log(
//             `RESETTING STATE FOR EVENT : ${eventName} - CALLER : ${caller}`
//           );
//           delete notifierState[eventName];
//         }
//       } else {
//         console.log(`EVENT NOT FOUND : ${eventName}`);
//       }
//     };
//   }
// }

// export default ChangeNotifier;

// // const notifier = changeNotifier;

// // notifier.listen('ADD', (num: number) => {
// //   sum = sum + num;
// //   console.log(sum);
// // });

// // notifier.notify('ADD', 0);
// // notifier.notify('ADD', 1);
// // notifier.notify('ADD', 2);
// // notifier.notify('ADD', 3);
// // notifier.notify('ADD', 4);

// ========================================================================
import {
  checkValidArray,
  checkValidFunction,
  checkValidObject,
} from '../../helpers/validators';

const listeners: any = {};
export const notifierState: any = {};

class ChangeNotifier {
  /**
   * this method notifies all the listener attached with the data received.
   *
   * @param eventName - Name of the event that the notifier has to notify.
   * @param data - the data with which the notify method has been called, will notify all the listeners with this data.
   * @param caller - caller is basically an identifier to know who has made the call to notify.
   * @returns void
   */

  static notify(
    eventName: string,
    data: any,
    caller: string = 'notifier_default'
  ) {
    const listenerCbs = listeners[eventName];

    if (!listenerCbs) return;

    // if (checkValidFunction(listenerCbs as Function) && data !== null) {
    // console.log(
    //   `NOTIFYING TO EVENT : ${eventName} - CALLER : ${JSON.stringify(caller)}`
    // );

    //   /**
    //    * checks if the data is object then updates the local
    //    * state with the object destructure, if not then assign
    //    * the value
    //    */

    //   if (checkValidObject(data)) {
    //     notifierState[eventName] = { ...notifierState[eventName], ...data };
    //   } else {
    //     notifierState[eventName] = data;
    //   }
    //   listenerCbs(notifierState[eventName]);
    // }

    if (checkValidArray(listenerCbs as Function[]) && data !== null) {
      console.log(listenerCbs);
      listenerCbs.forEach((cb: any) => {
        if (checkValidObject(data)) {
          notifierState[eventName] = { ...notifierState[eventName], ...data };
        } else {
          notifierState[eventName] = data;
        }
        cb.callback(notifierState[eventName]);
      });
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
  static listen(
    id: number = 0,
    eventName: string,
    callback: Function,
    state = {}
  ) {
    // if (!listeners[eventName] && checkValidFunction(callback)) {
    //   listeners[eventName] = new Array({ id: id, callback: callback });
    //   if (!notifierState[eventName]) {
    //     notifierState[eventName] = state;
    //   }
    //   console.log(`LISTENER ADDED FOR EVENT : ${eventName}`);
    // } else {
    //   console.log('HEKKI');
    //   const hasId = listeners[eventName].find((cb: any) => cb.id === id);
    //   if (hasId) {
    //     listeners[eventName].push({ id: id, callback: callback });
    //   }
    // }

    console.log(id, eventName);
    if (!listeners[eventName] && checkValidFunction(callback)) {
      listeners[eventName] = new Array({ id: id, callback: callback });
      if (!notifierState[eventName]) {
        notifierState[eventName] = state;
      }
      console.log(`LISTENER ADDED FOR EVENT : ${eventName}`);
    } else {
      const hasId = listeners[eventName].findIndex((cb: any) => cb.id === id);
      if (hasId == -1) {
        listeners[eventName].push({ id: id, callback: callback });
      }
    }

    /**
     * below we are returning the a function that would allow us to remove the listener,
     * which takes two parameters
     *
     * @param caller - identifier name who has made the call to unsubscribe.
     * @param resetState - a boolean flag which allow if the state needs to be destroyed when the listener is removed.
     */

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
