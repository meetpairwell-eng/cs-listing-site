import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        // Force instant scroll to top, overriding CSS smooth-scroll
        document.documentElement.scrollTo({
            top: 0,
            left: 0,
            behavior: "instant", // Works in Chrome/Firefox
        });
        window.scrollTo(0, 0); // Fallback
    }, [pathname]);

    return null;
};

export default ScrollToTop;
