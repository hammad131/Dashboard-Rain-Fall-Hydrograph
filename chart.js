const Chart = require('chart.js');

const ctx = document.getElementById('myChart').getContext('2d');

//chart 
const myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],
    datasets: [
      {
      label:'Volume1',
      backgroundColor:"rgba(255, 255, 255)",
      borderColor:"rgba(255, 255, 255)",
      color: "#fff",
      data: [],
      tension: 0.5,
      },

    ]
        },
        options: {
            // plugins: {
            //   legend: {
            //       display: false,
            //    } },

            categoryPercentage:0.9,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

const createChart = document.querySelector('#data_input');
createChart.addEventListener('submit', (event) => {
    event.preventDefault();
    const v1 = document.querySelector('#v1').value;
    const v2 = document.querySelector('#v2').value;
    const v3 = document.querySelector('#v3').value;
    const v4 = document.querySelector('#v4').value;
    const v5 = document.querySelector('#v5').value;
    const v6 = document.querySelector('#v6').value;
    const v7 = document.querySelector('#v7').value;
    const v8 = document.querySelector('#v8').value;
    const v9 = document.querySelector('#v9').value;
    const v10 = document.querySelector('#v10').value;
    const v11 = document.querySelector('#v11').value;
    const v12 = document.querySelector('#v12').value;
    const v13 = document.querySelector('#v13').value;
    const v14 = document.querySelector('#v14').value;
    const v15 = document.querySelector('#v15').value;
    const v16 = document.querySelector('#v16').value;
    const v17 = document.querySelector('#v17').value;
    //stepTime
    const sT = document.querySelector('#stepTime').value;
    myChart.data.labels = [sT,sT*2,sT*3,sT*4,sT*5,sT*6,sT*7,sT*8,sT*9,sT*10,sT*11,sT*12,sT*13,sT*14,sT*15,sT*16,sT*17]
    myChart.data.datasets[0].data = [v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17];
    myChart.update();
    console.log( myChart.data.datasets[1].data)
    })

// update Chart
const dataIndex = 1;
const updateChart = document.querySelector('#data_input');
updateChart.addEventListener('update', (event) => {
    event.preventDefault();
    const u1 = document.querySelector('#v1').value;
    const u2 = document.querySelector('#v2').value;
    const u3 = document.querySelector('#v3').value;
    const u4 = document.querySelector('#v4').value;
    const u5 = document.querySelector('#v5').value;
    // const v6 = document.querySelector('#v6').value;
    // const v7 = document.querySelector('#v7').value;
    // const v8 = document.querySelector('#v8').value;
    // const v9 = document.querySelector('#v9').value;
    // const v10 = document.querySelector('#v10').value;
    // const v11 = document.querySelector('#v11').value;
    // const v12 = document.querySelector('#v12').value;
    // const v13 = document.querySelector('#v13').value;
    // const v14 = document.querySelector('#v14').value;
    // const v15 = document.querySelector('#v15').value;
    // const v16 = document.querySelector('#v16').value;
    // const v17 = document.querySelector('#v17').value;
   
    myChart.data.datasets[1].data = [u1,u2,u3,u4,u5]
    myChart.update();
    dataIndex++;
    })
//resetChart
function reset(){
  myChart.data.labels = []
  myChart.data.datasets[0].data = []
  myChart.update
  dataIndex = 1;
}



// const timer1 = document.getElementById('led');

// timer1.addEventListener('submit', (event) => {
//     event.preventDefault();
  
//     const ledValue = document.querySelector('#led1').value;
//     console.log(ledValue)
  
  
//     fetch('http://192.168.4.1/led1', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ LED1:Number(ledValue) })
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   });

// //
//Solenoids

const checkbox = document.querySelector('#valve1')
var on = 0

