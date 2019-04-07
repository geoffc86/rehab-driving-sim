T = {};
LT = {};
T.timerDiv = document.getElementById('timer');
LT.timerDiv = document.getElementById('laptimer');

let laps = [],
  trialData = new Object(
    trackViolations = [],
    tractionViolations = [],
    crashViolations = [],
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

function trackCounter(trialData) {
  trialData.trackViolations.push(LT.timerDiv.innerHTML);
}

function tractionCounter(trialData) {
  trialData.tractionViolations.push(LT.timerDiv.innerHTML);
}

function crashCounter(trialData) {
  trialData.crashViolations.push(LT.timerDiv.innerHTML);
}

function lap() {
  trialData.lapTime = LT.timerDiv.innerHTML;
  laps.push(trialData);
  trialData = new Object(
    trackViolations = [],
    tractionViolations = [],
    crashViolations = [],
    lapTime = undefined
  );
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

function download(content, fileName, contentType) {
  var a = document.createElement("a");
  var file = new Blob([content], {
    type: contentType
  });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
}

function stopTimer() {
  dataName = document.getElementById('filename').value;
  fileName = `${dataName}.json`;

  if (trialData.lapTime === undefined) {
    trialData.lapTime = LT.timerDiv.innerHTML;
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