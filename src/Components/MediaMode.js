import React, { useState, useEffect } from 'react';
import './Mode.css'

const MediaMode = ({ mediaState }) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    useEffect(() => {
        mediaState[currentMediaIndex].path =  mediaState[currentMediaIndex].path
        console.log(mediaState[currentMediaIndex].path)
        if (!mediaState || mediaState.length === 0) {
            console.log(mediaState)
            console.log("No media available")
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

    return (
        <div className="container">
            {mediaState && mediaState[currentMediaIndex].type === "video" ? (
                <video
                    src={mediaState[currentMediaIndex].path}
                    autoPlay
                    loop
                />
            ) : (
                <img src={"~/Server/Frontend/public" + mediaState[currentMediaIndex].path} alt="Media content" />
            )}
        </div>
    );
};

export default MediaMode;
