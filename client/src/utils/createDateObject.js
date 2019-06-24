export default (
  dateString,
  timeString = "00:00",
  timeZone = 0,
  skipWeekends = true,
  startHour = 10,
  endHour = 17
) => {
  const dateObject = new Date(dateString);
  dateObject.setHours(dateObject.getHours() + timeZone);

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

  const originalDate = new Date(dateObject);

  if (skipWeekends) {
    if (dateObject.getDay() > 0 && dateObject.getDay() < 6) {
      const currentHour = dateObject.getHours();
      if (currentHour < startHour) {
        dateObject.setHours(startHour);
        dateObject.setMinutes((startHour % 1) * 60);
      } else if (currentHour >= endHour) {
        dateObject.setHours(24 + startHour);
        dateObject.setMinutes((startHour % 1) * 60);
      }
    }

    if (dateObject.getDay() === 6) {
      dateObject.setDate(dateObject.getDate() + 2);
      dateObject.setHours(startHour);
      dateObject.setMinutes((startHour % 1) * 60);
    } else if (dateObject.getDay() === 0) {
      dateObject.setDate(dateObject.getDate() + 1);
      dateObject.setHours(startHour);
      dateObject.setMinutes((startHour % 1) * 60);
    }
  }
  return { adjustedDate: dateObject, originalDate };
};
