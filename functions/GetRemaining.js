export default function GetRemaining(timestamp) {
  if (!timestamp) {
    return "";
  }
  var today = Math.floor(new Date().getTime() / 1000);
  var secondsDifference = timestamp.seconds - today;
  var daysDifference = secondsDifference / (3600 * 24);
  var numDays = Math.floor(daysDifference);

  var numMinutes = Math.floor(secondsDifference / 60);

  if (numDays > 0) {
    var dayString;
    dayString = numDays === 1 ? " day " : " days ";
    return numDays + dayString;
  } else if (numMinutes > 59) {
    return Math.floor(numMinutes / 60) + " hours";
  } else if (numMinutes > 0) {
    return numMinutes + " minutes";
  }
  return "Overdue";
}
