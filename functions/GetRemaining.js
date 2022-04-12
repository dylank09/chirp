// function calculates the time between a given timestamp and the current timestamp
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
    // if its a day or more away, we return the number of days
    var dayString;
    dayString = numDays === 1 ? " day " : " days ";
    return numDays + dayString;
  } else if (numMinutes > 59) {
    // if its an hour or more away we return the number of hours
    return Math.floor(numMinutes / 60) + " hours";
  } else if (numMinutes > 0) {
    // if its less than an hour away we return the number of minutes
    return numMinutes + " minutes";
  }
  // if it is due before the current time, we return overdue
  return "Overdue";
}
