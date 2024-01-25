import {useRef, useEffect} from "react";

export default function useDebounced(func: any, delay: number = 300, cleanUp = false) {

    const timeoutRef: any = useRef();

    function clearTimer() {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = undefined;
        }
    }

    useEffect(() => (cleanUp ? clearTimer : undefined), [cleanUp]);

    return (...args: any[]) => {
        clearTimer();
        timeoutRef.current = setTimeout(() => func(...args), delay);
    };
}