import React, {useState, useEffect} from 'react';
import './Mode.css';

const MediaMode = ({mediaState, mediaMode}) => {
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    useEffect(() => {
        if (!Array.isArray(mediaState) || mediaState.length === 0) {
            console.log("No media available");
            return;
        }

        console.log("MediaMode mediaState", mediaState);

        const currentMedia = mediaState[currentMediaIndex];
        const duration = (currentMedia && typeof currentMedia.duration === 'number') ? currentMedia.duration * 1000 : 5000; // Default to 5 seconds if not provided

        const timer = setInterval(() => {
            setCurrentMediaIndex((currentMediaIndex + 1) % mediaState.length);
        }, duration);

        return () => clearInterval(timer);
    }, [currentMediaIndex, mediaState]);

    if (!Array.isArray(mediaState) || mediaState.length === 0 || !mediaState[currentMediaIndex]) {
        return <div style={{backgroundColor: "black", width: "100%", height: "100%"}}></div>;
    }

    const currentMedia = mediaState[currentMediaIndex];
    const isVideo = currentMedia.type === "video";
    const mediaPath = currentMedia.path || ''; // Default to empty string if path is not provided

    return (
        <>
            {isVideo ? (
                mediaMode ?
                    <video
                        src={"../../Frontend/public" + mediaPath}
                        autoPlay
                        preload={"auto"}
                        onEnded={() => setCurrentMediaIndex((currentMediaIndex + 1) % mediaState.length)}
                    /> :
                    <video
                        src={mediaPath}
                        autoPlay
                        preload={"auto"}
                        onEnded={() => setCurrentMediaIndex((currentMediaIndex + 1) % mediaState.length)}
                    />
            ) : (
                <>
                    {mediaMode ?
                        <img src={"../../Frontend/public" + mediaPath} alt="Media content"/>
                        :
                        <img src={mediaPath} alt="Media content"/>
                    }
                </>
            )}
        </>
    );
};

export default MediaMode;
