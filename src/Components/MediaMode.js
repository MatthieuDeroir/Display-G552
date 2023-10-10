import React, { useState, useEffect } from 'react';
import './Mode.css';

const MediaMode = ({ mediaState }) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    useEffect(() => {
        if (!mediaState || mediaState.length === 0) {
            console.log("No media available");
            return;
        }

        const timer = setTimeout(() => {
            setCurrentMediaIndex((currentMediaIndex + 1) % mediaState.length);
        }, mediaState[currentMediaIndex].duration * 1000);

        return () => clearTimeout(timer);
    }, [currentMediaIndex, mediaState]);

    if (!mediaState || mediaState.length === 0) {
        return <div>No media available</div>;
    }

    const currentMedia = mediaState[currentMediaIndex];

    return (
        <div className="container">
            {currentMedia.type === "video" ? (
                <video
                    src={currentMedia.path}
                    autoPlay
                    onEnded={() => setCurrentMediaIndex((currentMediaIndex + 1) % mediaState.length)}
                />
            ) : (
                <img src={"../../Frontend/public" + mediaState[currentMediaIndex].path} alt="Media content" />

            )}
        </div>
    );
};

export default MediaMode;

