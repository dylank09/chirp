export default function FormatTime(timestamp) {
  if (!timestamp) {
    return "";
  }
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(timestamp);
  var today = new Date().toISOString() + "";
  timestamp = t.toISOString() + "";
  let tpos = timestamp.indexOf("T");

  console.log("today: ", today);
  console.log("ts: ", timestamp);
  console.log("tpos: ", tpos);

  if (today.slice(0, tpos) !== timestamp.slice(0, tpos)) {
    timestamp = timestamp.slice(5, tpos);
    let day = timestamp.slice(3, 5);
    let month = timestamp.slice(0, 2);
    timestamp = day + "/" + month;
  } else {
    timestamp = timestamp.slice(tpos + 1, 16);
  }
  return timestamp;
}
