export default function GetRemaining(timestamp) {
  if (!timestamp) {
    return "";
  }
  var today = Math.floor(new Date().getTime() / 1000);
  var secondsDifference = timestamp.seconds - today;
  var daysDifference = secondsDifference / (3600 * 24);
  var numDays = Math.floor(daysDifference);

  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(timestamp.seconds);
  var todayISO = new Date().toISOString() + "";
  var deadlineISO = t.toISOString() + "";
  let tpos = deadlineISO.indexOf("T");

  var numHours =
    parseInt(deadlineISO.slice(tpos + 1, tpos + 3)) -
    parseInt(todayISO.slice(tpos + 1, tpos + 3));

  var numMinutes = Math.floor(secondsDifference / 60);

  if (numDays > 0) {
    var dayString, hourString;
    dayString = numDays === 1 ? " day, " : " days, ";
    hourString = numHours === 1 ? " hour" : " hours";
    return numDays + dayString + numHours + hourString;
  } else if (numMinutes > 59) {
    return Math.floor(numMinutes / 60) + " hours";
  } else if (numMinutes > 0) {
    return numMinutes + " minutes";
  }
  return "Overdue";
}
