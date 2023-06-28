const {app, BrowserWindow} = require('electron')
const path = require('path')
const config = require('./config.js')

function createWindows () {
    // Create the score window.
    let mainWindow = new BrowserWindow({
        width: config.display.width,
        height: config.display.height,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    mainWindow.loadFile('index.html')
}

app.whenReady().then(createWindows)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindows()
    }
})
