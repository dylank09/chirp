// function formats a given timestamp
export default function FormatTime(timestamp, type = "short") {
  if (!timestamp) {
    return "";
  }
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(timestamp);
  // convert the timestamp to ISO format
  timestamp = t.toISOString() + "";

  // if we want a short version of formatted timestamp
  if (type === "short") {
    var today = new Date().toISOString() + "";
    let tpos = timestamp.indexOf("T");

    if (today.slice(0, tpos) !== timestamp.slice(0, tpos)) {
      timestamp = timestamp.slice(5, tpos);
      let day = timestamp.slice(3, 5);
      let month = timestamp.slice(0, 2);
      timestamp = day + "/" + month;
      // returns the timestamp as DD/MM
    } else {
      timestamp = timestamp.slice(tpos + 1, 16);
      // returns the time in 24 hour format e.g. 10:15
    }
    return timestamp;
  } else if (type === "long") {
    // returns the full timestamp without formatting
    return timestamp;
  } else if (type === "date") {
    // returns the full timestamp but to locale date string format (shows the day and date e.g. Tues 19 May)
    return t.toLocaleDateString();
  } else {
    return t.toLocaleTimeString().slice(0, -3);
  }
}
