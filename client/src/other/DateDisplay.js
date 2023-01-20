export function returnNewDate(fullDate) {
  const date = new Date(fullDate);
  const newDate = date.getDate() + '/' + date.getMonth() + 1 + '/' + date.getFullYear();
  return newDate;
}