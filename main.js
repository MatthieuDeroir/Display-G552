const {app, BrowserWindow, ipcMain} = require('electron')
const path = require('path')
const config = require('./config.js')
const net = require('net');

const socketPath = '/tmp/_sysmes.sock';

require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});

let mainWindow;

function handleData(data) {
    if (data.mode === 'scoring') {
        mainWindow.webContents.send('server-data', data);
    } else if (data.mode === 'media') {
        mainWindow.webContents.send('server-data', data);
    } else {
        console.warn('Received unknown data mode:', data.mode);
    }
}

function createWindows() {
    mainWindow = new BrowserWindow({
        width: config.display.width,
        height: config.display.height,
        x: 0,
        y: 0,

        frame: false,


        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
            contextIsolation: false
        }


    })
    mainWindow.webContents.openDevTools()

    mainWindow.loadFile('dist/index.html')
    mainWindow.setMenu(null)
    // mainWindow.setAlwaysOnTop(true, 'screen-saver');

    function connectToServer() {
        const client = net.createConnection({path: socketPath}, () => {
            console.log('Connected to server!');
            client.write('Hello from client!\n');
        });

        client.on('data', (data) => {
            try {
                const jsonData = JSON.parse(data);
                handleData(jsonData);
            } catch (err) {
                console.error('Failed to parse JSON data:', err);
            }
        });

        client.on('end', () => {
            console.log('Disconnected from server');
            setTimeout(connectToServer, 5000);
        });
    }

    connectToServer();
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
