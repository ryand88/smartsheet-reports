export default (
  dateString,
  timeString,
  timeZone = 0,
  ignoreWeekends = true
) => {
  let dateObject = new Date(dateString);
  dateObject.setHours(dateObject.getHours() + timeZone);

  if (ignoreWeekends === true) {
    const weekDay = dateObject.getDay();

    if (weekDay === 6) {
      dateObject.setDate(dateObject.getDate() + 2);
      dateObject.setHours(dateObject.getHours() + 9 - timeZone);
      return dateObject;
    } else if (weekDay === 0) {
      dateObject.setDate(dateObject.getDate() + 1);
      dateObject.setHours(dateObject.getHours() + 9 - timeZone);
      return dateObject;
    }
  }

  const splitTimeString = timeString.split(":");
  const lastChar = splitTimeString[1]
    .charAt(splitTimeString[1].length - 1)
    .toLowerCase();
  const amPM =
    lastChar === "m"
      ? splitTimeString[1].charAt(splitTimeString[1].length - 2).toLowerCase()
      : lastChar;
  const minutes = splitTimeString[1].substr(0, 2);
  let hours = parseInt(splitTimeString[0]);
  hours = amPM === "a" ? hours : hours + 12;
  hours = hours === 12 ? 0 : hours;
  hours = hours === 24 ? 12 : hours;

  dateObject.setHours(hours);
  dateObject.setMinutes(minutes);
  dateObject.setSeconds(0);

  return dateObject;
};
