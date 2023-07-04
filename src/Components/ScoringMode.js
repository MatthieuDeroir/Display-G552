import React, {useEffect} from 'react';
import {
    TableTennis,
    Basketball,
    Badminton,
    SimpleTimer,
    Soccer,
    Volleyball,
    Tennis,
    Hockey,
    Handball,
    Boxing
} from './Sports/';
import './Mode.css'

const ScoringMode = ({ data }) => {
    const [minutes, setMinutes] = React.useState(0);
    const [seconds, setSeconds] = React.useState(0);
    const [sport, setSport] = React.useState('none');

    useEffect(() => {
        if (data) {
            setMinutes(Math.floor(data.gameState.chrono / 600))
            setSeconds(Math.floor(data.gameState.chrono / 10) % 60)
            setSport(data.gameState.sport)
        }
    });

    return (
        <div className="container">
            {sport === 'table tennis' && <TableTennis />}
            {sport === 'handball' && <Handball />}
            {sport === 'badminton' && <Badminton />}
            {sport === 'simple timer' && <SimpleTimer />}
            {sport === 'basketball' && <Basketball data={data} />}
            {sport === 'soccer' && <Soccer />}
            {sport === 'volleyball' && <Volleyball />}
            {sport === 'tennis' && <Tennis />}
            {sport === 'hockey' && <Hockey />}
            {sport === 'boxing' && <Boxing />}
            {sport === '' && <div style={{color:"black"}}>Waiting for data...</div>}
        </div>
    );
};

export default ScoringMode;
