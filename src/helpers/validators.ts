export const checkValidArray = (value: any) =>
  Array.isArray(value) && value.length > 0;

export const checkValidFunction = (value: any) =>
  value instanceof Function && typeof value === 'function';

export const checkValidObject = (value: any) =>
  typeof value === 'object' && value !== null;
