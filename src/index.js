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
                let mediaArray = [];

                setMode('media');
                // if data.medias is not an array, wrap it in one
                switch (data.Mode) {
                    case 0:
                        mediaArray = [{order: 1, path: 'staticMedias/English/_DEFENSE.mp4', duration: 5, type: 'video'}];
                        break;
                    case 1:
                        mediaArray = [{order: 1, path: 'staticMedias/English/_DUNK.mp4', duration: 3, type: 'video'}];
                        break;
                    case 2:
                        mediaArray = [{order: 1, path: 'staticMedias/English/_MAKE_SOME_NOISE.mp4', duration: 6, type: 'video'}];
                        break;
                    case 10:
                        mediaArray = [{order: 1, path: 'staticMedias/English/_1_POINT.mp4', duration: 3, type: 'video'}];
                        break;
                    case 11:
                        mediaArray = [{order: 1, path: 'staticMedias/English/_2_POINTS.mp4', duration: 3, type: 'video'}];
                        break;
                    case 12:
                        mediaArray = [{order: 1, path: 'staticMedias/English/_3_POINTS.mp4', duration: 4, type: 'video'}];
                        break;
                    case 13:
                        mediaArray = [{order: 1, path: 'staticMedias/English/_TIME_OUT.mp4', duration: 3, type: 'video'}];
                        break;
                    case 14:
                        mediaArray = [{order: 1, path: 'staticMedias/English/_FOUL.mp4', duration: 3, type: 'video'}];
                        break;
                    case 15:
                        mediaArray = [{order: 1, path: 'staticMedias/English/_PREMATCH.mp4', duration: 3, type: 'video'}];
                        break;
                    default:
                        mediaArray = Array.isArray(data.medias) ? data.medias : [data.medias];
                }
                console.log(mediaArray)
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
            {mode === '' && <div>Waiting for data...</div>}
        </>
    );
};


appRoot.render(<App/>);
