import {useState, useEffect, useCallback} from 'react';

export function useFullscreen() {
    const [isFullscreen, setIsFullscreen] = useState(
        Boolean(document.fullscreenElement)
    );
    
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(Boolean(document.fullscreenElement));
        };
        
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);
    
    const toggleFullscreen = useCallback(async () => {
        try {
            if (!document.fullscreenElement) {
                // Enter fullscreen on the entire document
                await document.documentElement.requestFullscreen();
            } else if (document.exitFullscreen) {
                // Exit fullscreen
                await document.exitFullscreen();
            }
        } catch (err) {
            console.error('Fullscreen request failed:', err);
        }
    }, []);
    
    return {isFullscreen, toggleFullscreen};
}