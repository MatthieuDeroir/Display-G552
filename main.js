const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

let mainWindow

function createWindow () {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true
        },
        show: false // Ne pas afficher la fenêtre lors du démarrage
    })

    mainWindow.loadFile(path.join(__dirname, 'index.html'))

    // Ouvrez les outils de développement de Chrome.
    mainWindow.webContents.openDevTools()

    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
    if (mainWindow === null) createWindow()
})

ipcMain.on('control-message', (event, arg) => {
    // Répondre à un message de contrôle de l'application React
    // Vous pouvez utiliser `mainWindow.webContents.send(...)` pour envoyer
    // des données à l'afficheur de l'application Electron.
    console.log(arg);
})

