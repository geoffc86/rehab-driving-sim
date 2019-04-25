T = {};
LT = {};
T.timerDiv = document.getElementById('timer');
LT.timerDiv = document.getElementById('laptimer');

trackViolations = new Array();
tractionViolations = new Array();
crashViolations = new Array();

trackViolationsCount = 0;
tractionViolationsCount = 0;
crashViolationsCount = 0;

let laps = [],
  trialData = new Object(
    lapTime = undefined
  );

function displayTimer(T) {
  // initialized all local variables:
  var hours = '00',
    minutes = '00',
    milliseconds = 0,
    seconds = '00',
    time = '',
    timeNow = new Date().getTime(); // timestamp (milliseconds)

  T.difference = timeNow - T.timerStarted;

  // milliseconds
  if (T.difference > 10) {
    milliseconds = Math.floor((T.difference % 1000) / 10);
    if (milliseconds < 10) {
      milliseconds = '0' + String(milliseconds);
    }
  }
  // seconds
  if (T.difference > 1000) {
    seconds = Math.floor(T.difference / 1000);
    if (seconds > 60) {
      seconds = seconds % 60;
    }
    if (seconds < 10) {
      seconds = '0' + String(seconds);
    }
  }

  // minutes
  if (T.difference > 60000) {
    minutes = Math.floor(T.difference / 60000);
    if (minutes > 60) {
      minutes = minutes % 60;
    }
    if (minutes < 10) {
      minutes = '0' + String(minutes);
    }
  }

  // hours
  if (T.difference > 3600000) {
    hours = Math.floor(T.difference / 3600000);
    // if (hours > 24) {
    // 	hours = hours % 24;
    // }
    if (hours < 10) {
      hours = '0' + String(hours);
    }
  }

  time = hours + ':';
  time += minutes + ':';
  time += seconds + ':';
  time += milliseconds;

  T.timerDiv.innerHTML = time;
}

function startTimer() {
  // save start time
  T.timerStarted = new Date().getTime();
  console.log('T.timerStarted: ' + T.timerStarted)

  if (T.difference > 0) {
    T.timerStarted = T.timerStarted - T.difference
  }
  // update timer periodically
  T.timerInterval = setInterval(function () {
    displayTimer(T)
  }, 10);

}

function trackCounter() {
  trackViolations.push(LT.timerDiv.innerHTML);
  trackViolationsCount++;
}

function tractionCounter() {
  tractionViolations.push(LT.timerDiv.innerHTML);
  tractionViolationsCount++;
}

function crashCounter() {
  crashViolations.push(LT.timerDiv.innerHTML);
  crashViolationsCount++;
}

function lap() {
  trialData.lapTime = LT.timerDiv.innerHTML;
  // trialData.trackViolations = trackViolations;
  // trialData.tractionViolations = tractionViolations;
  // trialData.crashViolations = crashViolations
  trialData.trackViolationsCount = trackViolationsCount;
  trialData.tractionViolationsCount = tractionViolationsCount;
  trialData.crashViolationsCount = crashViolationsCount;
  laps.push(trialData);
  trialData = new Object(
    lapTime = undefined
  );
  trackViolations = new Array();
  tractionViolations = new Array();
  crashViolations = new Array();

  trackViolationsCount = 0;
  tractionViolationsCount = 0;
  crashViolationsCount = 0;

  resetLTimer();
  startTrial();
}

function startTrial() {
  LT.timerStarted = new Date().getTime();
  console.log('LT.timerStarted: ' + LT.timerStarted)

  if (LT.difference > 0) {
    LT.timerStarted = LT.timerStarted - LT.difference
  }
  // update timer periodically
  LT.timerInterval = setInterval(function () {
    displayTimer(LT)
  }, 10);
}

$(document).keydown(function (keyPressed) {
  if (keyPressed.keyCode == 49) {
    lap();
    console.log("Pressed 1");
  } else if (keyPressed.keyCode == 50) {
    trackCounter();
    console.log("Pressed 2");
  } else if (keyPressed.keyCode == 51) {
    tractionCounter();
    console.log("Pressed 3");
  } else if (keyPressed.keyCode == 52) {

    crashCounter();
    console.log("Pressed 4");
  }
});

function convertArrayOfObjectsToCSV(args) {  
  var result, ctr, keys, columnDelimiter, lineDelimiter, data;

  data = args.data || null;
  if (data == null || !data.length) {
      return null;
  }

  columnDelimiter = args.columnDelimiter || ',';
  lineDelimiter = args.lineDelimiter || '\n';

  keys = Object.keys(data[0]);

  result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(function(item) {
      ctr = 0;
      keys.forEach(function(key) {
          if (ctr > 0) result += columnDelimiter;

          result += item[key];
          ctr++;
      });
      result += lineDelimiter;
  });

  return result;
}

function downloadCSV(args) {  
  var data, filename, link;
  var csv = convertArrayOfObjectsToCSV({
      data: laps
  });
  if (csv == null) return;

  filename = `${args.filename}.csv` || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
      csv = 'data:text/csv;charset=utf-8,' + csv;
  }
  data = encodeURI(csv);

  link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}

function download(content, fileName, contentType) {
  downloadCSV({filename: fileName})
  // var a = document.createElement("a");
  // var file = new Blob([content], {
  //   type: contentType
  // });
  // a.href = URL.createObjectURL(file);
  // a.download = `${fileName}.json`;
  // a.click();
}

function stopTimer() {
  fileName = document.getElementById('filename').value;
  

  if (trialData.lapTime === undefined) {
    trialData.lapTime = LT.timerDiv.innerHTML;
    // trialData.trackViolations = trackViolations;
    // trialData.tractionViolations = tractionViolations;
    // trialData.crashViolations = crashViolations;

    trialData.trackViolationsCount = trackViolationsCount;
    trialData.tractionViolationsCount = tractionViolationsCount;
    trialData.crashViolationsCount = crashViolationsCount;

    laps.push(trialData);
  }

  clearTimer();

  console.log(laps);
  download(JSON.stringify(laps), fileName, 'application/json');
}

function resetTimer() {
  clearInterval(T.timerInterval);
  T.timerDiv.innerHTML = "00:00:00:00"; // reset timer to all zeros
  T.difference = 0;
}

function resetLTimer() {
  clearInterval(LT.timerInterval);
  LT.timerDiv.innerHTML = "00:00:00:00"; // reset timer to all zeros
  LT.difference = 0;
}

function clearTimer() {
  resetLTimer();
  resetTimer();
}