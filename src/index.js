import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom/client';
import ScoringMode from './Components/ScoringMode';
import MediaMode from './Components/MediaMode';
import config from '../config.js';

const {ipcRenderer} = window.require('electron');

const root = document.getElementById('root');
const appRoot = ReactDOM.createRoot(root);

const App = () => {
    const [mode, setMode] = useState(''); // initialized to 'scoring'
    const [gameState, setGameState] = useState({});
    const [mediaState, setMediaState] = useState([]);

    useEffect(() => {
        document.documentElement.style.setProperty('--maxWidth', config.display.width);
        document.documentElement.style.setProperty('--maxHeight', config.display.height);
        console.log('App mounted');
        ipcRenderer.on('server-data', (event, data) => {
            // console.log('!Received gameState', data, event);
            if (data.Mode === 9) {
                setMode('scoring');
                setGameState(data || {});  // Assuming the data for scoring mode contains a 'gameState' property
            } else {
                setMode('media');
                // if data.medias is not an array, wrap it in one
                const mediaArray = Array.isArray(data.medias) ? data.medias : [data.medias];
                // console.log(mediaArray)
                setMediaState(mediaArray);
            }
        });

        ipcRenderer.on('message', (event, message) => {
            console.log('Received message:', message);
        });


        return () => {
            ipcRenderer.removeAllListeners('server-data');
        };
    }, []);

    return (
        < >
            {mode === 'scoring' && <ScoringMode gameState={gameState}/>}
            {mode === 'media' && <MediaMode mediaState={mediaState}/>}
            {mode === '' && <div>Waiting for data...</div>} */}
        </>
    );
};


appRoot.render(<App/>);
