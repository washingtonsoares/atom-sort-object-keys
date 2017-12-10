'use babel';

export const sortObjectKeys = obj => Object.keys(obj).sort().reduce((result, key) => {
  result[key] = obj[key]
  return result
}, {})
