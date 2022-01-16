export default function FormatTime(timestamp, type = "short") {
  if (!timestamp) {
    return "";
  }
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(timestamp);
  timestamp = t.toISOString() + "";

  if (type === "short") {
    var today = new Date().toISOString() + "";
    let tpos = timestamp.indexOf("T");

    if (today.slice(0, tpos) !== timestamp.slice(0, tpos)) {
      timestamp = timestamp.slice(5, tpos);
      let day = timestamp.slice(3, 5);
      let month = timestamp.slice(0, 2);
      timestamp = day + "/" + month;
    } else {
      timestamp = timestamp.slice(tpos + 1, 16);
    }
    return timestamp;
  } else if (type === "long") {
    return timestamp;
  } else if (type === "date") {
    return t.toLocaleDateString();
  } else {
    return t.toLocaleTimeString();
  }
}
