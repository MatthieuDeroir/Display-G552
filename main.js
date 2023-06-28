const {app, BrowserWindow} = require('electron')
const path = require('path')
const config = require('./config.js')
const net = require('net');
const socketPath = '/tmp/_sysmes.sock';

require('electron-reload')(__dirname, {
    // Note that the path to electron may vary according to the main file
    electron: require(`${__dirname}/node_modules/electron`)
});

function createWindows () {
    // Create the score window.
    let mainWindow = new BrowserWindow({
        width: config.display.width,
        height: config.display.height,
        x: 0,
        y: 0,
        autoHideMenuBar: true,
        frame: false,

        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    })

    mainWindow.loadFile('dist/index.html')

    mainWindow.setAlwaysOnTop(true, 'screen-saver');

    mainWindow.setMenu(null)

    const client = net.createConnection({ path: socketPath }, () => {
        console.log('Connected to server!');
        client.write('Hello from client!\n');
    });

    client.on('data', (data) => {
        console.log('Received data:', data.toString());
        // Do something with data
    });

    client.on('error', (err) => {
        console.error('Client error:', err);
    });


    client.on('end', () => {
        console.log('Disconnected from server');
    });
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
