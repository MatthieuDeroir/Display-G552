const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
const config = require('./config.js');
const net = require('net');

const socketPath = '/tmp/_sysmes.sock';

require('electron-reload')(__dirname, {
    electron: require(`${__dirname}/node_modules/electron`)
});

let mainWindow;

function handleData(data) {
    if (mainWindow && !mainWindow.isDestroyed()) {
        if (data.mode === 9) {
            console.log('data.gameState.mode ===', data.gameState.mode, ' => Scoring data are handled');
            mainWindow.webContents.send('server-data', data);
            console.log('Sent from electron to display data:', data);
        } else if (data.mode === null) {
            console.warn('Received unknown data mode:', data.mode);
            mainWindow.webContents.send('server-data', data);
        }
        else {
            console.log('data.gameState.mode ===', data.gameState.mode, ' => Media data are handled');
            console.log('Media data are handled');
            mainWindow.webContents.send('server-data', data);
        }
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
    });

    mainWindow.webContents.openDevTools();
    mainWindow.loadFile('dist/index.html');
    mainWindow.setMenu(null);
    mainWindow.setAlwaysOnTop(true, 'screen-saver');
    mainWindow.webContents.on('did-finish-load', () => {
        console.log('Main window loaded');
        mainWindow.webContents.send('message', 'Hello second window!');
    });

    function connectToServer() {
        let dataBuffer = '';

        try {
            const client = net.createConnection({path: socketPath}, () => {
                console.log('Connected to server!');
                client.write('Display is connected! You can send scoring and medias.\n');
            });

            client.on('data', (data) => {
                dataBuffer += data.toString();
                if (dataBuffer.endsWith('\n')) {
                    try {
                        // console.log('Received raw data:', dataBuffer);
                        const jsonData = JSON.parse(dataBuffer.toString());
                        handleData(jsonData);
                        client.write('Display has successfully received data!');
                        dataBuffer = '';
                    } catch (err) {
                        console.error('Failed to parse JSON data:', err);
                    }
                }
            });

            client.on('error', (err) => {
                console.error('Error occurred with the client socket:', err);
                setTimeout(connectToServer, 5000);
            });

            client.on('end', () => {
                console.log('Disconnected from server');
                setTimeout(connectToServer, 5000);
            });
        } catch (err) {
            console.error('Failed to create client connection:', err);
            setTimeout(connectToServer, 5000);
        }
    }

    connectToServer();
}

app.whenReady().then(createWindows);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindows();
    }
});
