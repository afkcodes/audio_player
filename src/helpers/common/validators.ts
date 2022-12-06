export const checkValidArray = (arr: any) =>
  Array.isArray(arr) && arr.length > 0;

export const checkValidFunction = (func: Function) =>
  func instanceof Function && typeof func === 'function';
