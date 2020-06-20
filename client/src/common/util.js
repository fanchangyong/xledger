export function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]';
}

let id = 0;
export function genId(prefix = '') {
  return `${prefix}${++id}`;
}

export function formatDate(year, month) {
  if (month >= 10) {
    return `${year}-${month}`;
  }
  return `${year}-0${month}`;
}

export function splitDate(dateStr) {
  if (!dateStr) {
    return {};
  }
  const splited = dateStr.split('-');
  if (splited.length < 2) {
    return {};
  }
  const year = Number(splited[0]);
  const month = Number(splited[1]);
  return { year, month };
}
