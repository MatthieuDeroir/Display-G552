import React, {useState, useEffect} from 'react';
import './Mode.css';

const MediaMode = ({mediaState}) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    useEffect(() => {
        if (!Array.isArray(mediaState) || mediaState.length === 0) {
            console.log("No media available");
            return;
        }

        console.log("MediaMode mediaState", mediaState);

        const currentMedia = mediaState[currentMediaIndex];
        const duration = (currentMedia && typeof currentMedia.duration === 'number') ? currentMedia.duration * 1000 : 5000; // Default to 5 seconds if not provided

        const timer = setTimeout(() => {
            setCurrentMediaIndex((currentMediaIndex + 1) % mediaState.length);
        }, duration);

        return () => clearTimeout(timer);
    }, [currentMediaIndex, mediaState]);

    if (!Array.isArray(mediaState) || mediaState.length === 0 || !mediaState[currentMediaIndex]) {
        return <div style={{backgroundColor: "black", width: "100%", height: "100%"}}></div>;
    }

    const currentMedia = mediaState[currentMediaIndex];
    const isVideo = currentMedia.type === "video";
    const mediaPath = currentMedia.path || ''; // Default to empty string if path is not provided

    return (
        <div className="container">
            {isVideo ? (
                <video
                    style={{width: "100%", height: "100%"}}
                    src={mediaPath}
                    autoPlay
                    preload={"auto"}
                    onEnded={() => setCurrentMediaIndex((currentMediaIndex + 1) % mediaState.length)}
                />
            ) : (
                <>
                    <img src={"../../Frontend/public" + mediaPath} alt="Media content"/>
                    <img src={mediaPath} alt="Media content"/>
                </>
            )}
        </div>
    );
};

export default MediaMode;