checkbox.addEventListener('change', (e) => {
  if (e.target.checked) {
    on++
    console.log(on)
    console.log('worked')
    fetch('http://192.168.4.1/led1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ LED1:Number(1) })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    
  } else {
    on--
    console.log(on)
    console.log('worked')
    fetch('http://192.168.4.1/led1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ LED1:Number(0) })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
})



//DATA Logger
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');
const output = document.getElementById('output');
const statusMessage = document.getElementById('status-message');

startButton.addEventListener('click', () => {
  const timestamp = new Date().toLocaleString();
  // statusMessage.innerHTML = "Logging";
  // statusMessage.style.color = "green";
  output.innerHTML += `Data logging started at ${timestamp}<br>`;
});

stopButton.addEventListener('click', () => {
const timestamp = new Date().toLocaleString();
// statusMessage.innerHTML = "Not Logging";
// statusMessage.style.color = "#333";
output.innerHTML += `Data logging stopped at ${timestamp}<br>`;
});



//try1
// var numRepetitions = 0;

// function startTimer() {
//   // get the input values from the user
//   var minutes = parseInt(document.getElementById("minutes").value);
//   var seconds = parseInt(document.getElementById("seconds").value);

//   if (isNaN(minutes) || isNaN(seconds)) {
//     alert("Please enter a valid time.");
//     return;
//   }

//   var totalSeconds = minutes * 60 + seconds;
//   var countdownElement = document.getElementById("countdown");
//   var iterationElement = document.getElementById("iteration");

//   iterationElement.innerHTML = "Iteration " + (numRepetitions + 1);

//   var timerInterval = setInterval(function() {
//     totalSeconds--;

//     var minutesLeft = Math.floor(totalSeconds / 60);
//     var secondsLeft = totalSeconds % 60;

//     countdownElement.innerHTML = minutesLeft + ":" + (secondsLeft < 10 ? "0" : "") + secondsLeft;

//     if (totalSeconds === 0) {
//       clearInterval(timerInterval);
//       numRepetitions++;

//       if (numRepetitions === 17) {
//         countdownElement.innerHTML = "Done!";
//         iterationElement.innerHTML = "";
//         document.getElementById("timer-status").classList.remove("active");
//         document.getElementById("timer-status").classList.add("inactive");
//         numRepetitions = 0;
//       } else {
//         startTimer();
//         iterationElement.innerHTML = "Iteration " + (numRepetitions + 1);
//       }
//     }
//   }, 1000);

//   document.getElementById("timer-status").classList.remove("inactive");
//   document.getElementById("timer-status").classList.add("active");
//   document.getElementById("countdown").innerHTML = minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
// }

let timer = null;
let totalSeconds = 0;
let iterations = 0;

function startTimer() {
  if (timer) {
    clearInterval(timer);
  }
  
  const minutes = parseInt(document.getElementById("minutes").value);
  const seconds = parseInt(document.getElementById("seconds").value);
  if (isNaN(minutes) || isNaN(seconds)) {
    alert("Please enter a valid time.");
    return;
  }
  
  totalSeconds = minutes * 60 + seconds;
  iterations = 0;
  
  updateIteration();
  updateTimer(totalSeconds);
  
  const statusIndicator = document.querySelector('.timer-status');
  statusIndicator.classList.remove('inactive');
  statusIndicator.classList.add('active');
  
  timer = setInterval(() => {
    totalSeconds--;
    updateTimer(totalSeconds);
    if (totalSeconds <= 0) {
      iterations++;
      if (iterations < 17) {
        totalSeconds = minutes * 60 + seconds;
        updateIteration();
        updateTimer(totalSeconds);
      } else {
        clearInterval(timer);
        timer = null;
        const statusIndicator = document.querySelector('.timer-status');
        statusIndicator.classList.remove('active');
        statusIndicator.classList.add('inactive');
      }
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  totalSeconds = 0;
  iterations = 0;
  updateIteration();
  updateTimer(totalSeconds);
  const statusIndicator = document.querySelector('.timer-status');
  statusIndicator.classList.remove('active');
  statusIndicator.classList.add('inactive');
}

function updateTimer(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const countdown = document.getElementById("countdown");
  countdown.innerHTML = `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function updateIteration() {
  const iteration = document.getElementById("iteration");
  iteration.innerHTML = `Iteration: ${iterations}`;
}

function valveOn(){
  fetch('http://192.168.4.1/led1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ LED1:Number(1) })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
}
function valveOff() {
  fetch('http://192.168.4.1/led1', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ LED1:Number(0) })
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
}
function valve(){
  const minutes = parseInt(document.getElementById("minutes").value);
  const seconds = parseInt(document.getElementById("seconds").value);

  const miliSeconds = (minutes*60 + seconds)*1000
  valveOn()
}