window.onload = function() {
    document.getElementById("timer").textContent = "00:00:000";
    let startBtn = document.getElementById("startBtn");
    let stopBtn = document.getElementById("stopBtn");
    let resetBtn = document.getElementById("resetBtn");
    let lapBtn = document.getElementById("lapBtn");
    let timerRunning = false;
    let interval = null;
    let startTime = null;
    let lapCounter = 0;
  
    startBtn.onclick = function() {
      if (!timerRunning) {
        startTime = new Date();
        interval = setInterval(function() {
          let currentTime = new Date();
          let elapsedTime = currentTime - startTime;
          let minutes = Math.floor(elapsedTime / 60000);
          let seconds = Math.floor((elapsedTime % 60000) / 1000);
          let miliseconds = elapsedTime % 1000;
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          if (miliseconds < 100) {
            miliseconds = "0" + miliseconds;
          }
          if (miliseconds < 10) {
            miliseconds = "0" + miliseconds;
          }
          document.getElementById("timer").textContent = minutes + ":" + seconds + ":" + miliseconds;
        }, 10);
        timerRunning = true;
        startBtn.textContent = "Pause";
      } else {
        clearInterval(interval);
        interval = null;
        timerRunning = false;
        startBtn.textContent = "Resume";
      }
    };
  
    stopBtn.onclick = function() {
      clearInterval(interval);
      interval = null;
      timerRunning = false;
      document.getElementById("timer").textContent = "00:00:000";
      document.getElementById("startBtn").textContent = "Start";
    };
  
    resetBtn.onclick = function() {
      clearInterval(interval);
      interval = null;
      timerRunning = false;
      document.getElementById("timer").textContent = "00:00:000";
      document.getElementById("startBtn").textContent = "Start";
      lapCounter = 0;
      document.getElementById("laps").innerHTML = "";
    };
  
    lapBtn.onclick = function() {
      let lapTime = document.getElementById("timer").textContent;
      let lap = document.createElement("li");
      lap.classList.add("lap");
      lap.textContent = "Lap " + (++lapCounter) + ": " + lapTime;
      document.getElementById("laps").appendChild(lap);
    };
  };