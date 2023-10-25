import "./Record.css"
import { useGlobal, tStory } from "../GlobalContextHandler";
import { useEffect, useState, useRef } from "react";
import Typewriter from "../components/Typewriter";


export default function Record() {
    const charDelay = 35;
    const refRecord = useRef<HTMLElement>(null);

    const [record, setRecord] = useGlobal().record;
    const [isRecordAnimating, setIsRecordAnimating] = useGlobal().isRecordAnimating;

    /* for debugging purposes */
    useEffect(() => {
        setRecord(tStory("debug"))
    }, []);

    const scrollRecordAllTheWayDown = () => {
        if (refRecord.current) refRecord.current.scrollTop = refRecord.current.scrollHeight;
    }

    useEffect(() => {
        let intervalId: any;
        const interval = 200;
        if (isRecordAnimating) {
          intervalId = setInterval(scrollRecordAllTheWayDown, interval);
        }
        return () => {
          clearInterval(intervalId);
        };
      }, [isRecordAnimating]);

    return (
        <section className={`record ${isRecordAnimating ? "noscroll": ""}`} ref={refRecord}>
            <Typewriter text={record} delay={charDelay} isAnimatingFunction={setIsRecordAnimating}></Typewriter>
        </section>
    );
}


