const wifi = require('wifi-control');
const {ipcRenderer} = require('electron');
const Push = require('push.js')



wifi.init({
    debug: true
});

function showPassword() {
    var x = document.getElementById("password");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }

  
  
  
  
  
const form = document.querySelector('form');
form.addEventListener('submit', (event) => {
  event.preventDefault();
  const ssid = document.querySelector('#ssid').value;
  const password = document.querySelector('#password').value;

wifi.connectToAP({ ssid, password}, 
    function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log('Connected to WiFi network!');
        
        ipcRenderer.send('wifi-connected', 'WiFi Connected');
        

      }
    });
})  

