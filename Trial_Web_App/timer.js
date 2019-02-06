T = {};
T.timerDiv = document.getElementById('timer');
let trialStart = 0,
  trackViolations = [],
  tractionViolations = [],
  crashViolations = [],
  laps = [];
let trialData = new Object();

function displayTimer() {
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
  T.timerStarted = new Date().getTime()
  console.log('T.timerStarted: ' + T.timerStarted)

  if (T.difference > 0) {
    T.timerStarted = T.timerStarted - T.difference
  }
  // update timer periodically
  T.timerInterval = setInterval(function() {
    displayTimer()
  }, 10);

}

function trackCounter() { trackViolations.push(T.timerDiv.innerHTML); }

function tractionCounter() { tractionViolations.push(T.timerDiv.innerHTML); }

function crashCounter() { crashViolations.push(T.timerDiv.innerHTML); }

function lap() { laps.push(T.timerDiv.innerHTML); }

function startTrial() {
  trialStart = T.timerDiv.innerHTML
}

$(document).keydown(function(keyPressed) {
   if (keyPressed.keyCode == 49) {
     trackCounter();
     console.log("Pressed 1");
   } else if (keyPressed.keyCode == 50) {
     tractionCounter();
     console.log("Pressed 2");
   } else if (keyPressed.keyCode == 51) {
     crashCounter();
     console.log("Pressed 3");
   } else if (keyPressed.keyCode == 52) {
     lap();
     console.log("Pressed 4");
   }
  });

function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([content], {type: contentType});
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

function stopTimer() {
  dataName = document.getElementById('filename').value;
  fileName = `${dataName}.json`;

  clearInterval(T.timerInterval); // stop updating the timer
  trialData.trialStart = trialStart;
  trialData.trackViolations = trackViolations;
  trialData.tractionViolations = tractionViolations;
  trialData.crashViolations = crashViolations;
  trialData.laps = laps

  console.log(trialData);
  download(JSON.stringify(trialData), fileName, 'application/json');
}

function clearTimer() {
  clearInterval(T.timerInterval);
  T.timerDiv.innerHTML = "00:00:00:00"; // reset timer to all zeros
  T.difference = 0;
  trialData = new Object();
  trialStart = 0;
  trackViolations = [];
  tractionViolations = [];
  crashViolations = [];
  laps = [];
}
