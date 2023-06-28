import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'net';

// components
import ScoreMode from './components/ScoreMode';
import MediaMode from './components/MediaMode';

const App = () => {
    const [mode, setMode] = useState(null);
    const [gameState, setGameState] = useState(null);
    const [mediaState, setMediaState] = useState(null);

    useEffect(() => {
        const client = connect({ path: '/path/to/your/unix/socket' });

        client.on('data', (data) => {
            const parsedData = JSON.parse(data.toString());

            if (parsedData.mode === 'score') {
                setMode('score');
                setGameState(parsedData.gameStateObject);
            } else if (parsedData.mode === 'media') {
                setMode('media');
                setMediaState(parsedData.mediaObject);
            }
        });
    }, []);

    return (
        <div>
            {mode === 'score' && <ScoreMode gameState={gameState} />}
            {mode === 'media' && <MediaMode mediaState={mediaState} />}
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));
