export default (dateString, timeZone = 0) => {
  let dateObject = new Date(dateString);
  dateObject.setHours(dateObject.getHours() + timeZone);

  const weekDay = dateObject.getDay();

  if (weekDay === 6) {
    dateObject.setDate(dateObject.getDate() + 2);
  } else if (weekDay === 0) {
    dateObject.setDate(dateObject.getDate() + 1);
  }
  console.log(dateObject.getDay());

  return dateObject;
};
