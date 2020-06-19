export function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]';
}

let id = 0;
export function genId(prefix = '') {
  return `${prefix}${++id}`;
}
