const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
const {ipcMain, Notification} = require('electron');


let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 500,
        height: 700,
        // maximizable:false,
        backgroundColor: '#2a475e',
        webPreferences: {
            nodeIntegration: true, // to allow require
            contextIsolation: false, // allow use with Electron 12+
            preload: path.join(__dirname, 'preload.js')
        },
        titleBarStyle: 'display',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        }
    })
    // mainWindow.setMenuBarVisibility(false)
    mainWindow.maximize()
    // and load the index.html of the app.
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}
const NOTIFICATION_TITLE = 'Rain Fall Hydrograph Notification'
const NOTIFICATION_BODY = 'Connected Successfully !!'

function showNotification() {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}

let splash

function splashWindow() {
    // Create the browser window.
    splash = new BrowserWindow({
        width: 500,
        height: 300,
        maximizable:false,
        backgroundColor: '#2a475e',
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2a475e',
            symbolColor: '#ffffff'
        },
        webPreferences: {
            nodeIntegration: true, // to allow require
            contextIsolation: false, // allow use with Electron 12+
            preload: path.join(__dirname, 'preload.js')
        },
    })
    splash.loadFile('splash.html')
}

let login

function loginWindow() {
    // Create the browser window.
    login = new BrowserWindow({
        width: 500,
        height: 700,
        maximizable:false,
        backgroundColor: '#2a475e',
        titleBarStyle: 'hidden',
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be'
        },
        webPreferences: {
            nodeIntegration: true, // to allow require
            contextIsolation: false, // allow use with Electron 12+
            preload: path.join(__dirname, 'preload.js')
        },
    });
    login.loadFile('login.html')

}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

app.on('ready', ()=>{
    // splashWindow()
    // setTimeout(function () {
    //     splash.close()
    //     loginWindow();
    //   }, 5000);
    //   ipcMain.on('wifi-connected', (event, arg) => {
    //     // Create a new window for the notification
    //     login.close()
    //     createWindow();
    // });
    createWindow()
    
})

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    app.quit()
})

app.on('activate', function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
        
    }
})


