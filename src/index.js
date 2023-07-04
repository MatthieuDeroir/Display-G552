import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ScoringMode from './components/ScoringMode';
import MediaMode from './components/MediaMode';
import config from '../config.js';

const { ipcRenderer } = window.require('electron');

const App = () => {
    const [mode, setMode] = useState(null);
    const [gameState, setGameState] = useState(null);
    const [mediaState, setMediaState] = useState(null);

    useEffect(() => {
        document.documentElement.style.setProperty('--maxWidth', config.display.width);
        document.documentElement.style.setProperty('--maxHeight', config.display.height);
        ipcRenderer.on('server-data', (event, data) => {
            console.log('!Received data:', data);
            if (data.mode === 'scoring') {
                setMode('scoring');
                setGameState(data);
            } else if (data.mode === 'media') {
                setMode('media');
                // if data.medias is not an array, wrap it in one
                const mediaArray = Array.isArray(data.medias) ? data.medias : [data.medias];
                console.log(mediaArray)
                setMediaState(mediaArray);
            }
        });

        return () => {
            ipcRenderer.removeAllListeners('server-data');
        };
    }, []);


    return (
        <div>
            {mode === 'scoring' && <ScoringMode data={gameState} />}
            {mode === 'media' && <MediaMode mediaState={mediaState} />}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
