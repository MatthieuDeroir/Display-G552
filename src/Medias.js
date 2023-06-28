import React, { useEffect, useRef } from 'react';

const Media = ({ type, source, duration }) => {
    const mediaRef = useRef(null);

    useEffect(() => {
        if (type === 'video') {
            const timer = setTimeout(() => {
                mediaRef.current.pause();
            }, duration * 1000);

            return () => clearTimeout(timer);
        }
    }, [type, source, duration]);

    if (type === 'video') {
        return (
            <video className="media" ref={mediaRef} autoPlay controls>
                <source src={source} type="video/mp4" />
            </video>
        );
    } else if (type === 'image') {
        return (
            <img className="media" src={source} alt="Media content" />
        );
    } else {
        return null;
    }
}

export default Media;
