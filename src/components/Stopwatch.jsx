import React, { useState, useEffect, useRef } from "react";

function Stopwatch() {
    const [isrunning, SetIsrunning] = useState(false);
    const [elapsedtime, SetElapsedtime] = useState(0);

    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isrunning && intervalIdRef.current === null) {
            intervalIdRef.current = setInterval(() => {
                SetElapsedtime(Date.now() - startTimeRef.current);
            }, 10);
        }

        return () => {
            if (!isrunning && intervalIdRef.current !== null) {
                clearInterval(intervalIdRef.current);
                intervalIdRef.current = null;
            }
        };
    }, [isrunning]);

    function start() {
        if (!isrunning) {
            startTimeRef.current = Date.now() - elapsedtime;
            SetIsrunning(true);
        }
    }

    function stop() {
        SetIsrunning(false);
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
    }

    function reset() {
        SetIsrunning(false);
        clearInterval(intervalIdRef.current);
        intervalIdRef.current = null;
        SetElapsedtime(0);
    }

    function format() {
        let minutes = Math.floor((elapsedtime / (1000 * 60)) % 60);
        let seconds = Math.floor((elapsedtime / 1000) % 60);
        let milliseconds = Math.floor(elapsedtime % 1000);

        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(milliseconds).padStart(2, "0")}`;
    }

    return (
        <div className="stopwatch">
            <div className="display">{format()}</div>
            <div className="controls">
                <button className="start-button" onClick={start}>Start</button>
                <button className="stop-button" onClick={stop}>Stop</button>
                <button className="reset-button" onClick={reset}>Reset</button>
            </div>
        </div>
    );
}

export default Stopwatch;

