function toDbl(value) {
  return value < 10 ? '0' + value : value
}


export function toISODate(date) {
  return `${date.getFullYear()}-${toDbl(date.getMonth() + 1)}-${toDbl(date.getDate())}`
}
export function toISODateTime(date) {
  return `${toISODate(date)} ${toDbl(date.getHours())}:${toDbl(date.getMinutes())}:${toDbl(date.getSeconds())}`
}
export function toCompactDate(date) {
  return `${date.getFullYear()}${toDbl(date.getMonth() + 1)}${toDbl(date.getDate())}`
}

export function toCompactDateTime(date) {
  return `${toCompactDate(date)}${toDbl(date.getHours())}${toDbl(date.getMinutes())}${toDbl(date.getSeconds())}`
}
